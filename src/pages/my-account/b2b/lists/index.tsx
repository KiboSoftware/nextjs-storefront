import { GetServerSidePropsContext, NextPage } from 'next'

import { ListsTemplate } from '@/components/page-templates'
import { serverSideTranslations } from '@/lib/helpers/serverSideTranslations'

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
