// import { accountHierarchyNodeRecursive } from '@/lib/gql/fragments'

const getB2BAccountHierarchyQuery = /* GraphQL */ `
  query getB2BAccountHierarchy($accountId: Int!) {
    getB2BAccountHierarchy(accountId: $accountId) {
      accounts {
        users {
          emailAddress
          userName
          firstName
          lastName
          localeCode
          userId
          isActive
          roles {
            roleId
            roleName
          }
        }
        isActive
        rootAccountId
        parentAccountId
        id
        taxId
        accountType
        companyOrOrganization
        contacts {
          accountId
          id
          email
          firstName
          lastNameOrSurname
          companyOrOrganization
        }
      }
    }
  }
`

export default getB2BAccountHierarchyQuery
