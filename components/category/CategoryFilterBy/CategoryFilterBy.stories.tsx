import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { facetList } from '../../../__mocks__/stories/facetListMock'
import CategoryFilterBy from './CategoryFilterBy'

export default {
  title: 'category/CategoryFilterBy',
  component: CategoryFilterBy,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof CategoryFilterBy>

const Template: ComponentStory<typeof CategoryFilterBy> = (args) => <CategoryFilterBy {...args} />

export const Common = Template.bind({})
Common.args = {
  facetList,
  title: 'Filter By',
}
