import dayjs from 'dayjs'

type FulfillmentMode = 'ship' | 'pickup'

interface FormatEDDOptions {
  eddISO: string
  mode: FulfillmentMode
}

export function formatEDDMessage({ eddISO, mode = 'ship' }: FormatEDDOptions): string {
  const edd = dayjs(eddISO)
  const now = dayjs()

  const isToday = edd.isSame(now, 'day')
  const isTomorrow = edd.isSame(now.add(1, 'day'), 'day')

  const timeStr = edd.format('h A') // e.g. "4 PM"
  const dateStr = edd.format('MM/DD/YYYY')

  if (mode === 'ship') {
    if (isToday) return `Order Now and Get it by ${timeStr} today`
    if (isTomorrow) return `Order Now and Get it by ${timeStr} tomorrow`
    return `Expected Delivery by ${dateStr}`
  }

  if (mode === 'pickup') {
    if (isToday) return `Available For Pick up after ${timeStr} today`
    if (isTomorrow) return `Available For Pick up after ${timeStr} tomorrow`
    return `Available For Pick up on ${dateStr}`
  }

  throw new Error(`Unknown fulfillment mode: ${mode}`)
}
