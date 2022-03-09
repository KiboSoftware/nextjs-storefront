import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductVariantSizeSelector from './ProductVariantSizeSelector'
import { ProductOption } from '@/lib/gql/types'

const productOption: ProductOption = {
  attributeFQN: 'test-attributeFQN',
  values: [
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
  ],
}
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Product/Product Variant Size Selector',
  component: ProductVariantSizeSelector,
  argTypes: { selectOption: { action: 'selectOption' } },
} as ComponentMeta<typeof ProductVariantSizeSelector>

const Template: ComponentStory<typeof ProductVariantSizeSelector> = (args) => (
  <ProductVariantSizeSelector {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  productOption,
}
