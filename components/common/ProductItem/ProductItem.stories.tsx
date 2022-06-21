import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItem from './ProductItem'
import { orderMock } from '@/__mocks__/stories/orderMock'
import Price from '@/components/common/Price/Price'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'

export default {
  title: 'Common/ProductItem',
  component: ProductItem,
  argTypes: { onClickStoreLocator: { action: 'clicked' } },
} as ComponentMeta<typeof ProductItem>

const orderItem = orderMock?.checkout?.items && orderMock?.checkout?.items[0]

// Default Line Item
const Template: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args}>
    <Box>
      <Price
        variant="body2"
        fontWeight="bold"
        price={'$' + (orderItem?.product?.price?.price || 0).toString()}
        salePrice={
          (orderItem?.product?.price?.salePrice &&
            orderItem?.product?.price?.salePrice.toString()) ||
          undefined
        }
      />
    </Box>
    <Box sx={{ py: '0.5rem' }}>
      <QuantitySelector quantity={orderItem?.quantity} label="Qty"></QuantitySelector>
    </Box>
  </ProductItem>
)

export const Common = Template.bind({})
Common.args = {
  orderItem,
}

const TemplateWithPickupItem: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args} />
)
export const WithPickupItem = TemplateWithPickupItem.bind({})

WithPickupItem.args = {
  orderItem,
  isPickupItem: true,
  onClickStoreLocator: () => {
    console.log('change store clicked')
  },
}
