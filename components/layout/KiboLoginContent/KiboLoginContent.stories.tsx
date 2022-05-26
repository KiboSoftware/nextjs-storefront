import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboLoginContent from './KiboLoginContent'
import { loginInputs } from '@/components/layout/KiboLoginContent/KiboLoginContent'

const login = (data: loginInputs) => {
  console.debug('KiboLoginContent login called...', data)
}
const clickForgotPassword = () => {
  console.debug('KiboLoginContent clickForgotpassword called...')
}

export default {
  component: KiboLoginContent,
  title: 'Layout/KiboLoginContent',
  argTypes: {
    onClose: { action: 'onClose' },
    onClickLogin: { action: login },
    onClickForgotPassword: { action: clickForgotPassword },
  },
} as ComponentMeta<typeof KiboLoginContent>

const Template: ComponentStory<typeof KiboLoginContent> = (args) => <KiboLoginContent {...args} />

// Common
export const Common = Template.bind({})
