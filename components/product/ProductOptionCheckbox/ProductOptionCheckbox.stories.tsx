import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionCheckbox from './ProductOptionCheckbox'
import type { ProductOption } from '@/lib/gql/types'

const values: ProductOption[] = [
  {
    attributeFQN: 'Tenant~optional-mount',
    attributeDetail: {
      dataTypeSequence: 13,
      name: 'is optional mount',
    },
  },
]

export default {
  title: 'Product/Product Option Checkbox',
  component: ProductOptionCheckbox,
  argTypes: { handleChange: { action: 'handleChange' } },
} as ComponentMeta<typeof ProductOptionCheckbox>

const Template: ComponentStory<typeof ProductOptionCheckbox> = (args) => (
  <ProductOptionCheckbox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  yesNoOptions: values,
  label: 'Is optional mount',
  checked: true,
}
