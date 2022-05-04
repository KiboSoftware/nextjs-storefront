import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { categoryFacet } from '../../../__mocks__/stories/categoryFacetDataMock'
import CategoryFacet from './CategoryFacet'

export default {
  title: 'category/CategoryFacet',
  component: CategoryFacet,
  argTypes: {
    onCategoryChildrenSelection: { action: 'clicked' },
    onBackButtonClick: { action: 'go to Previous route' },
  },
} as ComponentMeta<typeof CategoryFacet>

const Template: ComponentStory<typeof CategoryFacet> = (args) => <CategoryFacet {...args} />

export const CategoryFacetDesktop = Template.bind({})

CategoryFacetDesktop.args = {
  initialItemsToShow: 5,
  categoryFacet,
}
