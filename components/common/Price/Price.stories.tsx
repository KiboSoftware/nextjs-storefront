import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Price from './Price'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Price',
  component: Price,
} as ComponentMeta<typeof Price>

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />

export const common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
common.args = {
  price: '$120.00',
  salePrice: '$60.00',
  priceRange: '',
  size: 'medium',
  fontWeight: 'bold',
}
