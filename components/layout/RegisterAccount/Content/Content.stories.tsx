import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Content from './Content'

export default {
  title: 'Layout/Register Account/Content',
  component: Content,
  argTypes: {
    onRegisterToYourAccount: { action: 'register form data' },
  },
} as ComponentMeta<typeof Content>

const Template: ComponentStory<typeof Content> = (args) => <Content {...args} />

export const Common = Template.bind({})

Common.args = {
  setAutoFocus: false,
}
