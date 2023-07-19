import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ResetPasswordConfirmationTemplate from './ResetPasswordConfirmationTemplate'

export default {
  title: 'Page Templates/Reset password confirmation',
  component: ResetPasswordConfirmationTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ResetPasswordConfirmationTemplate>

const Template: ComponentStory<typeof ResetPasswordConfirmationTemplate> = (args) => (
  <ResetPasswordConfirmationTemplate {...args} />
)

export const Common = Template.bind({})

Common.args = {
  token: 'test23e',
  userName: 'test@kibo.com',
}
