const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//this makes mongoose use built in es6 promises
mongoose.Promise = global.Promise;

//now we need to import port and DATABASE_URL from
//the config file
const { PORT, DATABASE_URL } = require('./config');
//we also need access to the model 
const { clientProto } = require('./models');

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


//the requests handlers start here

app.get('/projects', (req, res) => {
  clientProto
    .find()
    .then(clientProtos => {
      res.json({
        clientProtos: clientProtos.map(
          (clientProto) => clientProto.serialize())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

//here's the post request

app.post('/projects', (req, res) => {
  console.log(req.body);
  const requiredFields = ['shortDesc', 'longDesc', 'userStories', 'screens'];
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
    screens: req.body.screens
  })
  .then(clientProto => res.status(201).json(clientProto.serialize()))
  .catch(err => {
    console.error(err);
    res.status(501).json({message: 'oh shit, Internal Server Error'})
  });
});

//here's the put request

app.put('/projects/:id', (req, res) => {
  const requiredFields = ['shortDesc', 'id'];
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
  const updateableFields = ['shortDesc', 'longDesc', 'userStories', 'screens'];

  updateableFields.forEach(field => {
    if(field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  clientProto
  //use $set to update key value pairs 
  .findByIdAndUpdate(req.params.id, { $set: toUpdate })
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
      resolve();
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
