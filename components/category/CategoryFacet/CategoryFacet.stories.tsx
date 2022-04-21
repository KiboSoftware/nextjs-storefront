import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import CategoryFacet from './CategoryFacet'

export default {
  title: 'category/CategoryFacet',
  component: CategoryFacet,
  argTypes: {
    backgroundColor: { control: 'color' },
    onCategoryChildrenSelection: { action: 'clicked' },
    goBackToPreviousRoute: { action: 'go to Previous route' },
  },
} as ComponentMeta<typeof CategoryFacet>

const Template: ComponentStory<typeof CategoryFacet> = (args) => <CategoryFacet {...args} />

export const CategoryFacets = Template.bind({})

const categoryFacet = {
  header: 'Apparel',
  children: [
    {
      label: 'Jackets',
      count: 15,
      value: '53',
      filterValue: 'categoryCode:53',
      isDisplayed: true,
    },
    {
      label: 'Bottoms',
      count: 14,
      value: '47',
      filterValue: 'categoryCode:47',
      isDisplayed: true,
    },
    {
      label: 'Tops',
      count: 5,
      value: '45',
      filterValue: 'categoryCode:45',
      isDisplayed: true,
    },
  ],
}

CategoryFacets.args = {
  categoryFacet,
}
