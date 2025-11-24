import React, { useMemo, useCallback } from 'react'

import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useRouter } from 'next/router'

import { CreateRoleTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import {
  getB2BAccountHierarchy,
  getCurrentUser,
  getBehaviorCategories,
  getBehaviors,
  getMultipleB2BAccountUserBehaviors,
} from '@/lib/api/operations'
import type { BehaviorCategory } from '@/lib/api/operations/get-behavior-categories'
import type { Behavior } from '@/lib/api/operations/get-behaviors'
import { serverSideTranslations } from '@/lib/helpers/serverSideTranslations'
import { B2BAccountHierarchyResult } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

interface CreateRolePageProps {
  customerAccount?: CustomerAccount
  initialData?: B2BAccountHierarchyResult
  behaviorCategories?: BehaviorCategory[]
  behaviors?: Behavior[]
  accountUserBehaviors?: Record<number, number[]>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  try {
    const [hierarchyResponse, currentUserResponse, behaviorCategoriesResponse, behaviorsResponse] =
      await Promise.all([
        getB2BAccountHierarchy(req as NextApiRequest, res as NextApiResponse),
        getCurrentUser(req as NextApiRequest, res as NextApiResponse),
        getBehaviorCategories(req as NextApiRequest, res as NextApiResponse),
        getBehaviors(req as NextApiRequest, res as NextApiResponse),
      ])

    // Get account IDs from hierarchy
    const accountIds =
      hierarchyResponse?.accounts?.map((account) => account.id).filter(Boolean) || []

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

    return {
      props: {
        customerAccount: currentUserResponse?.customerAccount,
        initialData: hierarchyResponse,
        behaviorCategories: behaviorCategoriesResponse?.items || [],
        behaviors: behaviorsResponse?.items || [],
        accountUserBehaviors: accountUserBehaviors || {},
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    }
  } catch (error) {
    console.error('Error in getServerSideProps for create role page:', error)

    // Return error page or redirect
    return {
      redirect: {
        destination: '/my-account/b2b/manage-roles',
        permanent: false,
      },
    }
  }
}

const CreateRolePage: NextPage<CreateRolePageProps> = (props) => {
  const {
    customerAccount: customerAccountFromServer,
    initialData,
    behaviorCategories = [],
    behaviors = [],
    accountUserBehaviors = {},
  } = props
  const router = useRouter()

  const { user: customerAccountFromClient } = useAuthContext()

  // Memoize merged customer account to prevent unnecessary re-renders
  const customerAccount = useMemo(
    () =>
      ({
        ...customerAccountFromServer,
        ...customerAccountFromClient,
      } as CustomerAccount),
    [customerAccountFromServer, customerAccountFromClient]
  )

  // Convert accountUserBehaviors Record to array format expected by RoleForm
  const accountUserBehaviorResults = useMemo(
    () =>
      Object.entries(accountUserBehaviors).map(([accountId, behaviors]) => ({
        accountId: Number(accountId),
        behaviors,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      })),
    [accountUserBehaviors]
  )

  // Memoize behavior categories object to prevent creating new reference
  const behaviorCategoriesObj = useMemo(() => ({ items: behaviorCategories }), [behaviorCategories])

  // Memoize behaviors object to prevent creating new reference
  const behaviorsObj = useMemo(() => ({ items: behaviors }), [behaviors])

  // Memoize callback to prevent creating new function reference on every render
  const handleBackClick = useCallback(() => {
    router.push('/my-account/b2b/manage-roles')
  }, [router])

  return (
    <CreateRoleTemplate
      onBackClick={handleBackClick}
      user={customerAccount}
      initialData={initialData}
      behaviorCategories={behaviorCategoriesObj}
      behaviors={behaviorsObj}
      accountUserBehaviorResults={accountUserBehaviorResults}
    />
  )
}

export default CreateRolePage
