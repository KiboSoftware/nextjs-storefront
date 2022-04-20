import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { categoryTreeDataMock } from '../../../__mocks__/categoryTreeDataMock'

import CategoryNestedNavigation from './index'

export default {
  title: 'Layout/Catgeory Navigation',
  component: CategoryNestedNavigation,
  argTypes: { onCategoryClick: { action: 'onClick' }, onCloseMenu: { action: 'onClick' } },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof CategoryNestedNavigation>

const Template: ComponentStory<typeof CategoryNestedNavigation> = (args) => (
  <CategoryNestedNavigation {...args} />
)

export const Common = Template.bind({})
Common.args = {
  categoryTree: categoryTreeDataMock.categoriesTree.items,
}
