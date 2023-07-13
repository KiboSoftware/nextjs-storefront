import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import B2BTemplate from './B2BTemplate'

export default {
  title: 'Page Templates/B2B/B2BTemplate',
  component: B2BTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof B2BTemplate>

const userMock = {
  user: {
    id: 1012,
  },
}

const Template: ComponentStory<typeof B2BTemplate> = () => <B2BTemplate />

export const Common = Template.bind({})
Common.args = {
  user: userMock.user,
}
