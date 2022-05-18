import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOption from './ProductOption'

import type { CrProductOption } from '@/lib/gql/types'

export default {
  title: 'Product/ProductOption',
  component: ProductOption,
} as ComponentMeta<typeof ProductOption>

const productOption: CrProductOption = {
  attributeFQN: 'Tenant~color',
  name: 'Color',
  value: 'Blue',
}

// Default Line Item
const Template: ComponentStory<typeof ProductOption> = (args) => <ProductOption {...args} />

export const Common = Template.bind({})
Common.args = {
  option: productOption,
}
