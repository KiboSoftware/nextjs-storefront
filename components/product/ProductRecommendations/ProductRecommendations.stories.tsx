import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductRecommendations from './ProductRecommendations'

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
  productCodes: ['HKFT_023', 'Hammock_022', 'SleepBag_006', 'HKFT_026', 'BackP_007', 'Hammock_021'],
}
