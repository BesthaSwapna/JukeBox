const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const { errors, isCelebrate } = require('celebrate');
const morgan = require('morgan');
const { prefix } = require('./../config/index').api;
const Response = require('../utils/response');
const cpuUsage = require('../utils/memory-usage');

const router = require('../api');

exports.loadModules = ({ app }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    console.log('info', 'checking status', { status: 1 });
    Response.success(res, 'success');
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // HTTP request logger
  app.use(morgan('dev'));

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(methodOverride());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // handle errors from 'celebrate'
  app.use(errors());

  app.use('/screenshots', express.static(path.join(`${__dirname}/../../screenshots`)));
  app.use('/cpu-status', cpuUsage);

  // Load API routes
  router.loadRoutes(app, prefix);

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = 'Not Found';
    return res
      .status(err.status)
      .send({ status: false, statusCode: 404, message: err.message })
  });

  // / error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    /*
     * Handle Celebrate error so we can have our own response
     */
    if (isCelebrate(err)) {
      Response.fail(res, err.message, 400, undefined, err.details);
    }
    return next(err);
  });
  app.use((err, req, res) => {
    err.status = 500;
    err.message = 'Internal Server Error';
    return res
      .status(err.status)
      .send({ status: false, statusCode: 500, message: err.message })
  });
};
