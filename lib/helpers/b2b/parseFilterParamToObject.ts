import { QuoteFilters } from '@/lib/types'

export const parseFilterParamToObject = (filterParam: string): QuoteFilters => {
  const filters: QuoteFilters = {
    name: '',
    number: '',
    expirationDate: '',
    status: '',
    others: '',
  }

  if (!filterParam) {
    return filters
  }

  const conditions = filterParam?.split(' and ')

  for (const condition of conditions) {
    if (condition.includes('name cont')) {
      filters.name = condition.split('name cont ')[1]
    } else if (condition.includes('number eq')) {
      filters.number = condition.split('number eq ')[1]
    } else if (condition.includes('expirationDate ge')) {
      filters.expirationDate = condition.split('expirationDate ge ')[1]
    } else if (condition.includes('status eq')) {
      filters.status = condition.split('status eq ')[1]
    } else {
      filters.others = condition
    }
  }

  return filters
}
