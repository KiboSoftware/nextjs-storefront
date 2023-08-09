import { MutationCreateCustomerB2bAccountArgs } from '@/lib/gql/types'

export const b2BAccountInputMock: MutationCreateCustomerB2bAccountArgs = {
  b2BAccountInput: {
    id: 0,
    parentAccountId: 1023,
    taxId: '123234',
    companyOrOrganization: 'Ignitiv Corp',
    users: [
      {
        firstName: 'Ayush',
        lastName: 'Porwal',
        emailAddress: 'ayush.porwal@gmail.com',
        userName: 'ayush.porwal@gmail.com',
        localeCode: 'en-IN',
      },
    ],
  },
}
