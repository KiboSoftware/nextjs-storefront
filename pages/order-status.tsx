import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { OrderStatusTemplate } from '@/components/page-templates'

import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const OrderStatusPage: NextPage = (props: any) => <OrderStatusTemplate {...props} />

export default OrderStatusPage
