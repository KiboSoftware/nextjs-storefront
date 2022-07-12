import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ColorSelector from './ColorSelector'

import type { ProductOptionValue } from '@/lib/gql/types'
const values: ProductOptionValue[] = [
  {
    attributeValueId: 1,
    value: 'violet',
    isSelected: true,
  },
  {
    attributeValueId: 2,
    value: 'ingido',
    isEnabled: false,
  },
  {
    attributeValueId: 3,
    value: 'blue',
  },
  { attributeValueId: 4, value: 'green' },
  { attributeValueId: 5, value: 'yellow', isEnabled: false },
  { attributeValueId: 6, value: 'orange', isSelected: false },
  { attributeValueId: 7, value: 'red', isSelected: false, isEnabled: true },
  { attributeValueId: 8, value: 'white', isSelected: false, isEnabled: true },
]

export default {
  title: 'Product/ColorSelector',
  component: ColorSelector,
  argTypes: { onColorChange: { action: 'onColorChange' } },
} as ComponentMeta<typeof ColorSelector>

const Template: ComponentStory<typeof ColorSelector> = (args) => <ColorSelector {...args} />

export const Common = Template.bind({})
Common.args = {
  attributeFQN: 'tenant~color',
  values,
}
