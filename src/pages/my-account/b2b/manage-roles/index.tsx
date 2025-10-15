import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ManageRolesTemplate } from '@/components/page-templates'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const ManageRolesPage: NextPage = () => {
  const router = useRouter()

  const handleAccountTitleClick = () => {
    router.push('/my-account')
  }

  return <ManageRolesTemplate onAccountTitleClick={handleAccountTitleClick} />
}

export default ManageRolesPage
