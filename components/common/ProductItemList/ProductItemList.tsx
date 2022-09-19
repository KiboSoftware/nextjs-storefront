import React from 'react'

import { Stack, Divider } from '@mui/material'

import { AddressCard, ProductItem } from '..'
import { addressGetters, orderGetters, productGetters } from '@/lib/getters'
import type { LocationCustom } from '@/lib/types'

import type { Maybe, CrOrderItem, CrAddress, CrProduct } from '@/lib/gql/types'

export type ProductItemListProps = {
  items: Maybe<CrOrderItem>[]
  expectedDeliveryDate?: string
  isPickupItem?: boolean
  showAddress?: boolean
  storePickupAddresses?: LocationCustom[]
  onClickChangeStore?: () => void
}

const ProductItemList = (props: ProductItemListProps) => {
  const {
    items,
    expectedDeliveryDate,
    isPickupItem = false,
    showAddress = false,
    storePickupAddresses = [],
    onClickChangeStore,
  } = props

  const storePickupAddress = (fulfillmentLocationCode: string): CrAddress => {
    return addressGetters.getStorePickupAddress(storePickupAddresses, fulfillmentLocationCode)
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      data-testid="product-item-stack"
    >
      {items?.map((item: Maybe<CrOrderItem>) => {
        const product = item?.product as CrProduct
        return (
          <Stack key={item?.id}>
            <ProductItem
              id={orderGetters.getCartItemId(item)}
              qty={orderGetters.getProductQuantity(item)}
              purchaseLocation={orderGetters.getPurchaseLocation(item)}
              productCode={productGetters.getProductId(product)}
              image={productGetters.getProductImage(product)}
              name={productGetters.getName(product)}
              options={productGetters.getOptions(product)}
              price={productGetters.getPrice(product).regular?.toString()}
              salePrice={productGetters.getPrice(product).special?.toString()}
              isPickupItem={isPickupItem}
              expectedDeliveryDate={expectedDeliveryDate}
              onStoreLocatorClick={onClickChangeStore}
              data-testid="product-item"
            ></ProductItem>
            {showAddress && item?.fulfillmentLocationCode && (
              <AddressCard {...storePickupAddress(item?.fulfillmentLocationCode)} />
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default ProductItemList
