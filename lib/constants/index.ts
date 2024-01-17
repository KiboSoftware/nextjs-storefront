export enum FormStates {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  VALIDATE = 'VALIDATE',
}

export enum FulfillmentOptions {
  SHIP = 'Ship',
  PICKUP = 'Pickup',
  DIGITAL = 'Digital',
}

export enum PaymentWorkflow {
  MOZU = 'Mozu',
}

export enum PaymentType {
  PURCHASEORDER = 'PurchaseOrder',
  CREDITCARD = 'CreditCard',
}

export enum OrderStatus {
  ABANDONED = 'Abandoned',
  COMPLETED = 'Completed',
  CREATED = 'Created',
  CANCELED = 'Cancelled',
}

export enum ReturnStatus {
  NONE = 'None',
}

const currentYear = new Date().getFullYear()
export const FacetListForHistory = [
  { label: 'last-30-days', filterValue: 'M-1', isApplied: false, isDisplayed: true, count: 0 },
  { label: 'last-6-months', filterValue: 'M-6', isApplied: false, isDisplayed: true, count: 0 },
  {
    label: `${currentYear}`,
    filterValue: `Y-${currentYear}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
  {
    label: `${currentYear - 1}`,
    filterValue: `Y-${currentYear - 1}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
  {
    label: `${currentYear - 2}`,
    filterValue: `Y-${currentYear - 2}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
  {
    label: `${currentYear - 3}`,
    filterValue: `Y-${currentYear - 3}`,
    isApplied: false,
    isDisplayed: true,
    count: 0,
  },
]

export const FacetTypeForHistory = [
  { facetType: 'Value', label: 'time-filter', values: FacetListForHistory },
]

export const AddressType = {
  BILLING: 'Billing',
  SHIPPING: 'Shipping',
}

export const footerConfig = {
  sections: [
    {
      title: 'about us',
      items: [
        { link: '', text: 'Who we are' },
        { link: '', text: 'Quality in the detail' },
        { link: '', text: 'Customer Reviews' },
      ],
    },
    {
      title: 'departments',
      items: [
        { link: '', text: 'Mens' },
        { link: '', text: 'Womens' },
        { link: '', text: 'Kids' },
      ],
    },
    {
      title: 'contact',
      items: [
        { link: '', text: 'Customer Service' },
        { link: '', text: 'Contact Us' },
      ],
    },
    { title: 'payment & delivery', items: [{ link: '', text: 'Purchase Terms' }] },
  ],
  social: [
    { iconPath: '/icons/facebook.svg', link: '' },
    { iconPath: '/icons/google.svg', link: '' },
    { iconPath: '/icons/pinterest.svg', link: '' },
    { iconPath: '/icons/twitter.svg', link: '' },
    { iconPath: '/icons/youtube.svg', link: '' },
  ],
}

export enum DefaultId {
  ADDRESSID = 1,
}

export const OrderReturnType = {
  REPLACE: 'Replace',
  REFUND: 'Refund',
}

export const ProductAttribute = {
  SUBSCRIPTION_FREQUENCY: 'system~subscription-frequency',
  SUBSCRIPTION_Mode: 'system~subscription-mode',
}

export const CheckoutUpdateMode = { APPLY_TO_ORIGINAL: 'ApplyToOriginal' }

export enum PurchaseTypes {
  SUBSCRIPTION = 'Subscription',
  ONETIMEPURCHASE = 'One-time purchase',
}

export enum DisplayMode {
  EDIT = 'Edit',
  ADDNEW = 'AddNew',
}

export enum DateFormat {
  DATE_FORMAT = 'MMMM dd, yyyy',
  DATE_FORMAT_WITH_TIME = 'MMMM dd, yyyy, hh:mm a zzz',
  DATE_FORMAT_WITH_SLASH = 'MM/dd/yyyy',
}

export enum ActionName {
  PAUSE = 'Pause',
  CANCEL = 'Cancel',
}

export const CurrencyCode = {
  US: 'USD',
}

export enum MenuItems {
  AccountSettings = 'account-settings',
  Wishlist = 'wishlist',
  OrderHistory = 'order-history',
  Returns = 'returns',
  PaymentMethods = 'payment-methods',
  AddressBook = 'address-book',
}

export enum ProductAvailabilityStatus {
  INSTOCK = 'In Stock',
  PREORDER = 'Preorder',
  BACKORDER = 'Backorder',
  OUTOFSTOCK = 'Out of Stock',
}

export const AllAccountActions = {
  EDIT_ACCOUNT: 'Edit account',
  ADD_ACCOUNT: 'Add a child account',
  VIEW_BUYER_ACCOUNT: 'View buyers for this account',
  VIEW_ACCOUNT: 'View account',
  VIEW_QUOTES: 'View quotes for this account',
  DELETE_ACCOUNT: 'Delete account',
}

export enum AccountType {
  B2B = 'B2B',
}

export const QuoteStatus: { [key: string]: string } = {
  Pending: 'Pending',
  InReview: 'In Review',
  ReadyForCheckout: 'Ready For Checkout',
  Completed: 'Completed',
  Expired: 'Expired',
}

export const StatusColorCode: any = {
  Pending: 'disabled',
  InReview: 'warning',
  ReadyForCheckout: 'info',
  Completed: 'success',
  Expired: 'error',
}

export const QuoteUpdateMode = {
  ApplyToDraft: 'ApplyToDraft',
  ApplyAndCommit: 'ApplyAndCommit',
}

export const CountryCode = {
  US: 'US',
  CA: 'CA',
}

export const KIBO_HEADERS = {
  CORRELATION_ID: 'x-vol-correlation',
}
