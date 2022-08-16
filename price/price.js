const express = require('express');
const app = express();
const path = require('path');

app.get('/free', (req, res) => {
  var resp = {};
  resp.price = {};
  resp.options = {};
  resp.price.monthly = 0;
  resp.price.users = 10;
  resp.price.storage = 2;
  resp.price.support = 'Email';
  resp.options.public = 1;
  resp.options.private = 0;
  resp.options.permissions = 1;
  resp.options.sharing = 0;
  resp.options.unlimited = 0;
  resp.options.extrasec = 0;
  res.send(JSON.stringify(resp));
});

app.get('/pro', (req, res) => {
  var resp = {};
  resp.price = {};
  resp.options = {};
  resp.price.monthly = 15;
  resp.price.users = 10;
  resp.price.storage = 10;
  resp.price.support = 'Priority email';
  resp.options.public = 1;
  resp.options.private = 1;
  resp.options.permissions = 1;
  resp.options.sharing = 1;
  resp.options.unlimited = 1;
  resp.options.extrasec = 0;
  res.send(JSON.stringify(resp));
});

app.get('/enterprise', (req, res) => {
  var resp = {};
  resp.options = {};
  resp.price = {};
  resp.price.monthly = 29;
  resp.price.users = 30;
  resp.price.storage = 15;
  resp.price.support = 'Phone and email';
  resp.options.public = 1;
  resp.options.private = 1;
  resp.options.permissions = 1;
  resp.options.sharing = 1;
  resp.options.unlimited = 1;
  resp.options.extrasec = 1;
  res.send(JSON.stringify(resp));
});

app.use('/', express.static(path.join(__dirname, 'html/admin')));

app.listen(3010);

