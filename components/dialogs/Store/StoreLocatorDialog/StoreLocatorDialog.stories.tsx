import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StoreLocatorDialog from './StoreLocatorDialog'
import { ProductCustomMock } from '@/__mocks__/stories'

export default {
  title: 'Dialogs/Store/StoreLocatorDialog',
  component: StoreLocatorDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof StoreLocatorDialog>

const Template: ComponentStory<typeof StoreLocatorDialog> = ({ ...args }) => (
  <StoreLocatorDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  isOpen: true,
  isDialogCentered: false,
  handleSetStore: (selectedStore) => selectedStore,
}

export const WithProduct = Template.bind({})

WithProduct.args = {
  isOpen: true,
  isDialogCentered: false,
  showProductAndInventory: true,
  product: ProductCustomMock,
  quantity: 1,
  handleSetStore: (selectedStore) => selectedStore,
}
