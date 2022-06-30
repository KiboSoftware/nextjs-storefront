import { useState } from 'react'

import { useProductMutation } from '@/hooks'
import { productGetters } from '@/lib/getters'
import type { ProductCustom } from '@/lib/types'

import type { ConfiguredProduct, ProductOptionSelectionInput } from '@/lib/gql/types'

interface UseProductDetailTemplateProps {
  product: ProductCustom
}

export const useProductDetailTemplate = (props: UseProductDetailTemplateProps) => {
  const { product } = props
  const [currentProduct, setCurrentProduct] = useState<ProductCustom>(product)
  const [updatedShopperEnteredValues, setUpdatedShopperEnteredValues] = useState<
    ProductOptionSelectionInput[]
  >([])
  const [quantity, setQuantity] = useState<number>(1)

  const productCode = productGetters.getProductId(currentProduct)

  // mutations
  const { configureProduct } = useProductMutation()

  // handle product options selection
  const updateShopperEnteredValues = (option: ProductOptionSelectionInput) => {
    let shopperEnteredValues = [...updatedShopperEnteredValues]
    const { attributeFQN, value, shopperEnteredValue } = option
    const itemToBeUpdated = shopperEnteredValues.find((item) => item.attributeFQN === attributeFQN)

    if (itemToBeUpdated) {
      // Update existing option
      itemToBeUpdated.value = value
      itemToBeUpdated.shopperEnteredValue = shopperEnteredValue
    } else {
      // Add new option
      const itemToBeAdded = {
        attributeFQN,
        value,
        shopperEnteredValue,
      }
      shopperEnteredValues.push(itemToBeAdded)
    }

    // Remove  options from the array if shopperEnteredValue is not present
    shopperEnteredValues = [
      ...shopperEnteredValues.filter(
        (item) => item.shopperEnteredValue !== false && item.shopperEnteredValue !== ''
      ),
    ]

    return shopperEnteredValues
  }

  const selectProductOption = async (
    attributeFQN: string,
    value: string,
    shopperEnteredValue?: string | boolean
  ) => {
    const updatedOptions = updateShopperEnteredValues({
      attributeFQN,
      value,
      shopperEnteredValue,
    })

    try {
      const configureProductResponse: ConfiguredProduct = await configureProduct.mutateAsync({
        productCode,
        updatedOptions: updatedOptions.map((option) => {
          return {
            attributeFQN: option.attributeFQN,
            shopperEnteredValue: option.shopperEnteredValue,
            value: option.value,
          }
        }),
      })

      const responseOptions = configureProductResponse.options
        ?.filter((option) => option?.values?.some((val) => val?.isSelected))
        .map((option) => {
          const selected = option?.values?.find((optionVal) => optionVal?.isSelected)
          return {
            attributeFQN: option?.attributeFQN,
            value: selected?.value,
            shopperEnteredValue: selected?.shopperEnteredValue,
          }
        }) as ProductOptionSelectionInput[]

      setUpdatedShopperEnteredValues(responseOptions)
      setCurrentProduct({
        ...currentProduct,
        options: configureProductResponse.options,
        purchasableState: configureProductResponse.purchasableState,
        content: {
          productImages: configureProductResponse.productImages,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    currentProduct,
    quantity,
    setQuantity,
    selectProductOption,
  }
}
