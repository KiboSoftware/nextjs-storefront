import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Color from './ProductVariantColorSelector'

export default {
  title: 'Common/VariantColorSelector',
  component: Color,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof Color>

const Template: ComponentStory<typeof Color> = (args) => <Color {...args} />

export const Common = Template.bind({})
Common.args = {
  colors: ['red', 'blue', 'pink', 'yellow'],
}

export const NoColor = Template.bind({})
