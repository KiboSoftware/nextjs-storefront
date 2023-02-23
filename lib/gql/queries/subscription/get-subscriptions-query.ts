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
            email
            address {
              address1
              address2
              cityOrTown
              stateOrProvince
              postalOrZipCode
              countryCode
            }
            phoneNumbers {
              home
              mobile
              work
            }
          }
          shippingMethodCode
          shippingMethodName
        }
        frequency {
          unit
          value
        }
        nextOrderDate
        payment {
          amountCredited
          amountCollected
          amountRequested
          paymentType
          paymentServiceTransactionId
          billingInfo {
            card {
              paymentOrCardType
              expireMonth
              expireYear
              paymentServiceCardId
              cardNumberPartOrMask
            }
            billingContact {
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
          }
        }
      }
    }
  }
`
export default getSubscriptionsQuery
