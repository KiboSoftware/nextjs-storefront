import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountHierarchyTemplate } from '@/components/page-templates'
import { getB2BAccountHierarchy } from '@/lib/api/operations'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const hierarchyResponse = await getB2BAccountHierarchy(
    req as NextApiRequest,
    res as NextApiResponse
  )

  return {
    props: {
      initialData: hierarchyResponse,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const AccountHierarchyPage: NextPage = (props) => {
  return <AccountHierarchyTemplate {...props} />
}

export default AccountHierarchyPage
