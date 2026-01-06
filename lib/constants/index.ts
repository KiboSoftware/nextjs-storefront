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
  PAYPALEXPRESS2 = 'paypal_complete_payments_application',
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

export const SubscriptionMode = {
  SUBSCRIPTION_Only: 'SO',
  SUBSCRIPTION_AND_ONETIME_PURCHASE: 'SAOT',
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
  VIEW = 'view',
  EDIT = 'edit',
  COPY = 'copy',
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
  ACCESS_ACCOUNT: 'Access Account',
  DELETE_ACCOUNT: 'Delete account',
}

export enum AccountType {
  B2B = 'B2B',
  B2C = 'B2C',
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
  TENANT: 'x-vol-tenant',
  SITE: 'x-vol-site',
}

export const OutOfStockBehavior = {
  AllowBackOrder: 'AllowBackOrder',
  DisplayMessage: 'DisplayMessage',
  HideProduct: 'HideProduct',
}

export const CustomBehaviors = {
  ViewRole: 2029,
  CreateRole: 2027,
  UpdateRole: 2028,
  DeleteRole: 2030,
  AddUser: 2000,
  UpdateUser: 2002,
  UpdateAccount: 2024,
  ViewAccountHierarchy: 2025,
}

export const AccountScope = {
  AllChild: 'all-child',
  SpecificChild: 'specific-child',
  AllExcept: 'all-except',
}

export const RoleType = {
  System: 'System',
  Custom: 'Custom',
}

export const Routes = {
  ManageRoles: '/my-account/b2b/manage-roles',
  CreateRole: '/my-account/b2b/manage-roles/create',
  Users: '/my-account/b2b/users',
  AddUser: '/my-account/b2b/users/add-user',
}

// System Role Behavior Mappings
export const SystemRoleBehaviors: Record<string, Record<number, number[]>> = {
  admin: {
    2000: [2000, 2001, 2002, 2003],
    2001: [2005, 2004],
    2002: [2007, 2006],
    2003: [2009, 2008, 2010],
    2004: [2012, 2011, 2013],
    2005: [2015, 2014, 2016],
    2006: [2021, 2032, 2020, 2022],
    2007: [2023],
    2008: [2024],
    2009: [2031],
    2010: [2027, 2028, 2029, 2030],
  },
  purchaser: {
    2000: [2001],
    2001: [2005, 2004],
    2002: [2007, 2006],
    2003: [2009, 2008, 2010],
    2004: [2012, 2011, 2013],
    2005: [2015, 2014, 2016],
    2006: [2021, 2032, 2020, 2022],
    2007: [2023],
    2008: [],
    2009: [2031],
    2010: [2029],
  },
  nonpurchaser: {
    2000: [2001],
    2001: [2005],
    2002: [2007],
    2003: [2009],
    2004: [2012, 2011, 2013],
    2005: [2015],
    2006: [2021],
    2007: [2023],
    2008: [],
    2009: [2031],
    2010: [2029],
  },
}
