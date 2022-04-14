import React from 'react'

import { Button, Typography } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboDialog from './KiboDialog'

export default {
  component: KiboDialog,
  title: 'Common/KiboDialog',
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof KiboDialog>

const Template: ComponentStory<typeof KiboDialog> = ({ ...args }) => <KiboDialog {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  title: 'Dialog Title',
  content: (
    <Typography gutterBottom>
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
      egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </Typography>
  ),
  dividers: true,
  actions: <Button>Save</Button>,
  isCenteredDialog: true,
  customMaxWidth: '',
}
