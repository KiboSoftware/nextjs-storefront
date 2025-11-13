import { useCallback } from 'react'

import { B2BAccount } from '@/lib/gql/types'

export const useAccountSearch = (accounts?: B2BAccount[]) => {
  // Check if an account or any of its descendants match the search query
  const accountMatchesSearch = useCallback(
    (accountId: number, query: string): boolean => {
      if (!query.trim()) return true

      const account = accounts?.find((acc) => acc.id === accountId)
      if (!account) return false

      // Check if current account name matches
      const accountName = account.companyOrOrganization || ''
      if (accountName.toLowerCase().includes(query.toLowerCase())) {
        return true
      }

      // Check if any descendants match
      const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
        if (!accounts) return []
        return accounts.filter((acc) => acc.parentAccountId === parentId)
      }

      const children = getChildAccountsForParent(accountId)
      return children.some((child) => accountMatchesSearch(child.id, query))
    },
    [accounts]
  )

  // Check if an account should be visible (either matches search or has matching descendants)
  const shouldShowAccount = useCallback(
    (accountId: number, query: string): boolean => {
      if (!query.trim()) return true
      return accountMatchesSearch(accountId, query)
    },
    [accountMatchesSearch]
  )

  return {
    accountMatchesSearch,
    shouldShowAccount,
  }
}
