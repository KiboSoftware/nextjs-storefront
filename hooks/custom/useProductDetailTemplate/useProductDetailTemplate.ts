/**
 * @module useProductDetailTemplate
 */
import { useEffect, useState } from 'react'

import { useConfigureProduct } from '@/hooks'
import { productGetters } from '@/lib/getters'
import type { LocationCustom, ProductCustom } from '@/lib/types'

import type { ConfiguredProduct, Location, ProductOptionSelectionInput } from '@/lib/gql/types'

interface UseProductDetailTemplateProps {
  product: ProductCustom
  purchaseLocation: Location
}

interface SelectedFulfillmentOption<T extends Location | LocationCustom> {
  method: string
  location?: T
}

/**
 * [Custom Hook] Updates shopper entered values for product, sets selected fulfillment and product options
 *
 * Description : It has 2 functions
 * 1. updateShopperEnteredValues => It updates user entered value for the products
 * 2. selectProductOption => It sets user selected productOption for the variant product type  example:color, size
 *
 * @param props Expects object { product : holds product details value , purchaseLocation : purchaseLocation of user }
 *
 * @return User selected product quantity, fulfillmentOption (location) of user, product option selected by user
 */

export const useProductDetailTemplate = (props: UseProductDetailTemplateProps) => {
  const { product, purchaseLocation } = props
  const [currentProduct, setCurrentProduct] = useState<ProductCustom>(product)
  const [updatedShopperEnteredValues, setUpdatedShopperEnteredValues] = useState<
    ProductOptionSelectionInput[]
  >([])
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedFulfillmentOption, setSelectedFulfillmentOption] = useState<
    SelectedFulfillmentOption<Location>
  >({
    method: '',
    location: {},
  })

  useEffect(() => {
    setCurrentProduct(product)
  }, [product?.productCode])

  useEffect(() => {
    if (purchaseLocation?.name || selectedFulfillmentOption?.location?.name) {
      setSelectedFulfillmentOption({
        method: selectedFulfillmentOption?.method || '',
        location: selectedFulfillmentOption.location?.code
          ? selectedFulfillmentOption?.location
          : purchaseLocation,
      })
    }
  }, [purchaseLocation?.name, selectedFulfillmentOption?.location?.name])

  const productCode = productGetters.getProductId(currentProduct)

  // mutations
  const { configureProduct } = useConfigureProduct()

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
    shopperEnteredValue?: string | boolean,
    isEnabled?: boolean
  ) => {
    const updatedOptions = !isEnabled
      ? [
          {
            attributeFQN,
            value,
            shopperEnteredValue,
          },
        ]
      : updateShopperEnteredValues({
          attributeFQN,
          value,
          shopperEnteredValue,
        })

    try {
      const {
        options,
        variationProductCode,
        purchasableState,
        productImages,
        inventoryInfo,
        priceRange,
        price,
      }: ConfiguredProduct = await configureProduct.mutateAsync({
        productCode,
        updatedOptions: updatedOptions.map((option) => {
          return {
            attributeFQN: option.attributeFQN,
            shopperEnteredValue: option.shopperEnteredValue,
            value: option.value,
          }
        }),
      })

      const responseOptions = options
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
        priceRange,
        price,
        variationProductCode: variationProductCode,
        options: options,
        purchasableState: purchasableState,
        inventoryInfo,
        content: {
          ...currentProduct.content,
          productImages: productImages,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    currentProduct,
    quantity,
    updatedShopperEnteredValues,
    selectedFulfillmentOption,
    setQuantity,
    selectProductOption,
    setSelectedFulfillmentOption,
  }
}
