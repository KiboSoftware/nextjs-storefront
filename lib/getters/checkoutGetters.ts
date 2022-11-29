import lodash from 'lodash'

import type { CrOrderItem, Checkout, Maybe, Destination, Contact } from '@/lib/gql/types'

interface DestinationItemGroup {
  destinationId: string
  destination: Maybe<Destination> | undefined
  items: Maybe<CrOrderItem>[] | undefined
}

const buildItemsGroupFromCheckoutGroupings = (checkout: Checkout) => {
  const checkoutGroupings = checkout?.groupings?.reduce((sortedGroups: any, group: any) => {
    const groupItems = checkout?.items?.filter((item) =>
      group?.orderItemIds?.includes(item?.id as string)
    )
    const sortedGroup: DestinationItemGroup = {
      destinationId: group?.destinationId as string,
      destination: checkout?.destinations?.find(
        (destination) => destination?.id === group?.destinationId
      ),
      items: groupItems,
    }

    return [...sortedGroups, sortedGroup]
  }, [])

  return checkoutGroupings
}

const formatDestinationAddress = (contact: Contact) => {
  const { firstName, lastNameOrSurname, email, address } = contact
  return `${firstName}, ${lastNameOrSurname}, ${address?.address1}, ${address?.address2}, ${address?.cityOrTown}, ${address?.stateOrProvince}, ${address?.postalOrZipCode}, ${address?.countryCode} `
}

const getMultiShipAddresses = ({ checkout, savedShippingAddresses }) => {
  const destinationAddresses = checkout?.destinations?.map((destination) => {
    return {
      destinationId: destination?.id,
      address: destination?.destinationContact,
    }
  })

  const destinationAddressIds = Array.from(
    new Set(
      destinationAddresses
        .map((destinationAddress) => destinationAddress.destinationContact?.id)
        .filter(Boolean)
    )
  )

  const savedAddresses = savedShippingAddresses
    ?.filter((shippingAddress) => {
      if (destinationAddressIds?.includes(shippingAddress?.id)) return

      return checkout?.destinations?.find(
        (destination) =>
          destination?.destinationContact?.firstName === shippingAddress?.firstName &&
          lodash.isEqual(destination?.destinationContact?.address, shippingAddress?.address)
      )
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

const getInitialShippingOption = (checkout, shippingOptions) =>
  checkout?.groupings?.length > 1 ? shippingOptions[1]?.value : shippingOptions[0]?.value

export const checkoutGetters = {
  buildItemsGroupFromCheckoutGroupings,
  formatDestinationAddress,
  getMultiShipAddresses,
  getInitialShippingOption,
}
