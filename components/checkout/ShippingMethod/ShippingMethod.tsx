import { useEffect, useRef, useState } from 'react'

import { Typography, Box, MenuItem, Divider, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboSelect, Price, ProductItem, ProductItemList } from '@/components/common'
import {
  EddSuggestionsParam,
  useGetStoreLocations,
  useUpdateOrderShippingInfo,
  useUpdateShippingAndSuggestionsMutation,
} from '@/hooks'
import {
  FulfillmentOptions as FulfillmentOptionsConstant,
  EDDFulfillmentOptions,
} from '@/lib/constants'
import { orderGetters, productGetters, storeLocationGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import { formatEDDMessage } from '@/lib/helpers/formatEddMessage'
import { getClosestEDDSuggestion } from '@/lib/helpers/getClosestEddSuggestion'
import { getEDDSuggestion } from '@/lib/helpers/getEDDSuggestions'

import type {
  Maybe,
  CrOrderItem,
  CrShippingRate,
  CrProduct,
  CrOrder,
  Checkout,
  CheckoutGroupRates,
} from '@/lib/gql/types'

const EddOrderTypeMap = {
  [FulfillmentOptionsConstant.SHIP]: EDDFulfillmentOptions.Ship,
  [FulfillmentOptionsConstant.DELIVERY]: EDDFulfillmentOptions.Delivery,
  [FulfillmentOptionsConstant.PICKUP]: EDDFulfillmentOptions.Pickup,
} as any

export type ShippingMethodProps = {
  shipItems?: Maybe<CrOrderItem>[]
  pickupItems?: Maybe<CrOrderItem>[]
  deliveryItems?: Maybe<CrOrderItem>[]
  handlingAmount?: number
  orderShipmentMethods?: Maybe<CrShippingRate>[]
  selectedShippingMethodCode?: string
  showTitle?: boolean
  isSplitShipping?: boolean
  order?: CrOrder
  onMultiShipShippingMethodChange?: (shippingMethod: string) => void
  onStoreLocatorClick?: () => void
}
export type ShipItemListProps = {
  title?: string
  shipItems: Maybe<CrOrderItem>[]
  handlingAmount?: number
  orderShipmentMethods?: Maybe<CrShippingRate>[]
  selectedShippingMethodCode?: string
  order?: CrOrder
}
export type PickupItemListProps = {
  isShipItemsPresent: boolean
  pickupItems: Maybe<CrOrderItem>[]
  onClickChangeStore?: () => void
}
const styles = {
  shippingType: {
    variant: 'subtitle1',
    component: 'span',
    fontWeight: '600',
    color: 'text.primary',
  },
}

const EDDWrapper = (props: {
  item: CrOrderItem
  order?: CrOrder
  handleEddAssignments: (value: any) => void
  children: any
}) => {
  const { item, order, handleEddAssignments, children } = props
  const { t } = useTranslation('common')

  const eddZipCode = orderGetters.getShippingAddress(order as CrOrder).postalOrZipCode

  const [eddMessage, setEddMessage] = useState<string>('')

  const selectedShippingMethodCode = item?.shippingMethodCode

  const buildEDDSuggestionParams = (zipCode: string) => {
    return {
      eddItems: [
        {
          orderItemID: 1,
          quantity: item?.quantity,
          upc:
            item?.product?.upc || item.product?.variationProductCode || item.product?.productCode,
          productUsage: item?.product?.productUsage,
          dimensionUnit: 'CM', //|| item?.product?.measurements?.length?.unit,
          weightUnit: 'GRAMS', //|| item?.product?.measurements?.weight?.unit,
          length: item?.product?.measurements?.length?.value,
          weight: item?.product?.measurements?.weight?.value,
          width: item?.product?.measurements?.width?.value,
          height: item?.product?.measurements?.height?.value,
        },
      ],
      shippingAddress: {
        postalCode: zipCode,
        countryCode: 'US',
      },
      orderType: EddOrderTypeMap[item?.fulfillmentMethod as string],
      orderID: order?.orderNumber,
      total: order?.total,
    }
  }

  const getEDDSuggestions = async () => {
    const response: any = await getEDDSuggestion(buildEDDSuggestionParams(eddZipCode as string))
    if (response?.eddAssignments && response?.eddAssignments?.length > 0) {
      if (response?.eddAssignments[0]?.estimatedDeliveryDates?.length > 0) {
        const edd = getClosestEDDSuggestion(response?.eddAssignments[0]?.estimatedDeliveryDates)
        setEddMessage(formatEDDMessage({ eddISO: edd.estimatedDeliveryDate, mode: 'ship' }))
      }

      if (response?.eddAssignments[0]?.assignments?.length > 0) {
        handleEddAssignments(response?.eddAssignments[0]?.assignments[0])
      }
    } else {
      setEddMessage('Delivery estimate not available at the moment.')
    }
  }

  useEffect(() => {
    getEDDSuggestions()
  }, [])

  return (
    <Box>
      {children}
      <Box py={1}>
        <Typography variant="body2" color="text.secondary">
          {eddMessage}
        </Typography>
      </Box>
    </Box>
  )
}

const SharedShipping = (shipProps: ShipItemListProps) => {
  const { title, orderShipmentMethods, shipItems, order } = shipProps
  const { t } = useTranslation('common')

  const { updateOrderShippingInfo } = useUpdateOrderShippingInfo()

  const selectedShippingMethodCode = orderGetters.getShippingMethodCode(order as CrOrder)

  const handleShippingMethodChange = async (value: string) => {
    const shippingMethodName = orderShipmentMethods?.find(
      (method) => method?.shippingMethodCode === value
    )?.shippingMethodName as string

    await updateOrderShippingInfo.mutateAsync({
      checkout: order as CrOrder,
      contact: undefined,
      email: undefined,
      shippingMethodCode: value,
      shippingMethodName,
    })
  }
  return (
    <Box data-testid="ship-items">
      <Typography sx={styles.shippingType} py={2} data-testid="ship-title">
        {title}
      </Typography>
      {
        <Box pr={2}>
          <KiboSelect
            name="shippingMethodCode"
            onChange={(_, value) => handleShippingMethodChange(value)}
            placeholder="Select Shipping Option"
            value={selectedShippingMethodCode ?? ''}
          >
            {orderShipmentMethods?.map((item) => {
              return (
                <MenuItem key={item?.shippingMethodCode} value={`${item?.shippingMethodCode}`}>
                  <Price
                    variant="body2"
                    fontWeight="normal"
                    price={
                      `${item?.shippingMethodName || item?.shippingMethodCode}` +
                      ' ' +
                      t('currency', { val: item?.price })
                    }
                  />
                </MenuItem>
              )
            })}
          </KiboSelect>
        </Box>
      }
      <Box pt={3}>
        <ProductItemList items={shipItems} />
      </Box>
    </Box>
  )
}

const PickupItemList = (pickupProps: PickupItemListProps) => {
  const { isShipItemsPresent, pickupItems, onClickChangeStore } = pickupProps
  const { t } = useTranslation('common')
  const expectedDeliveryDate = orderGetters.getExpectedDeliveryDate(pickupItems as CrOrderItem[])
  const isPickupItem = pickupItems.length > 0

  const fulfillmentLocationCodes = orderGetters.getFulfillmentLocationCodes(
    pickupItems as CrOrderItem[]
  )
  const { data: locations } = useGetStoreLocations({ filter: fulfillmentLocationCodes })
  const storePickupAddress = storeLocationGetters.getLocations(locations)

  return (
    <Box data-testid="pickup-items">
      {isShipItemsPresent && (
        <>
          <Divider orientation="horizontal" flexItem />
          <Box pt={2} pb={3}>
            <Typography sx={styles.shippingType} py={2} data-testid="pickup-title">
              {t('pickup')}
            </Typography>
          </Box>
        </>
      )}

      <Box>
        <ProductItemList
          items={pickupItems}
          storePickupAddresses={storePickupAddress}
          isPickupItem={isPickupItem}
          expectedDeliveryDate={expectedDeliveryDate}
          showChangeStoreLink={false}
          onClickChangeStore={onClickChangeStore}
        />
      </Box>
    </Box>
  )
}

const SplitShipping = (shipProps: ShipItemListProps) => {
  const { title, orderShipmentMethods, shipItems, order } = shipProps
  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const [eddAssignments, setEddAssignments] = useState<any[]>([])
  const { updateShippingAndSuggestionsMutation } = useUpdateShippingAndSuggestionsMutation()

  const handleShippingMethodChange = async (value: string, id: string) => {
    const shippingMethodName = orderShipmentMethods?.find(
      (method) => method?.shippingMethodCode === value
    )?.shippingMethodName as string

    await updateShippingAndSuggestionsMutation.mutateAsync({
      orderItemId: id,
      orderId: order?.id as string,
      itemFulfillmentInfoInput: {
        shippingMethodCode: value,
        shippingMethodName,
        suggestions: eddAssignments
          .filter((item) => item.id === id)
          .map((item) => ({
            locationCode: item?.locationCode,
            quantity: item?.quantity,
            productCode: item?.upc,
          })) as EddSuggestionsParam[],
      },
    })
  }

  const handleEddAssignments = (value: any, id: string) => {
    const assignment = { ...value, id }
    setEddAssignments((prev) => {
      const filtered = prev.filter((item) => item.id !== id)
      return [...filtered, assignment]
    })
  }

  return (
    <Box data-testid="ship-items">
      <Typography sx={styles.shippingType} py={2} data-testid="ship-title">
        {title}
      </Typography>
      <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={2}>
        {shipItems?.map((item: any) => {
          const product = item?.product as CrProduct
          return (
            <Stack key={item?.id} gap={2}>
              <KiboSelect
                name="shippingMethodCode"
                onChange={(_, value) => handleShippingMethodChange(value, item?.id as string)}
                placeholder="Select Shipping Option"
                value={item?.shippingMethodCode ?? 'dd'}
              >
                {orderShipmentMethods?.map((method) => {
                  return (
                    <MenuItem
                      key={method?.shippingMethodCode}
                      value={`${method?.shippingMethodCode}`}
                    >
                      <Price
                        variant="body2"
                        fontWeight="normal"
                        price={
                          `${method?.shippingMethodName || method?.shippingMethodCode}` +
                          ' ' +
                          t('currency', { val: method?.price })
                        }
                      />
                    </MenuItem>
                  )
                })}
              </KiboSelect>
              <EDDWrapper
                item={item}
                order={order}
                handleEddAssignments={(value) => handleEddAssignments(value, item?.id)}
              >
                <ProductItem
                  id={orderGetters.getCartItemId(item as CrOrderItem)}
                  qty={orderGetters.getProductQuantity(item as CrOrderItem)}
                  link={getProductLink(productGetters.getProductId(item?.product as CrProduct))}
                  productCode={productGetters.getProductId(product)}
                  image={productGetters.getProductImage(product)}
                  name={productGetters.getName(product)}
                  options={productGetters.getOptions(product)}
                  price={productGetters.getPrice(product).regular?.toString()}
                  salePrice={productGetters.getPrice(product).special?.toString()}
                  // expectedDeliveryDate={expectedDeliveryDate}
                  data-testid="product-item"
                  discounts={item?.productDiscounts}
                ></ProductItem>
              </EDDWrapper>
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}

const ShippingMethod = (props: ShippingMethodProps) => {
  const {
    shipItems,
    pickupItems,
    deliveryItems,
    orderShipmentMethods,
    selectedShippingMethodCode,
    showTitle = true,
    isSplitShipping = false,
    order,
    onMultiShipShippingMethodChange,
    onStoreLocatorClick,
  } = props

  const { t } = useTranslation('common')
  const shippingMethodRef = useRef()

  const sthOrderShipmentMethods = orderShipmentMethods?.filter(
    (item) => item?.fulfillmentMethod === FulfillmentOptionsConstant.SHIP
  ) as CrShippingRate[]

  const deliveryOrderShipmentMethods = orderShipmentMethods?.filter(
    (item) => item?.fulfillmentMethod === FulfillmentOptionsConstant.DELIVERY
  ) as CrShippingRate[]

  // useEffect(() => {
  //   shippingMethodRef.current &&
  //     !selectedShippingMethodCode &&
  //     (shippingMethodRef.current as Element).scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',
  //     })
  // }, [selectedShippingMethodCode])

  return (
    <Box data-testid="shipping-method" ref={shippingMethodRef}>
      {showTitle && (
        <Typography variant="h2" component="h2" pt={2}>
          {t('shipping-method')}
        </Typography>
      )}
      {shipItems?.length ? (
        isSplitShipping ? (
          <SplitShipping
            {...(sthOrderShipmentMethods?.length > 0 && {
              orderShipmentMethods: sthOrderShipmentMethods,
            })}
            shipItems={shipItems}
            title={t('ship')}
            order={order}
          />
        ) : (
          <SharedShipping
            {...(sthOrderShipmentMethods?.length > 0 && {
              orderShipmentMethods: sthOrderShipmentMethods,
            })}
            {...(onMultiShipShippingMethodChange && { onMultiShipShippingMethodChange })}
            shipItems={shipItems}
            title={t('ship')}
            order={order}
          />
        )
      ) : null}

      {deliveryItems?.length ? (
        isSplitShipping ? (
          <SplitShipping
            {...(deliveryOrderShipmentMethods?.length > 0 && {
              orderShipmentMethods: deliveryOrderShipmentMethods,
            })}
            shipItems={deliveryItems}
            title={t('delivery')}
            order={order}
          />
        ) : (
          <SharedShipping
            {...(deliveryOrderShipmentMethods?.length && {
              orderShipmentMethods: deliveryOrderShipmentMethods,
            })}
            {...(onMultiShipShippingMethodChange && { onMultiShipShippingMethodChange })}
            shipItems={deliveryItems}
            title={t('delivery')}
            order={order}
          />
        )
      ) : null}

      {pickupItems?.length ? (
        <PickupItemList
          isShipItemsPresent={Boolean(shipItems?.length)}
          pickupItems={pickupItems}
          onClickChangeStore={onStoreLocatorClick}
        />
      ) : null}
    </Box>
  )
}
export default ShippingMethod
