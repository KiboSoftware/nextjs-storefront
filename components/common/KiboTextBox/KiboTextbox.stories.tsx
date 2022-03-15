import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboTextBox from './KiboTextBox'

export default {
  title: 'Common/KiboTextbox',
  component: KiboTextBox,
} as ComponentMeta<typeof KiboTextBox>

const Template: ComponentStory<typeof KiboTextBox> = (args) => <KiboTextBox {...args} />

export const WithLabel = Template.bind({})

WithLabel.args = {
  label: 'Common',
  fullWidth: true,
}

export const WithoutLabel = Template.bind({})

export const Required = Template.bind({})

Required.args = {
  label: 'Required',
  required: true,
}

export const Error = Template.bind({})

Error.args = {
  label: 'Error',
  error: true,
}

export const ErrorDescription = Template.bind({})

ErrorDescription.args = {
  label: 'Error Description',
  error: true,
  helperText: 'This field is required',
}
