import { Stack } from '@mui/material'
import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { OrderConfirmation } from '@/components/order'
import { getCheckout, getMultiShipCheckout } from '@/lib/api/operations'

import { CrOrder } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res, query } = context
  const { checkoutId } = query as any
  const { publicRuntimeConfig } = getConfig()
  const isMultiShipEnabled = publicRuntimeConfig.isMultiShipEnabled
  const checkout = isMultiShipEnabled
    ? await getMultiShipCheckout(checkoutId, req as NextApiRequest, res as NextApiResponse)
    : await getCheckout(checkoutId, req as NextApiRequest, res as NextApiResponse)
  if (!checkout) {
    return { notFound: true }
  }

  return {
    props: {
      checkout,
      checkoutId,
      isMultiShipEnabled: isMultiShipEnabled,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
const OrderConfirmationPage: NextPage = (props: any) => {
  const { checkout } = props

  return (
    <>
      <Stack sx={{ paddingY: 2 }}>
        <OrderConfirmation order={checkout as CrOrder} />
      </Stack>
    </>
  )
}
export default OrderConfirmationPage
