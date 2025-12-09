type KeyValueType = {
  [key: string]: string
}
const operations: KeyValueType = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  MANAGE: 'MANAGE',
}
const features: KeyValueType = {
  ACCOUNT: 'ACCOUNT',
  USERS: 'USERS',
  CONTACTS: 'CONTACTS',
  PAYMENTS: 'PAYMENTS',
  PO: 'PO',
  PO_CREDIT_LIMIT: 'PO_CREDIT_LIMIT',
  PLACE_ORDER: 'CHECKOUT',
  RETURNS: 'RETURNS',
  CHILD_ACCOUNT_LIST: 'CHILD_ACCOUNT_LIST',
  CHILD_ACCOUNT_QUOTES: 'CHILD_ACCOUNT_QUOTES',
  CHILD_ACCOUNT_ORDERS: 'CHILD_ACCOUNT_ORDERS',
  CHILD_ACCOUNT_RETURNS: 'CHILD_ACCOUNT_RETURNS',
  LISTS: 'LISTS',
  QUOTES: 'QUOTES',
}
// List of actions
const actions = {} as KeyValueType
for (const operationKey in operations) {
  for (const featureKey in features) {
    const operationKeyString = operationKey
    const operationName = operations[operationKeyString as keyof KeyValueType] //obj[str as keyof Person]
    const featureName = features[featureKey as keyof KeyValueType]
    actions[`${operationName}_${featureName}`] = `${operationName}_${featureName}`
  }
}
// List of behaviors
const behaviors = {
  DEFAULT: 0,
  MANAGE_ACCOUNT_INFORMATION: 1000,
  MANAGE_USERS: 1001,
  MANAGE_CONTACTS: 1002,
  MANAGE_SAVED_PAYMENTS: 1003,
  MANAGE_ACCOUNT_ATTRIBUTES: 1004,
  USE_PURCHASE_ORDER: 1005,
  VIEW_PURCHASE_ORDER_TRANSACTION_HISTORY: 1006,
  VIEW_PURCHASE_ORDER_CREDIT_LIMIT: 1007,
  PLACE_ORDERS: 1008,
  INITIATE_RETURNS: 1009,
  VIEW_LISTS_OF_CHILD_ACCOUNTS: 1010,
  VIEW_QUOTES_OF_CHILD_ACCOUNTS: 1011,
  VIEW_ORDERS_OF_CHILD_ACCOUNTS: 1012,
  VIEW_RETURNS_OF_CHILD_ACCOUNTS: 1013,
  USER_HAS_FULL_ACCESS_TO_THEIR_ACCOUNT: 1014,
  MANAGE_LISTS: 1015,
  MANAGE_QUOTES: 1016,
}

// List of B2B User Behaviors
export const b2bUserBehaviors = {
  ADD_BUYER: 2000,
  VIEW_BUYER: 2001,
  UPDATE_BUYER: 2002,
  DELETE_BUYER: 2003,
  CREATE_OR_UPDATE_ORDER: 2004,
  VIEW_ORDER: 2005,
  CREATE_OR_UPDATE_RETURN: 2006,
  VIEW_RETURN: 2007,
  CREATE_OR_UPDATE_CONTACT: 2008,
  VIEW_CONTACT: 2009,
  DELETE_CONTACT: 2010,
  CREATE_OR_UPDATE_LIST: 2011,
  VIEW_LIST: 2012,
  DELETE_LIST: 2013,
  CREATE_OR_UPDATE_PAYMENT: 2014,
  VIEW_PAYMENT: 2015,
  DELETE_PAYMENT: 2016,
  CREATE_QUOTE: 2032,
  UPDATE_QUOTE: 2020,
  VIEW_QUOTE: 2021,
  DELETE_QUOTE: 2022,
  MANAGE_CART: 2023,
  UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES: 2024,
  CREATE_ROLE: 2027,
  UPDATE_ROLE: 2028,
  VIEW_ROLE: 2029,
  DELETE_ROLE: 2030,
  VIEW_PURCHASE_ORDER: 2031,
}
// B2B User specific single actions (for each behavior)
const b2bUserActions = {
  ADD_BUYER: 'ADD_BUYER',
  VIEW_BUYER: 'VIEW_BUYER',
  UPDATE_BUYER: 'UPDATE_BUYER',
  DELETE_BUYER: 'DELETE_BUYER',
  CREATE_OR_UPDATE_ORDER: 'CREATE_OR_UPDATE_ORDER',
  VIEW_ORDER: 'VIEW_ORDER',
  CREATE_OR_UPDATE_RETURN: 'CREATE_OR_UPDATE_RETURN',
  VIEW_RETURN: 'VIEW_RETURN',
  CREATE_OR_UPDATE_CONTACT: 'CREATE_OR_UPDATE_CONTACT',
  VIEW_CONTACT: 'VIEW_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  CREATE_OR_UPDATE_LIST: 'CREATE_OR_UPDATE_LIST',
  VIEW_LIST: 'VIEW_LIST',
  DELETE_LIST: 'DELETE_LIST',
  CREATE_OR_UPDATE_PAYMENT: 'CREATE_OR_UPDATE_PAYMENT',
  VIEW_PAYMENT: 'VIEW_PAYMENT',
  DELETE_PAYMENT: 'DELETE_PAYMENT',
  CREATE_QUOTE: 'CREATE_QUOTE',
  UPDATE_QUOTE: 'UPDATE_QUOTE',
  VIEW_QUOTE: 'VIEW_QUOTE',
  DELETE_QUOTE: 'DELETE_QUOTE',
  MANAGE_CART: 'MANAGE_CART',
  UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES: 'UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES',
  CREATE_ROLE: 'CREATE_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  VIEW_ROLE: 'VIEW_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',
  VIEW_PURCHASE_ORDER: 'VIEW_PURCHASE_ORDER',
}

const guestUserPermissions = [
  actions.CREATE_CONTACTS,
  actions.DELETE_CONTACTS,
  actions.EDIT_CONTACTS,
  actions.VIEW_CONTACTS,
  actions.CREATE_PAYMENTS,
  actions.DELETE_PAYMENTS,
  actions.EDIT_PAYMENTS,
  actions.VIEW_PAYMENTS,
  actions.CREATE_CHECKOUT,
  b2bUserActions.MANAGE_CART,
]

// Behavior permissions mapping
const mappings = new Map()
mappings.set(behaviors.MANAGE_ACCOUNT_INFORMATION, [
  actions.CREATE_ACCOUNT,
  actions.DELETE_ACCOUNT,
  actions.EDIT_ACCOUNT,
  actions.VIEW_ACCOUNT,
])
mappings.set(behaviors.MANAGE_USERS, [
  actions.CREATE_USERS,
  actions.DELETE_USERS,
  actions.EDIT_USERS,
  actions.VIEW_USERS,
])
mappings.set(behaviors.MANAGE_CONTACTS, [
  actions.CREATE_CONTACTS,
  actions.DELETE_CONTACTS,
  actions.EDIT_CONTACTS,
  actions.VIEW_CONTACTS,
])
mappings.set(behaviors.MANAGE_SAVED_PAYMENTS, [
  actions.CREATE_PAYMENTS,
  actions.DELETE_PAYMENTS,
  actions.EDIT_PAYMENTS,
  actions.VIEW_PAYMENTS,
])
mappings.set(behaviors.USE_PURCHASE_ORDER, [actions.VIEW_PO])
mappings.set(behaviors.VIEW_PURCHASE_ORDER_CREDIT_LIMIT, [actions.VIEW_PO_CREDIT_LIMIT])
mappings.set(behaviors.PLACE_ORDERS, [actions.CREATE_CHECKOUT])
mappings.set(behaviors.INITIATE_RETURNS, [actions.CREATE_RETURNS])
mappings.set(behaviors.VIEW_LISTS_OF_CHILD_ACCOUNTS, [actions.VIEW_CHILD_ACCOUNT_LIST])
mappings.set(behaviors.VIEW_QUOTES_OF_CHILD_ACCOUNTS, [actions.VIEW_CHILD_ACCOUNT_QUOTES])
mappings.set(behaviors.VIEW_ORDERS_OF_CHILD_ACCOUNTS, [actions.VIEW_CHILD_ACCOUNT_ORDERS])
mappings.set(behaviors.VIEW_RETURNS_OF_CHILD_ACCOUNTS, [actions.VIEW_CHILD_ACCOUNT_RETURNS])
mappings.set(behaviors.MANAGE_LISTS, [actions.MANAGE_LISTS])
mappings.set(behaviors.MANAGE_QUOTES, [actions.MANAGE_QUOTES])
mappings.set(behaviors.DEFAULT, [actions.VIEW_ACCOUNT, actions.VIEW_USERS, actions.VIEW_CONTACTS])
mappings.set(behaviors.USER_HAS_FULL_ACCESS_TO_THEIR_ACCOUNT, [
  actions.CREATE_ACCOUNT,
  actions.DELETE_ACCOUNT,
  actions.EDIT_ACCOUNT,
  actions.VIEW_ACCOUNT,
  actions.CREATE_USERS,
  actions.DELETE_USERS,
  actions.EDIT_USERS,
  actions.VIEW_USERS,
  actions.CREATE_CONTACTS,
  actions.DELETE_CONTACTS,
  actions.EDIT_CONTACTS,
  actions.VIEW_CONTACTS,
  actions.CREATE_PAYMENTS,
  actions.DELETE_PAYMENTS,
  actions.EDIT_PAYMENTS,
  actions.VIEW_PAYMENTS,
  actions.CREATE_CHECKOUT,
  actions.MANAGE_LISTS,
  actions.MANAGE_QUOTES,
  b2bUserActions.MANAGE_CART,
])

// B2B User Behaviors mappings
mappings.set(b2bUserBehaviors.ADD_BUYER, [b2bUserActions.ADD_BUYER])
mappings.set(b2bUserBehaviors.VIEW_BUYER, [b2bUserActions.VIEW_BUYER])
mappings.set(b2bUserBehaviors.UPDATE_BUYER, [b2bUserActions.UPDATE_BUYER])
mappings.set(b2bUserBehaviors.DELETE_BUYER, [b2bUserActions.DELETE_BUYER])
mappings.set(b2bUserBehaviors.CREATE_OR_UPDATE_ORDER, [b2bUserActions.CREATE_OR_UPDATE_ORDER])
mappings.set(b2bUserBehaviors.VIEW_ORDER, [b2bUserActions.VIEW_ORDER])
mappings.set(b2bUserBehaviors.CREATE_OR_UPDATE_RETURN, [b2bUserActions.CREATE_OR_UPDATE_RETURN])
mappings.set(b2bUserBehaviors.VIEW_RETURN, [b2bUserActions.VIEW_RETURN])
mappings.set(b2bUserBehaviors.CREATE_OR_UPDATE_CONTACT, [b2bUserActions.CREATE_OR_UPDATE_CONTACT])
mappings.set(b2bUserBehaviors.VIEW_CONTACT, [b2bUserActions.VIEW_CONTACT])
mappings.set(b2bUserBehaviors.DELETE_CONTACT, [b2bUserActions.DELETE_CONTACT])
mappings.set(b2bUserBehaviors.CREATE_OR_UPDATE_LIST, [b2bUserActions.CREATE_OR_UPDATE_LIST])
mappings.set(b2bUserBehaviors.VIEW_LIST, [b2bUserActions.VIEW_LIST])
mappings.set(b2bUserBehaviors.DELETE_LIST, [b2bUserActions.DELETE_LIST])
mappings.set(b2bUserBehaviors.CREATE_OR_UPDATE_PAYMENT, [b2bUserActions.CREATE_OR_UPDATE_PAYMENT])
mappings.set(b2bUserBehaviors.VIEW_PAYMENT, [b2bUserActions.VIEW_PAYMENT])
mappings.set(b2bUserBehaviors.DELETE_PAYMENT, [b2bUserActions.DELETE_PAYMENT])
mappings.set(b2bUserBehaviors.CREATE_QUOTE, [b2bUserActions.CREATE_QUOTE])
mappings.set(b2bUserBehaviors.UPDATE_QUOTE, [b2bUserActions.UPDATE_QUOTE])
mappings.set(b2bUserBehaviors.VIEW_QUOTE, [b2bUserActions.VIEW_QUOTE])
mappings.set(b2bUserBehaviors.DELETE_QUOTE, [b2bUserActions.DELETE_QUOTE])
mappings.set(b2bUserBehaviors.MANAGE_CART, [b2bUserActions.MANAGE_CART])
mappings.set(b2bUserBehaviors.UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES, [
  b2bUserActions.UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES,
])
mappings.set(b2bUserBehaviors.CREATE_ROLE, [b2bUserActions.CREATE_ROLE])
mappings.set(b2bUserBehaviors.UPDATE_ROLE, [b2bUserActions.UPDATE_ROLE])
mappings.set(b2bUserBehaviors.VIEW_ROLE, [b2bUserActions.VIEW_ROLE])
mappings.set(b2bUserBehaviors.DELETE_ROLE, [b2bUserActions.DELETE_ROLE])
mappings.set(b2bUserBehaviors.VIEW_PURCHASE_ORDER, [b2bUserActions.VIEW_PURCHASE_ORDER])

export { mappings, actions, b2bUserActions, guestUserPermissions }
// Explict permissions
