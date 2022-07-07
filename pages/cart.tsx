import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CartTemplate } from '@/components/page-templates'
import { useCart } from '@/hooks/queries/useCart/useCart'
import { getCart } from '@/lib/api/operations/'

import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req } = context
  const response = await getCart(req)

  return {
    props: {
      cart: response?.currentCart,
      ...(await serverSideTranslations(locale as string, ['common', 'cart', 'checkout'])),
    },
  }
}

const CartPage: NextPage = (props: any) => {
  const { data: cart } = useCart(props?.cart)

  return (
    <>
      <CartTemplate cart={cart} />
    </>
  )
}

export default CartPage
