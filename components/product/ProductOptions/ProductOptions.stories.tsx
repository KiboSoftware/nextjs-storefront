import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptions from './ProductOptions'

import type { CrProductOption } from '@/lib/gql/types'

export default {
  title: 'Product/ProductOptions',
  component: ProductOptions,
} as ComponentMeta<typeof ProductOptions>

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
const Template: ComponentStory<typeof ProductOptions> = (args) => <ProductOptions {...args} />

// Shopping cart: Show Price below the product name
export const Common = Template.bind({})
Common.args = {
  options,
}
