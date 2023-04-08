const bitcoin = require('bitcoin-core');

const client = new bitcoin({
  host: 'localhost',
  port: 8332,
  username: 'username',
  password: 'password'
});

async function generateKeys() {
    try {
      const keyPair = await client.getNewAddress();
      return {
        address: keyPair,
        privateKey: await client.dumpPrivKey(keyPair)
      };
    } catch (error) {
      throw new Error(`An error occurred while generating new keys: ${error}`);
    }
  }

async function getUnspentTransactions(address) {
  try {
    const unspentList = await client.listUnspent(1, 9999999, [address]);
    return unspentList;
  } catch (error) {
    throw new Error(`An error occurred while retrieving unspent transactions for address ${address}: ${error}`);
  }
}

module.exports = { generateKeys, getUnspentTransactions };
