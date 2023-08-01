import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import EditList from './EditList'
import { wishlistMock } from '@/__mocks__/stories'

export const listData = wishlistMock.items[0]

export default {
  title: 'My Account / Edit Lists',
  component: EditList,
  argTypes: {
    onEditFormToggle: { action: 'onEditFormToggle' },
    updateListData: { action: 'updateListData' },
  },
} as ComponentMeta<typeof EditList>

const Template: ComponentStory<typeof EditList> = (args) => <EditList {...args} />

export const Common = Template.bind({})

Common.args = {
  listData,
}
