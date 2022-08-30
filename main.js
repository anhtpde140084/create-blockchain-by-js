const SHA256 = require('crypto-js/sha256');

class Block {

  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
    this.nonce = 0;
  }

  // gen sha token
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  minBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1)
      .join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: ", this.hash);
  }

}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2022", "Genesis Block", "0");
  }

  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatesBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.minBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  // check mắt xích có đúng không
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let anhtpCoin = new BlockChain();


// console.log('Is blockchain valid?', anhtpCoin.isChainValid());

// // when change something in block, chain is invalid
// anhtpCoin.chain[1].data = { amount: 100 };

// console.log('Is blockchain valid?', anhtpCoin.isChainValid());
// console.log(JSON.stringify(anhtpCoin, null, 4));

console.log('Mining block 1...');
anhtpCoin.addBlock(new Block(1, "10/07/2022", { amount: 4 }));

console.log('Mining block 1...');
anhtpCoin.addBlock(new Block(2, "12/07/2022", { amount: 10 }));