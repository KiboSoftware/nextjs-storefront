import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductCardListView from './ProductCardListView'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Product/ProductCardListView',
  component: ProductCardListView,
} as ComponentMeta<typeof ProductCardListView>

const Template: ComponentStory<typeof ProductCardListView> = (args) => (
  <ProductCardListView {...args} />
)

export const Common = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Common.args = {
  title: 'Test Product',
  link: '/product/test-123',
  imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
  imageAltText: 'Product image alt text',
  price: '$19.98',
  salePrice: '$8.99',
  productCode: 'test-123',
  productDescription: 'This is a product description',
  isLoading: false,
  isShopNow: true,
  isShowWishlistIcon: true,
  showQuickViewButton: true,
  badge: 'New',
  onAddOrRemoveWishlistItem: () =>
    Promise.resolve(console.log('add or remove wishlist item clicked')),
  onClickQuickViewModal: () => console.log('quick-view button clicked'),
  onClickAddToCart: () => Promise.resolve(console.log('add to cart button clicked')),
}

export const LoadingProductCard = Template.bind({})
LoadingProductCard.args = {
  link: '/product/test-123',
  title: 'This is a No image product',
  price: '$19.99',
  isLoading: true,
}
