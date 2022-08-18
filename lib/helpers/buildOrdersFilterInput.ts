import getConfig from 'next/config'

import { OrderStatus } from '../constants'

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
  const { publicRuntimeConfig } = getConfig()
  const variables = {
    filter: '',
    startIndex: params.startIndex || publicRuntimeConfig.orderHistory.startIndex,
    pageSize: params.pageSize || publicRuntimeConfig.orderHistory.pageSize,
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

  // To view order status page
  if (params.orderNumber && params.billingEmail) {
    variables.filter = `orderNumber eq ${params.orderNumber} and email eq ${params.billingEmail}`
  }

  variables.filter =
    variables.filter && variables.filter.concat(` and status ne ${OrderStatus.ABANDONED}`)
  return variables
}
