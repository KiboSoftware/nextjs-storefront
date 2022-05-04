import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { categoryTreeDataMock } from '../../../__mocks__/categoryTreeDataMock'
import MegaMenu from './MegaMenu'

export default {
  title: 'Layout/MegaMenu',
  component: MegaMenu,
} as ComponentMeta<typeof MegaMenu>

const Template: ComponentStory<typeof MegaMenu> = (args) => <MegaMenu {...args} />

export const Common = Template.bind({})

Common.args = {
  categoryTree: categoryTreeDataMock.categoriesTree.items,
  setIsBackdropOpen: () => {
    null
  },
}
