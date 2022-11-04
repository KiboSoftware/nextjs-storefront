import React from 'react'

import { Box, Container } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboHeader from './KiboHeader'

export default {
  title: 'Layout/App Header',
  component: KiboHeader,
  argTypes: { onCategoryClick: { action: 'onClick' }, onCloseMenu: { action: 'onClick' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof KiboHeader>

const Template: ComponentStory<typeof KiboHeader> = (args) => (
  <>
    <KiboHeader {...args} />
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
  </>
)

export const Common = Template.bind({})
Common.args = {
  navLinks: [
    {
      link: '#',
      text: 'Order Status',
    },
    {
      link: '#',
      text: 'Wishlist',
    },
    {
      link: '#',
      text: 'Nav Link 2',
    },
    {
      link: '#',
      text: 'Nav Link 3',
    },
  ],
}

export const Sticky = Template.bind({})
Sticky.args = {
  ...Common.args,
  isSticky: true,
}
