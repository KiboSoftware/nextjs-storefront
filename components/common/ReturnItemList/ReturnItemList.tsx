import React, { ChangeEvent } from 'react'

import { Stack, Checkbox } from '@mui/material'

import { ProductItem } from '..'
import { orderGetters, productGetters } from '@/lib/getters'
import type { LocationCustom } from '@/lib/types'

import type { Maybe, CrOrderItem, CrProduct } from '@/lib/gql/types'

export type ReturnItemListProps = {
  items: Maybe<CrOrderItem>[]
  isPickupItem?: boolean
  storePickupAddresses?: LocationCustom[]
  isCheckboxDisabled?: boolean
  onItemSelection?: (orderItemId: string) => void
}

const styles = {
  checkbox: {
    '&.Mui-disabled.Mui-checked': {
      color: 'primary.main',
      opacity: 0.26,
    },
  },
}
const ReturnItemList = (props: ReturnItemListProps) => {
  const { items, isPickupItem = false, isCheckboxDisabled = false, onItemSelection } = props

  const handleSelectItem = (event: ChangeEvent<HTMLInputElement>) =>
    onItemSelection && onItemSelection(event.target.value)

  return (
    <Stack direction="column" spacing={2} data-testid="return-item-stack">
      {items?.map((item) => {
        const product = item?.product as CrProduct
        return (
          <Stack key={item?.id} direction="row">
            <Checkbox
              value={item?.id}
              onChange={handleSelectItem}
              disabled={isCheckboxDisabled}
              sx={{ ...styles.checkbox }}
            />
            <ProductItem
              id={orderGetters.getCartItemId(item as CrOrderItem)}
              qty={orderGetters.getProductQuantity(item as CrOrderItem)}
              purchaseLocation={orderGetters.getPurchaseLocation(item as CrOrderItem)}
              productCode={productGetters.getProductId(product)}
              image={productGetters.getProductImage(product)}
              name={productGetters.getName(product)}
              options={productGetters.getOptions(product)}
              price={productGetters.getPrice(product).regular?.toString()}
              salePrice={productGetters.getPrice(product).special?.toString()}
              isPickupItem={isPickupItem}
              data-testid="return-product-item"
              width="100px"
            />
          </Stack>
        )
      })}
    </Stack>
  )
}

export default ReturnItemList
