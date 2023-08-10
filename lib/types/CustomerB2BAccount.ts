import { B2BAccount } from '../gql/types'

export interface AccountHierarchyNode {
  id: number
  children: AccountHierarchyNode[]
}

export interface B2BAccountHierarchyResult {
  accounts: B2BAccount[]
  hierarchy: AccountHierarchyNode
}

export interface CreateCustomerB2bAccountParams {
  parentAccount?: B2BAccount
  companyOrOrganization: string
  taxId?: string
  firstName: string
  lastName: string
  emailAddress: string
}
