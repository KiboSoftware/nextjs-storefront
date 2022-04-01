import React from 'react'

import { MenuItem } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboSelect, { KiboSelectProps } from './KiboSelect'

export default {
  title: 'Common/KiboSelect',
  component: KiboSelect,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof KiboSelect>

const Template: ComponentStory<typeof KiboSelect> = (args: KiboSelectProps) => (
  <KiboSelect {...args}>
    <MenuItem value="1">Option 1</MenuItem>
    <MenuItem value="2">Option 2</MenuItem>
  </KiboSelect>
)
export const Common = Template.bind({})
Common.args = {
  name: 'kibo-select',
}

export const WithLabel = Template.bind({})

WithLabel.args = {
  label: 'Select your option',
}

export const WithCustomPlaceholder = Template.bind({})

WithCustomPlaceholder.args = {
  placeholder: 'Select your option',
}

export const WithError = Template.bind({})

WithError.args = {
  error: true,
}

export const WithErrorDescription = Template.bind({})

WithErrorDescription.args = {
  error: true,
  helperText: 'The value is not valid',
}

export const withValue = Template.bind({})

withValue.args = {
  value: '2',
}
