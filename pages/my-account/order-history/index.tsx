import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { OrderHistoryTemplate } from '@/components/page-templates'
import { useUserOrderQueries } from '@/hooks'

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['checkout', 'common'])),
    },
  }
}

const OrderHistoryPage: NextPage = () => {
  const router = useRouter()
  const qs = router?.query as { filters: string }
  const queryFilters = qs?.filters ? qs.filters.split(',') : []
  const { data: orderCollection } = useUserOrderQueries({ filters: queryFilters })
  const handleAccountTitleClick = () => router.push('/my-account')

  return (
    <>
      <OrderHistoryTemplate
        queryFilters={queryFilters}
        orderCollection={orderCollection}
        onAccountTitleClick={handleAccountTitleClick}
      />
    </>
  )
}

export default OrderHistoryPage
