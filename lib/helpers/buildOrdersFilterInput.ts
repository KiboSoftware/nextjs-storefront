const getPastDateTimestamp = (months: number) => {
  const today = new Date()
  today.setMonth(today.getMonth() - months)
  return today.toISOString()
}

export const buildOrdersFilterInput = (params: {
  filters?: Array<string> | string
  startIndex?: number
  pageSize?: number
  orderNumber?: string
  billingEmail?: string
}) => {
  const variables = {
    filter: '',
    startIndex: params.startIndex || 0,
    pageSize: params.pageSize || 20,
  }

  // To view order history page
  if (params.filters) {
    const searchFilters = []
    for (const filters of params.filters) {
      const filter = filters.split('-')
      if (filter[0].toLowerCase() === 'm') {
        searchFilters.push(`createDate gt ${getPastDateTimestamp(parseInt(filter[1]))}`)
      } else if (filter[0].toLowerCase() === 'y') {
        const startDate = new Date(`${filter[1]}-01-01`).toISOString()
        const endDate = new Date(`${filter[1]}-12-31`).toISOString()
        searchFilters.push(`createDate gt ${startDate} and createDate lt ${endDate}`)
      }
    }
    variables.filter = searchFilters.join(' and ')
  }

  variables.filter = variables.filter.concat(' and status ne Abandoned')
  console.log('vvariables', variables.filter)
  return variables
}
