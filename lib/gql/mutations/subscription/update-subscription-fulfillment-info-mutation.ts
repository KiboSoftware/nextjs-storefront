const updateSubscriptionFulfillmentInfo = /* GraphQL */ `
  mutation updateSubscriptionFulfillmentInfo(
    $subscriptionId: String!
    $fulfillmentInfoInput: SBFulfillmentInfoInput
  ) {
    subscription: updateSubscriptionFulfillmentInfo(
      subscriptionId: $subscriptionId
      fulfillmentInfoInput: $fulfillmentInfoInput
    ) {
      fulfillmentContact {
        id
        firstName
        middleNameOrInitial
        lastNameOrSurname
        email
        companyOrOrganization
        address {
          address1
          address2
          address3
          address4
          addressType
          stateOrProvince
          postalOrZipCode
          cityOrTown
          countryCode
          isValidated
        }
        phoneNumbers {
          home
          mobile
          work
        }
      }
    }
  }
`

export default updateSubscriptionFulfillmentInfo
