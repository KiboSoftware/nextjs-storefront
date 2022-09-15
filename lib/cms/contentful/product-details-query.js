const getProductDetailsQuery = (productCode) => {
  return /* GraphQL */ `
    query  {
      productDetailsCollection(where: {title: "${productCode}"}) {
        items {
          title
          recommendations {
            title
            productRecommendations
          }
          customersAlsoBought {
            title
            customersAlsoBought
          }
        }
      }
    }
  `
}

export default getProductDetailsQuery
