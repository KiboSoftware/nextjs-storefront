import { format } from 'date-fns'
import lodash from 'lodash'

import { FulfillmentOptions, DateFormat } from '../constants'

import type { MultiShipAddress, ShipOption } from '../types'
import type { CrOrderItem, Checkout, Maybe, CrDestination, CrContact } from '@/lib/gql/types'

interface DestinationItemGroup {
  destinationId: string
  groupingId: string
  destination: Maybe<CrDestination> | undefined
  items: Maybe<CrOrderItem>[] | undefined
}

const buildItemsGroupFromCheckoutGroupings = (checkout: Checkout) => {
  // const checkoutGroupings = checkout?.groupings?.reduce((sortedGroups: any, group: any) => {
  //   const groupItems = checkout?.items?.filter((item) =>
  //     group?.orderItemIds?.includes(item?.id as string)
  //   )
  //   const sortedGroup: DestinationItemGroup = {
  //     destinationId: group?.destinationId as string,
  //     groupingId: group?.id as string,
  //     destination: checkout?.destinations?.find(
  //       (destination) => destination?.id === group?.destinationId
  //     ),
  //     items: groupItems,
  //   }

  //   return [...sortedGroups, sortedGroup]
  // }, [])

  // return checkoutGroupings
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
  const destinationAddresses = checkout?.destinations?.map((destination) => {
    return {
      destinationId: destination?.id,
      address: destination?.destinationContact, //address property added to match with my account addresses
    }
  }) as MultiShipAddress[]

  const destinationAddressIds = Array.from(
    new Set(
      destinationAddresses
        ?.map((destinationAddress) => destinationAddress?.address?.id)
        .filter(Boolean)
    )
  )

  const savedAddresses = savedShippingAddresses
    ?.filter((shippingAddress) => {
      if (destinationAddressIds?.includes(shippingAddress?.id)) return false

      const matchedShippingAddress = checkout?.destinations?.find(
        (destination) =>
          destination?.destinationContact?.firstName === shippingAddress?.firstName &&
          lodash.isEqual(destination?.destinationContact?.address, shippingAddress?.address)
      )
      return !matchedShippingAddress
    })
    ?.map((savedShippingAddress) => {
      if (savedShippingAddress?.address) {
        return {
          destinationId: '',
          address: savedShippingAddress,
        }
      }
    })
    .filter(Boolean)

  return [...destinationAddresses, ...savedAddresses]
}

const getInitialShippingOption = (checkout: Checkout, shippingOptions: ShipOption[]) =>
  checkout?.groupings && checkout?.groupings?.length > 1
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
}
