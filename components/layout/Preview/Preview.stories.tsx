import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Preview from './Preview'

export default {
  title: 'Layout/Preview',
  component: Preview,
} as ComponentMeta<typeof Preview>

const Template: ComponentStory<typeof Preview> = (args) => <Preview />

export const Common = Template.bind({})
