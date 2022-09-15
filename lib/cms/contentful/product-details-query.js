const getProductDetailsQuery = (productCode) => {
  return /* GraphQL */ `
    query  {
      productDetailsCollection(where: {title: "${productCode}"}) {
        items {
          recommendations {
            title
            product_recommendations:productRecommendations
          }
          customers_also_bought:customersAlsoBought {
            title
            customers_also_bought:customersAlsoBought
          }
        }
      }
    }
  `
}

export default getProductDetailsQuery
