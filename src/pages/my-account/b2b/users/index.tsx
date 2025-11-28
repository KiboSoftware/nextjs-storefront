import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { UsersTemplate } from '@/components/page-templates'
import { getB2BAccountHierarchy, getMultipleB2BAccountUserBehaviors } from '@/lib/api/operations'

interface UsersPageProps {
  accountUserBehaviors?: Record<number, number[]>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const hierarchyResponse = await getB2BAccountHierarchy(
    req as NextApiRequest,
    res as NextApiResponse
  )

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
      accountUserBehaviors: accountUserBehaviors || {},
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const B2BUsersPage: NextPage<UsersPageProps> = (props) => {
  return (
    <>
      <UsersTemplate {...props} />
    </>
  )
}

export default B2BUsersPage
