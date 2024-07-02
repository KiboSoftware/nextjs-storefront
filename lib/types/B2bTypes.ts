import { CuAuditInfo } from '../gql/types'

export interface SortingValues {
  value: string
  id: string
}

export interface QuoteSortingOptions {
  options: SortingValues[]
  selected: string
}

export interface QuoteFilters {
  expirationDate?: string
  createDate?: string
  status?: string
  name?: string
  number?: string
  others?: string
}

export type TenantGroup = {
  code: string
  name: string
  description: string
  auditInfo: CuAuditInfo
}

export interface B2BUserGroup {
  name: string
  code: string
  accountId: number
  description: string
}

export interface UserGroupParam {
  params: UserGroupCode
}

interface UserGroupCode {
  accountId: number
  userId: string
  groupCode: string
}
