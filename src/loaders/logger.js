const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('../config');
const { printf } = winston.format;

const localFormat = printf(info => {
  if (info.data) {
    return `${info.level}: ${info.message} ${JSON.stringify(info.data)}`;
  }
  return `${info.level}: ${info.message}`;
});

const transports = [];
if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console({
    format: winston.format.combine(winston.format.cli(), winston.format.splat(), localFormat),
  }));
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat(), localFormat),
    }),
    new (winston.transports.DailyRotateFile)({
      filename: './logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d',
      formatter: options => ({
        timestamp: options.timestamp(),
        message: options.message ? options.message : '',
        label: options.label,
        level: options.label,
        data: options.data
      })
    })
  );
}

const myFormat = printf(info => {
  return JSON.stringify({
    timestamp: info.timestamp,
    level: info.level,
    message: info.message,
    data: info.data,
    label: info.label
  });
});

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    myFormat
  ),
  transports,
});

module.exports = LoggerInstance;
