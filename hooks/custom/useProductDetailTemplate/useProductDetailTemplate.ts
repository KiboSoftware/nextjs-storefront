import { useState } from 'react'

import { useProductMutation } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { ConfigureOption, ProductCustom } from '@/lib/types'

interface UseProductDetailTemplateProps {
  product: ProductCustom
}

export const useProductDetailTemplate = (props: UseProductDetailTemplateProps) => {
  const { product } = props
  const [currentProduct, setCurrentProduct] = useState<ProductCustom>(product)
  const [updatedShopperEnteredValues, setUpdatedShopperEnteredValues] = useState<ConfigureOption[]>(
    []
  )

  const productCode = productGetters.getProductId(currentProduct)

  // mutations
  const { configureProduct } = useProductMutation()

  // handle product options selection
  const updateShopperEnteredValues = (option: ConfigureOption) => {
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
      const configureProductResponse = await configureProduct.mutateAsync({
        productCode,
        updatedOptions,
      })

      setUpdatedShopperEnteredValues(updatedOptions)
      setCurrentProduct({ ...currentProduct, ...configureProductResponse })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    currentProduct,
    selectProductOption,
  }
}
