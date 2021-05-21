'use strict';

import {createPool} from './bkp.js';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'promise-mysql';

const app = express();
app.set('view engine', 'pug');
app.enable('trust proxy');

// Automatically parse request body as form data.
app.use(express.urlencoded({extended: false}));
// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

// Set Content-Type for all responses for these routes.
app.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

// Create a Winston logger that streams to Stackdriver Logging.
import winston from 'winston';
import LoggingWinston from '@google-cloud/logging-winston';

//const loggingWinston = LoggingWinston();
//const logger = winston.createLogger({
//  level: 'info',
//  transports: [new winston.transports.Console(), loggingWinston],
//});
/*
const createTcpPool = async config => {
  // Extract host and port from socket address
  const dbSocketAddr = '127.0.0.1:3306'
         console.log("Hell");
  // Establish a connection to the database
  return await mysql.createPool({
    user: 'root', // e.g. 'my-db-user'
    password: 'root', // e.g. 'my-db-password'
    database: 'banking',
    host: '127.0.0.1', //dbSocketAddr[0], // e.g. '127.0.0.1'
    port: '3306', //dbSocketAddr[1], // e.g. '3306'
    // ... Specify additional properties here.
    ...config,
  });
};

const createUnixSocketPool = async config => {
  const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

  // Establish a connection to the database
  return await mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    // Specify additional properties here.
    ...config,
  });
};
// [END cloud_sql_mysql_mysql_create_socket]

const createPool = async () => {
  const config = {
    // [START cloud_sql_mysql_mysql_limit]
    // 'connectionLimit' is the maximum number of connections the pool is allowed
    // to keep at once.
    connectionLimit: 5,
    // [END cloud_sql_mysql_mysql_limit]

    // [START cloud_sql_mysql_mysql_timeout]
    // 'connectTimeout' is the maximum number of milliseconds before a timeout
    // occurs during the initial connection to the database.
    connectTimeout: 10000, // 10 seconds
    // 'acquireTimeout' is the maximum number of milliseconds to wait when
    // checking out a connection from the pool before a timeout error occurs.
    acquireTimeout: 10000, // 10 seconds
    // 'waitForConnections' determines the pool's action when no connections are
    // free. If true, the request will queued and a connection will be presented
    // when ready. If false, the pool will call back with an error.
    waitForConnections: true, // Default: true
    // 'queueLimit' is the maximum number of requests for connections the pool
    // will queue at once before returning an error. If 0, there is no limit.
    queueLimit: 0, // Default: 0
    // [END cloud_sql_mysql_mysql_timeout]

    // [START cloud_sql_mysql_mysql_backoff]
    // The mysql module automatically uses exponential delays between failed
    // connection attempts.
    // [END cloud_sql_mysql_mysql_backoff]
  };
  console.log("process.env.DB_HOST")
  console.log(process.env.DB_HOST)

  //if (process.env.DB_HOST) {
    return await createTcpPool(config);
  //} else {
  //  return await createUnixSocketPool(config);
  //}
};
*/
const ensureSchema = async pool => {
  // Wait for tables to be created (if they don't already exist).
  console.log("Ensured that table 'votes' exists");
};

const createPoolAndEnsureSchema = async () =>
  await createPool()
    .then(async pool => {
      await ensureSchema(pool);
      return pool;
    })
    .catch(err => {
      throw err;
    });

// Set up a variable to hold our connection pool. It would be safe to
// initialize this right away, but we defer its instantiation to ease
// testing different configurations.
let pool;

app.use(async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPoolAndEnsureSchema();
    next();
  } catch (err) {
    return next(err);
  }
});

app.get('/', async (req, res) => {
  pool = pool || (await createPoolAndEnsureSchema());
  try {
    const tabsQuery = pool.query("SELECT * FROM banking.users;");
     //const tabsQuery = pool.query("select host from mysql.db;");
	let x = await tabsQuery;

	console.log("X=" + x);
	console.log("tabs="+tabsQuery);
    console.log(5);
res.json(x);
console.log(tabsQuery.count_1)
      //res.send(tabsQuery.count_1)
    //res.send("Working");
} catch (err) {
        console.error(err);
    res
      .status(500)
      .send(
        'Unable to load page. Please check the application logs for more details.'
      )
      .end();
  }
});

app.post('/', async (req, res) => {
  const timestamp = new Date();

const postObj=req.body
const firstName=postObj.firstName
const middleName=postObj.middleName
const lastName=postObj.lastName
const password=postObj.password
const email=postObj.email

  pool = pool || (await createPoolAndEnsureSchema());
  try {
    const stmt = 'INSERT INTO users (firstName,middleName,lastName,password) VALUES (?,?,?,?)';
    // Pool.query automatically checks out, uses, and releases a connection
    // back into the pool, ensuring it is always returned successfully.
    await pool.query(stmt,[firstName,middleName,lastName,password,email]);
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    logger.error(err);
    return res
      .status(500)
      .send(
        'Unable to successfully cast vote! Please check the application logs for more details.'
      )
      .end();
    // [END_EXCLUDE]
  }
  // [END cloud_sql_mysql_mysql_connection]

  res.status(200).send('Successfully inserted records').end();
});


const PORT = process.env.PORT || 8089;
export const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

process.on('unhandledRejection', err => {
  console.error(err);
  throw err;
});

//module.exports = server;
