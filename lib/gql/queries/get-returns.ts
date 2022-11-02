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
          id
          orderItemId
          orderLineId
        }
      }
    }
  }
`

export default getReturnsQuery
