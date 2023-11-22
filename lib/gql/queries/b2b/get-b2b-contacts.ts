// import { accountHierarchyNodeRecursive } from '@/lib/gql/fragments'

const getB2BContactsQuery = /* GraphQL */ `
  query getB2BContacts(
    $startIndex: Int
    $pageSize: Int
    $sortBy: String
    $filter: String
    $q: String
    $qLimit: Int
  ) {
    getB2BContacts(
      startIndex: $startIndex
      pageSize: $pageSize
      sortBy: $sortBy
      filter: $filter
      q: $q
      qLimit: $qLimit
    ) {
      startIndex
      pageSize
      pageCount
      totalCount
      items {
        accountName
        email
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
  }
`

export default getB2BContactsQuery
