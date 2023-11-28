import { QueryQuotesArgs } from '../gql/types'
import { PageProps } from '@/hooks'

import type { CategorySearchParams } from '../types'

export const checkoutKeys = {
  all: ['checkout'] as const,
  detail: (id: string) => [...checkoutKeys.all, id] as const,
}
export const checkoutDestinationKeys = {
  all: ['checkoutDestination'] as const,
  destinationId: (id: string) => [...checkoutDestinationKeys.all, id] as const,
}
export const splitOrderShipmentKeys = {
  all: ['splitOrderShipment'] as const,
  orderId: (id: string) => [...splitOrderShipmentKeys.all, id] as const,
}

export const shippingMethodKeys = {
  all: ['shippingMethod'] as const,
  detail: (id: string, newAddress?: string, addressId?: number | string) =>
    [...shippingMethodKeys.all, id, newAddress, addressId] as const,
}

export const quoteShippingMethodKeys = {
  all: ['quoteShippingMethod'] as const,
  detail: (
    id: string,
    draft?: boolean,
    addressId?: boolean,
    selectedShippingAddressId?: string | number
  ) => [...quoteShippingMethodKeys.all, id, draft, addressId, selectedShippingAddressId] as const,
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

export const customerB2BUserKeys = {
  all: ['b2BUsers'] as any,
  search: (
    accountId: number,
    index: number,
    pageSize: number,
    searchTerm: string | undefined,
    filter: string,
    sortBy: string
  ) =>
    [...customerB2BUserKeys.all, accountId, index, pageSize, searchTerm, filter, sortBy] as const,
}

export const accountHierarchyKeys = {
  all: ['accountHierarchy'] as any,
  accountHierarchy: (accountId: number) => [...accountHierarchyKeys.all, accountId] as const,
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

export const customerPurchaseOrderAccountKeys = {
  all: ['customerPurchaseOrderAccount'] as const,
  purchaseOrderAccountById: (accountId: number) =>
    [...customerPurchaseOrderAccountKeys.all, accountId] as const,
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
  page: (key: PageProps) =>
    [
      wishlistKeys.all[0],
      { startIndex: key.startIndex },
      { pageSize: key.pageSize },
      { filter: key.filter },
      { sortBy: key.sortBy },
    ] as const,
}

export const ordersKeys = {
  all: ['orders'] as const,
  orderFilter: (params: string | string[] | undefined) => [...ordersKeys.all, params] as const,
}

export const inventoryKeys = {
  all: ['inventory'] as const,
  inventoryParams: (productCode: string, locationCodes: string) =>
    [...shippingMethodKeys.all, productCode, locationCodes] as const,
}

export const returnReasonsKeys = {
  all: ['returnReasons'] as const,
}

export const returnsKeys = {
  all: ['returns'] as const,
}

export const subscriptionKeys = {
  all: ['subscriptions'] as const,
}

export const productKeys = {
  all: ['product'] as const,
  productParams: (productCode: string, useSubscriptionPricing: boolean) =>
    [productCode, useSubscriptionPricing] as const,
}

export const addressKeys = {
  all: ['address'] as const,
}

export const b2bQuotesKeys = {
  all: ['quotes'],
  quotesParams: (params: QueryQuotesArgs) => [...b2bQuotesKeys.all, params] as const,
}
export const quoteKeys = {
  all: ['quote'] as const,
  detail: (id: string) => [...quoteKeys.all, id] as const,
}

export const customerWishlistKeys = {
  all: ['customerWishlist'] as const,
  detail: (id: string) => [...customerWishlistKeys.all, id] as const,
}
