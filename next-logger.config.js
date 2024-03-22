// // next-logger.config.js

const { createLogger, format, transports } = require('winston')

function esformatter(info) {
  const result = {
    message: info.message || '',
    err: info.err
      ? {
          message: info.err.message,
          stack: info.err.stack,
        }
      : undefined,
    level: info.level,
  }
  return { ...info, ...result }
}
const logger = createLogger({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(format(esformatter)(), format.json()),
      level: process.env.LOG_LEVEL || 'info',
    }),
  ],
})

module.exports = {
  logger,
}
