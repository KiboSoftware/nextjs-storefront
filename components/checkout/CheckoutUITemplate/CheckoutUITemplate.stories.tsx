import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DetailsStep from '../DetailsStep/DetailsStep'
import PaymentStep from '../PaymentStep/PaymentStep'
import ReviewStep from '../ReviewStep/ReviewStep'
import StandardShippingStep from '../StandardShippingStep/StandardShippingStep'
import CheckoutUITemplate from './CheckoutUITemplate'
import { orderMock } from '@/__mocks__/stories'
import { CheckoutStepProvider } from '@/context'

export default {
  title: 'Page Templates/Checkout UI Template',
  component: CheckoutUITemplate,
  argTypes: {
    handleApplyCouponCode: { action: 'handleApplyCouponCode' },
    handleRemoveCouponCode: { action: 'handleRemoveCouponCode' },
  },
  decorators: [
    (Story) => (
      <div>
        <div
          style={{ height: '50px', position: 'sticky', top: 0, background: 'white', zIndex: 2000 }}
        ></div>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CheckoutUITemplate>

const handleCreateOrder = () => undefined
const handleUpdateCheckoutPersonalInfo = async () => undefined
const handleVoidPayment = () => 'onVoidPayment'
const handleAddPayment = () => 'onAddPayment'

const Template: ComponentStory<typeof CheckoutUITemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']} initialActiveStep={1}>
    <CheckoutUITemplate {...args}>
      <DetailsStep
        checkout={orderMock.checkout}
        updateCheckoutPersonalInfo={handleUpdateCheckoutPersonalInfo}
      />
      <StandardShippingStep
        checkout={orderMock.checkout}
        userShippingAddress={[]}
        isAuthenticated={true}
      />
      <PaymentStep
        checkout={orderMock.checkout}
        onVoidPayment={handleVoidPayment}
        onAddPayment={handleAddPayment}
      />
      <ReviewStep
        checkout={orderMock.checkout}
        shipItems={undefined}
        pickupItems={undefined}
        personalDetails={undefined}
        orderSummaryProps={undefined}
        isMultiShipEnabled={false}
        onCreateOrder={handleCreateOrder}
      />
    </CheckoutUITemplate>
  </CheckoutStepProvider>
)

export const Common = Template.bind({})
Common.args = {
  checkout: orderMock?.checkout,
}
