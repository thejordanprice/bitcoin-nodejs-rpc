const express = require('express');
const path = require('path');
const bitcoinController = require('./bitcoinController');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/keys', bitcoinController.generateAndCheckKeys);

app.get('/address/:address', bitcoinController.getBalance);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
