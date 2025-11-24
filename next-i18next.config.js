const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeDetection: true,
  },
  localePath: path.resolve('./public/locales'),
  serializeConfig: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
