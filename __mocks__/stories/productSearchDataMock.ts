const imageBaseURL = '//cdn-sb.mozu.com/30294-50525/cms/50525/files/'
export const productSearchDataMock = {
  totalCount: 42,
  pageSize: 20,
  pageCount: 3,
  startIndex: 0,
  items: [
    {
      productCode: 'SHOE12',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '37',
          categoryId: 8,
          isDisplayed: true,
          parentCategory: {
            categoryId: 2,
            categoryCode: '27',
            isDisplayed: true,
            content: {
              name: 'Camping',
              slug: 'camping',
            },
          },
          content: {
            name: 'Shoes',
            slug: 'shoes',
          },
        },
        {
          categoryCode: '50',
          categoryId: 20,
          isDisplayed: true,
          parentCategory: {
            categoryId: 5,
            categoryCode: '40',
            isDisplayed: true,
            content: {
              name: 'Womens',
              slug: 'womens',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'MCF',
          categoryId: 32,
          isDisplayed: true,
          parentCategory: {
            categoryId: 21,
            categoryCode: 'MC',
            isDisplayed: true,
            content: {
              name: 'Casual',
              slug: 'casual',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'MAF',
          categoryId: 33,
          isDisplayed: true,
          parentCategory: {
            categoryId: 15,
            categoryCode: 'MA',
            isDisplayed: true,
            content: {
              name: 'Active',
              slug: 'active',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'KAF',
          categoryId: 42,
          isDisplayed: true,
          parentCategory: {
            categoryId: 25,
            categoryCode: 'KA',
            isDisplayed: true,
            content: {
              name: 'Active',
              slug: 'active',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'KCF',
          categoryId: 49,
          isDisplayed: true,
          parentCategory: {
            categoryId: 26,
            categoryCode: 'KC',
            isDisplayed: true,
            content: {
              name: 'Casual',
              slug: 'casual',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
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
        price: 85,
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
              value: 'BOT1',
              stringValue: 'BOT1',
            },
            {
              value: 'BIKE3',
              stringValue: 'BIKE3',
            },
            {
              value: 'BIKE2',
              stringValue: 'BIKE2',
            },
            {
              value: 'BIKE1',
              stringValue: 'BIKE1',
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
          isHidden: false,
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
          isHidden: false,
          values: [
            {
              value: 'PET1',
              stringValue: 'PET1',
            },
            {
              value: 'PET3',
              stringValue: 'PET3',
            },
            {
              value: 'SHOE11',
              stringValue: 'SHOE11',
            },
            {
              value: 'SHOE10',
              stringValue: 'SHOE10',
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
              value: 'Orange',
              stringValue: 'Orange',
            },
            {
              value: 'Purple',
              stringValue: 'Purple',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
            },
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
          },
          isHidden: false,
          values: [
            {
              value: 'Fila',
              stringValue: 'Fila',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}5450c94c-5626-46e3-b907-e29dafe8c1a2`,
            imageLabel: null,
            mediaType: null,
          },
          {
            imageUrl: `${imageBaseURL}b15d8de2-088e-4c4b-9331-89befeefdcae`,
            imageLabel: null,
            mediaType: null,
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
      ],
    },
    {
      productCode: 'ACC1',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '39',
          categoryId: 9,
          isDisplayed: true,
          parentCategory: {
            categoryId: 3,
            categoryCode: '29',
            isDisplayed: true,
            content: {
              name: 'Skiinggg',
              slug: 'skiing',
            },
          },
          content: {
            name: 'Accessories',
            slug: 'accessories',
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
          },
          isHidden: false,
          values: [
            {
              value: '24hrs',
              stringValue: 'Usually Ships in 24 Hours',
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-crosssell',
          attributeDetail: {
            name: 'Product Cross-Sells',
          },
          isHidden: false,
          values: [
            {
              value: 'ACC2',
              stringValue: 'ACC2',
            },
            {
              value: 'ACC3',
              stringValue: 'ACC3',
            },
            {
              value: 'PET3',
              stringValue: 'PET3',
            },
            {
              value: 'SKI2',
              stringValue: 'SKI2',
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
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
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
          isHidden: false,
          values: [
            {
              value: 'ACC2',
              stringValue: 'ACC2',
            },
            {
              value: 'ACC3',
              stringValue: 'ACC3',
            },
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'SKI3',
              stringValue: 'SKI3',
            },
            {
              value: 'SKI2',
              stringValue: 'SKI2',
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
              value: 'Red',
              stringValue: 'Red',
            },
            {
              value: 'Yellow',
              stringValue: 'Yellow',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Skiier',
              stringValue: 'Skiier',
            },
            {
              value: 'Winter',
              stringValue: 'Winter',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}4d26a15f-e66e-473e-8b52-858649ed6b50`,
            imageLabel: null,
            mediaType: null,
          },
          {
            imageUrl: `${imageBaseURL}37f0869b-21f6-46a1-b8f2-4ca8c7547784`,
            imageLabel: null,
            mediaType: null,
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
          isProductImageGroupSelector: true,
          isRequired: true,
          isMultiValue: false,
          values: [
            {
              value: 'Green',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Green',
            },
            {
              value: 'Red',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Red',
            },
            {
              value: 'Yellow',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Yellow',
            },
          ],
        },
      ],
    },
    {
      productCode: 'PET2',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '45',
          categoryId: 13,
          isDisplayed: true,
          parentCategory: null,
          content: {
            name: 'Pets',
            slug: 'pets',
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
        isPurchasable: true,
      },
      price: {
        price: 12,
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
              value: 'PET1',
              stringValue: 'PET1',
            },
            {
              value: 'PET3',
              stringValue: 'PET3',
            },
            {
              value: 'PET4',
              stringValue: 'PET4',
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
          isHidden: false,
          values: [
            {
              value: 1,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'PET1',
              stringValue: 'PET1',
            },
            {
              value: 'PET4',
              stringValue: 'PET4',
            },
            {
              value: 'PET5',
              stringValue: 'PET5',
            },
            {
              value: 'SHOE12',
              stringValue: 'SHOE12',
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
              value: 'Pink',
              stringValue: 'Pink',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'DogOwner',
              stringValue: 'DogOwner',
            },
            {
              value: 'Summer',
              stringValue: 'Summer',
            },
            {
              value: 'Winter',
              stringValue: 'Winter',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
          },
          isHidden: false,
          values: [
            {
              value: 'https://www.youtube.com/watch?v=iz7wtTO7roQ',
              stringValue: 'https://www.youtube.com/watch?v=iz7wtTO7roQ',
            },
          ],
        },
        {
          attributeFQN: 'tenant~color',
          attributeDetail: {
            name: 'Color',
          },
          isHidden: false,
          values: [
            {
              value: 'Green',
              stringValue: 'Green',
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
    },
    {
      productCode: 'SHOE11',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '37',
          categoryId: 8,
          isDisplayed: true,
          parentCategory: {
            categoryId: 2,
            categoryCode: '27',
            isDisplayed: true,
            content: {
              name: 'Camping',
              slug: 'camping',
            },
          },
          content: {
            name: 'Shoes',
            slug: 'shoes',
          },
        },
        {
          categoryCode: '50',
          categoryId: 20,
          isDisplayed: true,
          parentCategory: {
            categoryId: 5,
            categoryCode: '40',
            isDisplayed: true,
            content: {
              name: 'Womens',
              slug: 'womens',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'MCF',
          categoryId: 32,
          isDisplayed: true,
          parentCategory: {
            categoryId: 21,
            categoryCode: 'MC',
            isDisplayed: true,
            content: {
              name: 'Casual',
              slug: 'casual',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'MAF',
          categoryId: 33,
          isDisplayed: true,
          parentCategory: {
            categoryId: 15,
            categoryCode: 'MA',
            isDisplayed: true,
            content: {
              name: 'Active',
              slug: 'active',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'KAF',
          categoryId: 42,
          isDisplayed: true,
          parentCategory: {
            categoryId: 25,
            categoryCode: 'KA',
            isDisplayed: true,
            content: {
              name: 'Active',
              slug: 'active',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
          },
        },
        {
          categoryCode: 'KCF',
          categoryId: 49,
          isDisplayed: true,
          parentCategory: {
            categoryId: 26,
            categoryCode: 'KC',
            isDisplayed: true,
            content: {
              name: 'Casual',
              slug: 'casual',
            },
          },
          content: {
            name: 'Footwear',
            slug: 'footwear',
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
        price: 68,
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
              value: 'BIKE3',
              stringValue: 'BIKE3',
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
              value: 2,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
          values: [
            {
              value: 5,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'PET1',
              stringValue: 'PET1',
            },
            {
              value: 'PET3',
              stringValue: 'PET3',
            },
            {
              value: 'SHOE1',
              stringValue: 'SHOE1',
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
              value: 'Black',
              stringValue: 'Black',
            },
            {
              value: 'Tan',
              stringValue: 'Tan',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
            },
            {
              value: 'Kayaker',
              stringValue: 'Kayaker',
            },
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
          isHidden: false,
          values: [
            {
              value: 'Adidas',
              stringValue: 'Adidas',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}ed6c61d1-23a6-40c6-8902-5bcdd1ef4bfa`,
            imageLabel: null,
            mediaType: null,
          },
          {
            imageUrl: `${imageBaseURL}dc477484-93d9-448e-b312-6333d98afedb`,
            imageLabel: null,
            mediaType: null,
          },
          {
            imageUrl: `${imageBaseURL}492c007c-e46f-4543-9d35-08abed884da1`,
            imageLabel: null,
            mediaType: null,
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
              value: 'Black',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Black',
            },
            {
              value: 'Tan',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Tan',
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
            {
              value: 'XL',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'XL',
            },
            {
              value: 'XS',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'XS',
            },
          ],
        },
      ],
    },
    {
      productCode: 'TOP3',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '34',
          categoryId: 11,
          isDisplayed: true,
          parentCategory: {
            categoryId: 2,
            categoryCode: '27',
            isDisplayed: true,
            content: {
              name: 'Camping',
              slug: 'camping',
            },
          },
          content: {
            name: 'Jackets',
            slug: 'jackets',
          },
        },
        {
          categoryCode: '51',
          categoryId: 18,
          isDisplayed: true,
          parentCategory: {
            categoryId: 5,
            categoryCode: '40',
            isDisplayed: true,
            content: {
              name: 'Womens',
              slug: 'womens',
            },
          },
          content: {
            name: 'Tops',
            slug: 'tops',
          },
        },
        {
          categoryCode: 'MAT',
          categoryId: 31,
          isDisplayed: true,
          parentCategory: {
            categoryId: 15,
            categoryCode: 'MA',
            isDisplayed: true,
            content: {
              name: 'Active',
              slug: 'active',
            },
          },
          content: {
            name: 'Shirts',
            slug: 'tops',
          },
        },
        {
          categoryCode: 'MCT',
          categoryId: 34,
          isDisplayed: true,
          parentCategory: {
            categoryId: 21,
            categoryCode: 'MC',
            isDisplayed: true,
            content: {
              name: 'Casual',
              slug: 'casual',
            },
          },
          content: {
            name: 'Shirts',
            slug: 'tops',
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
        price: 99,
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
              value: 'SHOE11-5',
              stringValue: 'SHOE11-5',
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
              value: 3,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
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
          isHidden: false,
          values: [
            {
              value: 'TOP4-2',
              stringValue: 'TOP4-2',
            },
            {
              value: 'TOP16-2',
              stringValue: 'TOP16-2',
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
              value: 'Pink',
              stringValue: 'Pink',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Winter',
              stringValue: 'Winter',
            },
          ],
        },
        {
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
          },
          isHidden: false,
          values: [
            {
              value: 'Columbia',
              stringValue: 'Columbia',
            },
          ],
        },
        {
          attributeFQN: 'tenant~material',
          attributeDetail: {
            name: 'Material',
          },
          isHidden: false,
          values: [
            {
              value: 'Cotton',
              stringValue: 'Cotton',
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
      ],
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
      options: [
        {
          attributeFQN: 'tenant~jacket-fit',
          attributeDetail: {
            name: 'Jacket Fit',
            inputType: 'List',
          },
          isProductImageGroupSelector: false,
          isRequired: true,
          isMultiValue: false,
          values: [
            {
              value: 'Slim',
              isSelected: true,
              deltaPrice: null,
              stringValue: 'Slim',
            },
          ],
        },
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
              value: 'Pink',
              isSelected: true,
              deltaPrice: null,
              stringValue: 'Pink',
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
      ],
    },
    {
      productCode: 'TOP17',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '34',
          categoryId: 11,
          isDisplayed: true,
          parentCategory: {
            categoryId: 2,
            categoryCode: '27',
            isDisplayed: true,
            content: {
              name: 'Camping',
              slug: 'camping',
            },
          },
          content: {
            name: 'Jackets',
            slug: 'jackets',
          },
        },
        {
          categoryCode: '51',
          categoryId: 18,
          isDisplayed: true,
          parentCategory: {
            categoryId: 5,
            categoryCode: '40',
            isDisplayed: true,
            content: {
              name: 'Womens',
              slug: 'womens',
            },
          },
          content: {
            name: 'Tops',
            slug: 'tops',
          },
        },
        {
          categoryCode: 'MAT',
          categoryId: 31,
          isDisplayed: true,
          parentCategory: {
            categoryId: 15,
            categoryCode: 'MA',
            isDisplayed: true,
            content: {
              name: 'Active',
              slug: 'active',
            },
          },
          content: {
            name: 'Shirts',
            slug: 'tops',
          },
        },
        {
          categoryCode: 'MCT',
          categoryId: 34,
          isDisplayed: true,
          parentCategory: {
            categoryId: 21,
            categoryCode: 'MC',
            isDisplayed: true,
            content: {
              name: 'Casual',
              slug: 'casual',
            },
          },
          content: {
            name: 'Shirts',
            slug: 'tops',
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
        price: 99,
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
              value: 'BCKPCK1-2',
              stringValue: 'BCKPCK1-2',
            },
            {
              value: 'BIKE1-5',
              stringValue: 'BIKE1-5',
            },
            {
              value: 'SHOE11-1',
              stringValue: 'SHOE11-1',
            },
            {
              value: 'PET4-1',
              stringValue: 'PET4-1',
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
              value: 3,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
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
          isHidden: false,
          values: [
            {
              value: 'TOP5-5',
              stringValue: 'TOP5-5',
            },
            {
              value: 'TOP4-1',
              stringValue: 'TOP4-1',
            },
            {
              value: 'TOP3-1',
              stringValue: 'TOP3-1',
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
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Military',
              stringValue: 'Military',
            },
            {
              value: 'Skiier',
              stringValue: 'Skiier',
            },
          ],
        },
        {
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
          },
          isHidden: false,
          values: [
            {
              value: 'Adidas',
              stringValue: 'Adidas',
            },
          ],
        },
        {
          attributeFQN: 'tenant~material',
          attributeDetail: {
            name: 'Material',
          },
          isHidden: false,
          values: [
            {
              value: 'Microfiber',
              stringValue: 'Microfiber',
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
      ],
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
              value: 'Green',
              isSelected: true,
              deltaPrice: null,
              stringValue: 'Green',
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
      ],
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BIKE2',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '47',
          categoryId: 22,
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
            name: 'Road',
            slug: 'road',
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
        isPurchasable: true,
      },
      price: {
        price: 1200,
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
              value: 'BOT1',
              stringValue: 'BOT1',
            },
            {
              value: 'BIKE1',
              stringValue: 'BIKE1',
            },
            {
              value: 'PET1',
              stringValue: 'PET1',
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
              value: 5,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
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
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'BIKE3',
              stringValue: 'BIKE3',
            },
            {
              value: 'BIKE1',
              stringValue: 'BIKE1',
            },
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
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
              value: 'Brown',
              stringValue: 'Brown',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
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
          isHidden: false,
          values: [
            {
              value: 'Adidas',
              stringValue: 'Adidas',
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
              value: true,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}16fb57de-9f71-49b4-9055-754f7ed77401`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}cbc4fdac-b28e-4eea-8193-4e6a533de5f9`,
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
              value: 'Brown',
              isSelected: true,
              deltaPrice: null,
              stringValue: 'Brown',
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
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BIKE1',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '48',
          categoryId: 16,
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
            name: 'Hybrid',
            slug: 'hybrid',
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
        price: 900,
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
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'BOT1',
              stringValue: 'BOT1',
            },
            {
              value: 'TOP13',
              stringValue: 'TOP13',
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
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
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
          isHidden: false,
          values: [
            {
              value: 'BOT1',
              stringValue: 'BOT1',
            },
            {
              value: 'TOP6',
              stringValue: 'TOP6',
            },
            {
              value: 'TOP16',
              stringValue: 'TOP16',
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
              value: 'Red',
              stringValue: 'Red',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
            },
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
          isHidden: false,
          values: [
            {
              value: 'Novara',
              stringValue: 'Novara',
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
          {
            imageUrl: `${imageBaseURL}c2321696-bcc0-40a9-a09a-fcd9eba411d9`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}93141c3e-a988-4893-b22e-854938d104f0`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}8d1bb051-f05d-401f-8259-4d7d53a4a7a2`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}84473e95-64ff-4451-848c-abb772e0832c`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}024de468-ba3f-4963-bdff-1da95100248e`,
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
              value: 'Green',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Green',
            },
            {
              value: 'Red',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Red',
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
      ],
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
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
          isHidden: false,
          values: [
            {
              value: 5,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
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
          isHidden: false,
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
          isHidden: false,
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
          {
            imageUrl: `${imageBaseURL}af946329-d91b-4e41-a21e-4825179c4219`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}4d6a6222-6eb9-4f6c-bc0a-08e0d81d9454`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}6deee665-8462-4076-b9b4-f2fc4f1a78e1`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: [
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
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'KAY1',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '33',
          categoryId: 39,
          isDisplayed: true,
          parentCategory: {
            categoryId: 27,
            categoryCode: '28',
            isDisplayed: true,
            content: {
              name: 'Kayaking',
              slug: 'kayaking',
            },
          },
          content: {
            name: 'Kayaks',
            slug: 'kayaks',
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
        price: 450,
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
              value: 'KAY2',
              stringValue: 'KAY2',
            },
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'PAD2',
              stringValue: 'PAD2',
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
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
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
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'PAD3',
              stringValue: 'PAD3',
            },
            {
              value: 'PAD1',
              stringValue: 'PAD1',
            },
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
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
              value: 'Blue',
              stringValue: 'Blue',
            },
            {
              value: 'Red',
              stringValue: 'Red',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}9c3d3050-ddfe-45e8-b0ad-f4650a4a3eac`,
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
              value: 'Blue',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Blue',
            },
            {
              value: 'Red',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Red',
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
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'PAD3',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '35',
          categoryId: 37,
          isDisplayed: true,
          parentCategory: {
            categoryId: 27,
            categoryCode: '28',
            isDisplayed: true,
            content: {
              name: 'Kayaking',
              slug: 'kayaking',
            },
          },
          content: {
            name: 'Paddles',
            slug: 'paddles',
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
        isPurchasable: true,
      },
      price: {
        price: 39,
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
              value: 'PAD1',
              stringValue: 'PAD1',
            },
            {
              value: 'PAD2',
              stringValue: 'PAD2',
            },
            {
              value: 'KAY2',
              stringValue: 'KAY2',
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
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
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
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'PAD1',
              stringValue: 'PAD1',
            },
            {
              value: 'PAD2',
              stringValue: 'PAD2',
            },
            {
              value: 'KAY1',
              stringValue: 'KAY1',
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
              value: 'Red',
              stringValue: 'Red',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          },
          isHidden: false,
          values: [
            {
              value: 'Aluminum',
              stringValue: 'Aluminum',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}b6efe81d-aa7b-4be2-81e4-9de3570d45c2`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: null,
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'PAD1',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '35',
          categoryId: 37,
          isDisplayed: true,
          parentCategory: {
            categoryId: 27,
            categoryCode: '28',
            isDisplayed: true,
            content: {
              name: 'Kayaking',
              slug: 'kayaking',
            },
          },
          content: {
            name: 'Paddles',
            slug: 'paddles',
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
        isPurchasable: true,
      },
      price: {
        price: 110,
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
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'PAD2',
              stringValue: 'PAD2',
            },
            {
              value: 'PAD3',
              stringValue: 'PAD3',
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
              value: 2,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
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
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'PAD3',
              stringValue: 'PAD3',
            },
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'PET5',
              stringValue: 'PET5',
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
              value: 'Yellow',
              stringValue: 'Yellow',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
            },
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          },
          isHidden: false,
          values: [
            {
              value: 'Aluminum',
              stringValue: 'Aluminum',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}4418236d-3786-49f0-a21c-7bd1ff6a6da9`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}efbfd120-3b59-4f12-9d7d-df66d3f792a4`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: null,
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'PAD2',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '35',
          categoryId: 37,
          isDisplayed: true,
          parentCategory: {
            categoryId: 27,
            categoryCode: '28',
            isDisplayed: true,
            content: {
              name: 'Kayaking',
              slug: 'kayaking',
            },
          },
          content: {
            name: 'Paddles',
            slug: 'paddles',
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
        isPurchasable: true,
      },
      price: {
        price: 90,
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
              value: 'KAY1',
              stringValue: 'KAY1',
            },
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'PAD1',
              stringValue: 'PAD1',
            },
            {
              value: 'PAD3',
              stringValue: 'PAD3',
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
              value: 3,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
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
          isHidden: false,
          values: [
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'PAD1',
              stringValue: 'PAD1',
            },
            {
              value: 'KAY2',
              stringValue: 'KAY2',
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
              value: 'Black',
              stringValue: 'Black',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          },
          isHidden: false,
          values: [
            {
              value: 'Aluminum',
              stringValue: 'Aluminum',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}c418f996-2bd5-42bb-84b3-f883b3647040`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: null,
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'KAY3',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '33',
          categoryId: 39,
          isDisplayed: true,
          parentCategory: {
            categoryId: 27,
            categoryCode: '28',
            isDisplayed: true,
            content: {
              name: 'Kayaking',
              slug: 'kayaking',
            },
          },
          content: {
            name: 'Kayaks',
            slug: 'kayaks',
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
        isPurchasable: true,
      },
      price: {
        price: 525,
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
              value: 'PAD3',
              stringValue: 'PAD3',
            },
            {
              value: 'PAD2',
              stringValue: 'PAD2',
            },
            {
              value: 'KAY1',
              stringValue: 'KAY1',
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
          isHidden: false,
          values: [
            {
              value: 1,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'PAD2',
              stringValue: 'PAD2',
            },
            {
              value: 'KAY1',
              stringValue: 'KAY1',
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
              value: 'Orange',
              stringValue: 'Orange',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          attributeFQN: 'tenant~color',
          attributeDetail: {
            name: 'Color',
          },
          isHidden: false,
          values: [
            {
              value: 'Orange',
              stringValue: 'Orange',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}9cb7158e-2322-410d-993b-aa84f8870652`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: null,
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'KAY2',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '33',
          categoryId: 39,
          isDisplayed: true,
          parentCategory: {
            categoryId: 27,
            categoryCode: '28',
            isDisplayed: true,
            content: {
              name: 'Kayaking',
              slug: 'kayaking',
            },
          },
          content: {
            name: 'Kayaks',
            slug: 'kayaks',
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
        isPurchasable: true,
      },
      price: {
        price: 610,
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
              value: 'PAD3',
              stringValue: 'PAD3',
            },
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'KAY1',
              stringValue: 'KAY1',
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
              value: 5,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
          values: [
            {
              value: 5,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'KAY1',
              stringValue: 'KAY1',
            },
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'PAD1',
              stringValue: 'PAD1',
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
              value: 'Yellow',
              stringValue: 'Yellow',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          attributeFQN: 'tenant~color',
          attributeDetail: {
            name: 'Color',
          },
          isHidden: false,
          values: [
            {
              value: 'Yellow',
              stringValue: 'Yellow',
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}a33e2fb3-001c-464d-80cf-66b6f1217f06`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}631669cb-e1e3-4dab-b8e3-336b7a08900a`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: null,
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip'],
      productCode: 'TENT3',
      productUsage: 'Standard',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '32',
          categoryId: 10,
          isDisplayed: true,
          parentCategory: {
            categoryId: 2,
            categoryCode: '27',
            isDisplayed: true,
            content: {
              name: 'Camping',
              slug: 'camping',
            },
          },
          content: {
            name: 'Tents',
            slug: 'tents',
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
        isPurchasable: true,
      },
      price: {
        price: 255,
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
              value: 'BCKPCK3',
              stringValue: 'BCKPCK3',
            },
            {
              value: 'BCKPCK2',
              stringValue: 'BCKPCK2',
            },
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
            },
            {
              value: 'TOP5',
              stringValue: 'TOP5',
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
              value: 4,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
          },
          isHidden: false,
          values: [
            {
              value: 3,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-related',
          attributeDetail: {
            name: 'Related Products',
          },
          isHidden: false,
          values: [
            {
              value: 'KAY3',
              stringValue: 'KAY3',
            },
            {
              value: 'PET3',
              stringValue: 'PET3',
            },
            {
              value: 'TENT1',
              stringValue: 'TENT1',
            },
          ],
        },
        {
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'BIKE3',
              stringValue: 'BIKE3',
            },
            {
              value: 'BIKE1',
              stringValue: 'BIKE1',
            },
            {
              value: 'BCKPCK2',
              stringValue: 'BCKPCK2',
            },
            {
              value: 'BCKPCK1',
              stringValue: 'BCKPCK1',
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
              value: 'Yellow',
              stringValue: 'Yellow',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
            },
            {
              value: 'Kayaker',
              stringValue: 'Kayaker',
            },
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
          isHidden: false,
          values: [
            {
              value: 'North-Face',
              stringValue: 'North Face',
            },
          ],
        },
        {
          attributeFQN: 'tenant~color',
          attributeDetail: {
            name: 'Color',
          },
          isHidden: false,
          values: [
            {
              value: 'Yellow',
              stringValue: 'Yellow',
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
              value: true,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}b04cfb8e-c52f-4c90-aa09-323e9576ef33`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}3b6eb3a4-e0bb-46f3-8199-a954bd69faa2`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
        ],
      },
      options: null,
      productImageGroups: [],
      inventoryInfo: {
        manageStock: false,
        onlineLocationCode: null,
        onlineSoftStockAvailable: null,
        onlineStockAvailable: null,
      },
    },
    {
      fulfillmentTypesSupported: ['DirectShip', 'InStorePickup'],
      productCode: 'BCKPCK2',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
      categories: [
        {
          categoryCode: '36',
          categoryId: 6,
          isDisplayed: true,
          parentCategory: {
            categoryId: 2,
            categoryCode: '27',
            isDisplayed: true,
            content: {
              name: 'Camping',
              slug: 'camping',
            },
          },
          content: {
            name: 'Backpacks',
            slug: 'backpacks',
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
        price: 145,
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
              value: 'BCKPCK3',
              stringValue: 'BCKPCK3',
            },
            {
              value: 'PAD3',
              stringValue: 'PAD3',
            },
            {
              value: 'KAY2',
              stringValue: 'KAY2',
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
              value: 2,
              stringValue: null,
            },
          ],
        },
        {
          attributeFQN: 'tenant~rating',
          attributeDetail: {
            name: 'Rating',
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
          attributeFQN: 'tenant~product-upsell',
          attributeDetail: {
            name: 'Product Upsells',
          },
          isHidden: false,
          values: [
            {
              value: 'BIKE1',
              stringValue: 'BIKE1',
            },
            {
              value: 'BOT1',
              stringValue: 'BOT1',
            },
            {
              value: 'BCKPCK3',
              stringValue: 'BCKPCK3',
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
              value: 'Red',
              stringValue: 'Red',
            },
            {
              value: 'Tan',
              stringValue: 'Tan',
            },
          ],
        },
        {
          attributeFQN: 'tenant~isrecommended',
          attributeDetail: {
            name: 'isRecommended',
          },
          isHidden: false,
          values: [
            {
              value: 'Employee',
              stringValue: 'Employee',
            },
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
          attributeFQN: 'tenant~brand',
          attributeDetail: {
            name: 'Brand',
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
          attributeFQN: 'tenant~video-url',
          attributeDetail: {
            name: 'video-url',
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
          {
            imageUrl: `${imageBaseURL}d41eb955-43db-451b-a34f-2fff98523c66`,
            imageLabel: null,
            mediaType: null,
            productImageGroupId: 'default',
          },
          {
            imageUrl: `${imageBaseURL}c995ad6f-7bf3-46f7-b7d2-4fdcdd7e22df`,
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
              value: 'Red',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Red',
            },
            {
              value: 'Tan',
              isSelected: false,
              deltaPrice: null,
              stringValue: 'Tan',
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
          label: 'Teal',
          value: 'teal',
          filterValue: 'Tenant~color:teal',
          isDisplayed: true,
          count: 1,
          isApplied: false,
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
          isApplied: false,
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
          label: 'Patagonia',
          value: 'patagonia',
          filterValue: 'Tenant~brand:patagonia',
          isDisplayed: true,
          count: 2,
          isApplied: false,
          childrenFacetValues: null,
        },
        {
          label: 'Salomon',
          value: 'salomon',
          filterValue: 'Tenant~brand:salomon',
          isDisplayed: true,
          count: 1,
          isApplied: false,
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
