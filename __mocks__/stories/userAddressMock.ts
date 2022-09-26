import { CustomerContactCollection } from '@/lib/gql/types'

export const userAddressResponse: CustomerContactCollection = {
  pageCount: 1,
  totalCount: 2,
  pageSize: 1,
  startIndex: 1,
  items: [
    {
      accountId: 1012,
      types: [
        {
          name: 'Shipping',
          isPrimary: false,
        },
      ],
      auditInfo: {
        updateDate: 1658897013793,
        createDate: 1653549085305,
        updateBy: 'tbd',
        createBy: 'tbd',
      },
      faxNumber: null,
      label: null,
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
    {
      accountId: 1012,
      types: [
        {
          name: 'Shipping',
          isPrimary: true,
        },
      ],
      auditInfo: {
        updateDate: 1658897013817,
        createDate: 1658897013817,
        updateBy: 'tbd',
        createBy: 'tbd',
      },
      faxNumber: null,
      label: null,
      id: 1487,
      email: 'geetanshu1211@gmail.com',
      firstName: 'Subha',
      middleNameOrInitial: null,
      lastNameOrSurname: 'Chaudhari',
      companyOrOrganization: null,
      phoneNumbers: {
        home: '7654323456',
        mobile: null,
        work: null,
      },
      address: {
        address1: 'Niainital',
        address2: '',
        address3: null,
        address4: null,
        cityOrTown: 'WC',
        stateOrProvince: 'NY',
        postalOrZipCode: '46545',
        countryCode: 'US',
        addressType: 'Residential',
        isValidated: true,
      },
    },
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
}

export const userAddressMock: { customerAccountContacts: CustomerContactCollection } = {
  customerAccountContacts: userAddressResponse,
}
