import { useCallback } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { SubscriptionList } from '@/components/my-account'

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context
  const { publicRuntimeConfig } = getConfig()
  const isSubscriptionEnabled = publicRuntimeConfig.isSubscriptionEnabled

  if (!isSubscriptionEnabled) return { notFound: true }
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
const SubscriptionPage: NextPage = () => {
  const router = useRouter()
  const handleAccountTitleClick = useCallback(() => router.push('/my-account'), [router])
  return (
    <>
      <SubscriptionList onAccountTitleClick={handleAccountTitleClick} />
    </>
  )
}
export default SubscriptionPage
