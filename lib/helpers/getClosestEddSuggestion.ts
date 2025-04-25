import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export const getClosestEDDSuggestion = (suggestions: any[]) => {
  const now = dayjs()

  const future = suggestions?.filter((s) => dayjs(s.estimatedDeliveryDate).isSameOrAfter(now))

  const list = future.length > 0 ? future : suggestions

  const closest = list.reduce((min, curr) =>
    dayjs(curr.estimatedDeliveryDate).diff(now) < dayjs(min.estimatedDeliveryDate).diff(now)
      ? curr
      : min
  )

  return closest
}
