import type {
  NextPage,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetServerSidePropsContext,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { CartTemplate } from '@/components/page-templates'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  return {
    props: {
      cart: {},
      ...(await serverSideTranslations(locale as string, ['common', 'cart-page'])),
    },
  }
}

const CartPage: NextPage = (props: any) => {
  const router = useRouter()

  //const { data } = useQuery('cart', performSearch, { initialData: props.results || [] });
  return (
    <>
      <h1>Search</h1>
      <CartTemplate {...props} />
    </>
  )
}

export default CartPage
