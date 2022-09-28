const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env.local') || path.resolve(__dirname, '../../.env'),
})

module.exports = {
  contentstack: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
  },
}
