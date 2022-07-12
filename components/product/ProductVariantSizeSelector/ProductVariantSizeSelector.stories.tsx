import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductVariantSizeSelector from './ProductVariantSizeSelector'

import type { ProductOptionValue } from '@/lib/gql/types'

const values: ProductOptionValue[] = [
  {
    attributeValueId: 1,
    value: '7',
    isSelected: true,
    isEnabled: true,
  },
  {
    attributeValueId: 1,
    value: '7.5',
    isEnabled: false,
  },
  { attributeValueId: 1, value: '8', isEnabled: true },
  { attributeValueId: 1, value: '8.5', isEnabled: true },
  { attributeValueId: 1, value: '9', isEnabled: true },
  { attributeValueId: 1, value: '9.5', isEnabled: true },
  { attributeValueId: 1, value: '10', isEnabled: true },
]

export default {
  title: 'Product/Product Variant Size Selector',
  component: ProductVariantSizeSelector,
  argTypes: { onSizeChange: { action: 'onSizeChange' } },
} as ComponentMeta<typeof ProductVariantSizeSelector>

const Template: ComponentStory<typeof ProductVariantSizeSelector> = (args) => (
  <ProductVariantSizeSelector {...args} />
)

export const Common = Template.bind({})
Common.args = {
  attributeFQN: 'test-attributeFQN',
  values,
}
