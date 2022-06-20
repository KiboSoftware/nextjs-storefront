import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FacetList from './FacetList'
import { productSearchDataMock } from '@/__mocks__/stories/productSearchDataMock'

import type { Facet } from '@/lib/gql/types'

// default
export default {
  title: 'product-listing/FacetList',
  component: FacetList,
} as ComponentMeta<typeof FacetList>

const Template: ComponentStory<typeof FacetList> = (args) => <FacetList {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  facetList: productSearchDataMock?.facets as Facet[],
}
