import React from 'react'

import { MenuItem } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboSelect from './KiboSelect'

export default {
  title: 'Common/KiboSelect',
  component: KiboSelect,
  argTypes: { handleChange: { action: 'handleChange' } },
} as ComponentMeta<typeof KiboSelect>

const Template: ComponentStory<typeof KiboSelect> = (args) => (
  <KiboSelect {...args}>
    <MenuItem value="1">Option1</MenuItem>
    <MenuItem value="2">Option2</MenuItem>
  </KiboSelect>
)
export const Default = Template.bind({})

export const WithCustomPlaceholder = Template.bind({})

WithCustomPlaceholder.args = {
  placeholder: 'Select your option',
}

export const Error = Template.bind({})

Error.args = {
  error: true,
}

export const ErrorDescription = Template.bind({})

ErrorDescription.args = {
  error: true,
  errorHelperText: 'The value is not valid',
}

export const withValue = Template.bind({})

withValue.args = {
  value: '2',
}
