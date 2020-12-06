const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3040,

  headless: process.env.HEADLESS === 'true',

  hostURL: process.env.HOST_URL,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || '1r2we1ewr213er12wr',

  /**
   * Database conf
   */
  database: {
    uname: 'root',
    pwd: '',
    host: 'localhost',
    dbname: 'jukebox',
    dialect: 'mysql'
  },

  // mongodb: process.env.DBUrl,
  /**
   * Used by winston logger
   */
  // creds: {
  //   uname: process.env.FEDEX_UNAME,
  //   pwd: process.env.FEDEX_PWD
  // },
  // flashCreds: {
  //   uname: process.env.FLASH_UNAME,
  //   pwd: process.env.FLASH_PWD
  // },
  api: {
    prefix: '/api',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
  cryptrSecret: process.env.CRYPTO_SECRET,

};

module.exports = config;
