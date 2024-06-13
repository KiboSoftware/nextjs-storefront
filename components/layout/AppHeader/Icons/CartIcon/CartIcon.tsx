import { useEffect } from 'react'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { HeaderAction } from '@/components/common'
import { useGetCart } from '@/hooks'
import { cartGetters } from '@/lib/getters'
import type { IconProps } from '@/lib/types'

const CartIcon = ({ size, isElementVisible, mobileIconColor }: IconProps) => {
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const { data: cart } = useGetCart()
  const deliveryAddressDateAndWindow =
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('instant-delivery') as string)
  const filterCartItemsTotal = cart?.items?.filter(
    (cartItem) =>
      cartItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
  )?.length
  const itemCount = !deliveryAddressDateAndWindow
    ? cartGetters.getCartItemCount(cart)
    : filterCartItemsTotal

  const router = useRouter()

  const gotoCart = () => {
    router.push('/cart')
  }

  useEffect(() => {
    if (
      cartGetters.checkDeliveryItems(cart?.items) &&
      cart?.data &&
      !deliveryAddressDateAndWindow
    ) {
      localStorage.setItem(
        'instant-delivery',
        JSON.stringify(cartGetters.convertIntoLocalStorageObject(cart?.data?.ds))
      )
    }
  }, [cartGetters.checkDeliveryItems(cart?.items)])

  return (
    <HeaderAction
      subtitle={t('cart')}
      icon={ShoppingCartIcon}
      badgeContent={itemCount}
      iconFontSize={size}
      onClick={gotoCart}
      isElementVisible={isElementVisible}
      mobileIconColor={mobileIconColor}
    />
  )
}

export default CartIcon
