import getConfig from 'next/config'

import { FulfillmentOptions } from '../constants'
import { subscriptionGetters } from './subscriptionGetters'

import type { Maybe, CrCart, CrCartItem, Location, CrSubscriptionInfo } from '../gql/types'
import type { FulfillmentOption } from '../types'

const { publicRuntimeConfig } = getConfig()

const getCartItemCount = (cart: CrCart) => cart?.items?.length || 0

const getCartItems = (cart: CrCart) => cart?.items || []

const getCartItemFulfillmentLocation = (
  cartItem: Maybe<CrCartItem>,
  location: Maybe<Location>[]
): Location => {
  return (
    location &&
    (location?.filter((loc) => loc?.code === cartItem?.fulfillmentLocationCode)[0] as Location)
  )
}

const getProductFulfillmentOptions = (
  cartItem: CrCartItem,
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
      if (location?.name) return `${option.details}: ${location.name}`
      return ''
    })(),
  }))
}

const getSubscriptionDetails = (cartItem: Maybe<CrCartItem>) => {
  return subscriptionGetters.getSubscriptionFrequency(cartItem?.subscription as CrSubscriptionInfo)
}

export const cartGetters = {
  getCartItemCount,
  getCartItems,
  getCartItemFulfillmentLocation,
  getProductFulfillmentOptions,
  getSubscriptionDetails,
}
