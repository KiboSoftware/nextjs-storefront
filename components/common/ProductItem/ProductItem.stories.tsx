import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItem from './ProductItem'
import { orderMock } from '@/__mocks__/stories/orderMock'
import Price from '@/components/common/Price/Price'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CrProductOption } from '@/lib/gql/types'

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

const TemplateWithPriceLabel: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args}>
    <Box sx={{ py: '0.5rem' }}>
      <QuantitySelector quantity={orderItem?.quantity} label="Qty"></QuantitySelector>
    </Box>
  </ProductItem>
)

export const Common = Template.bind({})
Common.args = {
  id: orderItem?.id,
  productCode: orderItem?.product?.productCode,
  image: orderItem?.product?.imageUrl || DefaultImage,
  name: orderItem?.product?.name || '',
  options: orderItem?.product?.options as Array<CrProductOption>,
}

export const WithPriceLabel = TemplateWithPriceLabel.bind({})
WithPriceLabel.args = {
  ...Common.args,
  price: (orderItem?.product?.price?.price || 0).toString(),
  salePrice: (orderItem?.product?.price?.salePrice || 0).toString(),
}

const TemplateWithQtyLabel: ComponentStory<typeof ProductItem> = (args) => <ProductItem {...args} />

export const WithQtyLabel = TemplateWithQtyLabel.bind({})
WithQtyLabel.args = {
  ...Common.args,
  qty: orderItem?.quantity,
  price: (orderItem?.product?.price?.price || 0).toString(),
  salePrice: (orderItem?.product?.price?.salePrice || 0).toString(),
}

export const WithoutDetailOption = TemplateWithQtyLabel.bind({})
Common.args.options = []
WithoutDetailOption.args = {
  ...Common.args,
}

export const WithChageStoreOption = TemplateWithQtyLabel.bind({})
WithChageStoreOption.args = {
  ...WithQtyLabel.args,
  isPickupItem: true,
  purchaseLocation: 'Down Store',
  expectedDeliveryDate: 'Mon 12/20',
  onClickStoreLocator: () => {
    console.log('change store clicked')
  },
}
