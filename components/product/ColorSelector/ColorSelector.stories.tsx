import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ColorSelector from './ColorSelector'

import { ProductOptionValue } from '@/lib/gql/types'
const values: ProductOptionValue[] = [
  {
    attributeValueId: 1,
    value: 'violet',
    isSelected: true,
  },
  {
    attributeValueId: 1,
    value: 'ingido',
    isEnabled: false,
  },
  {
    attributeValueId: 2,
    value: 'blue',
  },
  { attributeValueId: 3, value: 'green' },
  { attributeValueId: 4, value: 'yellow', isEnabled: false },
  { attributeValueId: 5, value: 'orange', isSelected: false },
  { attributeValueId: 5, value: 'red', isSelected: false, isEnabled: true },
  { attributeValueId: 5, value: 'white', isSelected: false, isEnabled: true },
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
