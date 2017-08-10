
var express = require('express');
var uport = require('uport');
var jsontokens = require('jsontokens')

var app = express();
app.use(express.static('public'))
app.use(express.static('node_modules'))


var signer = uport.SimpleSigner('bc41ddd213a04a2d45ce689bc9bf07bc8c37006ede9e98ac7fd1284d2b889826')


var credentials = new uport.Credentials({
  appName: 'cofundme',
  address: '2oqTZr4TSu3gc6F9KtNs6A2EsY1zk8Lzefp',
  signer: signer
  //networks: {'0x4': {'registry' : '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee', 'rpcUrl' : 'https://rinkeby.infura.io'}}
  // Note: we use Rinkeby by default, the above is the explicit format for selecting a network
})



app.get('/', function (req, res) {
    res.send("use overview.html")
})

app.get('/attest', function (req, res) {
  credentials.attest({
    sub: '2omkd7pypnRVmRvZdVKAWLkGknswVyxh56N',  // uport address of user   ws:
    exp: 1552046024213,
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

app.get('/onboarding', function (req, res) {
    console.log("onbarding")
    res.send('Are you a real person or a refrigerator? We need to verify your identity and creditials. Please install and register with the uport App first (see link)')

})




var server = app.listen(8081, function () {
  console.log("Tutorial app running...")
})


//
/*
const uportApp = new Connect('cofundme', {
  clientId: '2oqTZr4TSu3gc6F9KtNs6A2EsY1zk8Lzefp',
  signer: uport.SimpleSigner('bc41ddd213a04a2d45ce689bc9bf07bc8c37006ede9e98ac7fd1284d2b889826')
})

// Request credentials to login
uportApp.requestCredentials({
  requested: ['name', 'phone', 'country'],
  notifications: true // We want this if we want to recieve credentials
})
.then((credentials) => {
    console.log(" login from "+credentials)
})
// Attest specific credentials
uportApp.attestCredentials({
  sub: THE_RECEIVING_UPORT_ADDRESS,
  claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
  },
  exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})
*/

app.get('/test', function (req, res) {
  res.send("hello world");
})
