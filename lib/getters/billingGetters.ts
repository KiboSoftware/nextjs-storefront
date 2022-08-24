import { SavedBillingAddress } from '@/lib/types'

import type {
  Contact,
  CrAddress,
  CrPhone,
  CuAddress,
  CuPhone,
  CustomerContact,
} from '@/lib/gql/types'

// billing
const getContactNumbers = (contactNumbers?: CuPhone | CrPhone | null) => {
  return {
    home: contactNumbers?.home || '',
    mobile: contactNumbers?.mobile || '',
    work: contactNumbers?.work || '',
  }
}

const getAddress1 = (address?: CuAddress | CrAddress | null) => address?.address1 || ''
const getAddress2 = (address?: CuAddress | CrAddress | null) => address?.address2 || ''
const getAddress3 = (address?: CuAddress | CrAddress | null) => address?.address3 || ''
const getAddress4 = (address?: CuAddress | CrAddress | null) => address?.address4 || ''
const getAddressType = (address?: CuAddress | CrAddress | null) => address?.addressType || ''
const getCityOrTown = (address?: CuAddress | CrAddress | null) => address?.cityOrTown || ''
const getPostalOrZipCode = (address?: CuAddress | CrAddress | null) =>
  address?.postalOrZipCode || ''
const getStateOrProvince = (address?: CuAddress | CrAddress | null) =>
  address?.stateOrProvince || ''

const getAddress = (address: CuAddress | CrAddress | null | undefined) => {
  return {
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    address3: address?.address3 || '',
    address4: address?.address4 || '',
    addressType: address?.addressType || '',
    cityOrTown: address?.cityOrTown || '',
    postalOrZipCode: address?.postalOrZipCode || '',
    stateOrProvince: address?.stateOrProvince || '',
  }
}
const getFirstName = (billingData?: CustomerContact | Contact): string =>
  billingData?.firstName || ''

const getLastNameOrSurname = (billingData?: CustomerContact | Contact): string =>
  billingData?.lastNameOrSurname || ''

const getPhoneNumbers = (billingData?: CustomerContact | Contact) =>
  getContactNumbers(billingData?.phoneNumbers)

const getEmail = (billingData?: CustomerContact | Contact): string => billingData?.email || ''

const getId = (billingData?: CustomerContact | Contact) => billingData?.id || 0

const getIsSameBillingShippingAddress = (billingData?: SavedBillingAddress): boolean =>
  Boolean(billingData?.isSameBillingShippingAddress)

const getBillingDetails = (billingData: Contact | CustomerContact | undefined) => {
  return {
    firstName: getFirstName(billingData),
    lastNameOrSurname: getLastNameOrSurname(billingData),
    address: getAddress(billingData?.address),
    phoneNumbers: getPhoneNumbers(billingData),
    email: getEmail(billingData),
    id: getId(billingData),
  }
}

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
