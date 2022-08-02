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

const getAddress = (address?: CuAddress | CrAddress | null) => {
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

const getBillingAddress = (billingData: CustomerContact | Contact) =>
  getAddress(billingData.address)

const getPhoneNumbers = (billingData?: CustomerContact | Contact) =>
  getContactNumbers(billingData?.phoneNumbers)

const getEmail = (billingData?: CustomerContact | Contact): string => billingData?.email || ''

const getId = (billingData?: CustomerContact | Contact) => billingData?.id || 0

const getIsSameBillingShippingAddress = (billingData?: SavedBillingAddress): boolean =>
  Boolean(billingData?.isSameBillingShippingAddress)

const getBillingDetails = (billingData: CustomerContact | Contact) => {
  return {
    firstName: getFirstName(billingData),
    lastNameOrSurname: getLastNameOrSurname(billingData),
    address: getBillingAddress(billingData),
    phoneNumbers: getPhoneNumbers(billingData),
    email: getEmail(billingData),
    id: getId(billingData),
  }
}

export const billingGetters = {
  getAddress,
  getBillingDetails,
  getIsSameBillingShippingAddress,
}
