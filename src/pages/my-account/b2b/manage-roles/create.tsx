import React, { useMemo } from 'react'

import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CreateRoleTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { useGetBehaviorCategories } from '@/hooks/mutations/b2b/manage-roles/useGetBehaviorCategories/useGetBehaviorCategories'
import { useGetBehaviors } from '@/hooks/mutations/b2b/manage-roles/useGetBehaviors/useGetBehaviors'
import { useGetMultipleB2BAccountUserBehaviors } from '@/hooks/queries/b2b/manage-roles/useGetB2BAccountUserBehaviors/useGetB2BAccountUserBehaviors'
import { getB2BAccountHierarchy, getCurrentUser } from '@/lib/api/operations'
import { B2BAccountHierarchyResult } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

interface CreateRolePageProps {
  customerAccount?: CustomerAccount
  initialData?: B2BAccountHierarchyResult
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const hierarchyResponse = await getB2BAccountHierarchy(
    req as NextApiRequest,
    res as NextApiResponse
  )

  const response = await getCurrentUser(req as NextApiRequest, res as NextApiResponse)

  return {
    props: {
      customerAccount: response?.customerAccount,
      initialData: hierarchyResponse,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const CreateRolePage: NextPage<CreateRolePageProps> = (props) => {
  const { customerAccount: customerAccountFromServer, initialData } = props
  const router = useRouter()

  const { user: customerAccountFromClient } = useAuthContext()

  const customerAccount = {
    ...customerAccountFromServer,
    ...customerAccountFromClient,
  } as CustomerAccount

  // Fetch behavior categories and behaviors
  const { behaviorCategories, isLoading: categoriesLoading } = useGetBehaviorCategories()
  const { behaviors, isLoading: behaviorsLoading } = useGetBehaviors()

  // Get account IDs for multiple account user behaviors query
  const accountIds = useMemo(
    () => (initialData?.accounts?.map((account) => account.id).filter(Boolean) as number[]) || [],
    [initialData?.accounts]
  )
  const userId = customerAccount?.userId || ''

  // Fetch user behaviors for multiple accounts
  const {
    results: accountUserBehaviorResults,
    allBehaviors: accountUserBehaviors,
    isLoading: behaviorLoading,
  } = useGetMultipleB2BAccountUserBehaviors({
    accountIds,
    userId: userId as string,
  })

  const handleBackClick = () => {
    router.push('/my-account/b2b/manage-roles')
  }

  return (
    <CreateRoleTemplate
      onBackClick={handleBackClick}
      user={customerAccount}
      initialData={initialData}
      behaviorCategories={behaviorCategories}
      behaviors={behaviors}
      categoriesLoading={categoriesLoading || false}
      behaviorsLoading={behaviorsLoading || false}
      accountUserBehaviorResults={accountUserBehaviorResults}
      accountUserBehaviors={accountUserBehaviors}
      behaviorLoading={behaviorLoading || false}
    />
  )
}

export default CreateRolePage
