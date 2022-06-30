import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CategoryFilterByMobile from './CategoryFilterByMobile'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

import type { Facet } from '@/lib/gql/types'

export default {
  title: 'product-listing/CategoryFilterByMobile',
  component: CategoryFilterByMobile,
  argTypes: { onChange: { action: 'onChange' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CategoryFilterByMobile>

const Template: ComponentStory<typeof CategoryFilterByMobile> = (args) => (
  <CategoryFilterByMobile {...args} />
)

export const Common = Template.bind({})
Common.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
Common.args = {
  facetList: productSearchResultMock?.facets as Facet[],
  header: 'Apparel',
  totalResults: 651,
}

export const SkeletonLoading = Template.bind({})
SkeletonLoading.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
SkeletonLoading.args = {
  isLoading: true,
  facetList: productSearchResultMock?.facets as Facet[],
}
