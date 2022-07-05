import type { LocationCollection } from '@/lib/gql/types'

export const locationCollectionMock: { spLocations: LocationCollection } = {
  spLocations: {
    items: [
      {
        code: 'ALB',
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
        name: 'Albuquerque',
        phone: '505-505-5055',
        address: {
          address1: '2100 Louisiana Blvd NE',
          address2: '',
          cityOrTown: 'Albuquerque',
          stateOrProvince: 'AZ',
          postalOrZipCode: '87110',
        },
        regularHours: {
          monday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
          },
          tuesday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
          },
          wednesday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
          },
          thursday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
          },
          friday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
          },
          saturday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
          },
          sunday: {
            openTime: '9:00am',
            closeTime: '9:00pm',
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
