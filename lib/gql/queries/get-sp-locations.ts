const getSpLocationsQuery = /* GraphQL */ `
  query GetISPULocations($filter: String) {
    spLocations(filter: $filter) {
      items {
        code
        fulfillmentTypes {
          code
          name
        }
        name
        phone
        address {
          address1
          address2
          cityOrTown
          stateOrProvince
          postalOrZipCode
        }
        regularHours {
          monday {
            openTime
            closeTime
          }
          tuesday {
            openTime
            closeTime
          }
          wednesday {
            openTime
            closeTime
          }
          thursday {
            openTime
            closeTime
          }
          friday {
            openTime
            closeTime
          }
          saturday {
            openTime
            closeTime
          }
          sunday {
            openTime
            closeTime
          }
        }
        geo {
          lat
          lng
        }
      }
    }
  }
`

export default getSpLocationsQuery
