import { subscriptionItemFragment } from '@/lib/gql/fragments'

const getSubscriptionsQuery = /* GraphQL */ `
  ${subscriptionItemFragment}
  query getSubscriptions {
    subscriptions {
      totalCount
      items {
        id
        parentOrderId
        number
        status
        items {
          ...subscriptionItemFragment
        }
        fulfillmentInfo {
          fulfillmentContact {
            firstName
            lastNameOrSurname
            address {
              address1
              address2
              cityOrTown
              stateOrProvince
              postalOrZipCode
              countryCode
            }
          }
        }
        frequency {
          unit
          value
        }
        nextOrderDate
      }
    }
  }
`
export default getSubscriptionsQuery
