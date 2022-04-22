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
    handleViewMoreClick: { action: 'handle View more' },
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
    {
      label: 'Footwear',
      count: 15,
      value: '52',
      filterValue: 'categoryCode:52',
      isDisplayed: true,
    },
    {
      label: 'Mountain',
      count: 17,
      value: '48',
      filterValue: 'categoryCode:48',
      isDisplayed: true,
    },
    {
      label: 'Road',
      count: 20,
      value: '40',
      filterValue: 'categoryCode:40',
      isDisplayed: true,
    },
    {
      label: 'Tents',
      count: 20,
      value: '12',
      filterValue: 'categoryCode:12',
      isDisplayed: true,
    },
    {
      label: 'Paddles',
      count: 20,
      value: '11',
      filterValue: 'categoryCode:11',
      isDisplayed: true,
    },
  ],
}

CategoryFacets.args = {
  categoryFacet,
}
