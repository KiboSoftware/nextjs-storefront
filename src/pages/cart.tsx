import getConfig from 'next/config'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CartTemplate } from '@/components/page-templates'
import { getCart } from '@/lib/api/operations/'

import type { NextPage, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context
  const response = await getCart(req as NextApiRequest, res as NextApiResponse)
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
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <CartTemplate {...props} />
    </>
  )
}

export default CartPage
