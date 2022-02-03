import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AddToCart from './AddToCart'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/AddToCart',
  component: AddToCart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddToCart>

const Template: ComponentStory<typeof AddToCart> = (args) => <AddToCart {...args} />

export const Test1 = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Test1.args = {
  primary: true,
  label: 'Button',
}

export const Test2 = Template.bind({})
Test2.args = {
  label: 'Button',
}
