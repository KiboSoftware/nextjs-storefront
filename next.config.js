/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'd1slj7rdbjyb5l.cloudfront.net',
      'cdn-tp1.mozu.com',
      'cdn-tp2.mozu.com',
      'cdn-tp3.mozu.com',
      'cdn-tp4.mozu.com',
      'cdn-sb.mozu.com',
      'encrypted-tbn0.gstatic.com',
    ],
  },
  publicRuntimeConfig: {
    colorAttributeFQN: 'Tenant~Color',
    sizeAttributeFQN: 'Tenant~Size',
    paymentTypes: [
      {
        id: 'creditcard',
        name: 'Credit / Debit Card',
      },
    ],
    countries: ['US', 'AT', 'DE', 'NL'],
    debounceTimeout: '1000',
  },
  serverRuntimeConfig: {
    revalidate: 60,
    pageSize: 100,
  },
}
