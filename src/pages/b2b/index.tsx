import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { B2BTemplate } from '@/components/page-templates'

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

const B2BPage: NextPage = (props) => {
  return (
    <>
      <B2BTemplate {...props} />
    </>
  )
}

export default B2BPage
