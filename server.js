require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');


const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');


//this makes mongoose use built in es6 promises
mongoose.Promise = global.Promise;

//now we need to import port and DATABASE_URL from
//the config file
const { PORT, DATABASE_URL } = require('./config');
//we also need access to the model 
const { clientProto } = require('./models');
const { User } = require('./users/models');


const jsonParser = bodyParser.json();
const app = express();
app.use(express.static('public'));
app.use(morgan('common'));
app.use(jsonParser);

//enable CORS

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  next();
});

//have to import the strategies below if we want to use them 
//in routes
passport.use(localStrategy); //passport is handling the "callback"
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

// A protected endpoint which needs a valid JWT to access it
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  //this right above is the controller in this case, acts like it
});

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'secret buddy'
  });
});

//the requests handlers start here

app.get('/projects', (req, res) => {
  clientProto
    //just grabbing the documents with boolean se to "true," which indicates that it's public
    .find({published: true})
    .then(clientProtos => {
      res.json({
        clientProtos: clientProtos.map((clientProto) => clientProto.serialize()) 
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


app.get('/projects/:id', (req, res) => {
  clientProto
    //.findById(req.params.id)
    .find({ user_id: req.params.id })
    //.then(clientProtos => res.json(clientProto.serialize()))
    .then(clientProtos => {
      res.json({
        clientProtos: clientProtos.map(
          (clientProto) => clientProto.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

//here's the post request
app.post('/projects', jwtAuth, (req, res, next) => {
  console.log(req.body);
  const requiredFields = ['shortDesc', 'longDesc', 'userStories', 'screens', 'user_id', 'email'];
  for(let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {  
      const message = `Missing ${field} in required fields`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
clientProto
  .create({
    shortDesc: req.body.shortDesc,
    longDesc: req.body.longDesc,
    userStories:req.body.userStories,
    screens: req.body.screens,
    user_id: req.body.user_id,
    email: req.body.email
  })
  .then(clientProto => {
    //res.status(201).json(clientProto.serialize())
    console.log(clientProto.id); /// <-this fing works
    User
    .findByIdAndUpdate(req.body.user_id, { $push: {proto_ids: clientProto.id} })
    .then(() => res.status(201).json(clientProto.serialize()))
    .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
  }) //you always have to return inside the previous .then to 
  //be able to chain another then method  
  .catch(err => {
    console.error(err);
    res.status(501).json({message: 'oh shit, Internal Server Error'})
  });
});

//here's the put request

app.put('/projects/:id', jwtAuth, (req, res) => {
  const requiredFields = ['id'];
  for(let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  //this below is just another type of validation, common validation pattern
  if (req.params.id !== req.body.id) {
    const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  
  console.log(`Updating client project ${req.params.id}`);
  const toUpdate = {};
  const updateableFields = ['shortDesc', 'longDesc', 'userStories', 'screens', 'published'];

  updateableFields.forEach(field => {
    if(field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  clientProto
  //use $set to update key value pairs 
  .findByIdAndUpdate(req.params.id, { $set: toUpdate })
  //the params are from the URL, and the $set thing is mongo related
  .then(clientProto => res.status(204).end())
  .catch(err => res.status(500).json({ message: 'Internal Server Error' }));

});

app.delete('/projects/:id', (req, res) => {
  clientProto
    .findByIdAndRemove(req.params.id)
    .then(clientProto => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal Server Error'}));
});

//catch all endpoint for bad request URLs
 app.use('*', function(req, res) {
   res.status(404).json({ message: 'Nobody Home' });
 });

let server;

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if(err) {
        return reject(err);
      }
      server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(); //we resolve the promise after we start listening
    })
      .on('error', err => {
      mongoose.disconnect();
      reject(err)
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  };
  
module.exports = {app, runServer, closeServer};
