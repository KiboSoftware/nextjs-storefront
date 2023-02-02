import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CartTemplate } from '@/components/page-templates'
import { getCart } from '@/lib/api/operations/'

import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context
  const response = await getCart(req, res)
  const { serverRuntimeConfig } = getConfig()
  const isMultiShipEnabled = serverRuntimeConfig.isMultiShipEnabled

  return {
    props: {
      isMultiShipEnabled,
      cart: response?.currentCart || null,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const CartPage: NextPage = (props: any) => {
  return (
    <>
      <CartTemplate {...props} />
    </>
  )
}

export default CartPage
