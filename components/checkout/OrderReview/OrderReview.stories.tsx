import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderReview from './OrderReview'
import { checkoutMock } from '@/__mocks__/stories'
import { orderMock } from '@/__mocks__/stories/orderMock'

// Common
export default {
  title: 'Checkout/OrderReview',
  component: OrderReview,
  argTypes: { onHandleEditAction: { action: 'clicked' } },
} as ComponentMeta<typeof OrderReview>

const Template: ComponentStory<typeof OrderReview> = (args) => <OrderReview {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
  isMultiShipEnabled: false,
}

//With multi-ship enabled
export const WithMultiShippingAddresses = Template.bind({})
WithMultiShippingAddresses.args = {
  checkout: checkoutMock.checkout,
  isMultiShipEnabled: true,
}

export const OrderReviewWithPurchaseOrder = Template.bind({})
OrderReviewWithPurchaseOrder.args = {
  checkout: {
    ...checkoutMock.checkout,
    payments: [
      {
        id: '46eb2c7f696c479fa048b0520015f9ed',
        paymentType: 'PurchaseOrder',
        status: 'New',
        paymentWorkflow: 'Mozu',
        amountCollected: 0,
        amountCredited: 0,
        amountRequested: 443.64,
        billingInfo: {
          billingContact: {
            id: 1413,
            firstName: 'Geetanshu',
            middleNameOrInitial: null,
            lastNameOrSurname: ' Chhabra',
            email: 'geetanshu.chhabra+123@kibocommerce.com',
            address: {
              address1: '900 HUTCHINSON PL',
              address2: null,
              address3: null,
              addressType: 'Residential',
              stateOrProvince: 'TN',
              postalOrZipCode: '37091',
              cityOrTown: 'LEBANON',
              countryCode: 'US',
              isValidated: true,
            },
            phoneNumbers: {
              home: '1234567890',
            },
          },
          isSameBillingShippingAddress: true,
          purchaseOrder: {
            purchaseOrderNumber: '501',
            paymentTerm: {
              description: '90',
              code: '90',
            },
          },
          card: null,
        },
      },
    ],
  },
}
