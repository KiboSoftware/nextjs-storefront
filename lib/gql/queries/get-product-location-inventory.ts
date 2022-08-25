const getProductLocationInventoryQuery = /* GraphQL */ `
  query productLocationInventory($productCode: String!, $locationCodes: String) {
    productLocationInventory(productCode: $productCode, locationCodes: $locationCodes) {
      totalCount
      items {
        productCode
        locationCode
        stockAvailable
        softStockAvailable
      }
    }
  }
`

export default getProductLocationInventoryQuery
