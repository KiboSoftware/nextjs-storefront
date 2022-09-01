import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CmsHomePageProducts from './CmsHomePageProducts'

// Home
export default {
  title: 'Home/CmsHomePageProducts',
  component: CmsHomePageProducts,
} as ComponentMeta<typeof CmsHomePageProducts>

const Template: ComponentStory<typeof CmsHomePageProducts> = (args) => (
  <CmsHomePageProducts {...args} />
)

export const Common = Template.bind({})
Common.args = {
  recentlyViewed: {
    title: 'Recently Viewed and Related',
    productCodes: [{ productCode: 'SHOE12' }],
  },
  topSellings: {
    title: 'Top-selling products',
    productCodes: [{ productCode: 'ACC1' }],
  },
}
