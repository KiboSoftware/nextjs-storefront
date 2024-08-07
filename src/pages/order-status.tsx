import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { OrderStatusTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'

import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const OrderStatusPage: NextPage = (props: any) => {
  const { user } = useAuthContext()

  return <OrderStatusTemplate key={user?.id} {...props} />
}

export default OrderStatusPage
