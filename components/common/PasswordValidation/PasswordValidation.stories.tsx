import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PasswordValidation from './PasswordValidation'

// Common
export default {
  title: 'Common/PasswordValidation',
  component: PasswordValidation,
} as ComponentMeta<typeof PasswordValidation>

const Template: ComponentStory<typeof PasswordValidation> = (args) => (
  <PasswordValidation {...args} />
)

// Default
export const Common = Template.bind({})
