import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionCheckbox from './ProductOptionCheckbox'

export default {
  title: 'Product/Product Option Checkbox',
  component: ProductOptionCheckbox,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ProductOptionCheckbox>

const Template: ComponentStory<typeof ProductOptionCheckbox> = (args) => (
  <ProductOptionCheckbox {...args} />
)

export const Common = Template.bind({})
Common.args = {
  label: 'Include Warranty',
}
