import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountHierarchyTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { getB2BAccountHierarchy, getCurrentUser } from '@/lib/api/operations'

interface AccountHierarchyPageProps {
  customerAccount?: any
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
      initialData: hierarchyResponse,
      customerAccount: response?.customerAccount,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const AccountHierarchyPage: NextPage<AccountHierarchyPageProps> = (props) => {
  const { customerAccount: customerAccountFromServer } = props

  const { user: customerAccountFromClient } = useAuthContext()

  const customerAccount = {
    ...customerAccountFromServer,
    ...customerAccountFromClient,
  }

  return <AccountHierarchyTemplate {...props} user={customerAccount} />
}

export default AccountHierarchyPage
