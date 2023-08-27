import { QuoteFilters } from '@/lib/types'

export const buildQuotesFilterParam = (filters: QuoteFilters): string => {
  const conditions = filters.others ? [filters.others] : []

  if (filters.name && parseInt(filters.number as string)) {
    conditions.push(`name cont ${filters.name} or number eq ${filters.number}`)
  } else {
    if (filters.name) {
      conditions.push(`name cont ${filters.name}`)
    }
    if (parseInt(filters.number as string)) {
      conditions.push(`number eq ${filters.number}`)
    }
  }

  if (filters.expirationDate) {
    conditions.push(`expirationDate ge ${filters.expirationDate}`)
  }
  if (filters.status) {
    conditions.push(`status eq ${filters.status}`)
  }

  return conditions.join(' and ')
}
