import React, { ReactNode, useState } from 'react'

import {
  Typography,
  Box,
  CardMedia,
  CardContent,
  Collapse,
  useMediaQuery,
  Hidden,
  useTheme,
  Stack,
  Divider,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import ProductItem from '@/components/common/ProductItem/ProductItem'

import type { CrProductOption } from '@/lib/gql/types'

interface ProductItemProps {
  image: string
  name: string
  options: CrProductOption[]
  price?: string
  salePrice?: string
  children?: ReactNode
}

type ProductItemListProps = {
  items: ProductItemProps[]
}

const ProductItemList = (props: ProductItemListProps) => {
  const { items } = props
  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      data-testid="product-item-stack"
    >
      {items.map((item: ProductItemProps, index) => (
        <ProductItem
          {...item}
          key={item.name + '-' + index}
          data-testid="product-item"
        ></ProductItem>
      ))}
    </Stack>
  )
}

export default ProductItemList
