import type { LocationCustom, SavedBillingAddress } from '@/lib/types'

import type {
  Contact,
  CrAddress,
  CrPhone,
  CuAddress,
  CuPhone,
  CustomerContact,
} from '@/lib/gql/types'

type GenericAddress = CuAddress | CrAddress | null
type GenericPhone = CuPhone | CrPhone | null
type GenericContact = CustomerContact | Contact

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
const getFirstName = (billingData?: GenericContact): string => billingData?.firstName || ''

const getLastNameOrSurname = (billingData?: GenericContact): string =>
  billingData?.lastNameOrSurname || ''

const getPhoneNumbers = (billingData?: GenericContact) =>
  getContactNumbers(billingData?.phoneNumbers)

const getEmail = (billingData?: GenericContact): string => billingData?.email || ''

const getId = (billingData?: GenericContact) => billingData?.id || 0

const getBillingDetails = (billingData?: GenericContact) => {
  return {
    firstName: getFirstName(billingData),
    lastNameOrSurname: getLastNameOrSurname(billingData),
    address: getAddress(billingData?.address as GenericAddress),
    phoneNumbers: getPhoneNumbers(billingData),
    email: getEmail(billingData),
    id: getId(billingData),
  }
}

const getIsSameBillingShippingAddress = (billingData?: SavedBillingAddress): boolean =>
  Boolean(billingData?.isSameBillingShippingAddress)

const getStorePickupAddress = (
  pickupAddresses: LocationCustom[],
  fulfillmentLocationCode: string
): CrAddress =>
  pickupAddresses?.find((store) => store.code === fulfillmentLocationCode)?.fullAddress as CrAddress

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
  getBillingDetails,
  getIsSameBillingShippingAddress,
  getStorePickupAddress,
}
