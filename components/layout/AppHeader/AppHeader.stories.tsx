import React from 'react'

import { Box, Container } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AppHeader from './AppHeader'

export default {
  title: 'Layout/App Header',
  component: AppHeader,
  argTypes: { onCategoryClick: { action: 'onClick' }, onCloseMenu: { action: 'onClick' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AppHeader>

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <>
    <AppHeader {...args}>
      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(121)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </Box>
      </Container>
    </AppHeader>
  </>
)

export const Common = Template.bind({})
Common.args = {
  navLinks: [
    {
      href: '#',
      name: 'Order Status',
    },
    {
      href: '#',
      name: 'Wishlist',
    },
    {
      href: '#',
      name: 'Nav Link 2',
    },
    {
      href: '#',
      name: 'Nav Link 3',
    },
  ],
}

export const Mobile = Template.bind({})
Mobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}

Mobile.args = {
  navLinks: [
    {
      href: '#',
      name: 'Order Status',
    },
    {
      href: '#',
      name: 'Wishlist',
    },
    {
      href: '#',
      name: 'Nav Link 2',
    },
    {
      href: '#',
      name: 'Nav Link 3',
    },
  ],
}

export const Sticky = Template.bind({})
Sticky.args = {
  ...Mobile.args,
  sticky: true,
}
