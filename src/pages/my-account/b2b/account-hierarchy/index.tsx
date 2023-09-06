import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountHierarchyTemplate } from '@/components/page-templates'
import getB2BAccountHierarchy from '@/lib/api/operations/get-b2b-account-hierarchy'
import { buildAccountHierarchy } from '@/lib/helpers'

import { B2BAccount } from '@/lib/gql/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const hierarchyResponse = await getB2BAccountHierarchy(
    req as NextApiRequest,
    res as NextApiResponse
  )

  const hierarchy = hierarchyResponse?.accounts
    ? buildAccountHierarchy(hierarchyResponse?.accounts as B2BAccount[])
    : []

  const initialData = {
    accounts: hierarchyResponse?.accounts || [],
    hierarchy,
  }

  return {
    props: {
      initialData,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const AccountHierarchyPage: NextPage = (props) => {
  return <AccountHierarchyTemplate {...props} />
}

export default AccountHierarchyPage
