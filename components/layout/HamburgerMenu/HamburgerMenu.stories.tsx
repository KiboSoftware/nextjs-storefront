import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import HamburgerMenu from './index'

export default {
  title: 'Layout/Hamburger Menu',
  component: HamburgerMenu,
  argTypes: { setIsDrawerOpen: { action: 'onClick' } },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12promax',
    },
  },
} as ComponentMeta<typeof HamburgerMenu>

const Template: ComponentStory<typeof HamburgerMenu> = (args) => <HamburgerMenu {...args} />

export const Common = Template.bind({})
Common.args = {
  isDrawerOpen: true,
  marginTop: 0,
}
