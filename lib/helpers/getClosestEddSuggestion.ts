import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export const getClosestEDDSuggestion = (
  suggestions: any[],
  carrier?: string,
  serviceType?: string
) => {
  let filteredSuggestions = []
  if (carrier && serviceType) {
    filteredSuggestions = suggestions?.filter((s) => {
      const carrierMatch = s.carrier === carrier
      const serviceTypeMatch = s.serviceType === serviceType
      return carrierMatch && serviceTypeMatch
    })
  } else {
    filteredSuggestions = suggestions
  }

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
