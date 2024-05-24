import getConfig from 'next/config'

import { productGetters } from './productGetters'
import { subscriptionGetters } from './subscriptionGetters'
import { FulfillmentOptions } from '../constants'

import type {
  Maybe,
  CrCart,
  CrCartItem,
  Location,
  CrSubscriptionInfo,
  CrOrderItem,
} from '../gql/types'
import type { FulfillmentOption } from '../types'

const { publicRuntimeConfig } = getConfig()

type GenericItem = CrCartItem | CrOrderItem

const getCartItemCount = (cart: CrCart) => cart?.items?.length || 0

const getCartItems = (cart: CrCart) => cart?.items || []

const getCartItemFulfillmentLocation = (
  cartItem: GenericItem,
  location: Maybe<Location>[]
): Location => {
  return (
    location &&
    (location?.filter((loc) => loc?.code === cartItem?.fulfillmentLocationCode)[0] as Location)
  )
}

const getProductFulfillmentOptions = (
  cartItem: GenericItem,
  location: Location
): FulfillmentOption[] => {
  const product = cartItem?.product
  const subscription = cartItem?.subscription

  const fulfillmentOptions = publicRuntimeConfig.fulfillmentOptions
  return fulfillmentOptions.map((option: FulfillmentOption) => ({
    value: option.value,
    name: option.name,
    code: option.code,
    label: option.label,
    fulfillmentLocation: location?.name,
    required: option.isRequired,
    shortName: option.shortName,
    disabled: (() => {
      if (option.shortName === FulfillmentOptions.PICKUP && subscription) {
        return true
      }
      return (
        product?.fulfillmentTypesSupported?.filter(
          (type) => type.toLowerCase() === option?.value?.toLowerCase()
        ).length === 0
      )
    })(),
    details: (() => {
      if (option.shortName === FulfillmentOptions.SHIP) return option.details // checking if Directship
      if (option.shortName === FulfillmentOptions.DELIVERY) return ''
      if (location?.name) return `${option.details}: ${location.name}`
      return ''
    })(),
  }))
}

const getSubscriptionDetails = (cartItem: Maybe<CrCartItem> | Maybe<CrOrderItem>) => {
  return subscriptionGetters.getSubscriptionFrequency(cartItem?.subscription as CrSubscriptionInfo)
}

const getLineItemPrice = (item: GenericItem) => {
  return {
    regular: item?.subtotal,
    special: item.discountTotal ? item?.discountedTotal : undefined,
  }
}
const normalizeProduct = (product: any) => {
  return {
    quantity: product?.quantity,
    size: {
      height: product?.product?.measurements?.height?.value,
      width: product?.product?.measurements?.width?.value,
      length: product?.product?.measurements?.length?.value,
    },
    sku: product?.product?.productCode,
    weight: product?.product?.measurements?.weight?.value,
    price:
      product?.product?.price?.tenantOverridePrice ||
      product?.product?.price?.salePrice ||
      product?.product?.price?.price,
    image: productGetters.handleProtocolRelativeUrl(product?.product?.imageUrl),
    title: product?.product?.name,
    description: product.product.description ? product.product.description : '',
  }
}

const getNormalizedDeliveryAddress = (deliveryAddress: any) => {
  return {
    street: deliveryAddress?.address2
      ? deliveryAddress?.address1 + ' ' + deliveryAddress?.address2
      : deliveryAddress?.address1,
    city: deliveryAddress?.cityOrTown,
    state: deliveryAddress?.stateOrProvince,
    zipcode: deliveryAddress?.postalOrZipCode,
  }
}

const getNormalizedDataForRates = (cartItems: any, deliveryWindowDateAndTime: any) => {
  return {
    storeExternalIds: [deliveryWindowDateAndTime?.window?.confirmedStoreId],
    type: 'delivery',
    deliveryAddress: getNormalizedDeliveryAddress(deliveryWindowDateAndTime?.contact?.address),
    dropoffTime: deliveryWindowDateAndTime?.window?.confirmedWindow?.dropoffTime,
    packages: [{ ...getPackagesDetails(cartItems), itemList: cartItems.map(normalizeProduct) }],
  }
}

const getPackagesDetails = (cartItems: any) => {
  let totalWeight = 0
  let totalHeight = 0
  let totalLength = 0
  let totalWidth = 0

  cartItems?.forEach((item: any) => {
    const quantity = item.quantity
    const measurements = item.product.measurements

    const weight = measurements.weight.value * quantity
    const height = measurements.height.value * quantity
    const length = measurements.length.value * quantity
    const width = measurements.width.value * quantity

    totalWeight += weight
    totalHeight += height
    totalLength += length
    totalWidth += width
  })

  return {
    name: 'custom',
    size: {
      height: totalHeight,
      width: totalWidth,
      length: totalLength,
    },
    weight: totalWeight,
    quantity: cartItems?.length,
    items: 1,
    barcode: 'null',
    temperatureControl: 'none',
  }
}

const checkDeliveryItems = (data: any) => {
  for (const item of data) {
    if (item.fulfillmentMethod === 'Delivery' && item.product.productType !== 'DeliveryService') {
      return true // Return true if such an item is found
    }
  }
  return false // Return false if no such item is found
}

export const cartGetters = {
  getCartItemCount,
  getCartItems,
  getCartItemFulfillmentLocation,
  getProductFulfillmentOptions,
  getSubscriptionDetails,
  getLineItemPrice,
  getNormalizedDataForRates,
  getPackagesDetails,
  checkDeliveryItems,
}
