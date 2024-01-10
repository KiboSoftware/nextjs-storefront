import { format } from 'date-fns'

import { DateFormat, FulfillmentOptions } from '../constants'
import {
  AuditRecord,
  AuditRecordChange,
  CrContact,
  CrOrderItem,
  Quote,
  QuoteCollection,
} from '../gql/types'

const getQuotes = (collection: QuoteCollection) => collection?.items as Quote[]

const getQuoteId = (quote: Quote) => quote?.id as string
const getNumber = (quote: Quote) => quote?.number as number

const getName = (quote: Quote) => quote?.name as string

const getExpirationDate = (quote: Quote) =>
  quote?.expirationDate
    ? format(new Date(quote?.expirationDate), DateFormat.DATE_FORMAT_WITH_SLASH)
    : '-'

const getCreatedDate = (quote: Quote) =>
  quote?.auditInfo?.createDate
    ? format(new Date(quote?.auditInfo?.createDate), DateFormat.DATE_FORMAT_WITH_SLASH)
    : ''

const getTotal = (quote: Quote) => quote?.total

const getStatus = (quote: Quote) => quote?.status as string

const getRecordType = (change: AuditRecordChange) => change?.type as string

const getRecordCreatedBy = (record: AuditRecord) => record.auditInfo?.createBy as string

const getRecordUpdateDate = (record: AuditRecord) =>
  record.auditInfo?.updateDate
    ? format(new Date(record.auditInfo?.updateDate), DateFormat.DATE_FORMAT)
    : ''

const getRecordId = (record: AuditRecord) => record.id

const getRecordDetails = (record: AuditRecord) => {
  return {
    id: getRecordId(record),
    getRecordCreatedBy: getRecordCreatedBy(record),
    getRecordUpdateDate: getRecordUpdateDate(record),
  }
}

const getQuoteSubmittedDate = (quote: Quote, withTimestamp?: boolean) => {
  return quote?.submittedDate
    ? withTimestamp
      ? format(new Date(quote?.submittedDate), DateFormat.DATE_FORMAT_WITH_TIME)
      : format(new Date(quote?.submittedDate), DateFormat.DATE_FORMAT_WITH_SLASH)
    : quote?.submittedDate
}

const getQuoteDetails = (quote: Quote) => {
  return {
    quoteId: getQuoteId(quote),
    number: getNumber(quote),
    name: getName(quote),
    expirationDate: getExpirationDate(quote),
    createdDate: getCreatedDate(quote),
    total: getTotal(quote),
    status: getStatus(quote),
    submittedDate: getQuoteSubmittedDate(quote),
  }
}

const getQuotesPaginationDetails = (collection: QuoteCollection) => {
  return {
    count: collection?.pageCount,
    startIndex: collection?.startIndex,
    pageSize: collection?.pageSize,
  }
}

const getQuoteShippingContact = (quote: Quote): CrContact =>
  quote?.fulfillmentInfo?.fulfillmentContact as CrContact

const getItemsByFulfillment = (quote: Quote, fulfillmentMethod: string): CrOrderItem[] => {
  return (
    (quote?.items?.filter(
      (lineItem) => lineItem?.fulfillmentMethod === fulfillmentMethod
    ) as CrOrderItem[]) || []
  )
}
const getQuotePickupItems = (quote: Quote): CrOrderItem[] => {
  return getItemsByFulfillment(quote, FulfillmentOptions.PICKUP)
}
const getQuoteShipItems = (quote: Quote): CrOrderItem[] =>
  getItemsByFulfillment(quote, FulfillmentOptions.SHIP)

const getQuoteShippingMethodCode = (quote: Quote): string =>
  quote?.fulfillmentInfo?.shippingMethodCode || ''

const getEmailAddressAndDate = (userId: string, date: string, userIdAndEmailAddress: any) => {
  const email = userIdAndEmailAddress?.[userId] || 'Seller'
  const dateWithSlash = format(new Date(date), DateFormat.DATE_FORMAT_WITH_SLASH) || 'seller-date'
  return `${email} (${dateWithSlash})`
}

const getQuoteCreatedBy = (firstName: string, lastName: string) => {
  return firstName || lastName ? `${firstName} ${lastName}` : '-'
}

const getSubmitForApprovalEnabled = (
  quoteName: string,
  fulfillmentInfo: any,
  shiptItems: any,
  pickupItems: any
) => {
  if (!quoteName) {
    return false
  }

  const hasFulfillmentInfo =
    fulfillmentInfo &&
    fulfillmentInfo.fulfillmentContact?.address &&
    fulfillmentInfo.shippingMethodCode &&
    fulfillmentInfo.shippingMethodName

  if (shiptItems.length && pickupItems.length) {
    return hasFulfillmentInfo
  }

  if (!pickupItems.length && shiptItems.length) {
    return hasFulfillmentInfo
  }

  if (!shiptItems.length && pickupItems.length) {
    return true
  }

  return false
}

export const quoteGetters = {
  getQuotes,
  getNumber,
  getName,
  getCreatedDate,
  getExpirationDate,
  getTotal,
  getStatus,
  getQuoteDetails,
  getRecordDetails,
  getQuoteSubmittedDate,
  getQuoteId,
  getQuotesPaginationDetails,
  getRecordType,
  getQuoteShippingContact,
  getQuotePickupItems,
  getQuoteShipItems,
  getQuoteShippingMethodCode,
  getEmailAddressAndDate,
  getQuoteCreatedBy,
  getSubmitForApprovalEnabled,
}
