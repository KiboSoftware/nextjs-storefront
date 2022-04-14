import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Title from './Title'

export default {
  title: 'Add-To-Cart-Dialog/Title',
  component: Title,
} as ComponentMeta<typeof Title>

const Template: ComponentStory<typeof Title> = () => <Title />

// Common
export const Common = Template.bind({})
