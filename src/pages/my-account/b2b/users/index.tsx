import { GetServerSidePropsContext, NextPage } from 'next'

import { UsersTemplate } from '@/components/page-templates'
import { serverSideTranslations } from '@/lib/helpers/serverSideTranslations'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const B2BUsersPage: NextPage = (props) => {
  return (
    <>
      <UsersTemplate {...props} />
    </>
  )
}

export default B2BUsersPage
