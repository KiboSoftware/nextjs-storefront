import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { UsersTemplate } from '@/components/page-templates'
// import { getGroups } from '@/lib/api/operations'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  // const response = await getGroups(context.req as NextApiRequest, context.res as NextApiResponse)
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      // response,
    },
  }
}

const B2BUsersPage: NextPage = (props: any) => {
  return (
    <>
      <UsersTemplate {...props} />
    </>
  )
}

export default B2BUsersPage
