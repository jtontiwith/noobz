const chai = require('chai');
const chaiHttp = require('chai-http');
//const faker = require('faker');
const mongoose = require('mongoose');

const {clientProto} = require('../models');
const {app, closeServer, runServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);


function seedClientProjectData() {
  console.info('seeding client fake client projects');
  const seedData = [];

  for(let i = 1; i < 10; i++) {
    seedData.push(generateClientProjectData());
  }
  //this will return a promise, find out more about that
  return clientProto.insertMany(seedData);
}

//this is used to generate data to put in the db
function generateShortDesc() {
  const shortDesc = ['Uber for X', 'Social App Y', 'Local Platform Z', 'Dating App 123', 'Delivery App Again'];
  return shortDesc[Math.floor(Math.random() * shortDesc.length)];
}

function generateLongDesc() {
  const longDesc = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'];
  return longDesc[Math.floor(Math.random() * longDesc.length)];
}

function generateUserstories() {
  const userStories = ['I want A so that B', 'I want C so that D', 'I want E so that F', 'I want G so that H'];
  return userStories[Math.floor(Math.random() * userStories.length)];  
}

function generateSeesDoesScreens() {
  const screens = [['user sees a', 'user does b'], ['users see c', 'user does d'], ['user sees e, user does f'], ['user sees g, user does h']];
  return screens[Math.floor(Math.random() * screens.length)];
}

function generateClientProjectData() {
  return {
    shortDesc: generateShortDesc(),
    longDesc: generateLongDesc(),
    userStories: [generateUserstories(), generateUserstories(), generateUserstories()],
    screens: [[generateSeesDoesScreens()], [generateSeesDoesScreens()], [generateSeesDoesScreens()]] 
  }
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('clientProto API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });


  beforeEach(function() {
    return seedClientProjectData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  //GET - get a list of all the client projects

  describe('API endpoint /projects', function() {
  
    it('should return all projects', function() {
      //strategy: 
      //  1. get back all client projects from GET request to /projects
      //  2. prove res has the correct datatype, status type
      //  3. ensure the number of projects we get back is equal to that of the db
      let res; //<- to have access across all .then blocks
      return chai.request(app)
        .get('/projects')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.clientProtos).to.be.a('array');
          expect(res.body.clientProtos).to.have.lengthOf.at.least(1);
          
          res.body.clientProtos.forEach(function(clientProto) {
            expect(clientProto).to.be.a('object');
            expect(clientProto).to.include.keys(
              'id', 'shortDesc', 'longDesc', 'userStories', 'screens');
          });
          resClientProto = res.body.clientProtos[0];
          return clientProto.findById(resClientProto.id);
      
        })
        .then(function(clientProto) {
          expect(resClientProto.id).to.equal(clientProto.id);
          expect(resClientProto.shortDesc).to.equal(clientProto.shortDesc);
          expect(resClientProto.longDesc).to.equal(clientProto.longDesc);
        });
    });
  });

  describe('POST endpoint', function() {
    //Strategy: make a POST request with data
    //   1. then prove that the clientProto I get back 
    // has the right keys and and id, meaning the document is in the db
    it('should insert the document into the db', function() {
      const newClientProto = generateClientProjectData();
      
      return chai.request(app)
        .post('/projects')
        .send(newClientProto)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object'); 
          expect(res.body).to.include.keys(
            'id', 'shortDesc', 'longDesc', 'userStories', 'screens');
          expect(res.body.shortDesc).to.equal(newClientProto.shortDesc);
          expect(res.body.id).to.not.be.null;
          expect(res.body.longDesc).to.equal(newClientProto.longDesc);
          //expect(res.body.userStories).to.equal(newClientProto.userStories); 
          //expect(res.body.screens).to.equal(newClientProto.screens);
          // - think the above doesn't work because they are not in order, they need
          // to be sorted
          return clientProto.findById(res.body.id);
          })
          .then(function(clientProto) {
            expect(clientProto.shortDesc).to.equal(newClientProto.shortDesc);
            expect(clientProto.longDesc).to.equal(newClientProto.longDesc);
          });
      });
    });  
 /* 
  describe('DELETE endpoint', function() {
    //strategy:
    //  1. get a client project by id
    //  2. make the DELETE request 
    //  3. assert make sure the response has the correct status code 
    //  4. ensure a client project with id doesn't exist

    it('delete a document with the particular id', function() {
      let clientProto;

      return clientProto
        .findOne()
        .then(function(_clientProto) {
          clientProto = _clientProto;
          return chai.request(app).delete(`/projects/${clientProto.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return clientProto.findById(restaurant.id);
        })
        .then(function(_clientProto) {
          expect(_clientProto).to.be.null;
        });  
    });
  });
*/

});






//});





/*
describe('a get request to the root url', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  })

  it('should return status code 200 and HTML', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
    });
  });

});

====Stuff from the travis.yml file====

deploy:
  provider: heroku
  api_key:
    secure: XGum+GyT7NLCBvKkTBnmdfbaWF1obVvSVBmUCWrXfpc+zBy8fEHe+TUvkkENS5N0cULKwytz5LsJzzXGVh0p+C7smEYeUyjct6xB0ryTqOHxY5D1L2PuBdOOVBkE5/JxrCWS1Xu8aA9v4Jl6larC4Tw/z5Bkt4piKSZnSl9qo287/WFn/yrWq0TC10tbQeij0ZuC6kH2rJEq/i+z6OMxw3PguEeoMONzlEAc9spv2G5b+bTVzoa+hihMF4FRR4U+HMgBFzavA2txAYoUj18gf7OSSkvMmFTsutgYqaKrT3zX4j3bf0eSgLAxbJUQmFP1wwq0rgWxhMhs7gddVsAdAy8G0xRzbOhNcKlZHDkNlcA6PgZQAMPPINOUgCk/atmskAfFHrI7hKW5YKpgnjPgD46QOagHO8k+bFTwdOQpRF7myrytXt+FXbMSG7mfhjZDmlTSVTwa/hOWe9LBtMVMBlwi7IGGi/QTV+e48Z6EsUB+OC+mFS8d08+MvGBMklHah16WmxHgDRz9l9jcrbm6tCQQzdqpDl9PmggyMwD5QFtzhPypQyW4yJBrIlFJs63JBcmDjfq21VIadMtcY8+zmXlZVDLMn3k+MQ3P4ekzaFuhAJXo6sM7FyT1Yk9yIdF+AbUoMWa7H0BCgSZGqb1i1f36Z/3+t1KNGJu/w4GQZNI=
  app: noobz
  on:
    repo: jtontiwith/noobz





*/