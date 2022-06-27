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
