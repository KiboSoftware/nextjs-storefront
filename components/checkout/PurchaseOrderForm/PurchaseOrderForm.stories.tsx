import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PurchaseOrderForm from './PurchaseOrderForm'

export default {
  component: PurchaseOrderForm,
  title: 'checkout/PurchaseOrderForm',
} as ComponentMeta<typeof PurchaseOrderForm>

const Template: ComponentStory<typeof PurchaseOrderForm> = (args) => <PurchaseOrderForm {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  availableBalance: 10000,
  creditLimit: 10000,
  purchaseOrderPaymentTerms: [
    { code: '30', description: '30', siteId: 41315 },
    { code: '60', description: '60', siteId: 41315 },
  ],
}

export const SinglePaymentTermPurchaseOrderForm = Template.bind({})
SinglePaymentTermPurchaseOrderForm.args = {
  availableBalance: 10000,
  creditLimit: 10000,
  purchaseOrderPaymentTerms: [{ code: '30', description: '30', siteId: 41315 }],
}
