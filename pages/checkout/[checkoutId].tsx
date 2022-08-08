import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CheckoutTemplate } from '@/components/page-templates'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
import { getCheckout } from '@/lib/api/operations'

import type { Order } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext } from 'next'

interface CheckoutPageProps {
  checkoutId: string
  checkout: Order
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
      ...(await serverSideTranslations(locale as string, ['common', 'checkout'])),
    },
  }
}

const CheckoutPage: NextPage<CheckoutPageProps> = (props) => {
  const { t } = useTranslation(['checkout', 'common'])
  const steps = [t('common:details'), t('shipping'), t('payment'), t('review')]

  return (
    <>
      <CheckoutStepProvider steps={steps}>
        <CheckoutTemplate {...props} />
      </CheckoutStepProvider>
    </>
  )
}

export default CheckoutPage
