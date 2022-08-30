import type { CategorySearchParams } from '../types'

export const checkoutKeys = {
  all: ['checkout'] as const,
  detail: (id: string) => [...checkoutKeys.all, id] as const,
}

export const shippingMethodKeys = {
  all: ['shippingMethod'] as const,
  detail: (id: string) => [...shippingMethodKeys.all, id] as const,
}

export const searchKeys = {
  all: ['search'] as const,
  suggestions: (term: string) => [...searchKeys.all, term] as const,
}

export const categoryTreeKeys = {
  all: ['categoryTree'] as const,
}

export const loginKeys = {
  user: ['user'] as const,
}
export const productSearchResultKeys = {
  all: ['productSearch'] as const,
  searchParams: (params: CategorySearchParams) => [...productSearchResultKeys.all, params] as const,
}

export const cartKeys = {
  all: ['cart'] as const,
}

export const customerAccountCardsKeys = {
  all: ['customerAccountCards'] as const,
  cardById: (accountId: number) => [...customerAccountCardsKeys.all, accountId] as const,
}

export const customerAccountContactsKeys = {
  all: ['customerAccountContacts'] as const,
  addressById: (accountId: number) => [...customerAccountContactsKeys.all, accountId] as const,
}

export const locationKeys = {
  locations: ['locations'] as const,
  locationsParams: (params: { filter: string } | undefined) =>
    [...locationKeys.locations, params] as const,

  purchaseLocation: ['purchaseLocation'] as const,
  purchaseLocationParams: (params: { filter: string } | undefined) =>
    [...locationKeys.purchaseLocation, params] as const,
}

export const wishlistKeys = {
  all: ['wishlist'] as const,
}

export const ordersKeys = {
  all: ['orders'] as const,
  orderFilter: (params: string | string[] | undefined) => [...ordersKeys.all, params] as const,
}

export const inventoryKeys = {
  all: ['inventory'] as const,
}
