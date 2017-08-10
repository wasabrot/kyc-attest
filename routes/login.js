
var express = require('express');
var uport = require('uport');
var jsontokens = require('jsontokens')
var router = express.Router()


if (!process.env.COFUNDME_APPNAME || !process.env.COFUNDME_PRK|| !process.env.COFUNDME_ADDRESS) {
  console.log('Error: Specify COFUNDME_APPNAME, COFUNDME_PRK and COFUNDME_ADDRESS in environment')
  process.exit(1)
}

var signer = uport.SimpleSigner(process.env.COFUNDME_PRK)

var credentials = new uport.Credentials({
  appName: process.env.COFONDME_APPNAME,
  address: process.env.COFUNDME_ADDRESS,
  signer: signer
  //networks: {'0x4': {'registry' : '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee', 'rpcUrl' : 'https://rinkeby.infura.io'}}
  // Note: we use Rinkeby by default, the above is the explicit format for selecting a network
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/attest', function (req, res,next) {
  credentials.attest({
    sub: '2omkd7pypnRVmRvZdVKAWLkGknswVyxh56N',  // uport address of user   ws:
    exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now,
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

router.get('/onboarding', function (req, res,next) {
    console.log("onbarding")
    res.send('Are you a real person or a refrigerator? We need to verify your identity and creditials. Please install and register with the uport App first (see link)')

})


router.get('/healthcheck', function (req, res,next) {
  res.send("OK");
})

module.exports = router
