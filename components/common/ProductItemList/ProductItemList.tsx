import React from 'react'

import { Stack, Divider } from '@mui/material'

import ProductItem from '@/components/common/ProductItem/ProductItem'

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
          orderItem={item}
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
