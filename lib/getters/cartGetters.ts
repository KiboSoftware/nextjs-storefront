import getConfig from 'next/config'

import { FulfillmentOptions } from '../constants'

import type { Maybe, Cart, CartItem, Location, Product } from '../gql/types'
import type { FulfillmentOption } from '../types'

const { publicRuntimeConfig } = getConfig()

const getCartItemCount = (cart: Cart) => cart?.items?.length || 0

const getCartItems = (cart: Cart) => cart?.items || []

const getCartItemFulfillmentLocation = (
  cartItem: Maybe<CartItem>,
  location: Maybe<Location>[]
): Location => {
  return (
    location &&
    (location?.filter((loc) => loc?.code === cartItem?.fulfillmentLocationCode)[0] as Location)
  )
}

const getProductFulfillmentOptions = (
  product: Product,
  location: Location
): FulfillmentOption[] => {
  const fullfillmentOptions = publicRuntimeConfig.fullfillmentOptions
  return fullfillmentOptions.map((option: FulfillmentOption) => ({
    value: option.value,
    name: option.name,
    code: option.code,
    label: option.label,
    fulfillmentLocation: location?.name,
    required: option.isRequired,
    shortName: option.shortName,
    disabled:
      product?.fulfillmentTypesSupported?.filter(
        (type) => type.toLowerCase() === option?.value?.toLowerCase()
      ).length === 0,
    details: (() => {
      if (option.shortName === FulfillmentOptions.SHIP) return option.details // checking if Directship
      if (location?.name) return `${option.details}: ${location.name}`
      return ''
    })(),
  }))
}

export const cartGetters = {
  getCartItemCount,
  getCartItems,
  getCartItemFulfillmentLocation,
  getProductFulfillmentOptions,
}
