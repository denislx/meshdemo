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
  res.send(JSON.stringify(free));
});

app.put('/free/:json', (req, res) => {
  var json = JSON.parse(req.params['json']);
  updatePrice('FREE', json);
});

app.get('/pro', (req, res) => {
  res.send(JSON.stringify(pro));
});

app.put('/pro/:json', (req, res) => {
  var json = JSON.parse(req.params['json']);
  updatePrice('PRO', json);
});

app.get('/enterprise', (req, res) => {
  res.send(JSON.stringify(enterprise));
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
      user: 'admin',
      password: 'atp_pwd',
      connectString: 'oracledb_tp'
      // edition: 'ORA$BASE', // used for Edition Based Redefintion
      // events: false, // whether to handle Oracle Database FAN and RLB events or support CQN
      // externalAuth: false, // whether connections should be established using External Authentication
      // homogeneous: true, // all connections in the pool have the same credentials
      // poolAlias: 'default', // set an alias to allow access to the pool via a name.
      // poolIncrement: 1, // only grow the pool by one connection at a time
      // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
      // poolMin: 0, // start with no connections; let the pool shrink completely
      // poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
      // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
      // queueMax: 500, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
      // queueTimeout: 60000, // terminate getConnection() calls queued for longer than 60000 milliseconds
      // sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
      // sodaMetaDataCache: false, // Set true to improve SODA collection access performance
      // stmtCacheSize: 30, // number of statements that are cached in the statement cache of each connection
      // enableStatistics: false // record pool usage for oracledb.getPool().getStatistics() and logStatistics()
    });
    console.log('Connection pool started');
    DDL();
    var res = await queryPrice('FREE');
    console.log(res);
    var res = await queryPrice('PRO');
    console.log(res);
    var res = await queryPrice('ENTERPRISE');
    console.log(res);
    console.log("=========================");  
    console.log(free);
    console.log(pro);
    console.log(enterprise);
      
  } catch (err) {
    console.error('init() error: ' + err.message);
  } //finally {
    //await closePoolAndExit();
    //}
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
    var json = { 'monthly' : JSON.stringify(row.PRICE_MO), 'storage' : JSON.stringify(row.STORAGE), 'users' : JSON.stringify(row.USERS), 'support' : JSON.stringify(row.SUPPORT).replace(/['"]+/g, '') };
    console.log("Query " + tier + ":");
    console.log(json);
    setPrice(tier, json);
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
    const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    const result = await connection.execute(sql, binds, options);
    console.log("Update " + tier + ":");
    console.log(result);
    setPrice(tier, json);
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

// Tier options are "static", just set the tier price
function setPrice(tier, json)
{
  if(tier == 'FREE') free.price = json;
  else if(tier == 'PRO') pro.price = json;
  else enterprise.price = json;
}

async function DDL() {
  let connection;
  try {
    // Get a connection from the default pool
    connection = await oracledb.getConnection();
    const sql1 = `CREATE TABLE PRICE (TIER VARCHAR2(100), PRICE_MO NUMBER(6,2), STORAGE NUMBER(4), USERS NUMBER(4), SUPPORT VARCHAR2(1000))`;
    var result = await connection.execute(sql1);
    console.log(result);
    const sql2 = `create unique index PRICE_TIER_IND on PRICE(TIER)`;
    result = await connection.execute(sql2);
    console.log(result);
    const sql3 = `INSERT INTO PRICE VALUES ('FREE', 0, 10, 2, 'Email support')`;
    result = await connection.execute(sql3,{},{ autoCommit: true });
    console.log(result);
    const sql4 = `INSERT INTO PRICE VALUES ('PRO', 15, 20, 10, 'Priority email support')`;
    result = await connection.execute(sql4,{},{ autoCommit: true });
    console.log(result);
    const sql5 = `INSERT INTO PRICE VALUES ('ENTERPRISE', 29, 30, 15, 'Phone and email support')`;
    result = await connection.execute(sql5,{},{ autoCommit: true });
    console.log(result);
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