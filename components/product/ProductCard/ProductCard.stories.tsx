import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductCard from './ProductCard'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Product/ProductCard',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />

export const Common = Template.bind({})
Common.args = {
  imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  link: '/product/test-123',
  price: '$19.99',
  salePrice: '$8.99',
  title: 'This is a product',
}

export const NoImage = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoImage.args = {
  link: '/product/test-123',
  price: '$19.99',
  salePrice: '$8.99',
  title: 'This is a No image product',
}
