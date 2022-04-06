import React from 'react'

import { Button, Typography } from '@mui/material'
import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from './Modal'

export default {
  component: Modal,
  title: 'Common/Modal',
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs()
  const handleClose = () => updateArgs({ open: !open })

  return <Modal {...args} onClose={handleClose} />
}

// Common
export const Common = Template.bind({})

Common.args = {
  open: true,
  title: 'Custom Modal Title',
  content: (
    <Typography gutterBottom>
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
      egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </Typography>
  ),
  dividers: true,
  actions: <Button>Save</Button>,
  isCenteredModal: true,
  customMaxWidth: '',
}
