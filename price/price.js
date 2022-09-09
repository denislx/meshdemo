const fs = require('fs');
const oracledb = require('oracledb');
const http = require("http");
const express = require('express');
const app = express();
const path = require('path');

oracledb.initOracleClient({ libDir: '/instantclient_21_7', configDir: '/Wallet/' });
app.use('/', express.static(path.join(__dirname, 'html/admin')));

var free = {};
free.options = {};
free.options.public = 1;
free.options.private = 0;
free.options.permissions = 1;
free.options.sharing = 0;
free.options.unlimited = 0;
free.options.extrasec = 0;

var pro = {};
pro.options = {};
pro.options.public = 1;
pro.options.private = 1;
pro.options.permissions = 1;
pro.options.sharing = 1;
pro.options.unlimited = 1;
pro.options.extrasec = 0;

var enterprise = {};
enterprise.options = {};
enterprise.options.public = 1;
enterprise.options.private = 1;
enterprise.options.permissions = 1;
enterprise.options.sharing = 1;
enterprise.options.unlimited = 1;
enterprise.options.extrasec = 1;

app.get('/free', (req, res) => {
  queryPrice('FREE') .then((json) => {
     console.log(json);
     res.send(JSON.stringify(json));
  });
});

app.put('/free/:json', (req, res) => {
  var json = JSON.parse(req.params['json']);
  updatePrice('FREE', json);
});

app.get('/pro', (req, res) => {
  queryPrice('PRO') .then((json) => {
     console.log(json);
     res.send(JSON.stringify(json));
  });
});

app.put('/pro/:json', (req, res) => {
  var json = JSON.parse(req.params['json']);
  updatePrice('PRO', json);
});

app.get('/enterprise', (req, res) => {
  queryPrice('ENTERPRISE') .then((json) => {
     console.log(json);
     res.send(JSON.stringify(json));
  });
});

app.put('/enterprise/:json', (req, res) => {
  var json = JSON.parse(req.params['json']);
  updatePrice('ENTERPRISE', json);
});

async function init() {
  try {
    // Create a connection pool which will later be accessed via the
    // pool cache as the 'default' pool.
    await oracledb.createPool({
      user: 'priceadmin',
      password: 'atp_pwd',
      connectString: 'oracledb_tp'
    });
    console.log('Connection pool started succesfully'); 
  } catch (err) {
    console.error('init() error: ' + err.message);
  }
}

async function queryPrice(tier) {
  let connection;
  try {
    // Get a connection from the default pool
    connection = await oracledb.getConnection();
    const sql = `SELECT PRICE_MO, STORAGE, USERS, SUPPORT FROM PRICE WHERE TIER = :tier`;
    const binds = [tier];
    const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    const result = await connection.execute(sql, binds, options);
    const row = result.rows[0];
    const tierOptions = await getOptions(tier);
    var json = { 'price' : {'monthly' : JSON.stringify(row.PRICE_MO), 'storage' : JSON.stringify(row.STORAGE), 'users' : JSON.stringify(row.USERS), 'support' : JSON.stringify(row.SUPPORT).replace(/['"]+/g, '') }, options : tierOptions };
    return json;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        // Put the connection back in the pool
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function updatePrice(tier, json) {
  let connection;
  try {
    // Get a connection from the default pool
    connection = await oracledb.getConnection();
    const sql = `UPDATE PRICE SET PRICE_MO = :price, STORAGE = :storage, USERS = :users, SUPPORT = :support WHERE TIER = :tier`;
    const binds = [json.price.monthly, json.price.storage, json.price.users, json.price.support, tier];
    const result = await connection.execute(sql, binds, { autoCommit: true });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        // Put the connection back in the pool
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Tier options are "static" in this example, this is to set them for json output
async function getOptions(tier)
{
  if(tier == 'FREE') return free.options;
  else if(tier == 'PRO') return pro.options;
  else return enterprise.options;
}

async function closePoolAndExit() {
  console.log('\nTerminating');
  try {
    // Get the pool from the pool cache and close it when no
    // connections are in use, or force it closed after 10 seconds.
    // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
    // This setting should not be needed if both Oracle Client and Oracle
    // Database are 19c (or later).
    await oracledb.getPool().close(10);
    console.log('Pool closed');
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

process
  .once('SIGTERM', closePoolAndExit)
  .once('SIGINT',  closePoolAndExit);

init();
app.listen(3010);