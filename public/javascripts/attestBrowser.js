
//import { Connect } from 'uport-connect'
//let uport = new Connect('MyDApp')

const Connect = window.uportconnect.Connect
const SimpleSigner = window.uportconnect.SimpleSigner

const appName = 'Swiss Bank'
const connect = new Connect(appName, {
          network: 'rinkeby'})
const web3 = connect.getWeb3()


if (!document["web3"]) {
  log("no web3")
} else {
  log("web 3 installed")
}

function readData() {
    // create a Promise for the requestCredentials
    $.ajax({
      url: "http://localhost:8081/readData"
    }).done(function(data) { // data: {link:uri,requestToken:requestToken}
      alert("lkjfd"+data.link)
      $('#qrHref').attr('href',data.link);
      var qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + data.link
      $('#qrImage').attr('src',qrurl);
      alert("sss"+$('#qrImage').src)
    });
}


function attestData( uportId) {
  connect.attestCredentials( {
        claim: 'Strametz',country:'CH'}
        ).then((credentials) => {
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


function log(txt) {
   if (document.getElementById('statusDiv'))
    document.getElementById("statusDiv").innerHTML=txt;
  else
    console.log(txt)
}
