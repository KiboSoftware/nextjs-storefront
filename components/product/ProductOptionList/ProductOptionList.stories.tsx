import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductOptionList from './ProductOptionList'
import { ProductOption } from '@/lib/gql/types'

const values: ProductOption[] = [
  {
    attributeFQN: 'Tenant~optional-mount',
    attributeDetail: {
      dataTypeSequence: 13,
      name: 'Optional Mount',
    },
    values: [
      {
        value: 'MS-CAM-005',
        attributeValueId: 125,
        stringValue: '125',
      },
      {
        value: 'MS-CAM-006',
        attributeValueId: 126,
        stringValue: '126',
      },
      {
        value: 'MS-CAM-007',
        attributeValueId: 127,
        stringValue: '127',
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
        stringValue: 'Large',
      },
      {
        value: 'M',
        attributeValueId: 125,
        stringValue: 'Medium',
      },
      {
        value: 'S',
        attributeValueId: 125,
        stringValue: 'Small',
      },
    ],
  },
]

export default {
  title: 'Product/Product Option List',
  component: ProductOptionList,
  argTypes: { handleChange: { action: 'handleChange' } },
} as ComponentMeta<typeof ProductOptionList>

const Template: ComponentStory<typeof ProductOptionList> = (args) => <ProductOptionList {...args} />

export const Default = Template.bind({})
Default.args = {
  listOptions: values,
  error: false,
  value: '',
}

export const WithError = Template.bind({})
WithError.args = {
  listOptions: values,
  error: true,
}

export const WithErrorDescription = Template.bind({})
WithErrorDescription.args = {
  listOptions: values,
  error: true,
  errorHelperText: 'value not valid',
}
