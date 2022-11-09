import { Destination } from '@/lib/gql/types'

export const checkoutDestinationsMock: { checkoutDestinations: Destination[] } = {
  checkoutDestinations: [
    {
      isDestinationCommercial: false,
      destinationContact: {
        id: 1441,
        email: null,
        firstName: 'Geetanshu',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Chhabra',
        companyOrOrganization: null,
        phoneNumbers: {
          home: '1234567891',
          mobile: null,
          work: null,
        },
        address: {
          address1: 'abc',
          address2: 'abc',
          address3: null,
          address4: null,
          cityOrTown: 'abc',
          stateOrProvince: 'abc',
          postalOrZipCode: '45236',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
    },
  ],
}
