import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddUserTemplate } from '@/components/page-templates'
import {
  getB2BAccountHierarchy,
  getB2BUsers,
  getMultipleB2BAccountUserBehaviors,
  getUsersByEmailAcrossAccounts,
  getRolesAcrossAccounts,
} from '@/lib/api/operations'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-across-accounts'
import { B2BAccountHierarchyResult } from '@/lib/types'

import { B2BUser, B2BUserCollection } from '@/lib/gql/types'

interface EditUserPageProps {
  initialData?: B2BAccountHierarchyResult
  accountUserBehaviors?: Record<number, number[]>
  b2BUser?: B2BUser
  b2BUsersAcrossAccounts?: Record<number, B2BUserCollection>
  accountRoles?: Record<number, GetRolesAsyncResponse>
  isEditMode: boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res, params } = context
  const userId = params?.userId as string

  const hierarchyResponse = await getB2BAccountHierarchy(
    req as NextApiRequest,
    res as NextApiResponse
  )

  // Get account IDs from hierarchy
  const accountIds = hierarchyResponse?.accounts?.map((account) => account.id).filter(Boolean) || []

  // Fetch behaviors for all accounts
  let accountUserBehaviors = {}
  try {
    accountUserBehaviors = await getMultipleB2BAccountUserBehaviors(
      req as NextApiRequest,
      res as NextApiResponse,
      accountIds as number[]
    )
  } catch (error) {
    console.error('Error fetching account user behaviors:', error)
    // Continue with empty behaviors - non-critical for page load
  }

  // Fetch roles for all accounts
  let accountRoles: Record<number, GetRolesAsyncResponse> = {}
  try {
    accountRoles = await getRolesAcrossAccounts(
      req as NextApiRequest,
      res as NextApiResponse,
      accountIds as number[]
    )
  } catch (error) {
    console.error('Error fetching account roles:', error)
    // Continue with empty roles - non-critical for page load
  }

  // Fetch the user data if userId is provided
  let b2BUser: B2BUser | null = null
  let b2BUsersAcrossAccounts: Record<number, B2BUserCollection> = {}

  if (userId) {
    try {
      const usersResponse = await getB2BUsers(req as NextApiRequest, res as NextApiResponse, userId)
      // getB2BUsers returns a collection, get the first user
      b2BUser = usersResponse?.items?.[0] || null

      // Fetch all users with the same email address across all accounts
      if (b2BUser?.emailAddress && accountIds.length > 0) {
        b2BUsersAcrossAccounts = await getUsersByEmailAcrossAccounts(
          req as NextApiRequest,
          res as NextApiResponse,
          accountIds as number[],
          b2BUser.emailAddress
        )

        // Filter accountRoles to only include accounts present in b2BUsersAcrossAccounts
        const accountIdsWithUsers = Object.keys(b2BUsersAcrossAccounts).map(Number)
        const filteredAccountRoles: Record<number, GetRolesAsyncResponse> = {}

        accountIdsWithUsers.forEach((accountId) => {
          if (accountRoles[accountId]) {
            filteredAccountRoles[accountId] = accountRoles[accountId]
          }
        })

        accountRoles = filteredAccountRoles
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return {
    props: {
      initialData: hierarchyResponse,
      accountUserBehaviors: accountUserBehaviors || {},
      b2BUser: b2BUser || null,
      b2BUsersAcrossAccounts: b2BUsersAcrossAccounts,
      accountRoles: accountRoles,
      isEditMode: true,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const EditUserPage: NextPage<EditUserPageProps> = (props) => {
  return (
    <>
      <AddUserTemplate {...props} />
    </>
  )
}

export default EditUserPage
