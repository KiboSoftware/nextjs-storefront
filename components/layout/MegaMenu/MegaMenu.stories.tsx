import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MegaMenu from './MegaMenu'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'

export default {
  title: 'Layout/MegaMenu',
  component: MegaMenu,
} as ComponentMeta<typeof MegaMenu>

const Template: ComponentStory<typeof MegaMenu> = (args) => <MegaMenu {...args} />

export const Common = Template.bind({})

Common.args = {
  categoryTree: categoryTreeDataMock.categoriesTree.items?.filter((item) => item?.isDisplayed),
  onBackdropToggle: (isOpen) => {
    return isOpen
  },
}
