import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import { getCheckout } from '@/lib/api/operations'
import { CheckoutTemplate } from '@/components/page-templates'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext'

import type { NextPage, GetServerSidePropsContext } from 'next'
import type { Order } from '@/lib/gql/types'

interface CheckoutPageProps {
  checkoutId: string
  checkout: Order
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params } = context
  const { checkoutId } = params as any
  const checkout = await getCheckout(checkoutId)

  if (!checkout) {
    return { notFound: true }
  }

  return {
    props: {
      checkout,
      checkoutId,
      ...(await serverSideTranslations(locale as string, ['common', 'checkout'])),
    },
  }
}

const CheckoutPage: NextPage<CheckoutPageProps> = (props) => {
  const { t } = useTranslation('checkout')
  const steps = [t('details'), t('shipping'), t('payment'), t('review')]

  return (
    <>
      <CheckoutStepProvider steps={steps}>
        <CheckoutTemplate {...props} />
      </CheckoutStepProvider>
    </>
  )
}

export default CheckoutPage
