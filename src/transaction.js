const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {

  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
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
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("01/01/2022", "Genesis Block", "0");
  }

  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransaction(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.minBlock(this.difficulty);

    console.log("Block successfuly mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
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

let savjeeCoin = new BlockChain();

// create transaction

savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Start the miner...');
savjeeCoin.minePendingTransaction('anhtp-address');

console.log('\n Balance of anhTp is: ', savjeeCoin.getBalanceOfAddress('anhtp-address'));

console.log('\n Start the miner again...');
savjeeCoin.minePendingTransaction('anhtp-address');

console.log('\n Balance of anhTp is: ', savjeeCoin.getBalanceOfAddress('anhtp-address'));
