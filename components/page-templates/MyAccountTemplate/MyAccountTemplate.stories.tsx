import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MyAccountTemplate from './MyAccountTemplate'

export default {
  title: 'Page Templates/MyAccountTemplate',
  component: MyAccountTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MyAccountTemplate>

const userMock = {
  user: {
    id: 1012,
  },
}

const Template: ComponentStory<typeof MyAccountTemplate> = () => <MyAccountTemplate />

export const Common = Template.bind({})
Common.args = {
  user: userMock.user,
}
