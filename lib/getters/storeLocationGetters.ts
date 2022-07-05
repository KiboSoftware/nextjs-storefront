import { Location, RegularHours, Hours, Maybe } from '@/lib/gql/types'

const getCode = (location: Maybe<Location>): string => {
  return location?.code as string
}

const getName = (location: Maybe<Location>): string => {
  return location?.name as string
}

const getPhone = (location: Maybe<Location>): string => {
  return location?.phone as string
}

const getAddress1 = (location: Maybe<Location>): string => {
  return location?.address?.address1 as string
}

const getAddress2 = (location: Maybe<Location>): string => {
  return location?.address?.address2 as string
}

const getCity = (location: Maybe<Location>): string => {
  return location?.address?.cityOrTown as string
}

const getState = (location: Maybe<Location>): string => {
  return location?.address?.stateOrProvince as string
}

const getZip = (location: Maybe<Location>): string => {
  return location?.address?.postalOrZipCode as string
}

const getHours = (location: Maybe<Location>) => {
  return Object.entries(location?.regularHours as RegularHours).map((value: (string | Hours)[]) => {
    return {
      day: value[0],
      ...(value[1] as Hours),
    }
  })
}

const getLocations = (locations: Maybe<Location>[]) => {
  return locations.length > 0
    ? locations?.map((location: Maybe<Location>) => ({
        code: getCode(location),
        name: getName(location),
        phone: getPhone(location),
        address1: getAddress1(location),
        address2: getAddress2(location),
        streetAddress: `${getAddress1(location)}, ${getAddress2(location)}`,
        cityStateZip: `${getCity(location)}, ${getState(location)}, ${getZip(location)}`,
        city: getCity(location),
        state: getState(location),
        zip: getZip(location),
        hours: getHours(location),
      }))
    : []
}

export const storeLocationGetters = {
  getLocations,
  getCode,
  getName,
  getPhone,
  getAddress1,
  getAddress2,
  getCity,
  getState,
  getZip,
  getHours,
}
