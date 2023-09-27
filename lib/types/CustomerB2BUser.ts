import type { B2BUserCollection, B2BUser, CustomerAccount } from '@/lib/gql/types'
export interface B2BUserInput {
  firstName?: string | null
  lastName?: string | null
  emailAddress?: string | null
  userName?: string | null
  localeCode?: string | null
  isActive?: boolean | null
  role?: string | null
}

export interface QueryB2BUserArgs {
  accountId: number
  filter?: string
  pageSize?: number
  startIndex?: number
  q?: string
}
export interface CustomerB2BUserParams {
  removeCustomerB2bAccountUser?: boolean
  delay?: number
}

export interface CustomerB2BUserRole {
  roleName: string
  roleId: number
}

export interface B2BUserResultType {
  data?: B2BUserCollection
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: any
}

export interface CreateCustomerB2bUserParams {
  user: CustomerAccount | undefined
  values: B2BUserInput
  roles: CustomerB2BUserRole[]
}

export interface UpdateCustomerB2bUserParams {
  user: CustomerAccount | undefined
  b2BUser: B2BUser | null | undefined
  values: B2BUserInput
}

export interface B2bUserRoleParams {
  user: CustomerAccount | undefined
  b2BUser: B2BUser | undefined
  values: B2BUserInput
  roles: CustomerB2BUserRole[]
}
