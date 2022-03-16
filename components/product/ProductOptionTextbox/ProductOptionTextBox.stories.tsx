import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionTextBox from './ProductOptionTextBox'
import type { ProductOption } from '@/lib/gql/types'

const values: ProductOption[] = [
  {
    attributeFQN: 'Tenant~optional-mount',
    attributeDetail: {
      dataTypeSequence: 13,
      name: 'Optional Mount',
    },
    values: [
      {
        value: 'MS-CAM-004',
        attributeValueId: 125,
        shopperEnteredValue: null,
      },
    ],
  },
  {
    attributeFQN: 'Tenant~size',
    attributeDetail: {
      dataTypeSequence: 13,
      name: 'Size',
    },
    values: [
      {
        value: 'L',
        attributeValueId: 125,
        shopperEnteredValue: 'Large',
      },
    ],
  },
]

export default {
  title: 'Product/Product Option TextBox',
  component: ProductOptionTextBox,
  argTypes: { selectOption: { action: 'selectOption' } },
} as ComponentMeta<typeof ProductOptionTextBox>

const Template: ComponentStory<typeof ProductOptionTextBox> = (args) => (
  <ProductOptionTextBox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  textBoxOptions: values,
}
