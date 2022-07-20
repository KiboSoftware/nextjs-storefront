import { storeLocationGetters } from '../storeLocationGetters'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'

const locations = locationCollectionMock.spLocations?.items || []
const location = locations[0] || {}
const hours = [
  { day: 'monday', storeTime: '9:00am - 9:00pm' },
  { day: 'tuesday', storeTime: '9:00am - 9:00pm' },
  { day: 'wednesday', storeTime: '9:00am - 9:00pm' },
  { day: 'thursday', storeTime: '9:00am - 9:00pm' },
  { day: 'friday', storeTime: '9:00am - 9:00pm' },
  { day: 'saturday', storeTime: '9:00am - 9:00pm' },
  { day: 'sunday', storeTime: '9:00am - 9:00pm' },
]
const customLocation = {
  code: location?.code,
  name: location?.name,
  phone: location?.phone,
  address1: location?.address.address1,
  address2: location?.address.address2,
  streetAddress: `${location?.address.address1}, ${location?.address.address2}`,
  cityState: `${location?.address.cityOrTown}, ${location?.address.stateOrProvince}`,
  city: location?.address.cityOrTown,
  state: location?.address.stateOrProvince,
  zip: location?.address.postalOrZipCode,
  hours: hours,
  fullAddress: location?.address,
}
const customLocations = [customLocation]

describe('[getters] storeLocationGetters', () => {
  it('should return the location name', () => {
    expect(storeLocationGetters.getName(location)).toBe(location?.name)
  })

  it('should return the location code', () => {
    expect(storeLocationGetters.getCode(location)).toBe(location?.code)
  })

  it('should return the location phone', () => {
    expect(storeLocationGetters.getPhone(location)).toBe(location?.phone)
  })

  it('should return the location address1', () => {
    expect(storeLocationGetters.getAddress1(location)).toBe(location?.address.address1)
  })

  it('should return the location address2', () => {
    expect(storeLocationGetters.getAddress2(location)).toBe(location?.address.address2)
  })

  it('should return the location city', () => {
    expect(storeLocationGetters.getCity(location)).toBe(location?.address.cityOrTown)
  })

  it('should return the location state', () => {
    expect(storeLocationGetters.getState(location)).toBe(location?.address.stateOrProvince)
  })

  it('should return the location zip', () => {
    expect(storeLocationGetters.getZip(location)).toBe(location?.address.postalOrZipCode)
  })

  it('should return the location hours', () => {
    expect(storeLocationGetters.getHours(location)).toStrictEqual(hours)
  })

  it('should return the location full address', () => {
    expect(storeLocationGetters.getFullAddress(location)).toStrictEqual(location?.address)
  })

  it('should return the locations', () => {
    expect(storeLocationGetters.getLocations(locations)).toStrictEqual(customLocations)
  })

  it('should return the location', () => {
    expect(storeLocationGetters.getLocation(location)).toStrictEqual(customLocation)
  })
})
