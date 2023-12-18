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
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  link: '/product/test-123',
  price: '$19.98',
  title: 'This is a product',
  fulfillmentTypesSupported: ['SHIP'],
  productCode: 'test-product-code',
  isShowWishlistIcon: true,
}

export const WithSalePrice = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithSalePrice.args = {
  ...Common.args,
  salePrice: '$8.99',
}

export const WithRating = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithRating.args = {
  ...Common.args,
  rating: 3.5,
}

export const NoImage = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoImage.args = {
  link: '/product/test-123',
  price: '$19.99',
  title: 'This is a No image product',
}

export const LoadingProductCard = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoadingProductCard.args = {
  link: '/product/test-123',
  title: 'This is a No image product',
  price: '$19.99',
  isLoading: true,
}

export const WithWishlist = Template.bind({})
WithWishlist.args = {
  imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  link: '/product/test-123',
  price: '$19.98',
  title: 'This is a product',
  isInWishlist: true,
  onAddOrRemoveWishlistItem: () => console.log('add or remove wishlist icon clicked'),
}

export const WithQuickViewButton = Template.bind({})
WithQuickViewButton.args = {
  imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  link: '/product/test-123',
  price: '$19.98',
  salePrice: '$8.99',
  title: 'This is a product',
  showQuickViewButton: true,
  onClickQuickViewModal: () => console.log('quick-view button clicked'),
}
