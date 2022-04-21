import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionList from './ProductOptionList'

import type { CrProductOption } from '@/lib/gql/types'

export default {
  title: 'Product/ProductOptionList',
  component: ProductOptionList,
} as ComponentMeta<typeof ProductOptionList>

const options: CrProductOption[] = [
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
  {
    attributeFQN: 'Tenant~material',
    name: 'Material',
    value: 'Plastic',
  },
]

// Default Line Item
const Template: ComponentStory<typeof ProductOptionList> = (args) => <ProductOptionList {...args} />

// Shopping cart: Show Price below the product name
export const Common = Template.bind({})
Common.args = {
  options,
}
