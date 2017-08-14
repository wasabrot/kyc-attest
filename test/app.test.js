process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var supertest=require('supertest')
var chai = require('chai');
var index = require('../routes/index');
var app=require("../app")
expect = chai.expect;
request = supertest(app)
var assert=require('assert')
should=chai.should;




//chai.use(chaiHttp)


describe('index.JS', function() {
  describe('attest', function() {

    it('should return OK', () => {
      let result=index.getHealthcheck();
      assert.equal(result.OK,true)
    })

    it('should return OK from GET call', (done) => {
      request.get('/healthcheck')
      .end((err,res) => {
        if (err) {
          done(err)
        } else {
          res.should.be.json;
          done();
        }
      })
    })
  });
});
