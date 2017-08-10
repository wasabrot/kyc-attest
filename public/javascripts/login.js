
//import { Connect } from 'uport-connect'
//let uport = new Connect('MyDApp')

const Connect = window.uportconnect.Connect
const SimpleSigner = window.uportconnect.SimpleSigner

const appName = 'cofundme'

//cleint side...

const connect = new Connect(appName, {
          clientId: '2oqTZr4TSu3gc6F9KtNs6A2EsY1zk8Lzefp',
          signer:  SimpleSigner('bc41ddd213a04a2d45ce689bc9bf07bc8c37006ede9e98ac7fd1284d2b889826'),
          network: 'rinkeby'})
const web3 = connect.getWeb3()


if (!document["web3"]) {
  log("no web3")
} else {
  log("web 3 installed")
}

function getUportId() {
  connect.requestCredentials().then((credentials) => {
    console.log(credentials)
    document.getElementById('userCredentials').innerHTML=JSON.stringify(credentials)
    console.log(credentials.address)
    //
    //web3.eth.getBalance('0x615c4c52ad5918a54e7843e67c311bd90fbe1119').then((res)=>console.log("balance"+res))
  })
}

function getUportCredentials() {
  connect.requestCredentials( {requested: ['name', 'phone', 'country'],
        notifications: true}).then((credentials) => {
    console.log(credentials)
    document.getElementById('userCredentials').innerHTML=JSON.stringify(credentials)
    console.log(credentials.address)
    let phone=credentials.phone
    let pushToken=credentials.pushToken
    let country=credentials.country
    console.log ('phone ${phone}')
    //
    //web3.eth.getBalance('0x615c4c52ad5918a54e7843e67c311bd90fbe1119').then((res)=>console.log("balance"+res))
  })
}

function push() {


}

function log(txt) {
   if (document.getElementById('statusDiv'))
    document.getElementById("statusDiv").innerHTML=txt;
  else
    console.log(txt)
}
