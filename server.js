const express = require('express');
const mongoose = require('mongoose');

//this makes mongoose use built in es6 promises
mongoose.Promise = global.Promise;

//now we need to import port and DATABASE_URL from
//the config file
const { PORT, DATABASE_URL } = require('./config');
//we also need access to the model 
const { clientProto } = require('./models');

const app = express();
app.use(express.static('public'));



app.get('/restaurants', (req, res) => {
  Restaurant
    .find()
    .then(restaurants => {
      res.json({
        restaurants: restaurants.map(
          (restaurant) => restaurant.serialize())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

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
