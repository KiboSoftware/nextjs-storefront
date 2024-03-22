// // next-logger.config.js
// const pino = require('pino')

// const transport = pino.transport({
//   targets: [
//     {
//       target: 'pino-pretty',
//       options: { destination: process.stdout.fd, colorize: false },
//     },
//   ],
// })

// const logger = pino(
//   {
//     level: 'info', // Change this to desired log level
//     pretty: true, // Enable human-readable logs in development
//   },
//   transport
// )

// module.exports = logger

const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
})

module.exports = {
  logger,
}
