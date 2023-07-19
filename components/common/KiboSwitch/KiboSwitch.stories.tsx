import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboSwitch, { KiboSwitchProps } from './KiboSwitch'

export default {
  title: 'Common/KiboSwitch',
  component: KiboSwitch,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof KiboSwitch>

const Template: ComponentStory<typeof KiboSwitch> = (args: KiboSwitchProps) => (
  <KiboSwitch {...args} />
)
export const Common = Template.bind({})
Common.args = {
  checked: true,
  onLabel: 'Active',
  offLabel: 'In Active',
  title: 'Status',
}
