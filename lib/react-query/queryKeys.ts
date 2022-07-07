import type { CategorySearchParams } from '../types'

export const checkoutKeys = {
  all: ['checkout'] as const,
  detail: (id: string) => [...checkoutKeys.all, id] as const,
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

export const locationKeys = {
  locations: ['locations'] as const,
  purchaseLocation: ['purchaseLocation'] as const,
}
