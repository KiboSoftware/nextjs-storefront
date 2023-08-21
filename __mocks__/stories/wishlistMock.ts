import { Maybe, WishlistCollection } from '@/lib/gql/types'

export const wishlistMock: Maybe<WishlistCollection> | any = {
  items: [
    {
      customerAccountId: 1143,
      name: 'default-wishlist',
      id: '13cc2e5236615b000102f572000045a4',
      auditInfo: {
        createBy: 'abc@kibocommerce.com',
        createDate: new Date().getTime(),
      },
      items: [
        {
          id: '3a766637bfb04a9b87efaed200e191d3',
          quantity: 2,
          total: 475,
          subtotal: 475,
          product: {
            productCode: 'MS-CAM-002',
            name: 'GoPro Hero3 Helmet Cam',
            description:
              'With up to 1080p HD video, the smaller and lighter GoPro HERO3+ Silver Edition helmet cam is more powerful than ever, making it the most advanced Silver Edition camera yet.',
            imageUrl:
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/430aba55-b1ce-4bd0-bc09-8abcd2c6e8c0',
            variationProductCode: null,
            options: [],
            price: {
              price: 475,
              salePrice: null,
            },
          },
        },
        {
          id: 'f6a5af90091d417fbe1aaed800cad475',
          quantity: 1,
          total: 10,
          subtotal: 10,
          product: {
            productCode: 'MS-BTL-005',
            name: 'Wide-Mouth Loop-Top Watter Bottle',
            description:
              'Guaranteed leakproof, this Mystic Nalgene wide-mouth loop-top water bottle is a must-have for camping or campus.',
            imageUrl:
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/4bc1243b-4b46-4672-8276-cb3d03204c83',
            variationProductCode: null,
            options: [],
            price: {
              price: 10,
              salePrice: null,
            },
          },
        },
      ],
    },
    {
      customerAccountId: 1001,
      auditInfo: {
        createDate: 1688650739029,
        createBy: 'c4c4c72d881c4b01bdda6148bf8f4f65',
        updateDate: 1688650739029,
        updateBy: 'c4c4c72d881c4b01bdda6148bf8f4f65',
      },
      name: 'new list 4',
      id: '15a721f3222b3c0001d882d40000933b',
      items: [
        {
          id: '84590038fea64ba68928b03700e0f038',
          quantity: 1,
          total: 45.99,
          subtotal: 45.99,
          product: {
            productCode: '00011',
            name: 'Sneaker',
            description: 'Good sneakers',
            imageUrl:
              '//cdn-sb.mozu.com/37691-59868/cms/59868/files/79ca4ec6-e2ce-46d3-9908-79fab8b7d451',
            variationProductCode: null,
            options: [],
            price: {
              price: 50.99,
              salePrice: 45.99,
            },
            properties: [
              {
                attributeFQN: 'tenant~availability',
                values: [
                  {
                    value: '1-2days',
                    stringValue: 'Usually Ships in 1 to 2 Days',
                  },
                ],
              },
              {
                attributeFQN: 'tenant~rating',
                values: [
                  {
                    value: 2,
                    stringValue: null,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      customerAccountId: 1001,
      auditInfo: {
        createDate: 1688557820861,
        createBy: 'c4c4c72d881c4b01bdda6148bf8f4f65',
        updateDate: 1688557820861,
        updateBy: 'c4c4c72d881c4b01bdda6148bf8f4f65',
      },
      name: 'new list 2',
      id: '15a5b6fd222b3c0001d85dfd0000933b',
      items: [
        {
          id: 'c1a02016c4464918b10eb03600c31a21',
          quantity: 1,
          total: 0,
          subtotal: 0,
          product: {
            productCode: 'DOWGP',
            name: 'DOWSIL General Purpose Sealant is a one-part, acetoxy cure silicone sealant for general purpose applications',
            description:
              'DOWSIL General Purpose Sealant is a one-part, acetoxy cure silicone sealant for general purpose applications',
            imageUrl:
              '//cdn-sb.mozu.com/37691-59868/cms/59868/files/2f521114-b412-46d8-8c2d-437681e5d647',
            variationProductCode: null,
            options: [],
            price: {
              price: 15.35,
              salePrice: 0,
            },
            properties: [
              {
                attributeFQN: 'tenant~availability',
                values: [
                  {
                    value: '2-3weeks',
                    stringValue: 'Usually Ships in 2 to 3 Weeks',
                  },
                ],
              },
              {
                attributeFQN: 'tenant~rating',
                values: [
                  {
                    value: 6,
                    stringValue: null,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      customerAccountId: 1143,
      name: 'Wishlist 3',
      id: '13cc2e5236615b000102f572000045d7',
      auditInfo: {
        createBy: 'abc@kibocommerce.com',
        createDate: new Date().getTime(),
      },
      items: [],
    },
  ],
  pageCount: 1,
  pageSize: 5,
  startIndex: 1,
  totalCount: 4,
}
