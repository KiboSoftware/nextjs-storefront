const path = require('path')
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localePath: path.resolve('./public/locales'),
  },
}
