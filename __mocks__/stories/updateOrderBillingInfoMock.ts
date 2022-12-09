import { CrBillingInfo } from '@/lib/gql/types'

export const updateOrderBillingInfoMock: { updateOrderBillingInfo: CrBillingInfo } = {
  updateOrderBillingInfo: {
    billingContact: {
      id: null,
      firstName: 'John',
      middleNameOrInitial: null,
      lastNameOrSurname: 'Doe',
      email: 'chandradeepta.laha@kibocommerce.com',
      address: {
        address1: 'Lamar Street',
        address2: '23/1',
        address3: null,
        addressType: null,
        stateOrProvince: 'TX',
        postalOrZipCode: '87878',
        cityOrTown: 'Austin',
        countryCode: 'US',
        isValidated: false,
      },
      phoneNumbers: {
        home: '9898495849',
      },
    },
  },
}
