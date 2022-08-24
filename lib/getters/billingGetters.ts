import { SavedBillingAddress } from '@/lib/types'

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
const getContactNumbers = <T extends GenericPhone>(contactNumbers?: T) => {
  return {
    home: contactNumbers?.home || '',
    mobile: contactNumbers?.mobile || '',
    work: contactNumbers?.work || '',
  }
}

const getAddress1 = <T extends GenericAddress>(address?: T) => address?.address1 || ''
const getAddress2 = <T extends GenericAddress>(address?: T) => address?.address2 || ''
const getAddress3 = <T extends GenericAddress>(address?: T) => address?.address3 || ''
const getAddress4 = <T extends GenericAddress>(address?: T) => address?.address4 || ''
const getAddressType = <T extends GenericAddress>(address?: T) => address?.addressType || ''
const getCityOrTown = <T extends GenericAddress>(address?: T) => address?.cityOrTown || ''
const getPostalOrZipCode = <T extends GenericAddress>(address?: T) => address?.postalOrZipCode || ''
const getStateOrProvince = <T extends GenericAddress>(address?: T) => address?.stateOrProvince || ''

const getAddress = <T extends GenericAddress | null>(address: T) => {
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
const getFirstName = <T extends GenericContact>(billingData?: T): string =>
  billingData?.firstName || ''

const getLastNameOrSurname = <T extends GenericContact>(billingData?: T): string =>
  billingData?.lastNameOrSurname || ''

const getPhoneNumbers = <T extends GenericContact>(billingData?: T) =>
  getContactNumbers(billingData?.phoneNumbers)

const getEmail = <T extends GenericContact>(billingData?: T): string => billingData?.email || ''

const getId = <T extends GenericContact>(billingData?: T) => billingData?.id || 0

const getBillingDetails = <T extends GenericContact>(billingData?: T) => {
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

export const billingGetters = {
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
}
