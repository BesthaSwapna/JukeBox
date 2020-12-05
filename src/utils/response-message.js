const HttpStatus = require('http-status-codes');

module.exports = {
  tryAgain: {
    name: 'CustomError',
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'please try again',
    resCode: 1000,
  },
};
