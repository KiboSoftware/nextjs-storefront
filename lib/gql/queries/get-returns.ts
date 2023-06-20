const getReturnsQuery = /* GraphQL */ `
  query getReturns($filter: String, $startIndex: Int, $pageSize: Int) {
    returns(filter: $filter, startIndex: $startIndex, pageSize: $pageSize) {
      startIndex
      pageSize
      pageCount
      totalCount
      items {
        id
        customerAccountId
        returnNumber
        locationCode
        originalOrderId
        originalOrderNumber
        returnOrderId
        currencyCode
        status
        receiveStatus
        refundStatus
        replaceStatus
        returnType
        refundAmount
        items {
          orderLineId
          product {
            name
            imageUrl
          }
          returnType
          refundAmount
          refundStatus
          receiveStatus
          replaceStatus
          returnProcessingFeeApplied
          orderItemId
          quantityRefunded
          quantityReplaced
          reasons {
            reason
            quantity
          }
        }
      }
    }
  }
`

export default getReturnsQuery
