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
  productCodes: [
    { productCode: 'HKFT_023' },
    { productCode: 'Hammock_022' },
    { productCode: 'SleepBag_006' },
    { productCode: 'HKFT_026' },
    { productCode: 'BackP_007' },
    { productCode: 'Hammock_021' },
  ],
}
