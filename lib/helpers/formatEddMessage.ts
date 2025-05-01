import dayjs from 'dayjs'

import { EDDFulfillmentOptionKey, EDDFulfillmentOptions } from '../constants'

interface FormatEDDOptions {
  eddISO: string
  cutoffDate?: string
  mode: (typeof EDDFulfillmentOptions)[EDDFulfillmentOptionKey]
  isOrderPlaced?: boolean
}

export function formatEDDMessage({
  eddISO,
  cutoffDate,
  mode = EDDFulfillmentOptions.Ship,
  isOrderPlaced = false,
}: FormatEDDOptions): string {
  const edd = dayjs(eddISO)
  const now = dayjs()

  const isToday = edd.isSame(now, 'day')
  const isTomorrow = edd.isSame(now.add(1, 'day'), 'day')

  const timeStr = edd.format('h A') // e.g. "4 PM"
  const dateStr = edd.format('MM/DD/YYYY')

  if (mode === EDDFulfillmentOptions.Ship || mode === EDDFulfillmentOptions.Delivery) {
    if (isOrderPlaced) {
      return `Expected Delivery by ${dateStr},${timeStr}`
    }
    if (isToday) return `Order Now and Get it by ${timeStr} today`
    if (isTomorrow) return `Order Now and Get it by ${timeStr} tomorrow`
    return `Expected Delivery by ${dateStr}`
  }

  if (mode === EDDFulfillmentOptions.Pickup) {
    if (isToday) return `Available For Pick up after ${timeStr} today`
    if (isTomorrow) return `Available For Pick up after ${timeStr} tomorrow`
    return `Available For Pick up on ${dateStr}, ${timeStr}`
  }

  throw new Error(`Unknown fulfillment mode: ${mode}`)
}
