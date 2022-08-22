import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductRecommendations from './ProductRecommendations'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

import type { Product } from '@/lib/gql/types'

export default {
  title: 'Product/Product Recommendations',
  component: ProductRecommendations,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ProductRecommendations>

const Template: ComponentStory<typeof ProductRecommendations> = (args) => (
  <ProductRecommendations {...args} />
)

export const Common = Template.bind({})
Common.args = {
  title: 'Product Recommendations',
  products: productSearchResultMock?.items?.splice(0, 6) as Product[],
}
