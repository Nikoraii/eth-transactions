const express = require('express');
const app = express();
const moment = require('moment');
const EthDater = require('ethereum-block-by-date');
const Web3 = require('web3');
const bodyparse = require('body-parser');

// API
const web3 = new Web3('https://mainnet.infura.io/v3/bf19050627b84a0381287dc7a60038f9');

const dater = new EthDater(
  web3
);

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/transactions', async (req, res) => {
  // Get user data
  let walletAddressSpace = req.query.wallet;
  const walletAddress = walletAddressSpace.trim();
  const startingBlock = req.query.block;

  // Execute
  try {

    // Fetch past transactions from the specified starting block
    const pastTransactions = await web3.eth.getPastLogs({
      address: walletAddress,
      fromBlock: startingBlock,
      toBlock: 'latest',
    }).then(async (pastLogs) => {
      return Promise.all(pastLogs.map(async (log) => {

        // Get each transaction
        const tx = await web3.eth.getTransaction(log.transactionHash);

        // Convert value from wei to ETH
        tx.valueEth = web3.utils.fromWei(tx.value, 'ether');
        return tx;
      }));
    });

    const uniqueTransactions = removeDuplicates(pastTransactions);

    // Remove duplicates
    function removeDuplicates(transactions) {
      const uniqueTransactions = [];
      const transactionHashes = [];

      transactions.forEach((tx) => {
        if (!transactionHashes.includes(tx.hash)) {
          if (tx.from.toLowerCase() == walletAddress || tx.to.toLowerCase() == walletAddress) {
            transactionHashes.push(tx.hash);
            uniqueTransactions.push(tx);
          }
        }
      });

      return uniqueTransactions;
    }
    // Return data in JSON format
    res.json(uniqueTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get('/balance', async (req, res) => {
  // Get user data
  const addressSpace = req.query.address;
  const address = addressSpace.trim();
  const userDate = moment(req.query.date);

  // Convert time
  const momentDate = moment.utc(userDate, 'YYYY-MM-DD');

  const utcDataString = momentDate.format('YYYY-MM-DD HH:mm:ss');

  // Execute
  try {
    // Get block by date
    const block = await dater.getDate(utcDataString);

    // Get balance by block
    const balance = await web3.eth.getBalance(address, block.block);

    // Convert value from wei to ETH
    const balanceEth = web3.utils.fromWei(balance, 'ether');

    // Return data in JSON format
    res.json(balanceEth);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.get('/tokens', async (req, res) => {
  // Get user data
  const addressSpace = req.query.address;
  const tokenAddressSpace = req.query.token;

  // Convert user data
  const token = tokenAddressSpace.trim();
  const address = addressSpace.trim();
  const userDate = moment(req.query.date);

  const momentDate = moment.utc(userDate, 'YYYY-MM-DD');

  const utcDataString = momentDate.format('YYYY-MM-DD HH:mm:ss');

  const back = 'Not finished...';
  res.json(back);
  // Continue here...
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});