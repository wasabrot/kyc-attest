process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var supertest = require('supertest');
var chai = require('chai');
var should=require('should')
var attest = require('../routes/attest');
var app = require('../app')
expect = chai.expect;
request = supertest(app)



describe('ATTEST.js', function() {
  describe('healthcheck', function() {
    it('should return OK from GET call', (done) => {
      request.get('/healthcheck').expect(200)
      .end((err,res) => {
        res.should.be.json;
        done();
      })
    })
  });
});
