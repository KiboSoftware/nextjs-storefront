import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  StandardShipCheckoutTemplate,
  MultiShipCheckoutTemplate,
} from '@/components/page-templates'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { getCheckout, getMultiShipCheckout, updateOrder } from '@/lib/api/operations'

import type { Checkout, CrOrder, CrOrderInput } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

interface CheckoutPageProps {
  checkoutId: string
  checkout: CrOrder | Checkout
  isMultiShipEnabled?: boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params, req, res } = context
  const { checkoutId } = params as any
  const { publicRuntimeConfig } = getConfig()
  const isMultiShipEnabled = publicRuntimeConfig.isMultiShipEnabled
  const checkout = isMultiShipEnabled
    ? await getMultiShipCheckout(checkoutId, req as NextApiRequest, res as NextApiResponse)
    : await getCheckout(checkoutId, req as NextApiRequest, res as NextApiResponse)

  if (!checkout) {
    return { notFound: true }
  }

  const ipAddress = req?.headers['x-forwarded-for'] as string

  updateOrder(
    checkoutId,
    { ...checkout, ipAddress: ipAddress?.split(',')[0] } as CrOrderInput,
    req as NextApiRequest,
    res as NextApiResponse
  )

  return {
    props: {
      checkout,
      checkoutId,
      isMultiShipEnabled: isMultiShipEnabled,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const CheckoutPage: NextPage<CheckoutPageProps> = (props) => {
  const { t } = useTranslation('common')
  const steps = [t('details'), t('shipping'), t('payment'), t('review')]
  const { checkout, isMultiShipEnabled, ...rest } = props
  const quoteCheckout = !isMultiShipEnabled ? (checkout as CrOrder) : null
  const quoteId = quoteCheckout?.originalQuoteId
  return (
    <>
      <CheckoutStepProvider steps={steps} initialActiveStep={quoteId ? 2 : 0}>
        {isMultiShipEnabled ? (
          <MultiShipCheckoutTemplate
            {...rest}
            checkout={checkout as Checkout}
            isMultiShipEnabled={!!isMultiShipEnabled}
          />
        ) : (
          <StandardShipCheckoutTemplate
            {...rest}
            checkout={checkout as CrOrder}
            isMultiShipEnabled={!!isMultiShipEnabled}
          />
        )}
      </CheckoutStepProvider>
    </>
  )
}

export default CheckoutPage
