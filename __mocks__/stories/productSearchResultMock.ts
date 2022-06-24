import type { ProductSearchResult } from '@/lib/gql/types'

const imageBaseURL = '//cdn-sb.mozu.com/30294-50525/cms/50525/files/'
export const productSearchResultMock: ProductSearchResult = {
  totalCount: 42,
  pageSize: 20,
  pageCount: 3,
  startIndex: 0,
  items: [
    {
      productCode: 'SHOE12',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 85,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '',
        productShortDescription:
          'This comfort fit cycling shoe is sure to make your cycling experience a blast. Throw on a pair of these bad boys and hit the road!',
        seoFriendlyUrl: 'izumi-bike-shoes',
        productName: 'Izumi Bike Shoes',
        productImages: [
          {
            imageUrl: `${imageBaseURL}3e86a4ad-502e-4477-9258-a40b00be7488`,
            imageLabel: null,
            mediaType: null,
          },
        ],
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      productCode: 'ACC1',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: null,
      priceRange: {
        lower: {
          price: 65,
          salePrice: null,
        },
        upper: {
          price: 115,
          salePrice: null,
        },
      },
      properties: [
        {
          attributeFQN: 'tenant~availability',
          attributeDetail: {
            name: 'Availability',
            dataTypeSequence: 12,
          },
          isHidden: false,
          values: [
            {
              value: '24hrs',
              stringValue: 'Usually Ships in 24 Hours',
            },
          ],
        },
      ],
      content: {
        productFullDescription:
          'The Smith IO Snow Goggles a are designed to reduce fogging and optimize the flow of air over the inside of the lens. The double lenses ensure you get a clear view with comfort fit.',
        productShortDescription:
          'The Smith IO Snow Goggles a are designed to reduce fogging and optimize the flow of air over the inside of the lens. The double lenses ensure you get a clear view with comfort fit',
        seoFriendlyUrl: 'smith-io-snow-goggles',
        productName: 'Smith IO Snow Goggles',
        productImages: [
          {
            imageUrl: `${imageBaseURL}910a5a28-d26a-4f84-abc2-2e0ef26cd598`,
            imageLabel: null,
            mediaType: null,
          },
        ],
      },
      options: null,
      createDate: null,
      personalizationScore: 2,
      score: 2,
      updateDate: null,
    },
    {
      productCode: 'PET2',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 12,
        salePrice: null,
      },
      priceRange: null,
      properties: [
        {
          attributeFQN: 'tenant~availability',
          attributeDetail: {
            name: 'Availability',
            dataTypeSequence: 3,
          },
          isHidden: false,
          values: [
            {
              value: '24hrs',
              stringValue: 'Usually Ships in 24 Hours',
            },
          ],
        },
      ],
      content: {
        productFullDescription: '',
        productShortDescription:
          'The Bobby Tug Rope is the perfect toy to help your dog socialize and get activity at the same time. Forget throwing your dog a bone, toss him a Bobby Tug Rope for a good time!',
        seoFriendlyUrl: 'bobby-tug-rope',
        productName: 'Bobby Tug Rope',
        productImages: [
          {
            imageUrl: `${imageBaseURL}9f3d88a7-ac89-44b2-9f71-8ca7190ac0ac`,
            imageLabel: null,
            mediaType: null,
          },
          {
            imageUrl: `${imageBaseURL}d6300870-18f4-4e15-a376-4e6a18f3d635`,
            imageLabel: null,
            mediaType: null,
          },
        ],
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      productCode: 'SHOE11',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 68,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '',
        productShortDescription:
          'The Giro Rumble Bike Shoe offers unlined leather through the uppers is soft and comfortable. The shoe shape is great for upper-end performance without hurting your toes.',
        seoFriendlyUrl: 'giro-rumble-bike-shoe',
        productName: 'Giro Rumble Bike Shoe',
        productImages: [
          {
            imageUrl: `${imageBaseURL}49454f7d-6cc7-4382-a90b-2b539455899e`,
            imageLabel: null,
            mediaType: null,
          },
        ],
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      productCode: 'TOP3',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 99,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '<br>',
        productShortDescription:
          'The Albany jacket from Columbia has the warmth of a winter coat with the fit of a structured jacket. Inner pockets keep everything accessible without breaking up the line of your outfit.',
        seoFriendlyUrl: 'columbia-albany-jacket',
        productName: 'Columbia Albany Jacket',
        productImages: [
          {
            imageUrl: `${imageBaseURL}1091c71f-ca56-4309-aa30-bc64f4538a75`,
            imageLabel: null,
            mediaType: null,
          },
        ],
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      productCode: 'TOP17',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 99,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '<br>',
        productShortDescription:
          'The magic of space age polymers make this jacket both snug and lightweight at the same time. Slimming and sleek, the Hampton Nylon jacket puts the emphasis on you without making you look boxy.',
        seoFriendlyUrl: 'hampton-nylon-jacket',
        productName: 'Hampton Nylon Jacket',
        productImages: [
          {
            imageUrl: `${imageBaseURL}edfb022b-5b19-4dd2-a676-1469e9763828`,
            imageLabel: null,
            mediaType: null,
          },
        ],
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BIKE2',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 1200,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '<br>',
        productShortDescription:
          'This throwback classic will have you riding around town in style. The aluminum-carbon fiber mixed frame is durable and light, so throw on your commuter bag and hit the road',
        seoFriendlyUrl: 'safari-road',
        productName: 'Safari Road',
        productImages: [
          {
            imageUrl: `${imageBaseURL}29d52512-18f2-4ea3-a64e-50a436fb9a9c`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BIKE1',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 900,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '<br>',
        productShortDescription:
          'The&nbsp;Novara Ponderosa is perfect for the daily commuter. The aluminum frame and padded bar offer durability and comfort for daily treks to and from work',
        seoFriendlyUrl: 'novara-ponderosa',
        productName: 'Novara Ponderosa',
        productImages: [
          {
            imageUrl: `${imageBaseURL}f0bdd400-d40f-46de-b21c-cbadd0c98d66`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BIKE3',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 2300,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '<br>',
        productShortDescription:
          'The&nbsp;Diamondback Sortie is the dream bike for the hardcore mountain biker. This full suspension design and aerodynamic carbon fiber frame offers a comfortable ride, even over the most extreme conditions.',
        seoFriendlyUrl: 'diamondback-sortie',
        productName: 'Diamondback Sortie',
        productImages: [
          {
            imageUrl: `${imageBaseURL}d2249f22-a56f-42fe-be08-702801c97e4e`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'KAY1',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 450,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: null,
        productShortDescription:
          'Great for rivers and lakes, the Wilderness Pamlico Kayak is sure to get you outside! The anti-flip technology keeps you upright and enjoying the adventure.<div><br></div><div>Great for a valentines date.</div>',
        seoFriendlyUrl: 'wilderness-pamlico-kayak',
        productName: 'Wilderness Pamlico Kayak',
        productImages: [
          {
            imageUrl: `${imageBaseURL}42ec0d7e-1dff-4da6-ac8b-4ff4fc36b243`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'PAD3',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 39,
        salePrice: null,
      },
      priceRange: null,
      properties: [
        {
          attributeFQN: 'tenant~popularity',
          attributeDetail: {
            name: 'Popularity',
            dataTypeSequence: 4,
          },
          isHidden: false,
          values: [
            {
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
            dataTypeSequence: 12,
          },
          isHidden: false,
          values: [
            {
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
            dataTypeSequence: 8,
          },
          isHidden: false,
          values: [
            {
              value: 'Kayaker',
              stringValue: 'Kayaker',
            },
            {
              value: 'Summer',
              stringValue: 'Summer',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
            dataTypeSequence: 8,
          },
          isHidden: false,
          values: [
            {
              value: 'https://www.youtube.com/watch?v=iz7wtTO7roQ',
              stringValue: 'https://www.youtube.com/watch?v=iz7wtTO7roQ',
            },
          ],
        },
      ],
      content: {
        productFullDescription:
          '<span style="font-family: Arial, Helvetica, sans; font-size: 11px; line-height: 14px; text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>​.',
        productShortDescription:
          'Made for power and speed, this Werner Powerhouse will have you glide along the water like a majestic swan..',
        seoFriendlyUrl: 'sleek-paddle',
        productName: 'Werner Powerhouse Paddle',
        productImages: [
          {
            imageUrl: `${imageBaseURL}246225aa-70f2-4308-a30c-bfe8f111e9d3`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'PAD1',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 110,
        salePrice: null,
      },
      priceRange: null,
      properties: [
        {
          attributeFQN: 'tenant~popularity',
          attributeDetail: {
            name: 'Popularity',
            dataTypeSequence: 11,
          },
          isHidden: false,
          values: [
            {
              value: 2,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
            dataTypeSequence: 41,
          },
          isHidden: false,
          values: [
            {
              value: 2,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~color-filter',
          attributeDetail: {
            name: 'color filter',
            dataTypeSequence: 10,
          },
          isHidden: true,
          values: [
            {
              value: 'Yellow',
              stringValue: 'Yellow',
            },
          ],
        },
        {
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
            dataTypeSequence: 63,
          },
          isHidden: false,
          values: [
            {
              value: 'North-Face',
              stringValue: 'North Face',
            },
          ],
        },
        {
          attributeFQN: 'tenant~material',
          attributeDetail: {
            name: 'Material',
            dataTypeSequence: 22,
          },
          isHidden: false,
          values: [
            {
              value: 'Aluminum',
              stringValue: 'Aluminum',
            },
          ],
        },
      ],
      content: {
        productFullDescription: null,
        productShortDescription:
          'Used by the locals, the Bending Branches Paddle, is a favorite. The comfort grip handle and wide paddle surface is sure to deliver a great kayaking experience...',
        seoFriendlyUrl: 'bending-branches-paddle',
        productName: 'Bending Branches Paddle',
        productImages: [
          {
            imageUrl: `${imageBaseURL}11e8d931-886d-4d82-9260-bbfe9fa3e7a4`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'PAD2',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 90,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: null,
        productShortDescription:
          'Kayak like a rockstar with the sleek water paddle. This paddle has a non-adjustable shaft, but offers a comfort grip that is unmatched. .',
        seoFriendlyUrl: 'werner-cyprus-paddle',
        productName: 'Werner Cyprus Paddle',
        productImages: [
          {
            imageUrl: `${imageBaseURL}7eed692a-a868-4484-99a9-81faa3be6b3e`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'KAY3',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 525,
        salePrice: null,
      },
      priceRange: null,
      properties: [
        {
          attributeFQN: 'tenant~popularity',
          attributeDetail: {
            name: 'Popularity',
            dataTypeSequence: 22,
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
            dataTypeSequence: 2,
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
          attributeFQN: 'tenant~color-filter',
          attributeDetail: {
            name: 'color filter',
            dataTypeSequence: 10,
          },
          isHidden: true,
          values: [
            {
              value: 'Orange',
              stringValue: 'Orange',
            },
          ],
        },
        {
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
            dataTypeSequence: 66,
          },
          isHidden: false,
          values: [
            {
              value: 'North-Face',
              stringValue: 'North Face',
            },
          ],
        },
      ],
      content: {
        productFullDescription: null,
        productShortDescription:
          'Are you looking to take kayaking to the next level? The&nbsp;Advanced Elements Kayak is your next best move - the quick pivot technology can make any white water rafting junkie look like a pro..',
        seoFriendlyUrl: 'advanced-elements-kayak',
        productName: 'Advanced Elements Kayak',
        productImages: [
          {
            imageUrl: `${imageBaseURL}b8333a2a-2b11-4d51-922c-9144d2e10452`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'KAY2',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 610,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: null,
        productShortDescription:
          'The&nbsp;Folbot Folding Kayak is a bundle of fun, literally! Designed to pack neatly into a ready-to-travel case and blow up quickly. The inflatable technology gives you a smooth ride across nearly any water obstacle..',
        seoFriendlyUrl: 'folbot-folding-kayak',
        productName: 'Folbot Folding Kayak',
        productImages: [
          {
            imageUrl: `${imageBaseURL}6b060b2e-ade8-4706-84e3-f056988ce14c`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'TENT3',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: true,
      },
      price: {
        price: 255,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: '',
        productShortDescription:
          'Need something that is a bit more roomy for your camping experience? Try out the&nbsp;Marmot Thor 3 Person Tent, designed to comfortable sleep three people.&nbsp;',
        seoFriendlyUrl: 'marmot-thor-3-person-tent',
        productName: 'Marmot Thor 3 Person Tent',
        productImages: [
          {
            imageUrl: `${imageBaseURL}71a2fef4-2e6d-4dad-967f-efdbef566629`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      options: null,
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BCKPCK2',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      purchasableState: {
        isPurchasable: false,
      },
      price: {
        price: 145,
        salePrice: null,
      },
      priceRange: null,
      content: {
        productFullDescription: null,
        productShortDescription:
          'The&nbsp;Kelty Redwing 50 offers 5 large compartments for storing all your travel items a features a comfortable fit for long outdoor activities. Never leave home without all your essentials',
        seoFriendlyUrl: 'kelty-redwing-50',
        productName: 'Kelty Redwing 50',
        productImages: [
          {
            imageUrl: `${imageBaseURL}2f81532c-0c60-4a86-9fd7-4e7ab5c0e9dd`,
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
            dataTypeSequence: 60,
          },
          isProductImageGroupSelector: false,
          isRequired: true,
          isMultiValue: false,
          values: [],
        },
      ],
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
      createDate: null,
      personalizationScore: 1,
      score: 1,
      updateDate: null,
    },
  ],
  facets: [
    {
      label: 'Category',
      facetType: 'Hierarchy',
      field: 'CategoryId',
      values: [
        {
          label: 'Skiing',
          value: '1',
          filterValue: 'categoryId:1',
          isDisplayed: true,
          count: 30,
          isApplied: null,
          childrenFacetValues: [
            {
              label: 'Ski Jackets',
              count: 15,
              value: '16',
              filterValue: 'categoryId:16',
              isDisplayed: true,
            },
          ],
        },
        {
          label: 'Apparel',
          value: '4',
          filterValue: 'categoryId:4',
          isDisplayed: true,
          count: 30,
          isApplied: null,
          childrenFacetValues: [
            {
              label: 'Jackets',
              count: 15,
              value: '24',
              filterValue: 'categoryId:24',
              isDisplayed: true,
            },
          ],
        },
      ],
    },
    {
      label: 'Gender',
      facetType: 'Value',
      field: 'Tenant~gender',
      values: [
        {
          label: 'Men',
          value: 'men',
          filterValue: 'Tenant~gender:men',
          isDisplayed: true,
          count: 8,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Women',
          value: 'women',
          filterValue: 'Tenant~gender:women',
          isDisplayed: true,
          count: 7,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Kids',
          value: 'kids',
          filterValue: 'Tenant~gender:kids',
          isDisplayed: true,
          count: 3,
          isApplied: false,
          childrenFacetValues: null,
        },
      ],
    },
    {
      label: 'Category',
      facetType: 'Hierarchy',
      field: 'CategoryCode',
      values: [
        {
          label: 'Apparel',
          value: '53',
          filterValue: 'categoryCode:53',
          isDisplayed: true,
          count: 15,
          isApplied: null,
          childrenFacetValues: [
            {
              label: 'Jackets',
              count: 15,
              value: '53',
              filterValue: 'categoryCode:53',
              isDisplayed: true,
            },
            {
              label: 'Bottoms',
              count: 14,
              value: '47',
              filterValue: 'categoryCode:47',
              isDisplayed: true,
            },
            {
              label: 'Tops',
              count: 5,
              value: '45',
              filterValue: 'categoryCode:45',
              isDisplayed: true,
            },
            {
              label: 'Footwear',
              count: 15,
              value: '52',
              filterValue: 'categoryCode:52',
              isDisplayed: true,
            },
            {
              label: 'Mountain',
              count: 17,
              value: '48',
              filterValue: 'categoryCode:48',
              isDisplayed: true,
            },
            {
              label: 'Road',
              count: 20,
              value: '40',
              filterValue: 'categoryCode:40',
              isDisplayed: true,
            },
            {
              label: 'Tents',
              count: 20,
              value: '12',
              filterValue: 'categoryCode:12',
              isDisplayed: true,
            },
            {
              label: 'Paddles',
              count: 20,
              value: '11',
              filterValue: 'categoryCode:11',
              isDisplayed: true,
            },
          ],
        },
      ],
    },
    {
      label: 'Color',
      facetType: 'Value',
      field: 'Tenant~color',
      values: [
        {
          label: 'Orange',
          value: 'orange',
          filterValue: 'Tenant~color:orange',
          isDisplayed: true,
          count: 1,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Pink',
          value: 'pink',
          filterValue: 'Tenant~color:pink',
          isDisplayed: true,
          count: 2,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Purple',
          value: 'purple',
          filterValue: 'Tenant~color:purple',
          isDisplayed: true,
          count: 2,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Red',
          value: 'red',
          filterValue: 'Tenant~color:red',
          isDisplayed: true,
          count: 5,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Silver',
          value: 'silver',
          filterValue: 'Tenant~color:silver',
          isDisplayed: true,
          count: 1,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Black',
          value: 'black',
          filterValue: 'tenant~color:black',
          isDisplayed: true,
          count: 3,
          isApplied: true,
          childrenFacetValues: null,
        },
        {
          label: 'Yellow',
          value: 'yellow',
          filterValue: 'Tenant~color:yellow',
          isDisplayed: true,
          count: 2,
          isApplied: false,
          childrenFacetValues: null,
        },
      ],
    },
    {
      label: 'Price',
      facetType: 'RangeQuery',
      field: 'Price',
      values: [
        {
          label: '50 to 100',
          value: 'price:[50 TO 100]',
          filterValue: 'price:[50 TO 100]',
          isDisplayed: true,
          count: 1,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: '100 to 500',
          value: 'price:[100 TO 500]',
          filterValue: 'price:[100 TO 500]',
          isDisplayed: true,
          count: 14,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: '50 to 500',
          value: 'price:[50 TO 500]',
          filterValue: 'price:[50 TO 500]',
          isDisplayed: true,
          count: 3,
          isApplied: true,
          childrenFacetValues: null,
        },
      ],
    },
    {
      label: 'Brand',
      facetType: 'Value',
      field: 'Tenant~brand',
      values: [
        {
          label: 'Arctyex',
          value: 'arctyex',
          filterValue: 'Tenant~brand:arctyex',
          isDisplayed: true,
          count: 1,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Burton',
          value: 'burton',
          filterValue: 'Tenant~brand:burton',
          isDisplayed: true,
          count: 1,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Columbia',
          value: 'columbia',
          filterValue: 'Tenant~brand:columbia',
          isDisplayed: true,
          count: 2,
          isApplied: true,
          childrenFacetValues: null,
        },
        {
          label: 'Marmont',
          value: 'marmont',
          filterValue: 'Tenant~brand:marmont',
          isDisplayed: true,
          count: 1,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Mystic',
          value: 'mystic',
          filterValue: 'Tenant~brand:mystic',
          isDisplayed: true,
          count: 4,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Nike',
          value: 'nike',
          filterValue: 'tenant~brand:nike',
          isDisplayed: true,
          count: 1,
          isApplied: true,
          childrenFacetValues: null,
        },
        {
          label: 'Adidas',
          value: 'adidas',
          filterValue: 'tenant~brand:adidas',
          isDisplayed: true,
          count: 1,
          isApplied: true,
          childrenFacetValues: null,
        },
        {
          label: 'The North Face',
          value: 'the-north-face',
          filterValue: 'Tenant~brand:the-north-face',
          isDisplayed: true,
          count: 3,
          isApplied: false,
          childrenFacetValues: null,
        },
      ],
    },
  ],
}
