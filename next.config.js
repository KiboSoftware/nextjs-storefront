/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const LOCATION_COOKIE = 'kibo_purchase_location'
const DEFAULT_WISHLIST_NAME = 'default-wishlist'

module.exports = {
  reactStrictMode: false,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
    emotion: true,
  },
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
      'cdn.builder.io',
      'cdn-sb.euw1.kibocommerce.com',
    ],
    deviceSizes: [
      100, 240, 340, 380, 400, 450, 500, 550, 600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
  },
  publicRuntimeConfig: {
    currentUrl: process.env.CURRENT_DOMAIN,
    metaData: {
      siteTitle: 'Kibo Commerce',
      defaultTitle: 'Storefront',
      defaultDescription: 'Kibo Commerce Storefront',
    },
    recaptcha: {
      reCaptchaKey: process.env.RECAPTCHA_KEY,
      reCaptchaSecret: process.env.RECAPTCHA_SECRET,
      reCaptchaThreshold: process.env.RECAPTCHA_THRESHOLD,
    },
    allowInvalidAddresses: true,
    customerAddressesPageSize: 50,
    shippingAddressPageSize: 5,
    billingAddressPageSize: 5,
    paymentMethodPageSize: 5,
    b2bProductSearchPageSize: 16,
    badgeAttributeFQN: 'Tenant~badge',
    occasionAttributeFQN: 'Tenant~occasion',
    colorAttributeFQN: 'Tenant~Color',
    sizeAttributeFQN: 'Tenant~Size',
    paymentTypes: [
      {
        id: 'PurchaseOrder',
        name: 'Purchase Order',
      },
      {
        id: 'CreditCard',
        name: 'Credit / Debit Card',
      },
    ],
    countries: ['US', 'AT', 'DE', 'NL', 'CA'],
    debounceTimeout: '1000',
    productListing: {
      sortOptions: [
        { value: 'Best Match', id: '' },
        { value: 'Price: Low to High', id: 'price asc' },
        { value: 'Price: High to Low', id: 'price desc' },
        { value: 'Latest', id: 'createDate desc' },
        { value: 'Oldest', id: 'createDate asc' },
      ],
      // For Infinite Scroll use this.
      pageSize: 16,
      // For Pagination use this.
      // pageSize: [15, 30, 50],
    },
    B2BQuotes: {
      sortOptions: [
        { value: 'Expiry Date Asc', id: 'expirationDate asc' },
        { value: 'Expiry Date Desc', id: 'expirationDate desc' },
        { value: 'Quote number: Low-High', id: 'number asc' },
        { value: 'Quote number: High-Low', id: 'number desc' },
      ],
      pageSize: 5,
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
    isMultiShipEnabled: false,
    shipOptions: [
      {
        value: 'ShipToHome',
        code: 'STH',
        name: 'Ship to Home',
        label: 'Ship to Home',
        shortName: 'SingleShip',
      },
      {
        value: 'ShipToMultiAddress',
        code: 'STMA',
        name: 'Ship to more than one address',
        label: 'Ship to more than one address',
        shortName: 'MultiShip',
      },
    ],
    isSubscriptionEnabled: true,
    b2bUserListing: {
      startIndex: 0,
      pageSize: 5,
      defaultFilter: 'isRemoved eq false',
      defaultStartIndex: 0,
      defaultPageSize: 5,
      defaultPage: 1,
    },
    b2bList: {
      startIndex: 0,
      pageSize: 5,
      sortBy: 'createDate desc',
      filter: '',
    },
    b2bUserRoles: [
      { roleName: 'Admin', roleId: 1 },
      { roleName: 'Purchaser', roleId: 2 },
      { roleName: 'Nonpurchaser', roleId: 3 },
    ],
    userFormRadioOptions: [
      {
        label: 'Admin',
        name: 'role',
        value: 'Admin',
      },
      {
        label: 'Purchaser',
        name: 'role',
        value: 'Purchaser',
      },
      {
        label: 'Non Purchaser',
        name: 'role',
        value: 'Nonpurchaser',
      },
    ],
  },
  serverRuntimeConfig: {
    currentUrl: process.env.CURRENT_DOMAIN,
    revalidate: process.env.GLOBAL_PAGE_REVALIDATE || 30,
    pageSize: 1000,
    cacheKey: 'categoryTree',
    cacheTimeOut: 10000,
    isMultiShipEnabled: false,
    pageConfig: {
      productDetail: {
        staticPathsMaxSize: 10,
      },
      productListing: {
        staticPathsMaxSize: 10,
      },
    },
    recaptcha: {
      reCaptchaKey: process.env.RECAPTCHA_KEY,
      reCaptchaSecret: process.env.RECAPTCHA_SECRET,
      reCaptchaThreshold: process.env.RECAPTCHA_THRESHOLD,
    },
    B2BQuotes: {
      pageSize: 5,
    },
  },
  staticPageGenerationTimeout: 1000,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}
