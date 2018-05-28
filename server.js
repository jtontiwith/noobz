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

//remember that .use is just saying that on '/x/x/' route use the 
//following middleware function, and also remember that here below
//I define the /api/ part of the path, it's just to differentiate from
//the regular path, that's all
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

// A protected endpoint which needs a valid JWT to access it
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  //this right above is the controller in this case, acts like it
})

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'secret buddy'
  });
});

//the requests handlers start here

app.get('/projects', (req, res) => {
  clientProto
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

// THE WORKING VERSION
app.post('/projects', jwtAuth, (req, res, next) => {
  console.log(req.body);
  const requiredFields = ['shortDesc', 'longDesc', 'userStories', 'screens', 'user_id'];
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
    user_id: req.body.user_id
  })
  .then(clientProto => {
    //res.status(201).json(clientProto.serialize())
    console.log(clientProto.id); /// <-this fing works
    User
    .findByIdAndUpdate(req.body.user_id, { $push: {proto_ids: clientProto.id} })
    //the params are from the URL, and the $set thing is mongo related
    //all the mongoose methods that query the db inherently return promises
    //the parameter in the .then() block is always the promise from the 
    //previously returned method, the promise, I left it empty (), but 
    //it could be anything  
    //.then(() => res.status(201).end()) <-this works
    .then(() => res.status(201).json(clientProto.serialize()))
    //res.status(201).json(clientProto.serialize())
    .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
    //res.status(201).json(User.serialize())
  }) //you always have to return inside the previous .then to 
  //be able to chain another then method  
  .catch(err => {
    console.error(err);
    res.status(501).json({message: 'oh shit, Internal Server Error'})
  });
});

//remember that you can only send the response once


/*
-I am making the assumption that id is in the response
-I am also making the assumption I know how to access it

*/


/* old new one
app.post('/projects', jwtAuth, (req, res, next) => {
  console.log(req.body);
  const requiredFields = ['shortDesc', 'longDesc', 'userStories', 'screens', 'user_id'];
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
    user_id: req.body.user_id
  })
  .then(clientProto => {
    const protoId = {proto_ids: res.body.id}
  User
    .findByIdAndUpdate(req.body.user_id, { $set: protoId })
    //the params are from the URL, and the $set thing is mongo related
    //.then(User => res.status(204).end())
    //.catch(err => res.status(500).json({ message: 'Internal Server Error' }));
    res.status(201).json(clientProto.serialize())
  })
  .catch(err => {
  console.error(err);
    res.status(501).json({message: 'oh shit, Internal Server Error'})
  });

});
*/

///NEW ONE
/*
app.post('/projects', jwtAuth, (req, res, next) => {
  console.log(req.body);
  const requiredFields = ['shortDesc', 'longDesc', 'userStories', 'screens', 'user_id'];
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
    user_id: req.body.user_id
  })
  .then(clientProto => res.status(201).json(clientProto.serialize()))
  .then(clientProto => {
    const protoId = {proto_ids: res.body.id}
  User
    .findByIdAndUpdate(req.body.user_id, { $set: protoId })
    //the params are from the URL, and the $set thing is mongo related
    .then(User => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
    res.status(201).json(User.serialize())
  })
  .catch(err => {
    console.error(err);
    res.status(501).json({message: 'oh shit, Internal Server Error'})
  });

});

*/



///NEW ONE







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

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
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

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
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

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  };
  
module.exports = {app, runServer, closeServer};
//this has something to do with only being able to run this code 
//outside a node.js environment


/*
-have user login before ever createing anything
-pop login before main form to create project
-





*/