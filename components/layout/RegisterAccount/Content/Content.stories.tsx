import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Content from './Content'

export default {
  title: 'Layout/Register Account/Content',
  component: Content,
} as ComponentMeta<typeof Content>

const Template: ComponentStory<typeof Content> = () => <Content />

export const Common = Template.bind({})
