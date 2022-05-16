//137dd1d26924870001df96f6000045a4

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getCheckout } from '@/lib/api/operations'
import { CheckoutTemplate } from '@/components/page-templates'

import type {
  NextPage,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetServerSidePropsContext,
} from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params } = context
  const { checkoutId } = params as any
  const checkout = await getCheckout(checkoutId)
  return {
    props: {
      checkout,
      checkoutId,
      ...(await serverSideTranslations(locale as string, ['common', 'checkout'])),
    },
  }
}

const CheckoutPage: NextPage = (props: any) => {
  const router = useRouter()

  //const { data } = useQuery('cart', performSearch, { initialData: props.results || [] });
  return (
    <>
      <CheckoutTemplate {...props} />
    </>
  )
}

export default CheckoutPage
