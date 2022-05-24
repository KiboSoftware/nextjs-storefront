import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Actions from './Actions'

export default {
  title: 'Layout/Register Account/Actions',
  component: Actions,
  argTypes: {
    onLoginToYourAccount: { action: 'open login modal' },
  },
} as ComponentMeta<typeof Actions>

const Template: ComponentStory<typeof Actions> = (args) => <Actions {...args} />

export const Common = Template.bind({})
