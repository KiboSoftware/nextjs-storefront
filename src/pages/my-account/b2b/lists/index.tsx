import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ListsTemplate } from '@/components/page-templates'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const B2BListsPage: NextPage = () => {
  return (
    <>
      <ListsTemplate />
    </>
  )
}

export default B2BListsPage
