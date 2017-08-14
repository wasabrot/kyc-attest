
var express = require('express');
var uport = require('uport');
var jsontokens = require('jsontokens')
var router = express.Router()


if (!process.env.ATTESTER_APPNAME || !process.env.ATTESTER_PRK|| !process.env.ATTESTER_ADDRESS) {
  console.log('Error: Specify ATTESTER_APPNAME, ATTESTER_PRK and ATTESTER_ADDRESS in environment')
  process.exit(1)
}

var signerSwissBank = uport.SimpleSigner(process.env.ATTESTER_PRK)

function log(msg){
	console.log(msg)
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var credentials = new uport.Credentials({
  appName: process.env.ATTESTER_APPNAME,
  address: process.env.ATTESTER_ADDRESS,
  signer: signerSwissBank
  //networks: {'0x4': {'registry' : '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee', 'rpcUrl' : 'https://rinkeby.infura.io'}}
  // Note: we use Rinkeby by default, the above is the explicit format for selecting a network
})
// Read and fill infos



router.get('/readData', function (req, res) {
	// callback urls: localhost
    credentials.createRequest({
    requested: ['name','phone','identity_no'],
    callbackUrl: 'https://8081-dot-2980640-dot-devshell.appspot.com/readDataCallback?random=345' // URL to send the response of the request to
  }).then(requestToken => {
    // send requestToken to browser
    //taken from demo.uport.me
    //me.uport:me?requestToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJyZXF1ZXN0ZWQiOlsibmFtZSIsInBob25lIiwiY291bnRyeSJdLCJwZXJtaXNzaW9ucyI6WyJub3RpZmljYXRpb25zIl0sImNhbGxiYWNrIjoiaHR0cHM6Ly9jaGFzcXVpLnVwb3J0Lm1lL2FwaS92MS90b3BpYy9UaWY0WEh5TGhlbURUc2c1IiwibmV0IjoiMHg0IiwidHlwZSI6InNoYXJlUmVxIiwiaXNzIjoiMm9lWHVmSEdEcFU1MWJmS0JzWkRkdTdKZTl3ZUozcjdzVkciLCJpYXQiOjE1MDIxNzg0ODk1ODV9.hh0pEmjgIKUc-JaK13KxftMwAJoMtOOjgHL3w1eGErq7Mq5XfXVGrjxSQen1ndNrJf8kkRSiJPXYRS8GHWmjTQ
    let uri="me.uport:me?requestToken="+requestToken
    var returnValue = {link:uri,requestToken:requestToken}
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(returnValue));
  })
})


router.get('/readDataCallback', function (req, res) {
  log("readDataCallback ")
})


router.get('/attest', function (req, res) {
  credentials.attest({
    sub: '2omkd7pypnRVmRvZdVKAWLkGknswVyxh56N',  // uport address of user   ws:
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now,,
    claim: {name : 'Walter Strametz', location:'CH'}
  }).then(function (att) {
    console.log(att)
    console.log(jsontokens.decodeToken(att))
    var uri = 'me.uport:add?attestations=' + att
    var qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    console.log(uri)
    res.send('check sombobodys name and location <img src=' + qrurl + '></img>');
  })
})


router.get('/healthcheck', function (req, res) {
  res.json(router.getHealthcheck());
})

router.getHealthcheck = () => {
  return {"OK":true,"app":"attest"};
}

module.exports = router
