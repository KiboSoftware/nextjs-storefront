export const ProductDataMock = {
  fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
  fulfillmentMethod: 'Ship',
  productCode: 'BIKE3',
  productUsage: 'Configurable',
  isPackagedStandAlone: false,
  categories: [
    {
      categoryCode: '42',
      categoryId: 14,
      isDisplayed: true,
      parentCategory: {
        categoryId: 4,
        categoryCode: '30',
        isDisplayed: true,
        content: {
          name: 'Biking',
          slug: 'biking',
        },
      },
      content: {
        name: 'Mountain',
        slug: 'mountain',
      },
    },
    {
      categoryCode: '46',
      categoryId: 23,
      isDisplayed: true,
      parentCategory: null,
      content: {
        name: 'New Products!',
        slug: 'new-products-',
      },
    },
  ],
  purchasableState: {
    isPurchasable: false,
  },
  price: {
    price: 2300,
    salePrice: null,
  },
  priceRange: null,
  properties: [
    {
      attributeFQN: 'tenant~product-crosssell',
      attributeDetail: {
        name: 'Product Cross-Sells',
      },
      isHidden: false,
      values: [
        {
          value: 'BIKE1',
          stringValue: 'BIKE1',
        },
        {
          value: 'BIKE2',
          stringValue: 'BIKE2',
        },
        {
          value: 'BOT1',
          stringValue: 'BOT1',
        },
      ],
    },
    {
      attributeFQN: 'tenant~popularity',
      attributeDetail: {
        name: 'Popularity',
      },
      isHidden: false,
      values: [
        {
          value: 1,
          stringValue: null,
        },
      ],
    },
    {
      attributeFQN: 'tenant~rating',
      attributeDetail: {
        name: 'Rating',
      },
      isHidden: true,
      values: [
        {
          value: 3,
          stringValue: null,
        },
      ],
    },
    {
      attributeFQN: 'tenant~product-upsell',
      attributeDetail: {
        name: 'Product Upsells',
      },
      isHidden: true,
      values: [
        {
          value: 'BOT1',
          stringValue: 'BOT1',
        },
        {
          value: 'BCKPCK1',
          stringValue: 'BCKPCK1',
        },
        {
          value: 'PET2',
          stringValue: 'PET2',
        },
      ],
    },
    {
      attributeFQN: 'tenant~color-filter',
      attributeDetail: {
        name: 'color filter',
      },
      isHidden: true,
      values: [
        {
          value: 'Green',
          stringValue: 'Green',
        },
        {
          value: 'Grey',
          stringValue: 'Grey',
        },
      ],
    },
    {
      attributeFQN: 'tenant~isrecommended',
      attributeDetail: {
        name: 'isRecommended',
      },
      isHidden: true,
      values: [
        {
          value: 'Military',
          stringValue: 'Military',
        },
        {
          value: 'Summer',
          stringValue: 'Summer',
        },
      ],
    },
    {
      attributeFQN: 'tenant~brand',
      attributeDetail: {
        name: 'Brand',
      },
      isHidden: true,
      values: [
        {
          value: 'Diamondback',
          stringValue: 'Diamondback',
        },
      ],
    },
    {
      attributeFQN: 'tenant~last-call',
      attributeDetail: {
        name: 'Last Call',
      },
      isHidden: true,
      values: [
        {
          value: false,
          stringValue: null,
        },
      ],
    },
    {
      attributeFQN: 'tenant~video-url',
      attributeDetail: {
        name: 'video-url',
      },
      isHidden: true,
      values: [
        {
          value: 'https://www.youtube.com/watch?v=iz7wtTO7roQ',
          stringValue: 'https://www.youtube.com/watch?v=iz7wtTO7roQ',
        },
      ],
    },
    {
      attributeFQN: 'tenant~dynamic-color',
      attributeDetail: {
        name: null,
      },
      isHidden: true,
      values: [
        {
          value: 'red',
          stringValue: 'red',
        },
      ],
    },
  ],
  content: {
    productFullDescription: '<br>',
    productShortDescription:
      'The&nbsp;Diamondback Sortie is the dream bike for the hardcore mountain biker. This full suspension design and aerodynamic carbon fiber frame offers a comfortable ride, even over the most extreme conditions.',
    seoFriendlyUrl: 'diamondback-sortie',
    productName: 'Diamondback Sortie',
    productImages: [
      {
        imageUrl:
          '//cdn-sb.mozu.com/30294-50525/cms/50525/files/d2249f22-a56f-42fe-be08-702801c97e4e',
        imageLabel: null,
        mediaType: null,
        productImageGroupId: 'default',
      },
      {
        imageUrl:
          '//cdn-sb.mozu.com/30294-50525/cms/50525/files/af946329-d91b-4e41-a21e-4825179c4219',
        imageLabel: null,
        mediaType: null,
        productImageGroupId: 'default',
      },
      {
        imageUrl:
          '//cdn-sb.mozu.com/30294-50525/cms/50525/files/4d6a6222-6eb9-4f6c-bc0a-08e0d81d9454',
        imageLabel: null,
        mediaType: null,
        productImageGroupId: 'default',
      },
      {
        imageUrl:
          '//cdn-sb.mozu.com/30294-50525/cms/50525/files/6deee665-8462-4076-b9b4-f2fc4f1a78e1',
        imageLabel: null,
        mediaType: null,
        productImageGroupId: 'default',
      },
    ],
  },
  options: [
    {
      attributeFQN: 'tenant~color',
      attributeDetail: {
        name: 'Color',
        inputType: 'List',
      },
      isProductImageGroupSelector: false,
      isRequired: true,
      isMultiValue: false,
      values: [
        {
          value: 'Orange',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'Orange',
        },
        {
          value: 'Purple',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'Purple',
        },
      ],
    },
    {
      attributeFQN: 'tenant~size',
      attributeDetail: {
        name: 'Size',
        inputType: 'List',
      },
      isProductImageGroupSelector: false,
      isRequired: true,
      isMultiValue: false,
      values: [
        {
          value: 'L',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'L',
        },
        {
          value: 'M',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'M',
        },
        {
          value: 'S',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'S',
        },
      ],
    },
    {
      attributeFQN: 'tenant~length-cm',
      attributeDetail: {
        name: 'Length (cm)',
        inputType: 'List',
      },
      isProductImageGroupSelector: false,
      isRequired: true,
      isMultiValue: false,
      values: [
        {
          value: 150,
          isSelected: false,
          deltaPrice: null,
          stringValue: null,
        },
        {
          value: 154,
          isSelected: false,
          deltaPrice: null,
          stringValue: null,
        },
        {
          value: 156,
          isSelected: false,
          deltaPrice: null,
          stringValue: null,
        },
      ],
    },
    {
      attributeFQN: 'tenant~include-warranty',
      attributeDetail: {
        name: 'Include Warranty',
        inputType: 'YesNo',
      },
      isProductImageGroupSelector: false,
      isRequired: false,
      isMultiValue: false,
      values: [
        {
          value: '',
          isSelected: false,
          deltaPrice: 0,
          stringValue: null,
        },
      ],
    },
    {
      attributeFQN: 'tenant~vanity-plate-text',
      attributeDetail: {
        name: 'Vanity Plate Text',
        inputType: 'TextBox',
      },
      isProductImageGroupSelector: false,
      isRequired: false,
      isMultiValue: false,
      values: [
        {
          value: '',
          isSelected: false,
          deltaPrice: 0,
          stringValue: null,
        },
      ],
    },
  ],
  productImageGroups: [],
  inventoryInfo: {
    manageStock: false,
    onlineLocationCode: null,
    onlineSoftStockAvailable: null,
    onlineStockAvailable: null,
  },
}
