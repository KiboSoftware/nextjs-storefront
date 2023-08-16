import { format } from 'date-fns'

import { DateFormat } from '../constants'
import { AuditRecord, AuditRecordChangeField, Quote, QuoteCollection } from '../gql/types'

const getQuotes = (collection: QuoteCollection) => collection?.items as Quote[]

const getQuoteId = (quote: Quote) => quote.id as string
const getNumber = (quote: Quote) => quote.number as number

const getName = (quote: Quote) => quote.name as string

const getExpirationDate = (quote: Quote) =>
  quote.expirationDate ? format(new Date(quote.expirationDate), DateFormat.DATE_FORMAT) : ''

const getCreatedDate = (quote: Quote) =>
  quote.auditInfo?.createDate
    ? format(new Date(quote.auditInfo?.createDate), DateFormat.DATE_FORMAT)
    : ''

const getTotal = (quote: Quote) => quote.total

const getStatus = (quote: Quote) => quote.status as string

const getRecordType = (record: AuditRecord) => record.changes?.[0]?.type as string

const getRecordCreatedBy = (record: AuditRecord) => record.auditInfo?.createBy as string

const getRecordUpdateDate = (record: AuditRecord) =>
  record.auditInfo?.updateDate
    ? format(new Date(record.auditInfo?.updateDate), DateFormat.DATE_FORMAT)
    : ''

const getChangedRecordFields = (record: AuditRecord) =>
  record.changes?.[0]?.fields as AuditRecordChangeField[]

const getRecordId = (record: AuditRecord) => record.id

const getRecordDetails = (record: AuditRecord) => {
  return {
    id: getRecordId(record),
    recordType: getRecordType(record),
    getRecordCreatedBy: getRecordCreatedBy(record),
    getRecordUpdateDate: getRecordUpdateDate(record),
    changedFields: getChangedRecordFields(record),
  }
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
  }
}

const getQuotesPaginationDetails = (collection: QuoteCollection) => {
  return {
    count: collection?.pageCount,
    startIndex: collection?.startIndex,
    pageSize: collection?.pageSize,
  }
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
  getQuotesPaginationDetails,
}
