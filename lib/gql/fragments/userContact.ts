export const userContactFields = /* GraphQL */ `
  fragment userContactFields on CustomerContact {
    accountId
    types {
      name
      isPrimary
    }
    auditInfo {
      updateDate
      createDate
      updateBy
      createBy
    }
    faxNumber
    label
    id
    email
    firstName
    middleNameOrInitial
    lastNameOrSurname
    companyOrOrganization
    phoneNumbers {
      home
      mobile
      work
    }
    address {
      address1
      address2
      address3
      address4
      cityOrTown
      stateOrProvince
      postalOrZipCode
      countryCode
      addressType
      isValidated
    }
  }
`
