const bodyParser = require("body-parser");
const express = require("express");
const request = require("./await-request");
const Blockchain = require("./blockchain");
const PubSub = require("./publishsubscribe");
const config = require("./config")

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockchain);
});


app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  
  let servername = "http://localhost:"+listener.address().port;
  console.log("------------------------------------------- Mininig -------------------------------------------------")
  
  blockchain.HCG.forEach(element => {
    if(Object.keys(element)[0] == servername && element[servername]){
      if(blockchain.blocksmined <= config.Refresh_CN){
        blockchain.addBlock({ data });
        blockchain.blocksmined = blockchain.blocksmined+1;
        pubsub.broadcastChain();
        res.redirect("/api/blocks");
      }
      else{
        synRoles();
        synChains();
        redirectReqToHCG(data)
      }
    }
    else{
      redirectReqToHCG(data)
    }
  });
  
  async function redirectReqToHCG(data){
    let serverToRedirect = Object.keys(blockchain.HCG[0])[0];

    try {
      const result = await request({ url: `${serverToRedirect}/api/mine`, method: 'POST', body : {"data":data} })
      
      console.log(result)
      if (true) {
        const rootChain = JSON.parse(result);
        console.log("Replace chain on sync with", rootChain);

        blockchain.replaceChain(rootChain);
        console.log(" --------------------Completed chain replacement------------------------------")
      }
  }
  catch (err) {
      console.error(err)
  }
  }

//   blockchain.HCG.forEach((arr)=>{

//     if (arr.first=="def"){
//       console.log(arr.badge);
//     }
//   });
//  if(current.){
  
//  }

 
  
 
});

const synRoles = () => {
  blockchain.blocksmined = 0;

  let count = 0
  blockchain.HCG.forEach(element => {
    if(Math.floor(Math.random() * 6)>=3){
      element[Object.keys(element)[0]] = false;
      blockchain.LCG[Object.keys(blockchain.LCG)[0]] = true;
      count++;
    }
    else{
      element[Object.keys(element)[0]] = true;
      blockchain.LCG[Object.keys(blockchain.LCG)[0]] = false;
      count++;
    }
  });

}

 async function synChains () {

    try {
        const result = await request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` })
        console.log(result)
        if (true) {
          const rootChain = JSON.parse(result);
          console.log("Replace chain on sync with", rootChain);
  
          blockchain.replaceChain(rootChain);
          console.log(" --------------------Completed chain replacement------------------------------")
        }
    }
    catch (err) {
        console.error(err)
    }

  console.log(" --------------------Completed chain sync------------------------------")


};

let PEER_PORT=null;

// if (process.env.GENERATE_PEER_PORT === "true") {
//   PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
// }
const PORT = PEER_PORT || DEFAULT_PORT;
PEER_PORT = PORT
let listener = app.listen(PORT, async () => {
  await settingServer(PORT)
})
.on('error', async function(err) { 
  if(err.code == 'EADDRINUSE'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
  }
  await settingServer(PEER_PORT)
  console.log("Error occurred---------------------------------",err.code)
});



async function settingServer(PEER_PORT){
  console.log(`listening to PORT:${PEER_PORT}`);
  
  let servername = "http://localhost:"+PEER_PORT;

  console.log("1. --------------------------------------------------")
  await synChains();
  console.log("2. --------------------------------------------------")

  
  console.log(blockchain)

  let count1 = 0;
  blockchain.HCG.forEach(element => {
    if(element[Object.keys(element)[0]] == true){
      count1++;
    }
  });

  if(count1 <=blockchain.HCG.length/3){
    blockchain.LCG.push({[servername] :false});
    blockchain.HCG.push({[servername] :true});
  }
  else{
    blockchain.LCG.push({[servername] :true});
    blockchain.HCG.push({[servername] :false});
  }
  
  // pubsub.broadcastChain();

  console.log("3. --------------------------------------------------")

  console.log(blockchain)
  await synChains();

  console.log(blockchain.LCG)
}
;
