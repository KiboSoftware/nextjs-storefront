import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ManageRolesTemplate from './ManageRolesTemplate'

export default {
  title: 'Page Templates/B2B/ManageRolesTemplate',
  component: ManageRolesTemplate,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof ManageRolesTemplate>

const Template: ComponentStory<typeof ManageRolesTemplate> = (args) => (
  <ManageRolesTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {}
