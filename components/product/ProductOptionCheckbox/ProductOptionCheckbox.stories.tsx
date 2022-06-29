import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionCheckbox, { ProductOptionCheckboxProps } from './ProductOptionCheckbox'

export default {
  title: 'Product/Product Option Checkbox',
  component: ProductOptionCheckbox,
  argTypes: { onCheckboxChange: { action: 'onCheckboxChange' } },
} as ComponentMeta<typeof ProductOptionCheckbox>

const Template: ComponentStory<typeof ProductOptionCheckbox> = (
  args: ProductOptionCheckboxProps
) => <ProductOptionCheckbox {...args} />

export const Common = Template.bind({})
Common.args = {
  label: 'Include Warranty',
}
