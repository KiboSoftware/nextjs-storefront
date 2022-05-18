import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { facetList } from '../../../__mocks__/stories/facetListMock'
import FacetList from './FacetList'

// default
export default {
  title: 'product-listing/FacetList',
  component: FacetList,
} as ComponentMeta<typeof FacetList>

const Template: ComponentStory<typeof FacetList> = (args) => <FacetList {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  facetList,
}
