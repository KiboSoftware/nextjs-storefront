import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductQuickViewDialog from './ProductQuickViewDialog'
import { ProductCustomMock } from '@/__mocks__/stories'

export default {
  component: ProductQuickViewDialog,
  argTypes: { onClose: { action: 'onClose' } },
  title: 'Product/ProductQuickViewDialog',
} as ComponentMeta<typeof ProductQuickViewDialog>

const Template: ComponentStory<typeof ProductQuickViewDialog> = (args) => (
  <ProductQuickViewDialog {...args} />
)

export const Common = Template.bind({})

Common.args = {
  product: ProductCustomMock,
  isQuickViewModal: true,
}
