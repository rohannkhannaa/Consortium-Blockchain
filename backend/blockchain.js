const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    this.LCG = [];
    this.HCG = [];
    this.blocksmined = 0;
  }

  addBlock({ data }) {
    
    console.log(this.chain)
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data
    });
    this.chain.push(newBlock);

  }

  replaceCG(rootChain){
    console.log("Root LCG :" ,rootChain.LCG)

    console.log("Current LCG :" ,this.LCG)

    if (rootChain.LCG.length < this.LCG.length || rootChain.HCG.length < this.HCG.length) {
      console.error("new node added");

      // this.chain = rootChain.chain;
      // this.LCG = rootChain.LCG;
      // this.HCG = rootChain.HCG;
      // this.blocksmined = rootChain.blocksmined;
      return;
    }
    else{
      this.chain = rootChain.chain;
      this.LCG = rootChain.LCG;
      this.HCG = rootChain.HCG;
      this.blocksmined = rootChain.blocksmined;
    }
  }

  replaceChain(rootChain) {

    if (rootChain.chain.length <= this.chain.length) {
      this.replaceCG(rootChain)
      console.error("The incoming chain is not longer");
      return;
    }
    if (!Blockchain.isValidChain(rootChain.chain)) {
      console.error("The incoming chain is not valid");
      return;
    }

    this.chain = rootChain.chain;
    this.LCG = rootChain.LCG;
    this.HCG = rootChain.HCG;
    this.blocksmined = rootChain.blocksmined;

  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
      const lastDifficulty = chain[i - 1].difficulty;
      const realLastHash = chain[i - 1].hash;

      if (prevHash !== realLastHash) return false;

      const validatedHash = cryptoHash(
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data
      );
      if (hash !== validatedHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
