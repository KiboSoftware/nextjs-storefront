import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MegaMenuItem from './MegaMenuItem'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'

const childrenCategories =
  categoryTreeDataMock?.categoriesTree?.items?.filter((c) => c?.isDisplayed === true)[0]
    ?.childrenCategories || []

export default {
  title: 'Layout/MegaMenuItem',
  component: MegaMenuItem,
  argTypes: {
    onBackDropClose: { action: 'closeBackDrop' },
  },
} as ComponentMeta<typeof MegaMenuItem>

const Template: ComponentStory<typeof MegaMenuItem> = (args) => <MegaMenuItem {...args} />

export const Common = Template.bind({})

Common.args = {
  title: childrenCategories[1]?.content?.name as string,
  categoryChildren: childrenCategories[1]?.childrenCategories || [],
  categoryCode: childrenCategories[1]?.categoryCode as string,
}
