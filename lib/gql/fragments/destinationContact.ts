export const destinationContactFragment = `
fragment destinationContactFragment on CrContact {
      id
        email
        firstName
        middleNameOrInitial
        lastNameOrSurname
        phoneNumbers{
          home
        }
        address{
          address1
          address2
          address3
          address4
          cityOrTown
          stateOrProvince
          postalOrZipCode
          countryCode
          isValidated
          addressType
        }
    }
`
