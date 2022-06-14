import React from 'react'

import { Visibility } from '@mui/icons-material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboTextBox, { KiboTextBoxProps } from './KiboTextBox'

export default {
  title: 'Common/KiboTextbox',
  component: KiboTextBox,
  argTypes: { onChange: { action: 'onChange' }, onIconClick: { action: 'onClick' } },
} as ComponentMeta<typeof KiboTextBox>

const Template: ComponentStory<typeof KiboTextBox> = (args: KiboTextBoxProps) => (
  <KiboTextBox {...args} />
)

export const WithLabel = Template.bind({})

WithLabel.args = {
  label: 'Common',
  fullWidth: true,
}

export const WithoutLabel = Template.bind({})

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: 'Custom placeholder',
}

export const Required = Template.bind({})

Required.args = {
  label: 'Required',
  required: true,
}

export const WithError = Template.bind({})

WithError.args = {
  label: 'Error',
  error: true,
}

export const WithErrorDescription = Template.bind({})

WithErrorDescription.args = {
  label: 'Error Description',
  error: true,
  helperText: 'This field is required',
}

export const WithIcon = Template.bind({})

WithIcon.args = {
  label: 'Password visibility',
  icon: <Visibility />,
}
