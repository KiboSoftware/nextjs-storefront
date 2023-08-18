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

export const B2BQuickViewDialogWithCart = Template.bind({})
B2BQuickViewDialogWithCart.args = {
  product: ProductCustomMock,
  isQuickViewModal: true,
  dialogProps: {
    title: 'Product Quick View',
    cancel: 'Cancel',
    addItemToCart: 'Add to Cart',
    isB2B: true,
  },
}

export const B2BQuickViewDialogWithList = Template.bind({})
B2BQuickViewDialogWithList.args = {
  product: ProductCustomMock,
  isQuickViewModal: true,
  dialogProps: {
    title: 'Product Quick View',
    cancel: 'Cancel',
    addItemToList: 'Add to List',
    isB2B: true,
  },
}

export const B2BQuickViewDialogWithQuote = Template.bind({})
B2BQuickViewDialogWithQuote.args = {
  product: ProductCustomMock,
  isQuickViewModal: true,
  dialogProps: {
    title: 'Product Quick View',
    cancel: 'Cancel',
    addItemToQuote: 'Add to Quote',
    isB2B: true,
  },
}
