import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboRadio from './KiboRadio'

const radioOptions = [
  {
    label: 'Radio Option 1',
    name: 'Radio Option 1',
    value: 'radio-1',
    disabled: true,
  },
  {
    label: 'Radio Option 2',
    name: 'Radio Option 2',
    value: 'radio-2',
  },
  {
    label: 'Radio Option 3',
    name: 'Radio Option 3',
    value: 'radio-3',
  },
]

export default {
  title: 'Common/KiboRadio',
  component: KiboRadio,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof KiboRadio>

const Template: ComponentStory<typeof KiboRadio> = (args) => <KiboRadio {...args} />

export const Common = Template.bind({})

Common.args = {
  title: 'Kibo Radio',
  radioOptions,
  selected: 'radio-2',
}
