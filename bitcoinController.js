const bitcoinModel = require('./bitcoinModel');

async function generateAndCheckKeys(req, res) {
    try {
      const keys = await bitcoinModel.generateKeys();
      const address = keys.address;
      const privateKey = keys.privateKey;
      const balance = await bitcoinModel.getUnspentTransactions(address);
      res.render('keys', { address, privateKey, balance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function getBalance(req, res) {
  try {
    const address = req.params.address;
    const unspentList = await bitcoinModel.getUnspentTransactions(address);
    let balance = 0;
    unspentList.forEach((tx) => {
      balance += tx.amount;
    });
    res.render('balance', { address, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { generateAndCheckKeys, getBalance };
