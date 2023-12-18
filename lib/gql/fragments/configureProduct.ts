export const configureProductOptions = `
fragment configureProductOptions on ConfiguredProduct {
  options {
    attributeFQN
    attributeDetail {
      name
      inputType
    }
    isProductImageGroupSelector
    isRequired
    isMultiValue
    values {
      value
      isSelected
      isEnabled
      deltaPrice
      stringValue
      shopperEnteredValue
    }
  }
}
`
export const configureProductInfo = `
fragment configureProductInfo on ConfiguredProduct {
        productCode
        variationProductCode
        priceRange {
          upper {
            price
            salePrice
          }
          lower {
            price
            salePrice
          }
        }
        price{
          price
          salePrice
        }
        productImages {
          imageUrl
          altText
          cmsId
        }
        purchasableState {
          isPurchasable
        }
        ...configureProductOptions
}
${configureProductOptions}
`
