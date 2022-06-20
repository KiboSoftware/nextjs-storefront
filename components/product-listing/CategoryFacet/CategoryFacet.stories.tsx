import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CategoryFacet from './CategoryFacet'
import { categoryFacetDataMock } from '@/__mocks__/stories/categoryFacetDataMock'

export default {
  title: 'product-listing/CategoryFacet',
  component: CategoryFacet,
} as ComponentMeta<typeof CategoryFacet>

const Template: ComponentStory<typeof CategoryFacet> = (args) => <CategoryFacet {...args} />

export const CategoryFacetDesktop = Template.bind({})

CategoryFacetDesktop.args = {
  initialItemsToShow: 5,
  categoryFacet: categoryFacetDataMock,
  breadcrumbs: [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Jacket',
      link: '/categoryCode/40',
    },
  ],
}
