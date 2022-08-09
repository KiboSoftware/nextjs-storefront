import React from 'react'

import { Stack, Divider } from '@mui/material'

import { AddressCard, ProductItem } from '..'
import { orderGetters } from '@/lib/getters'
import type { LocationCustom } from '@/lib/types'

import type { Maybe, CrOrderItem, CrAddress } from '@/lib/gql/types'

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
    return orderGetters.getStorePickupAddress(storePickupAddresses, fulfillmentLocationCode)
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      data-testid="product-item-stack"
    >
      {items?.map((item: Maybe<CrOrderItem>) => (
        <Stack key={item?.id}>
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
            onStoreLocatorClick={onClickChangeStore}
            data-testid="product-item"
          ></ProductItem>
          {showAddress && item?.fulfillmentLocationCode && (
            <AddressCard {...storePickupAddress(item?.fulfillmentLocationCode)} />
          )}
        </Stack>
      ))}
    </Stack>
  )
}

export default ProductItemList
