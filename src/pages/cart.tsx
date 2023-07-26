import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getCart } from '@/lib/api/operations/'
import { MetaData, PageWithMetaData } from '@/lib/types'

import { CrCart } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

const CartTemplate = dynamic(() =>
  import('@/components/page-templates').then((mod) => mod.CartTemplate)
)
interface CartPageType extends PageWithMetaData {
  cart?: CrCart
  isMultiShipEnabled?: boolean
}
function getMetaData(): MetaData {
  return {
    title: 'Cart',
    description: null,
    keywords: null,
    canonicalUrl: null,
    robots: 'noindex,nofollow',
  }
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context
  const response = await getCart(req as NextApiRequest, res as NextApiResponse)
  const { serverRuntimeConfig } = getConfig()
  const isMultiShipEnabled = serverRuntimeConfig.isMultiShipEnabled

  return {
    props: {
      isMultiShipEnabled,
      cart: response?.currentCart || null,
      metaData: getMetaData(),
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const CartPage: NextPage<CartPageType> = (props: any) => {
  return (
    <>
      <CartTemplate {...props} />
    </>
  )
}

export default CartPage
