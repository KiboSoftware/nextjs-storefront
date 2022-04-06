import React from 'react'

import { Button, Typography } from '@mui/material'
import { useArgs } from '@storybook/client-api'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from './Modal'

export default {
  component: Modal,
  title: 'Common/Modal',
} as ComponentMeta<typeof Modal>

// export function useCustomHook() {
//   const [{ open }, updateArgs] = useArgs()
//   const handleClose = () => updateArgs({ open: !open })

//   return [handleClose]
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof Modal> = ({ onClose, ...args }) => {
  const [{ open }, updateArgs] = useArgs()
  const handleClose = () => updateArgs({ open: !open })
  // const [handleClose] = useCustomHook()

  return <Modal onClose={handleClose} {...args} />
}

// const Template: ComponentStory<typeof Modal> = ({ onClose, ...args }, context) => {
//   const { open, updateArgs } = context
//   const handleClose = () => updateArgs({ open: !open })

//   return <Modal onClose={handleClose} {...args} />
// }
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

// Common.decorators = [
//   (Story) => {
//     const [{ open }, updateArgs] = useArgs()

//     return <Story open={open} updateArgs={updateArgs} />
//   },
// ]
