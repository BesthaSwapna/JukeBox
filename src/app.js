// Load this package first because it will load environment variables

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const config = require('./config');
const initLoader = require('./loaders');
const Logger = require('./loaders/logger');
async function startServer() {
  const app = express();

  app.use(express.static('public'));
  app.use(express.static('files'));
  app.use('/', express.static('public'));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  // app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 's3cr3t',
  //     resave: true,
  //     saveUninitialized: true,
  //     cookie: { maxAge: 300000 },
  //   }),
  // );


  require('custom-env').env()

  await initLoader({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.log('error', err);
      process.exit(1);
      return;
    }
    Logger.log(
      'info',
      `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `,
    );
  });
}

startServer().catch(e => {
  console.log(e);
  Logger.log('error', '', e);
});
