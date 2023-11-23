const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const Blockchain = require("./blockchain");
const PubSub = require("./publishsubscribe");
const Refresh_CN = require("./config")

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

let LCG=[];
let HCG=[];

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

 
  if(blockchain.blocksmined <= Refresh_CN){
    blockchain.addBlock({ data });
    blockchain.blocksmined = blockchain.blocksmined+1;
    pubsub.broadcastChain();
    res.redirect("/api/blocks");
  }
  else{
    // synRoles();
    synChains();
  }
  
 
});

const synRoles = () => {
  blockchain.blocksmined = 0;
  let totalnodes = LCG.length;

  for(let i=0;i<totalnodes/3;i++){
    const rndInt = Math.floor(Math.random() * 6) + 1;
    HCG[rndInt] = true;
  }

  HCG.forEach(element => {
    if(!element){
      element = true;
    }
  });
}

const synChains = () => {
 

  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, reposnse, body) => {
      if (!error && reposnse.statusCode === 200) {
        const rootChain = JSON.parse(body);
        console.log("Replace chain on sync with", rootChain);
        blockchain.replaceChain(rootChain);
      }
    }
  );
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening to PORT:${PORT}`);
  synChains();
  let servername = "http://localhost:"+PORT;

  LCG.push({[servername] :false});
  HCG.push({[servername] :false});

  console.log(LCG)
});
