import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ListsTemplate } from '@/components/page-templates'

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
      <ListsTemplate {...props} />
    </>
  )
}

export default B2BUsersPage
