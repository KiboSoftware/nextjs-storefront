import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountHierarchyTemplate } from '@/components/page-templates'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const AccountHierarchyPage: NextPage = (props) => {
  return <AccountHierarchyTemplate {...props} />
}

export default AccountHierarchyPage
