type KeyValueType = {
  [key: string]: string
}
const operations: KeyValueType = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
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
}

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
])
export { mappings, actions }
// Explict permissions
