import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductVariantSizeSelector from './ProductVariantSizeSelector'
import { ProductOptionValue } from '@/lib/gql/types'

const values: ProductOptionValue[] = [
  {
    attributeValueId: 1,
    value: '7',
    isSelected: true,
  },
  {
    attributeValueId: 1,
    value: '7.5',
    isEnabled: false,
  },
  { attributeValueId: 1, value: '8' },
  { attributeValueId: 1, value: '8.5' },
  { attributeValueId: 1, value: '9' },
  { attributeValueId: 1, value: '9.5' },
  { attributeValueId: 1, value: '10' },
]

export default {
  title: 'Product/Product Variant Size Selector',
  component: ProductVariantSizeSelector,
  argTypes: { selectOption: { action: 'selectOption' } },
} as ComponentMeta<typeof ProductVariantSizeSelector>

const Template: ComponentStory<typeof ProductVariantSizeSelector> = (args) => (
  <ProductVariantSizeSelector {...args} />
)

export const Common = Template.bind({})
Common.args = {
  attributeFQN: 'test-attributeFQN',
  values,
}
