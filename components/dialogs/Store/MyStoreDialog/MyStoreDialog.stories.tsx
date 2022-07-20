import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MyStoreDialog from './MyStoreDialog'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'

export default {
  title: 'Dialogs/Store/MyStoreDialog',
  component: MyStoreDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof MyStoreDialog>

const Template: ComponentStory<typeof MyStoreDialog> = ({ ...args }) => <MyStoreDialog {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isDialogCentered: false,
  location:
    locationCollectionMock?.spLocations?.items && locationCollectionMock?.spLocations?.items[0],
}
