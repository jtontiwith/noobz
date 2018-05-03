const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);
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

*/