import format from 'date-fns/format'
import isEqual from 'lodash/isEqual'

import { FulfillmentOptions, DateFormat } from '../constants'

import type { MultiShipAddress, ShipOption } from '../types'
import type { CrOrderItem, Checkout, CrContact } from '@/lib/gql/types'

const buildItemsGroupFromCheckoutGroupings = (checkout: Checkout) => {
  return getShipItems(checkout).map((item: CrOrderItem) => {
    const destination = checkout.destinations?.find(
      (destination) => destination?.id === item.destinationId
    )
    return {
      groupingId: checkout.groupings?.find((group) => group?.destinationId === item.destinationId)
        ?.id as string,
      destinationId: item.destinationId,
      destination: {
        id: destination?.id,
        destinationContact: destination?.destinationContact,
      },
      items: [item],
    }
  })
}

const formatDestinationAddress = (contact: CrContact) => {
  const { firstName, lastNameOrSurname, address } = contact
  return `${firstName} ${lastNameOrSurname}, ${address?.address1}, ${address?.address2}, ${address?.cityOrTown}, ${address?.stateOrProvince}, ${address?.postalOrZipCode}, ${address?.countryCode} `
}

const getMultiShipAddresses = ({
  checkout,
  savedShippingAddresses,
}: {
  checkout: Checkout
  savedShippingAddresses: CrContact[]
}) => {
  const destinationAddresses = (checkout?.destinations || []).map((destination) => ({
    destinationId: destination?.id,
    address: destination?.destinationContact,
  })) as MultiShipAddress[]

  const destinationAddressIds = new Set(
    destinationAddresses
      .map((destinationAddress) => destinationAddress?.address?.id)
      .filter(Boolean)
  )

  const savedAddresses = (savedShippingAddresses || [])
    .filter((shippingAddress) => !destinationAddressIds.has(shippingAddress?.id))
    .filter((shippingAddress) => {
      const matchedShippingAddress = (checkout?.destinations || []).find(
        (destination) =>
          destination?.destinationContact?.firstName === shippingAddress?.firstName &&
          isEqual(destination?.destinationContact?.address, shippingAddress?.address)
      )
      return !matchedShippingAddress
    })
    .map((savedShippingAddress) => ({
      destinationId: '',
      address: savedShippingAddress,
    }))
    .filter(Boolean)

  return [...destinationAddresses, ...savedAddresses]
}

const getInitialShippingOption = (checkout: Checkout, shippingOptions: ShipOption[]) =>
  checkout?.groupings &&
  checkout?.groupings.filter((group) => group?.fulfillmentMethod === FulfillmentOptions.SHIP)
    ?.length > 1
    ? shippingOptions[1]?.value
    : shippingOptions[0]?.value

const getCheckoutItemCount = (checkout: Checkout) => checkout?.items?.length
const checkMultiShipPaymentValid = (checkout: Checkout) => {
  const groupingWithoutShippingRates = checkout?.groupings?.find(
    (grouping) =>
      grouping?.fulfillmentMethod === FulfillmentOptions.SHIP &&
      !grouping?.shippingMethodCode &&
      !grouping?.shippingMethodName
  )
  return !groupingWithoutShippingRates
}
const getShippingMethodCode = (checkout: Checkout) => {
  return checkout?.groupings && checkout?.groupings[0]?.shippingMethodCode
}

const getItemsByFulfillment = (checkout: Checkout, fulfillmentMethod: string): CrOrderItem[] => {
  return (
    (checkout?.items?.filter(
      (lineItem) => lineItem?.fulfillmentMethod === fulfillmentMethod
    ) as CrOrderItem[]) || []
  )
}
const getPickupItems = (checkout: Checkout): CrOrderItem[] => {
  return getItemsByFulfillment(checkout, FulfillmentOptions.PICKUP)
}
const getShipItems = (checkout: Checkout): CrOrderItem[] =>
  getItemsByFulfillment(checkout, FulfillmentOptions.SHIP)

const getCheckoutDetails = (checkout: Checkout) => {
  return {
    shipItems: getShipItems(checkout),
    pickupItems: getPickupItems(checkout),
  }
}
const getTaxTotal = (checkout: Checkout) => {
  return checkout?.itemTaxTotal + checkout?.shippingTaxTotal + checkout?.handlingTaxTotal
}

const getOrderAddresses = (checkout: Checkout) => {
  const destinationIds = checkout?.groupings?.map((group) => group?.destinationId)
  const destinations = checkout.destinations?.filter((destination) =>
    destinationIds?.includes(destination?.id)
  )
  const addresses = destinations?.map((destination) => destination?.destinationContact)
  return addresses
}

const getFormattedDate = (dateInput: string | number | Date) => {
  return dateInput ? format(new Date(dateInput), DateFormat.DATE_FORMAT_WITH_TIME) : ''
}

const isSingleShippingItem = (checkout: Checkout) => {
  return (
    checkout.items?.filter((item) => item?.fulfillmentMethod === FulfillmentOptions.SHIP).length ===
    1
  )
}

const getDiscountedSubtotal = (checkout: Checkout) => {
  return checkout.itemLevelProductDiscountTotal + checkout?.orderLevelProductDiscountTotal
}

export const checkoutGetters = {
  buildItemsGroupFromCheckoutGroupings,
  formatDestinationAddress,
  getMultiShipAddresses,
  getInitialShippingOption,
  getCheckoutItemCount,
  checkMultiShipPaymentValid,
  getShippingMethodCode,
  getShipItems,
  getPickupItems,
  getCheckoutDetails,
  getTaxTotal,
  getOrderAddresses,
  getFormattedDate,
  isSingleShippingItem,
  getDiscountedSubtotal,
}
