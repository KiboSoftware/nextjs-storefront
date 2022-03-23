import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ColorSelector from './ColorSelector'
import { ProductOptionValue } from '@/lib/gql/types'
const values: ProductOptionValue[] = [
  {
    attributeValueId: 1,
    value: 'red',
    isSelected: true,
  },
  {
    attributeValueId: 1,
    value: 'red',
    isEnabled: false,
  },
  {
    attributeValueId: 2,
    value: 'blue',
    isEnabled: false,
  },
  { attributeValueId: 3, value: 'green' },
  { attributeValueId: 4, value: 'white' },
  { attributeValueId: 5, value: 'pink', isSelected: false },
]

export default {
  title: 'Product/ColorSelector',
  component: ColorSelector,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ColorSelector>

const Template: ComponentStory<typeof ColorSelector> = (args) => <ColorSelector {...args} />

export const Common = Template.bind({})
Common.args = {
  attributeFQN: 'tenant~color',
  values,
}
