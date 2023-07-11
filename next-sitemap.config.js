module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000', // change to prod url when deploying
  generateRobotsTxt: true, // (optional)
  // ...other options
  sitemapSize: 100,
  changefreq: 'daily',
  priority: 0.8,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) =>
      `#robots.txt for http://localhost:3000 updated ${new Date().toISOString()}  \n\n${robotsTxt}`,
    policies: [
      {
        userAgent: 'Googlebot',
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: [
          '/admin*',
          '/cart*',
          '/checkout*',
          '/search*',
          '/my-account*',
          '/user*',
          '/util*',
          '/storefront/email/render/*',
          '/print-return*',
          '/guest-checkout*',
          '/print-order*',
          '/nomore*',
          '/registrations-sign-in*',
          '/home-temp*',
          '/test-pricelist*',
        ],
      },
      {
        userAgent: 'AhrefsSiteAudit',
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        disallow: '/',
      },
      {
        userAgent: '*',
        disallow: '/*',
      },
      {
        userAgent: '*',
        crawlDelay: 5,
      },
    ],
  },
}
