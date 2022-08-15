const express = require('express')
const app = express()

app.get('/free', (req, res) => {
  var resp = {};
  resp.price = {};
  resp.price.monthly = 0;
  res.send(JSON.stringify(resp));
});

app.get('/pro', (req, res) => {
  var resp = {};
  resp.price = {};
  resp.price.monthly = 15;
  res.send(JSON.stringify(resp));
});

app.get('/enterprise', (req, res) => {
  var resp = {};
  resp.price = {};
  resp.price.monthly = 29;
  res.send(JSON.stringify(resp));
});

const path = require('path')
app.use('/', express.static(path.join(__dirname, 'html/pricing')))

app.listen(3000);

