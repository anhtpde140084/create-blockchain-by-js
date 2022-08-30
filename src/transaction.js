const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('256ebe0c3cf356666523d3d3d39db1560ca6d223e04c4a2271dbe23c5a097d72');
const myWalletAdress = myKey.getPublic('hex');


let savjeeCoin = new Blockchain();

// I want to say that create a transaction from my wallet to some address wwith 10 coin
const tx1 = new Transaction(myWalletAdress, 'public key goes here', 10);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

// // create transaction

// savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
// savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Start the miner...');
savjeeCoin.minePendingTransaction(myWalletAdress);

console.log('\n Balance of anhTp is: ', savjeeCoin.getBalanceOfAddress(myWalletAdress));

// check is valid chain
// savjeeCoin.chain[1].transactions[0].amount = 1;

// console.log('\n Start the miner again...');
// savjeeCoin.minePendingTransaction('anhtp-address');

// console.log('\n Balance of anhTp is: ', savjeeCoin.getBalanceOfAddress('anhtp-address'));
