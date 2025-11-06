import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ManageRolesTemplate } from '@/components/page-templates'
import { getCurrentUser, getRolesByAccountId } from '@/lib/api/operations'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-by-account-id'
import type { CustomerAccount } from '@/lib/gql/types'

interface ManageRolesPageProps {
  customerAccount?: CustomerAccount
  rolesData?: GetRolesAsyncResponse
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const response = await getCurrentUser(req as NextApiRequest, res as NextApiResponse)
  const rolesData = await getRolesByAccountId(req as NextApiRequest, res as NextApiResponse)
  console.log('-----------rolesData-----', rolesData)
  return {
    props: {
      customerAccount: response?.customerAccount,
      rolesData,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const ManageRolesPage: NextPage<ManageRolesPageProps> = ({ customerAccount, rolesData }) => {
  const router = useRouter()

  const handleAccountTitleClick = () => {
    router.push('/my-account')
  }

  return (
    <ManageRolesTemplate
      customerAccount={customerAccount}
      initialData={rolesData}
      onAccountTitleClick={handleAccountTitleClick}
    />
  )
}

export default ManageRolesPage
