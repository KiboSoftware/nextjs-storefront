import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tip from './Tip'

export default {
  title: 'Common/Tip',
  component: Tip,
  argTypes: { onAddTip: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Tip>

const Template: ComponentStory<typeof Tip> = (args) => <Tip {...args} />

export const Common = Template.bind({})
