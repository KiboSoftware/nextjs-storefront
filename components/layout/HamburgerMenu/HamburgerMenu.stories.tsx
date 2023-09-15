import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import HamburgerMenu from './HamburgerMenu'
import AccountRequestIcon from '../AppHeader/Icons/AccountRequestIcon/AccountRequestIcon'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'

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
  categoryTree: categoryTreeDataMock.categoriesTree.items?.filter((item) => item?.isDisplayed),
  isDrawerOpen: true,
  marginTop: 0,
  navLinks: [
    {
      text: 'Order Status',
      link: '#',
    },
    {
      text: 'Wishlist',
      link: '#',
    },
    {
      text: 'Nav link 3',
      link: '#',
    },
    {
      text: 'Nav link 4',
      link: '#',
    },
  ],
  requestAccountIconComponent: (
    <AccountRequestIcon
      iconProps={{ fontSize: 'medium' }}
      isMobileView={true}
      buttonText="B2B Account Request"
      isElementVisible={true}
    />
  ),
}
