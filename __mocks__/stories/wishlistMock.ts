import { Maybe, WishlistCollection } from '@/lib/gql/types'

export const wishlistMock: Maybe<WishlistCollection> | any = {
  items: [
    {
      customerAccountId: 1143,
      name: 'default-wishlist',
      id: '13cc2e5236615b000102f572000045a4',
      items: [
        {
          id: '3a766637bfb04a9b87efaed200e191d3',
          quantity: 1,
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
  ],
  pageCount: 1,
  pageSize: 1,
  startIndex: 1,
  totalCount: 1,
}
