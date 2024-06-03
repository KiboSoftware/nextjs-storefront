import React, { useState, useEffect } from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { LoadingButton } from '@mui/lab'
import {
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  useTheme,
  Divider,
  useMediaQuery,
} from '@mui/material'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CartItemList } from '@/components/cart'
import { PromoCodeBadge, OrderSummary } from '@/components/common'
import { ConfirmationDialog, StoreLocatorDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import {
  useGetCart,
  useInitiateOrder,
  useGetStoreLocations,
  useGetPurchaseLocation,
  useUpdateCartItemQuantity,
  useDeleteCartItem,
  useUpdateCartCoupon,
  useDeleteCartCoupon,
  useInitiateCheckout,
  useCartActions,
  useProductCardActions,
  useUpdateCartItem,
  useGetDeliveryRates,
  useUpdateCartItemByCartID,
  useUpdateCart,
  useUpdateCurrentCart,
  useUpdateOrderShippingInfo,
} from '@/hooks'
import { DefaultId } from '@/lib/constants'
import { orderGetters, cartGetters } from '@/lib/getters'

import type { CrCart, Location, CrCartItem, CrCartItemInput } from '@/lib/gql/types'

export interface CartTemplateProps {
  isMultiShipEnabled: boolean
  cart: CrCart
}

const CartTemplate = (props: CartTemplateProps) => {
  const { isMultiShipEnabled } = props
  const { publicRuntimeConfig } = getConfig()

  const { data: cart } = useGetCart(props?.cart)
  const [deliveryRatesPayload, setDeliveryRatesPayload] = useState<any>()
  const [deliveryFees, setDeliveryFees] = useState<any>()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobileViewport = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const { initiateOrder } = useInitiateOrder()
  const { initiateCheckout } = useInitiateCheckout()
  const { updateCartItemQuantity } = useUpdateCartItemQuantity()
  const { deleteCartItem } = useDeleteCartItem()
  const { showModal, closeModal } = useModalContext()
  const { updateCartItem } = useUpdateCartItem()
  const { updateCart } = useUpdateCart()
  const { updateCartItemByCartID } = useUpdateCartItemByCartID()
  const { data: deliveryFee, isLoading, isSuccess } = useGetDeliveryRates(deliveryRatesPayload)
  const cartItems = cartGetters.getCartItems(cart)
  const deliveryAddressDateAndWindow =
    typeof localStorage !== 'undefined' &&
    JSON.parse(localStorage.getItem('instant-delivery') as string)
  const filterCartItems = cartItems?.filter(
    (cartItem) =>
      cartItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
  )
  const cartItemCount = !deliveryAddressDateAndWindow
    ? cartGetters.getCartItemCount(cart)
    : filterCartItems?.length

  const locationCodes = orderGetters.getFulfillmentLocationCodes(cartItems as CrCartItem[])

  const { data: locations } = useGetStoreLocations({ filter: locationCodes })
  const { data: purchaseLocation } = useGetPurchaseLocation()
  const { updateCartCoupon } = useUpdateCartCoupon()
  const { deleteCartCoupon } = useDeleteCartCoupon()
  const { updateCurrentCart } = useUpdateCurrentCart()
  const [promoError, setPromoError] = useState<string>('')
  const [showLoadingButton, setShowLoadingButton] = useState<boolean>(false)
  const { handleDeleteCurrentCart } = useProductCardActions()
  const { updateOrderShippingInfo } = useUpdateOrderShippingInfo()
  const instantDeliveryItem = cartItems.find(
    (item) => item?.product?.productType === publicRuntimeConfig?.instantDelivery?.productType
  )

  const handleApplyPromoCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(`<strong>${couponCode}</strong> ${response?.invalidCoupons[0]?.reason}`)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleRemovePromoCode = async (couponCode: string) => {
    try {
      await deleteCartCoupon.mutateAsync({
        cartId: cart?.id as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteDeliveryItem = async (cartItemId: string) => {
    await handleDeleteItem(cartItemId as string)
    localStorage.removeItem('instant-delivery')
  }

  const handleDeleteItem = async (cartItemId: string) => {
    await deleteCartItem.mutateAsync({ cartItemId })
  }

  // const handleDeleteCartItem = async (cartItemId: string) => {}

  const handleItemActions = () => {
    // your code here
  }

  const handleGotoCheckout = async () => {
    setShowLoadingButton(true)
    try {
      if (deliveryAddressDateAndWindow) {
        setDeliveryRatesPayload(
          cartGetters.getNormalizedDataForRates(filterCartItems, deliveryAddressDateAndWindow)
        )
      } else {
        const initiateOrderResponse = isMultiShipEnabled
          ? await initiateCheckout.mutateAsync(cart?.id)
          : await initiateOrder.mutateAsync({
              cartId: cart?.id as string,
            })

        if (initiateOrderResponse?.id) {
          router.push(`/checkout/${initiateOrderResponse.id}`)
        }
      }
    } catch (err) {
      console.error(err)
      setShowLoadingButton(false)
    }
  }

  const handleCheckoutWithRates = async (deliveryFee: any) => {
    if (!isLoading && deliveryFee && instantDeliveryItem) {
      const variables = {
        params: {
          cartId: cart?.id as string,
          cartItemId: instantDeliveryItem?.id as string,
          cartItemInput: {
            ...(instantDeliveryItem as CrCartItemInput),
            quantity: instantDeliveryItem?.quantity as number,
            product: {
              ...(instantDeliveryItem?.product as any),
              price: {
                ...instantDeliveryItem?.product?.price,
                tenantOverridePrice: deliveryFee,
              },
            },
          },
        },
      }
      const response = await fetch('/api/update-cart-item', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      })

      const updateCartItemResponse = await response.json()
      // const updatedCartFilterItems = updateCartItemResponse?.items?.filter(
      //   (cartItem) =>
      //     cartItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
      // )
      // const packages = cartGetters.getPackagesDetails(updatedCartFilterItems)
      // const updateCurrentCartResponse = await updateCurrentCart.mutateAsync({
      //   cartInput: {
      //     ...updateCartItemResponse,
      //     data: {
      //       dsDescription: cartGetters.getDSDescription(deliveryAddressDateAndWindow, packages),
      //       ds: {
      //         dropoffTime: {
      //           startsAt:
      //             deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
      //           endsAt:
      //             deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
      //         },
      //         pickupTime: {
      //           startsAt:
      //             deliveryAddressDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
      //         },
      //         deliveryInstructions: '',
      //         pickupInstructions: '',
      //         tips: 0,
      //         deliveryContact: {
      //           notifySms: deliveryAddressDateAndWindow?.notification?.isSendSMS,
      //           notifyEmail: deliveryAddressDateAndWindow?.notification?.isSendEmail,
      //         },
      //         packages: [cartGetters.getPackagesDetails(updatedCartFilterItems)],
      //       },
      //     },
      //   },
      // })
      // const updateCartResponse = await updateCart.mutateAsync({
      //   cartId: cart?.id as string,
      //   cartInput: {
      //     ...cart,
      //     data: {
      //       deliveryDateAndWindow: deliveryAddressDateAndWindow?.deliveryDateAndWindow,
      //     },
      //   },
      // })
      // console.log('updateCartResponse', updateCartResponse)

      // const updateCartVariable = {
      //   params: {
      //     cartId: cart?.id as string,
      //     cartInput: {
      //       ...cart,
      //       data: {
      //         deliveryDateAndWindow: deliveryAddressDateAndWindow?.deliveryDateAndWindow,
      //       },
      //     },
      //   },
      // }
      // const updateCartResponse = await fetch('/api/update-cart', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json, text/plain, */*',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updateCartVariable),
      // })
      // console.log('update cart response', await updateCartResponse.json())
      const initiateOrderResponse = isMultiShipEnabled
        ? await initiateCheckout.mutateAsync(cart?.id)
        : await initiateOrder.mutateAsync({
            cartId: cart?.id as string,
          })

      if (initiateOrderResponse?.id) {
        const filterOrderItems = initiateOrderResponse?.items?.filter(
          (orderItem: any) =>
            orderItem?.product?.productType !== publicRuntimeConfig?.instantDelivery?.productType
        )
        const packages = cartGetters.getPackagesDetails(filterOrderItems)
        await updateOrderShippingInfo.mutateAsync({
          checkout: { ...initiateOrderResponse },
          contact: {
            firstName: deliveryAddressDateAndWindow?.contact?.firstName,
            lastNameOrSurname: deliveryAddressDateAndWindow?.contact?.lastNameOrSurname,
            id: deliveryAddressDateAndWindow?.contact?.id || DefaultId.ADDRESSID,
            phoneNumbers: {
              home: deliveryAddressDateAndWindow?.contact?.phoneNumbers?.home,
            },
            address: {
              address1: deliveryAddressDateAndWindow?.contact?.address?.address1,
              address2: deliveryAddressDateAndWindow?.contact?.address?.address2,
              cityOrTown: deliveryAddressDateAndWindow?.contact?.address?.cityOrTown,
              stateOrProvince: deliveryAddressDateAndWindow?.contact?.address?.stateOrProvince,
              countryCode: deliveryAddressDateAndWindow?.contact?.address?.countryCode,
              postalOrZipCode: deliveryAddressDateAndWindow?.contact?.address?.postalOrZipCode,
            },
          },
          data: {
            dsDescription: cartGetters.getDSDescription(
              deliveryAddressDateAndWindow,
              packages,
              orderGetters.getTipAmount(initiateOrderResponse) || 0
            ),
            ds: {
              dropoffTime: {
                startsAt:
                  deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt.toString(),
                endsAt:
                  deliveryAddressDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt.toString(),
              },
              pickupTime: {
                startsAt:
                  deliveryAddressDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt.toString(),
              },
              deliveryInstructions: '',
              pickupInstructions: '',
              tips: orderGetters.getTipAmount(initiateOrderResponse) || 0,
              deliveryContact: {
                notifySms: deliveryAddressDateAndWindow?.notification?.isSendSMS,
                notifyEmail: deliveryAddressDateAndWindow?.notification?.isSendEmail,
              },
              packages: [cartGetters.getPackagesDetails(filterOrderItems)],
            },
          },
        })
        router.push(`/checkout/${initiateOrderResponse.id}`)
      }
    }
  }
  useEffect(() => {
    setDeliveryFees(deliveryFee)
    handleCheckoutWithRates(deliveryFee)
  }, [isSuccess, deliveryFee])
  const {
    onFulfillmentOptionChange,
    handleQuantityUpdate,
    handleProductPickupLocation,
    handleInstantDelivery,
    handChangeDeliveryAddressDateAndTime,
  } = useCartActions({
    cartItems: cartItems as CrCartItem[],
    purchaseLocation,
  })

  const orderSummaryArgs = {
    nameLabel: t('cart-summary'),
    subTotalLabel: `${t('subtotal')} (${t('item-quantity', { count: cartItemCount })})`,
    totalLabel: t('estimated-order-total'),
    orderDetails: cart,
    isShippingTaxIncluded: false,
    deliveryAddressDateAndWindow,
    onHandleInstantDelivery: handChangeDeliveryAddressDateAndTime,
    promoComponent: (
      <PromoCodeBadge
        onApplyCouponCode={handleApplyPromoCode}
        onRemoveCouponCode={handleRemovePromoCode}
        promoList={cart?.couponCodes as string[]}
        promoError={!!promoError}
        helpText={promoError}
      />
    ),
    isCart: true,
  }

  const handleContinueShopping = () => {
    router.back()
  }

  const openClearCartConfirmation = () => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: handleDeleteCurrentCart,
        contentText: t('clear-cart-confirmation-text'),
        primaryButtonText: t('delete'),
      },
    })
  }

  useEffect(() => {
    const instantDeliveryItem = cartItems.find(
      (item) => item?.product?.productType === publicRuntimeConfig?.instantDelivery?.productType
    )
    if (!cartGetters.checkDeliveryItems(cartItems) && instantDeliveryItem?.id) {
      handleDeleteDeliveryItem(instantDeliveryItem?.id as string)
    }
  }, [!cartGetters.checkDeliveryItems(cartItems), cartItems])
  return (
    <Grid container>
      {/* Header section */}
      <Grid item xs={12} md={8} sx={{ paddingX: { xs: 2, md: 0 }, paddingY: { xs: 2 } }}>
        <Box display="flex" gap={1}>
          <Typography variant="h1" gutterBottom>
            {t('shopping-cart')}
          </Typography>
          <Typography variant="h1" fontWeight={'normal'}>
            ({t('item-quantity', { count: cartItemCount })})
          </Typography>
        </Box>
      </Grid>
      {isMobileViewport && (
        <Grid item xs={12}>
          {<Divider />}
        </Grid>
      )}
      {/* Cart item Section */}
      {!!cart?.items?.length && (
        <>
          <Grid item xs={12} md={8} sx={{ paddingRight: { md: 2 } }}>
            <CartItemList
              cartItems={filterCartItems}
              fulfillmentLocations={
                locations && Object.keys(locations).length ? (locations as Location[]) : []
              }
              purchaseLocation={purchaseLocation}
              onCartItemDelete={handleDeleteItem}
              onCartItemQuantityUpdate={handleQuantityUpdate}
              onFulfillmentOptionChange={onFulfillmentOptionChange}
              onProductPickupLocation={handleProductPickupLocation}
              onCartItemActionSelection={handleItemActions}
              onInstantDelivery={handleInstantDelivery}
            />
            <Box py={5}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleContinueShopping}
                startIcon={<KeyboardArrowLeft fontSize="small" sx={{ color: 'text.secondary' }} />}
              >
                {t('continue-shopping')}
              </Button>
            </Box>
          </Grid>
          {/* Order Summary */}
          <Grid item xs={12} md={4} sx={{ paddingRight: { xs: 0, md: 2 } }}>
            <OrderSummary {...orderSummaryArgs}>
              <Stack direction="column" gap={2}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  name="goToCart"
                  fullWidth
                  onClick={handleGotoCheckout}
                  loading={showLoadingButton}
                  disabled={!cartItemCount || showLoadingButton}
                >
                  {t('go-to-checkout')}
                </LoadingButton>
                <Button
                  variant="contained"
                  color="secondary"
                  name="clearCart"
                  fullWidth
                  onClick={openClearCartConfirmation}
                  disabled={!cartItemCount}
                >
                  {t('clear-cart')}
                </Button>
              </Stack>
            </OrderSummary>
          </Grid>
        </>
      )}
      {!cart?.items?.length && (
        <Box data-testid="empty-cart">
          <Typography variant="subtitle2" fontWeight={'bold'}>
            {t('empty-cart-message')}
          </Typography>
          <Box maxWidth="23.5rem">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', marginTop: '3.063rem' }}
              onClick={() => router.push('/')}
            >
              {t('shop-now')}
            </Button>
          </Box>
        </Box>
      )}
    </Grid>
  )
}

export default CartTemplate
