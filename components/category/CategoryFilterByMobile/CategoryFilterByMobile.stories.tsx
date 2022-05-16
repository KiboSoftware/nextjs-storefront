import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { facetList } from '../../../__mocks__/stories/facetListMock'
import CategoryFilterByMobile from './CategoryFilterByMobile'

export default {
  title: 'category/CategoryFilterByMobile',
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
Common.args = {
  facetList,
  header: 'Apparel',
  totalResults: 650,
}

export const CategoryFilterByMobileSkeleton = Template.bind({})
CategoryFilterByMobileSkeleton.args = {
  isLoading: true,
  facetList,
}
