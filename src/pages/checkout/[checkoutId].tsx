import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  CheckoutTemplate,
  StandardShipCheckoutTemplate,
  MultiShipCheckoutTemplate,
} from '@/components/page-templates'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { getCheckout } from '@/lib/api/operations'

import type { Order } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

interface CheckoutPageProps {
  checkoutId: string
  checkout: Order
  isMultiShipEnabled?: boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params, req, res } = context
  const { checkoutId } = params as any
  const checkout = await getCheckout(checkoutId, req, res)

  if (!checkout) {
    return { notFound: true }
  }

  return {
    props: {
      checkout,
      checkoutId,
      isMultiShipEnabled: true,
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
