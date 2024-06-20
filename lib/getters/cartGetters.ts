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
  const deliveryItems = cartItems.filter(
    (item: any) => item.fulfillmentMethod === FulfillmentOptions.DELIVERY
  )
  return {
    storeExternalIds: [deliveryWindowDateAndTime?.window?.confirmedStoreId],
    type: 'delivery',
    deliveryAddress: getNormalizedDeliveryAddress(deliveryWindowDateAndTime?.contact?.address),
    dropoffTime: deliveryWindowDateAndTime?.window?.confirmedWindow?.dropoffTime,
    packages: [
      { ...getPackagesDetails(cartItems), itemList: deliveryItems?.map(normalizeProduct) },
    ],
  }
}

const getPackagesDetails = (cartItems: any) => {
  let totalWeight = 0
  let totalHeight = 0
  let totalLength = 0
  let totalWidth = 0
  const deliveryItems = cartItems.filter(
    (item: any) => item.fulfillmentMethod === FulfillmentOptions.DELIVERY
  )
  deliveryItems?.forEach((item: any) => {
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
    quantity: deliveryItems?.length,
    items: 1,
    barcode: 'null',
    temperatureControl: 'none',
  }
}

const checkDeliveryItems = (data: any) => {
  if (data) {
    for (const item of data) {
      if (
        item.fulfillmentMethod === FulfillmentOptions.DELIVERY &&
        item.product.productType !==
          publicRuntimeConfig?.DeliverySolutionsDeliveryProductConfig?.productType
      ) {
        return true // Return true if such an item is found
      }
    }
  }
  return false // Return false if no such item is found
}
const formatTimestamp = (startTime: any, endTime = null) => {
  // Create Date objects using the timestamps
  const startDate = new Date(startTime)
  const endDate = endTime ? new Date(endTime) : null

  // Function to get the month name
  const getMonthName = (monthIndex: any) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return monthNames[monthIndex]
  }

  const formatTime = (date: any) => {
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    return `${hours}:${minutes} ${ampm}`
  }

  const startMonthName = getMonthName(startDate.getMonth())
  const startDay = startDate.getDate()
  const startFormattedTime = formatTime(startDate)

  let formattedDate
  if (endDate && !isNaN(endDate.getTime())) {
    const endMonthName = getMonthName(endDate.getMonth())
    const endDay = endDate.getDate()
    const endFormattedTime = formatTime(endDate)

    if (startDay === endDay && startMonthName === endMonthName) {
      formattedDate = `${startMonthName} ${startDay} ${startFormattedTime} - ${endFormattedTime}`
    } else {
      formattedDate = `${startMonthName} ${startDay} ${startFormattedTime} - ${endMonthName} ${endDay} ${endFormattedTime}`
    }
  } else {
    formattedDate = `${startMonthName} ${startDay} ${startFormattedTime}`
  }
  return formattedDate
}

const getDSDescription = (
  deliveryDateAndWindow: any,
  packages: any,
  tipAmount: any,
  deliveryInstructions: any
) => {
  return `<div><table><tr><td style="vertical-align:top"><div><b>Dropoff:</b> ${formatTimestamp(
    deliveryDateAndWindow?.window?.confirmedWindow?.dropoffTime?.startsAt,
    deliveryDateAndWindow?.window?.confirmedWindow?.dropoffTime?.endsAt
  )}</div><div><b>Pickup:</b> ${formatTimestamp(
    deliveryDateAndWindow?.window?.confirmedWindow?.pickupTime?.startsAt
  )}</div><div><b>Tip:</b> $${tipAmount || 0}</div><div><b>Delivery Instructions:</b> ${
    deliveryInstructions || 'Please deliver to the front desk'
  }</div><div><b>Send SMS Notification:</b> ${
    deliveryDateAndWindow?.notification?.isSendSMS || false
  }</div><div><b>Send Email Notification:</b> ${
    deliveryDateAndWindow?.notification?.isSendEmail || false
  }</div></td><td style="vertical-align:top"><div><b>Package Details:</b><table border="1"><tr><td><b> Size (H * W * L)</b></td><td><b> Quantity</b></td><td><b>Items</b></td></tr><tr><td> ${packages.size.height.toString()} * ${packages.size.width.toString()} * ${packages.size.length.toString()}</td><td>${packages.quantity.toString()}</td><td>${packages.items.toString()}</td></tr></table></div></td></tr></table></div>`
}

const convertIntoLocalStorageObject = (ds: any) => {
  const output = {
    code: ds?.storeId,
    contact: {
      address: ds?.deliveryContact?.address,
      firstName: ds?.deliveryContact?.firstName,
      phoneNumbers: ds?.deliveryContact.phoneNumbers,
      lastNameOrSurname: ds?.deliveryContact?.lastNameOrSurname,
    },
    storeBoundary: [ds?.storeId],
    notification: {
      isSendSMS: ds?.deliveryContact?.notifySms,
      isSendEmail: ds?.deliveryContact?.notifyEmail,
    },
  }

  return output
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
  formatTimestamp,
  getDSDescription,
  convertIntoLocalStorageObject,
}
