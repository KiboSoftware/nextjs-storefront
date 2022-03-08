import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddToCart from './AddToCart'

export default {
  title: 'Common/AddToCart',
  component: AddToCart,

  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddToCart>

const Template: ComponentStory<typeof AddToCart> = (args) => <AddToCart {...args} />

export const Test1 = Template.bind({})

Test1.args = {
  primary: true,
  label: 'Button',
}

export const Test2 = Template.bind({})
Test2.args = {
  label: 'Button',
}
