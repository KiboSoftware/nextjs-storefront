import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CreateRoleTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
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

  const handleBackClick = () => {
    router.push('/my-account/b2b/manage-roles')
  }

  return (
    <CreateRoleTemplate
      onBackClick={handleBackClick}
      user={customerAccount}
      initialData={initialData}
    />
  )
}

export default CreateRolePage
