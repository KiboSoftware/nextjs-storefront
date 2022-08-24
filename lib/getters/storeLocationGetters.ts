import type { LocationCustom } from '@/lib/types'

import type { Location, Hours, Maybe, CrAddress } from '@/lib/gql/types'

const getCode = (location: Maybe<Location>): string => {
  return location?.code || ''
}

const getName = (location: Maybe<Location>): string => {
  return location?.name || ''
}

const getPhone = (location: Maybe<Location>): string => {
  return location?.phone || ''
}

const getAddress1 = (location: Maybe<Location>): string => {
  return location?.address?.address1 || ''
}

const getAddress2 = (location: Maybe<Location>): string => {
  return location?.address?.address2 || ''
}

const getCity = (location: Maybe<Location>): string => {
  return location?.address?.cityOrTown || ''
}

const getState = (location: Maybe<Location>): string => {
  return location?.address?.stateOrProvince || ''
}

const getZip = (location: Maybe<Location>): string => {
  return location?.address?.postalOrZipCode || ''
}

const getHours = (location: Maybe<Location>) => {
  return (
    location?.regularHours &&
    Object.entries(location?.regularHours).map((value: (string | Hours)[]) => {
      const hours = value[1] as Hours
      const storeTime =
        hours?.openTime && hours?.closeTime ? `${hours?.openTime}am - ${hours?.closeTime}pm` : ''
      return {
        day: value[0],
        storeTime: storeTime,
      }
    })
  )
}

const getFullAddress = (location: Maybe<Location>): CrAddress => {
  return location?.address as CrAddress
}

const getLocations = (locations: Maybe<Location>[]): LocationCustom[] => {
  return locations?.length > 0
    ? locations?.map((location: Maybe<Location>) => getLocation(location))
    : []
}

const getLocationCodes = (locations: Maybe<Location>[]): string => {
  return locations?.length > 0 ? locations.map((location) => location?.code).join(',') : ''
}

const getLocation = (location: Maybe<Location>): LocationCustom => {
  return {
    code: getCode(location),
    name: getName(location),
    phone: getPhone(location),
    address1: getAddress1(location),
    address2: getAddress2(location),
    streetAddress: `${getAddress1(location)}, ${getAddress2(location)}`,
    cityState: `${getCity(location)}, ${getState(location)}`,
    city: getCity(location),
    state: getState(location),
    zip: getZip(location),
    hours: getHours(location),
    fullAddress: getFullAddress(location),
  }
}

export const storeLocationGetters = {
  getLocations,
  getLocation,
  getCode,
  getName,
  getPhone,
  getAddress1,
  getAddress2,
  getCity,
  getState,
  getZip,
  getHours,
  getFullAddress,
  getLocationCodes,
}
