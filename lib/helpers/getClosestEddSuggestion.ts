import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export const getClosestEDDSuggestion = (suggestions: any[], serviceType?: string) => {
  let filteredSuggestions = []
  if (serviceType) {
    filteredSuggestions = suggestions?.filter((s) => {
      const serviceTypeMatch = s.serviceType === serviceType
      return serviceTypeMatch
    })
  } else {
    filteredSuggestions = suggestions
  }

  const now = dayjs()

  const future = filteredSuggestions?.filter((s) =>
    dayjs(s.estimatedDeliveryDate).isSameOrAfter(now)
  )

  const list = future.length > 0 ? future : filteredSuggestions

  const closest = list.reduce((min, curr) =>
    dayjs(curr.estimatedDeliveryDate).diff(now) < dayjs(min.estimatedDeliveryDate).diff(now)
      ? curr
      : min
  )

  return closest
}
