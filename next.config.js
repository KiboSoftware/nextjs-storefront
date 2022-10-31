/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const LOCATION_COOKIE = 'kibo_purchase_location'
const DEFAULT_WISHLIST_NAME = 'default-wishlist'

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
      'images.ctfassets.net',
      'cdn.media.amplience.net',
    ],
  },
  publicRuntimeConfig: {
    colorAttributeFQN: 'Tenant~Color',
    sizeAttributeFQN: 'Tenant~Size',
    paymentTypes: [
      {
        id: 'CreditCard',
        name: 'Credit / Debit Card',
      },
    ],
    countries: ['US', 'AT', 'DE', 'NL'],
    debounceTimeout: '1000',
    productListing: {
      sortOptions: [
        { value: 'Best Match', id: '' },
        { value: 'Price: Low to High', id: 'price asc' },
        { value: 'Price: High to Low', id: 'price desc' },
        { value: 'Latest', id: 'createDate desc' },
        { value: 'Oldest', id: 'createDate asc' },
      ],
      pageSize: 16,
    },
    orderHistory: {
      startIndex: 0,
      pageSize: 20,
    },
    ratingAttrFQN: `tenant~rating`,
    userCookieKey: process.env.KIBO_USER_COOKIE_KEY || 'kibo_at',
    maxCookieAge: 5 * 24 * 60 * 60 * 1000, //5 days
    fulfillmentOptions: [
      {
        value: 'DirectShip',
        code: 'DS',
        name: 'Direct Ship',
        label: 'Ship to Home',
        details: 'Available to Ship',
        unavailableDetails: 'Unavailable to Ship',
        isRequired: false,
        shortName: 'Ship',
      },
      {
        value: 'InStorePickup',
        code: 'SP',
        name: 'In Store Pickup',
        label: 'Pickup in Store',
        details: 'Available at',
        unavailableDetails: 'Unavailable at',
        isRequired: false,
        shortName: 'Pickup',
      },
    ],
    storeLocator: {
      defaultRange: '160934',
    },
    storeLocationCookie: LOCATION_COOKIE,
    defaultWishlistName: DEFAULT_WISHLIST_NAME,
    pciHost: process.env.KIBO_PCI_HOST,
    apiHost: process.env.KIBO_API_HOST,

    amplience: {
      hubName: 'kibo',
      homePageContentUrl: 'https://kibo-example.com/kibo-home-page',
      productDetailsPageContentUrl: 'https://kibo-examples.com/pdp-products',
      requestParams: {
        format: 'inlined',
        depth: 'all',
      },
      homePageContentTypes: {
        smallBanner: 'Kibo Simple Banner',
        heroCarousel: 'Kibo Hero Carousel Demo',
        homePageProducts: 'Home Page Products',
        largePromoBlocks: 'Large promo blocks',
        smallPromoBlocks: 'Small promo blocks',
      },
    },
  },
  serverRuntimeConfig: {
    revalidate: process.env.GLOBAL_PAGE_REVALIDATE || 30,
    pageSize: 100,
    cacheKey: 'categoryTree',
    cacheTimeOut: 10000,
  },
}
