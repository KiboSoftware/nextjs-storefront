import { CustomerContactCollection } from '@/lib/gql/types'

export const getUserAddressesMock: { customerAccountContacts: CustomerContactCollection } = {
  customerAccountContacts: {
    pageCount: 1,
    totalCount: 1,
    pageSize: 1,
    startIndex: 0,
    items: [
      {
        accountId: 1012,
        types: [
          {
            name: 'Billing',
            isPrimary: false,
          },
        ],
        auditInfo: {
          updateDate: 1659525044021,
          createDate: 1659525044021,
          updateBy: 'tbd',
          createBy: 'tbd',
        },
        faxNumber: null,
        label: null,
        id: 1495,
        email: 'Chandradeepta.Laha@kibocommerce.com',
        firstName: 'Chandradeepta',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Laha',
        companyOrOrganization: null,
        phoneNumbers: {
          home: '7875675849',
          mobile: null,
          work: null,
        },
        address: {
          address1: '300, Lamar street',
          address2: null,
          address3: null,
          address4: null,
          cityOrTown: 'Austin',
          stateOrProvince: 'TX',
          postalOrZipCode: '34543',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
    ],
  },
}
