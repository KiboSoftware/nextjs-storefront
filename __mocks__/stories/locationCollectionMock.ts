import type { LocationCollection } from '@/lib/gql/types'

export const locationCollectionMock: { spLocations: LocationCollection } = {
  spLocations: {
    items: [
      {
        code: 'RICHMOND',
        fulfillmentTypes: [
          {
            code: 'DS',
            name: 'Direct Ship',
          },
          {
            code: 'SP',
            name: 'In Store Pickup',
          },
        ],
        name: 'Richmond',
        phone: '505-505-5055',
        address: {
          address1: '2100 Louisiana Blvd NE',
          address2: '',
          cityOrTown: 'Richmond',
          stateOrProvince: 'VA',
          postalOrZipCode: '87110',
        },
        regularHours: {
          monday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
          tuesday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
          wednesday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
          thursday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
          friday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
          saturday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
          sunday: {
            openTime: '9:00',
            closeTime: '9:00',
          },
        },
        geo: {
          lat: 35.1075,
          lng: -106.576,
        },
      },
    ],
    pageCount: 1,
    pageSize: 1,
    startIndex: 1,
    totalCount: 1,
  },
}
