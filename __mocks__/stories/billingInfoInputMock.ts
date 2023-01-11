import { CrBillingInfoInput } from '@/lib/gql/types'

export const billingInfoInputMock: CrBillingInfoInput = {
  billingContact: {
    email: 'chandradeepta.laha@kibocommerce.com',
    firstName: 'John',
    middleNameOrInitial: null,
    lastNameOrSurname: 'Doe',
    companyOrOrganization: null,
    phoneNumbers: {
      home: '9898495849',
      mobile: null,
      work: null,
    },
    address: {
      address1: 'Lamar Street',
      address2: '23/1',
      address3: null,
      address4: null,
      cityOrTown: 'Austin',
      stateOrProvince: 'TX',
      postalOrZipCode: '87878',
      countryCode: 'US',
      addressType: null,
      isValidated: false,
    },
    id: null,
  },
  card: {
    isCardInfoSaved: false,
    paymentOrCardType: 'VISA',
    expireMonth: 1,
    expireYear: 2026,
    paymentServiceCardId: '91ee65434560404488c382a9295526ae',
    cardNumberPartOrMask: '************1111',
    isUsedRecurring: false,
    isTokenized: true,
  },
  paymentType: 'CreditCard',
  paymentWorkflow: 'Mozu',
  isSameBillingShippingAddress: false,
}
