import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddUserTemplate } from '@/components/page-templates'
import {
  getB2BAccountHierarchy,
  getMultipleB2BAccountUserBehaviors,
  getRolesAcrossAccounts,
} from '@/lib/api/operations'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-across-accounts'
import { B2BAccountHierarchyResult } from '@/lib/types'

interface AddUserPageProps {
  initialData?: B2BAccountHierarchyResult
  accountUserBehaviors?: Record<number, number[]>
  accountRoles?: Record<number, GetRolesAsyncResponse>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

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

  return {
    props: {
      initialData: hierarchyResponse,
      accountUserBehaviors: accountUserBehaviors || {},
      accountRoles: accountRoles,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const AddUserPage: NextPage<AddUserPageProps> = (props) => {
  return (
    <>
      <AddUserTemplate {...props} />
    </>
  )
}

export default AddUserPage
