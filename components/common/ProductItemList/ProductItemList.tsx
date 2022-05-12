import React from 'react'

import { Stack, Divider } from '@mui/material'

import ProductItem, { ProductItemProps } from '@/components/common/ProductItem/ProductItem'

export type ProductItemListProps = {
  items: ProductItemProps[]
  clickChageStore?: () => void
}

const ProductItemList = (props: ProductItemListProps) => {
  const { items, clickChageStore } = props

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      data-testid="product-item-stack"
    >
      {items?.map((item: ProductItemProps, index) => (
        <ProductItem
          {...item}
          onClickStoreLocator={clickChageStore}
          key={`${item.name}-${index}`}
          data-testid="product-item"
        ></ProductItem>
      ))}
    </Stack>
  )
}

export default ProductItemList
