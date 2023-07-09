import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Content from './Content'

export default {
  title: 'Layout/Reset Password/Content',
  component: Content,
  argTypes: {
    onResetPassword: { action: 'reset password' },
  },
} as ComponentMeta<typeof Content>

const Template: ComponentStory<typeof Content> = (args) => <Content {...args} />

export const Common = Template.bind({})

Common.args = {
  setAutoFocus: true,
  isResetPassword: false,
}
