// next-logger.config.js
const pino = require('pino')

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file', // 'pino/file','pino-pretty',
      options: { destination: process.stdout.fd, colorize: false },
    },
  ],
})

const logger = pino(
  {
    level: 'info', // Change this to desired log level
    pretty: true, // Enable human-readable logs in development
  },
  transport
)

module.exports = logger
