import React from 'react'

import { Stack, Divider } from '@mui/material'

import ProductItem from '@/components/common/ProductItem/ProductItem'
import { orderGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem } from '@/lib/gql/types'

export type ProductItemListProps = {
  items?: Maybe<CrOrderItem>[]
  expectedDeliveryDate?: string
  isPickupItem?: boolean
  onClickChangeStore?: () => void
}

const ProductItemList = (props: ProductItemListProps) => {
  const { items, expectedDeliveryDate, isPickupItem = false, onClickChangeStore } = props

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      data-testid="product-item-stack"
    >
      {items?.map((item: Maybe<CrOrderItem>) => (
        <ProductItem
          id={orderGetters.getProductId(item)}
          productCode={orderGetters.getProductCode(item)}
          image={orderGetters.getProductImage(item)}
          name={orderGetters.getProductName(item)}
          options={orderGetters.getProductOptions(item)}
          price={orderGetters.getProductPrice(item)}
          salePrice={orderGetters.getProductSalePrice(item)}
          qty={orderGetters.getProductQuantity(item)}
          purchaseLocation={orderGetters.getPurchaseLocation(item)}
          isPickupItem={isPickupItem}
          expectedDeliveryDate={expectedDeliveryDate}
          onClickStoreLocator={onClickChangeStore}
          key={item?.id}
          data-testid="product-item"
        ></ProductItem>
      ))}
    </Stack>
  )
}

export default ProductItemList
