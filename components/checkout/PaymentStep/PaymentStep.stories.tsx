import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import PaymentStep from './PaymentStep'
import {
  checkoutMock,
  customerAccountCardsMock,
  customerPurchaseOrderAccountMock,
  orderMock,
  userAddressMock,
} from '@/__mocks__/stories'
import { AuthContext } from '@/context'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const steps = ['details', 'shipping', 'payment', 'review']

const userContextValues = (isAuthenticated: boolean, userId: number) => ({
  isAuthenticated: isAuthenticated,
  user: {
    id: userId,
  },
  login: () => null,
  createAccount: () => null,
  setAuthError: () => null,
  authError: '',
  logout: () => null,
})

export default {
  title: 'checkout/PaymentStep',
  component: PaymentStep,
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof PaymentStep>

const Template: ComponentStory<typeof PaymentStep> = (args) => <PaymentStep {...args} />

const LoggedInNoData: ComponentStory<typeof PaymentStep> = (args) => (
  <AuthContext.Provider value={userContextValues(true, 0)}>
    <PaymentStep {...args} />
  </AuthContext.Provider>
)

const LoggedInWithData: ComponentStory<typeof PaymentStep> = (args) => (
  <AuthContext.Provider value={userContextValues(true, 1012)}>
    <PaymentStep {...args} />
  </AuthContext.Provider>
)

const handleVoidPayment = async () => undefined
const handleAddPayment = async () => undefined

export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
  cardCollection: customerAccountCardsMock.customerAccountCards,
  addressCollection: userAddressMock.customerAccountContacts,
  customerPurchaseOrderAccount: customerPurchaseOrderAccountMock.customerPurchaseOrderAccount,
  isMultiShipEnabled: false,
}

export const WithoutSavedPayment = LoggedInNoData.bind({})
WithoutSavedPayment.args = {
  checkout: { ...orderMock.checkout, payments: [] },
  cardCollection: { totalCount: 0, items: [] },
  ...Common.args,
}

export const WithSavedPayment = LoggedInWithData.bind({})
WithSavedPayment.args = {
  checkout: { ...orderMock.checkout },

  ...Common.args,
}
WithSavedPayment.parameters = {
  msw: {
    handlers: {
      cards: graphql.query('customerAccountCards', (_req, res, ctx) => {
        return res(ctx.data(customerAccountCardsMock))
      }),

      contacts: graphql.query('getUserAddresses', (_req, res, ctx) => {
        return res(ctx.data(userAddressMock))
      }),
    },
  },
}

export const MultiShip = LoggedInNoData.bind({})

MultiShip.args = {
  ...WithoutSavedPayment.args,
  checkout: checkoutMock.checkout,
  isMultiShipEnabled: true,
}
