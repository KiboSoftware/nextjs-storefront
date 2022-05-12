import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItem from './ProductItem'
import Price from '@/components/common/Price/Price'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CartItem, CrProductOption } from '@/lib/gql/types'

export default {
  title: 'Common/ProductItem',
  component: ProductItem,
  argTypes: { onClickStoreLocator: { action: 'clicked' } },
} as ComponentMeta<typeof ProductItem>

const cartItem: CartItem = {
  id: '1beef214158842d7a305ae68009d4d4c',
  fulfillmentMethod: 'Ship',
  product: {
    productCode: 'MS-BTL-002',
    fulfillmentTypesSupported: ['DirectShip'],
    name: 'SoftBottle Water Bottle',
    description:
      'The taste-free Platypus Platy bottle with screw cap is an excellent option for bringing water on your backcountry adventures.<br>',
    imageUrl:
      '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/c186f113-6150-40a2-a210-1684f25f273b',
    options: [
      {
        attributeFQN: 'Tenant~color',
        name: 'Color',
        value: 'Blue',
      },
      {
        attributeFQN: 'Tenant~size',
        name: 'Size',
        value: 'Large',
      },
    ],
    properties: [],
    sku: null,
    price: {
      price: 15,
      salePrice: null,
    },
  },
  quantity: 1,
}

// Default Line Item
const Template: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args}>
    <Box>
      <Price
        variant="body2"
        fontWeight="bold"
        price={'$' + (cartItem.product?.price?.price || 0).toString()}
        salePrice={
          (cartItem.product?.price?.salePrice && cartItem.product?.price?.salePrice.toString()) ||
          undefined
        }
      />
    </Box>
    <Box sx={{ py: '0.5rem' }}>
      <QuantitySelector quantity={cartItem.quantity} label="Qty"></QuantitySelector>
    </Box>
  </ProductItem>
)

const TemplateWithPriceLabel: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args}>
    <Box sx={{ py: '0.5rem' }}>
      <QuantitySelector quantity={cartItem.quantity} label="Qty"></QuantitySelector>
    </Box>
  </ProductItem>
)

export const Common = Template.bind({})
Common.args = {
  image: cartItem.product?.imageUrl || DefaultImage,
  name: cartItem.product?.name || '',
  options: cartItem.product?.options as Array<CrProductOption>,
}

export const WithPriceLabel = TemplateWithPriceLabel.bind({})
WithPriceLabel.args = {
  ...Common.args,
  price: '$' + (cartItem.product?.price?.price || 0).toString(),
  salePrice: '$' + (cartItem.product?.price?.salePrice || 0).toString(),
}

const TemplateWithQtyLabel: ComponentStory<typeof ProductItem> = (args) => <ProductItem {...args} />

export const WithQtyLabel = TemplateWithQtyLabel.bind({})
WithQtyLabel.args = {
  ...Common.args,
  qty: cartItem?.quantity,
  price: '$' + (cartItem.product?.price?.price || 0).toString(),
  salePrice: '$' + (cartItem.product?.price?.salePrice || 0).toString(),
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
  itemPurchaseLocation: 'Down Store',
  estimatedPickupDate: 'Mon 12/20',
  onClickStoreLocator: () => {
    console.log('change store clicked')
  },
}
