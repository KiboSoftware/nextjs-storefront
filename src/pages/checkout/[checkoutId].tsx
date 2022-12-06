import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

import {
  StandardShipCheckoutTemplate,
  MultiShipCheckoutTemplate,
} from '@/components/page-templates'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { getCheckout, getMultiShipCheckout } from '@/lib/api/operations'

import type { Checkout, Order } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

interface CheckoutPageProps {
  checkoutId: string
  checkout: any //add generic type
  isMultiShipEnabled?: boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params, req, res } = context
  const { checkoutId } = params as any
  const { publicRuntimeConfig } = getConfig()
  const isMultiShipEnabled = publicRuntimeConfig.isMultiShipEnabled
  const checkout = isMultiShipEnabled
    ? await getMultiShipCheckout(checkoutId, req, res)
    : await getCheckout(checkoutId, req, res)

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

const CheckoutPage: NextPage<CheckoutPageProps> = (props) => {
  const { t } = useTranslation('common')
  const steps = [t('details'), t('shipping'), t('payment'), t('review')]

  return (
    <>
      <CheckoutStepProvider steps={steps}>
        {props.isMultiShipEnabled ? (
          <MultiShipCheckoutTemplate {...props} />
        ) : (
          <StandardShipCheckoutTemplate {...props} />
        )}
      </CheckoutStepProvider>
    </>
  )
}

export default CheckoutPage
