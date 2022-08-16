const express = require('express');
const app = express();
const path = require('path');

var free = {};
free.price = {};
free.options = {};
free.price.monthly = 0;
free.price.users = 10;
free.price.storage = 2;
free.price.support = 'Email';
free.options.public = 1;
free.options.private = 0;
free.options.permissions = 1;
free.options.sharing = 0;
free.options.unlimited = 0;
free.options.extrasec = 0;

var pro = {};
pro.price = {};
pro.options = {};
pro.price.monthly = 15;
pro.price.users = 10;
pro.price.storage = 10;
pro.price.support = 'Priority email';
pro.options.public = 1;
pro.options.private = 1;
pro.options.permissions = 1;
pro.options.sharing = 1;
pro.options.unlimited = 1;
pro.options.extrasec = 0;

var enterprise = {};
enterprise.options = {};
enterprise.price = {};
enterprise.price.monthly = 29;
enterprise.price.users = 30;
enterprise.price.storage = 15;
enterprise.price.support = 'Phone and email';
enterprise.options.public = 1;
enterprise.options.private = 1;
enterprise.options.permissions = 1;
enterprise.options.sharing = 1;
enterprise.options.unlimited = 1;
enterprise.options.extrasec = 1;

app.get('/free', (req, res) => {
  res.send(JSON.stringify(free));
});

app.put('/free/:json', (req, res) => {
  var data = JSON.parse(req.params['json']);
  free = data;
  console.log(free);
});

app.get('/pro', (req, res) => {
  res.send(JSON.stringify(pro));
});

app.put('/pro/:json', (req, res) => {
  var data = JSON.parse(req.params['json']);
  pro = data;
  console.log(pro);
});

app.get('/enterprise', (req, res) => {
  res.send(JSON.stringify(enterprise));
});

app.put('/enterprise/:json', (req, res) => {
  var data = JSON.parse(req.params['json']);
  enterprise = data;
  console.log(enterprise);
});

app.use('/', express.static(path.join(__dirname, 'html/admin')));

app.listen(3010);

