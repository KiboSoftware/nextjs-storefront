import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductCard from './ProductCard'

import type { ProductCardProps } from './ProductCard'

export default {
  title: 'Product/ProductCard',
  component: ProductCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />

export const Common = Template.bind({})
Common.args = {
  image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
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

export const AddToCard = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddToCard.args = {
  image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  link: '/product/test-123',
  price: '$9.99',
  title: 'This is a product',
  isInCart: true,
}
