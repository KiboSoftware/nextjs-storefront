const getProductDetailsQuery = (productCode) => {
  return /* GraphQL */ `
    query($preview: Boolean!)  {
      productDetailsCollection(where: {title: "${productCode}"},preview:$preview) {
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
