import type { LocationCustom, SavedBillingAddress } from '@/lib/types'

import type {
  CrContact,
  CrAddress,
  CrPhone,
  CuAddress,
  CuPhone,
  CustomerContact,
  SbContact,
  SbPhone,
  SbAddress,
} from '@/lib/gql/types'

type GenericAddress = CuAddress | CrAddress | SbAddress | null
type GenericPhone = CuPhone | CrPhone | SbPhone | null
type GenericContact = CustomerContact | CrContact | SbContact

// billing
const getContactNumbers = (contactNumbers?: GenericPhone) => {
  return {
    home: contactNumbers?.home || '',
    mobile: contactNumbers?.mobile || '',
    work: contactNumbers?.work || '',
  }
}

const getAddress1 = (address?: GenericAddress) => address?.address1 || ''
const getAddress2 = (address?: GenericAddress) => address?.address2 || ''
const getAddress3 = (address?: GenericAddress) => address?.address3 || ''
const getAddress4 = (address?: GenericAddress) => address?.address4 || ''
const getAddressType = (address?: GenericAddress) => address?.addressType || ''
const getCityOrTown = (address?: GenericAddress) => address?.cityOrTown || ''
const getPostalOrZipCode = (address?: GenericAddress) => address?.postalOrZipCode || ''
const getStateOrProvince = (address?: GenericAddress) => address?.stateOrProvince || ''

const getAddress = (address: GenericAddress | null) => {
  return {
    address1: getAddress1(address),
    address2: getAddress2(address),
    address3: getAddress3(address),
    address4: getAddress4(address),
    addressType: getAddressType(address),
    cityOrTown: getCityOrTown(address),
    postalOrZipCode: getPostalOrZipCode(address),
    stateOrProvince: getStateOrProvince(address),
  }
}
const getFirstName = (contact?: GenericContact): string => contact?.firstName || ''

const getLastNameOrSurname = (contact?: GenericContact): string => contact?.lastNameOrSurname || ''

const getPhoneNumbers = (contact?: GenericContact) => getContactNumbers(contact?.phoneNumbers)

const getEmail = (contact?: GenericContact): string => contact?.email || ''

const getContactId = (contact?: GenericContact) => contact?.id || 0

const getIsBillingShippingAddressSame = (data?: SavedBillingAddress): boolean =>
  Boolean(data?.isSameBillingShippingAddress)

const getStorePickupAddress = (
  pickupAddresses: LocationCustom[],
  fulfillmentLocationCode: string
): CrAddress =>
  pickupAddresses?.find((store) => store.code === fulfillmentLocationCode)?.fullAddress as CrAddress

const getFormattedAddress = (contact?: GenericContact) => {
  return `${getAddress1(contact?.address)} ${getAddress2(contact?.address)} ${getCityOrTown(
    contact?.address
  )} ${getStateOrProvince(contact?.address)} ${getPostalOrZipCode(contact?.address)}`
}

export const addressGetters = {
  getAddress,
  getAddress1,
  getAddress2,
  getAddress3,
  getAddress4,
  getAddressType,
  getCityOrTown,
  getPostalOrZipCode,
  getStateOrProvince,
  getFirstName,
  getLastNameOrSurname,
  getIsBillingShippingAddressSame,
  getStorePickupAddress,
  getPhoneNumbers,
  getEmail,
  getContactId,
  getFormattedAddress,
}
