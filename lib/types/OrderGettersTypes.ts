import { CrContact, CrAddress, CrOrderItem, Maybe } from '../gql/types'

interface ContactDetails {
  firstName: string
  lastNameOrSurname: string
}

export interface ShippingDetails extends ContactDetails {
  shippingPhoneHome: string
  shippingPhoneMobile: string
  shippingPhoneWork: string
  shippingAddress: CrAddress
}

export interface BillingDetails extends ContactDetails {
  billingPhoneHome?: string
  billingPhoneMobile?: string
  billingPhoneWork?: string
  billingAddress: CrAddress
}

export interface OrderSummary {
  shippingTotal: number
  subTotal: number
  taxTotal: number
  total: number
  totalCollected: number
  discountedSubtotal: number
}
export interface PaymentMethod {
  cardType: string
  cardNumberPartOrMask: string
  expiry: string
}
export interface CheckoutDetails {
  shipItems: Maybe<CrOrderItem>[]
  pickupItems: Maybe<CrOrderItem>[]
  digitalItems: Maybe<CrOrderItem>[]
  orderSummary: OrderSummary
  personalDetails: CrContact
  shippingDetails: ShippingDetails
  billingDetails: BillingDetails
  paymentMethods: PaymentMethod[]
  purchaseOrderPaymentMethods?: any[]
}
