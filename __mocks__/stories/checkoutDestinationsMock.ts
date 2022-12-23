import type { CrDestination } from '@/lib/gql/types'

export const checkoutDestinationsMock: { checkoutDestinations: CrDestination[] } = {
  checkoutDestinations: [
    {
      destinationContact: {
        id: 1487,
        email: 'geetanshu1211@gmail.com',
        firstName: 'Subha',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Chaudhari',
        phoneNumbers: {
          home: '7654323456',
        },
        address: {
          address1: 'Niainital',
          address2: '',
          address3: null,
          cityOrTown: 'WC',
          stateOrProvince: 'NY',
          postalOrZipCode: '465456',
          countryCode: 'US',
          addressType: 'Residential',
        },
      },
      id: '43db7b4429cb46719607af4d00b09bfa',
      isDestinationCommercial: null,
    },
    {
      destinationContact: {
        id: null,
        email: 'amolp@dev.com',
        firstName: 'jon',
        middleNameOrInitial: null,
        lastNameOrSurname: 'doe',
        phoneNumbers: {
          home: '3354533453',
        },
        address: {
          address1: 'street',
          address2: 'apartment',
          address3: null,
          cityOrTown: 'city',
          stateOrProvince: 'state',
          postalOrZipCode: '23423',
          countryCode: 'US',
          addressType: null,
        },
      },
      id: 'd9681c36b9f0436db112af53003c9db1',
      isDestinationCommercial: false,
    },
  ],
}
