import React, { useEffect, ReactNode } from 'react'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CheckoutUITemplate from './CheckoutUITemplate'
import { orderMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { useCheckoutStepContext, CheckoutStepProvider } from '@/context'

interface KiboStepperProps {
  children: any
}
interface OrderSummaryProps {
  children: ReactNode
  promoComponent: ReactNode
}

interface PromoCodeBadgeProps {
  onApplyCouponCode: (couponCode: string) => void
  onRemoveCouponCode: (couponCode: string) => void
}

const STEP_STATUS = {
  VALID: 'VALID',
  SUBMIT: 'SUBMIT',
  COMPLETE: 'COMPLETE',
  INCOMPLETE: 'INCOMPLETE',
}

const VALID_COUPON_CODE = 'Valid coupon code'

const DetailsStepMock = () => {
  const { stepStatus, setStepStatusComplete, setStepNext } = useCheckoutStepContext()
  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
  }, [stepStatus])

  return <>Details Step</>
}

const ShippingStepMock = () => {
  const { stepStatus, setStepStatusComplete, setStepNext } = useCheckoutStepContext()
  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
  }, [stepStatus])

  return <>Shipping Step</>
}

const PaymentStepMock = () => {
  const { stepStatus, setStepStatusComplete, setStepNext } = useCheckoutStepContext()
  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
  }, [stepStatus])

  return <>Payment Step</>
}

const ReviewStepMock = () => {
  const { stepStatus, setStepStatusComplete, setStepNext } = useCheckoutStepContext()
  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      setStepStatusComplete()
      setStepNext()
    }
  }, [stepStatus])

  return <>Review Step</>
}

jest.mock('@/components/checkout', () => ({
  __esModule: true,
  KiboStepper: ({ children }: KiboStepperProps) => {
    const { activeStep } = useCheckoutStepContext()

    return <>{children && children[activeStep]}</>
  },
  OrderReview: () => {
    return <>Order Review</>
  },
}))

jest.mock('@/components/common', () => ({
  __esModule: true,
  OrderSummary: ({ children, promoComponent }: OrderSummaryProps) => (
    <>
      <h1>Order Summery Mock</h1>
      {children}
      {promoComponent}
    </>
  ),

  PromoCodeBadge: ({ onApplyCouponCode, onRemoveCouponCode }: PromoCodeBadgeProps) => {
    return (
      <>
        <button onClick={() => onApplyCouponCode(VALID_COUPON_CODE)}>Apply coupon code</button>
        <button onClick={() => onRemoveCouponCode(VALID_COUPON_CODE)}>Remove coupon code</button>
      </>
    )
  },
}))

jest.mock('../../order/OrderConfirmation/OrderConfirmation', () => ({
  __esModule: true,
  default: () => <div>Order Confirmation Mock</div>,
}))

const setup = (initialActiveStep = 0, currentStepStatus = STEP_STATUS.INCOMPLETE) => {
  const user = userEvent.setup()

  const checkout = orderMock.checkout
  const promoError = ''
  const handleApplyCouponCodeMock = jest.fn()
  const handleRemoveCouponCodeMock = jest.fn()

  renderWithQueryClient(
    <CheckoutStepProvider
      steps={['details', 'shipping', 'payment', 'review']}
      initialActiveStep={initialActiveStep}
      currentStepStatus={currentStepStatus}
    >
      <CheckoutUITemplate
        checkout={checkout}
        promoError={promoError}
        handleApplyCouponCode={handleApplyCouponCodeMock}
        handleRemoveCouponCode={handleRemoveCouponCodeMock}
      >
        <DetailsStepMock />
        <ShippingStepMock />
        <PaymentStepMock />
        <ReviewStepMock />
      </CheckoutUITemplate>
    </CheckoutStepProvider>
  )
  return {
    user,
    handleApplyCouponCodeMock,
    handleRemoveCouponCodeMock,
  }
}

describe('Display Checkout steps', () => {
  describe('Details Step', () => {
    it('should render Details step and Order Summary component when active step is Details one', () => {
      const initialActiveStep = 0
      setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const DetailsStepMock = screen.getByText(/Details Step/i)
      const gotToShippingButton = screen.getByRole('button', { name: /go-to-shipping/i })
      const gotBackButton = screen.getByRole('button', { name: /go-back/i })

      // Assertion
      expect(DetailsStepMock).toBeVisible()

      expect(gotToShippingButton).toBeVisible()
      expect(gotToShippingButton).toBeDisabled()

      expect(gotBackButton).toBeVisible()
      expect(gotBackButton).toBeDisabled()
    })

    it('should able to apply coupon code', async () => {
      const initialActiveStep = 0
      const { user, handleApplyCouponCodeMock } = setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const applyCouponCodeButton = screen.getByRole('button', { name: /Apply coupon code/i })
      expect(applyCouponCodeButton).toBeEnabled()

      await user.click(applyCouponCodeButton)
      expect(handleApplyCouponCodeMock).toHaveBeenCalledWith(VALID_COUPON_CODE)
    })

    it('should able to remove coupon code', async () => {
      const initialActiveStep = 0
      const { user, handleRemoveCouponCodeMock } = setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const removeCouponCodeButton = screen.getByRole('button', { name: /Remove coupon code/i })
      expect(removeCouponCodeButton).toBeEnabled()

      await user.click(removeCouponCodeButton)
      expect(handleRemoveCouponCodeMock).toHaveBeenCalledWith(VALID_COUPON_CODE)
    })

    it('should make Shipping Step as active step when user clicks on go-to-shipping button', async () => {
      const initialActiveStep = 0
      const { user } = setup(initialActiveStep, STEP_STATUS.VALID)

      const detailsStepMock = screen.getByText(/Details Step/i)
      const goToShippingButton = screen.getByRole('button', { name: /go-to-shipping/i })

      // Assertion
      expect(detailsStepMock).toBeVisible()
      expect(goToShippingButton).toBeEnabled()

      // Act
      await user.click(goToShippingButton)

      // Assertion
      expect(screen.getByText(/Shipping Step/i)).toBeVisible()
      expect(screen.getByRole('button', { name: /go-to-payment/i })).toBeVisible()
    })

    it('should go-back button disabled', () => {
      const initialActiveStep = 0
      setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const DetailsStepMock = screen.getByText(/Details Step/i)
      const gotBackButton = screen.getByRole('button', { name: /go-back/i })

      // Assertion
      expect(DetailsStepMock).toBeVisible()
      expect(gotBackButton).toBeVisible()
      expect(gotBackButton).toBeDisabled()
    })
  })

  describe('Shipping Step', () => {
    it('should render Shipping step and Order Summary component when active step is Shipping one', () => {
      const initialActiveStep = 1
      setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const kiboStepperMock = screen.getByText(/Shipping Step/i)
      const goToShippingButton = screen.getByRole('button', { name: /go-to-payment/i })
      const gotBackButton = screen.getByRole('button', { name: /go-back/i })

      // Assertion
      expect(kiboStepperMock).toBeVisible()

      expect(goToShippingButton).toBeVisible()
      expect(goToShippingButton).toBeDisabled()

      expect(gotBackButton).toBeVisible()
      expect(gotBackButton).toBeEnabled()
    })

    it('should able to apply coupon code', async () => {
      const initialActiveStep = 1
      const { user, handleApplyCouponCodeMock } = setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const applyCouponCodeButton = screen.getByRole('button', { name: /Apply coupon code/i })
      expect(applyCouponCodeButton).toBeEnabled()

      await user.click(applyCouponCodeButton)
      expect(handleApplyCouponCodeMock).toHaveBeenCalledWith(VALID_COUPON_CODE)
    })

    it('should able to remove coupon code', async () => {
      const initialActiveStep = 1
      const { user, handleRemoveCouponCodeMock } = setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const removeCouponCodeButton = screen.getByRole('button', { name: /Remove coupon code/i })
      expect(removeCouponCodeButton).toBeEnabled()

      await user.click(removeCouponCodeButton)
      expect(handleRemoveCouponCodeMock).toHaveBeenCalledWith(VALID_COUPON_CODE)
    })

    it('should make Payment Step as active step when user clicks on go-to-payment button', async () => {
      const initialActiveStep = 1
      const { user } = setup(initialActiveStep, STEP_STATUS.VALID)

      const shippingStepMock = screen.getByText(/Shipping Step/i)
      const goToPaymentButton = screen.getByRole('button', { name: /go-to-payment/i })

      // Assertion
      expect(shippingStepMock).toBeVisible()
      expect(goToPaymentButton).toBeEnabled()

      // Act
      await user.click(goToPaymentButton)

      // Assertion
      expect(screen.getByText(/Payment Step/i)).toBeVisible()
      expect(screen.getByRole('button', { name: /review-order/i })).toBeVisible()
    })

    it('should make Details Step as active step when user clicks on go-back button', async () => {
      const initialActiveStep = 1
      const { user } = setup(initialActiveStep, STEP_STATUS.VALID)

      const shippingStepMock = screen.getByText(/Shipping Step/i)
      const goBackButton = screen.getByRole('button', { name: /go-back/i })

      // Assertion
      expect(shippingStepMock).toBeVisible()
      expect(goBackButton).toBeEnabled()

      // Act
      await user.click(goBackButton)

      // Assertion
      expect(screen.getByText(/Details Step/i)).toBeVisible()
      expect(screen.getByRole('button', { name: /go-to-shipping/i })).toBeVisible()
    })
  })

  describe('Payment Step', () => {
    it('should render Payment step and Order Summary component when active step is Payment one', () => {
      const initialActiveStep = 2
      setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const kiboStepperMock = screen.getByText(/Payment Step/i)
      const gotToShippingButton = screen.getByRole('button', { name: /review-order/i })
      const gotBackButton = screen.getByRole('button', { name: /go-back/i })

      // Assertion
      expect(kiboStepperMock).toBeVisible()

      expect(gotToShippingButton).toBeVisible()
      expect(gotToShippingButton).toBeDisabled()

      expect(gotBackButton).toBeVisible()
      expect(gotBackButton).toBeEnabled()
    })

    it('should able to apply coupon code', async () => {
      const initialActiveStep = 2
      const { user, handleApplyCouponCodeMock } = setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const applyCouponCodeButton = screen.getByRole('button', { name: /Apply coupon code/i })
      expect(applyCouponCodeButton).toBeEnabled()

      await user.click(applyCouponCodeButton)
      expect(handleApplyCouponCodeMock).toHaveBeenCalledWith(VALID_COUPON_CODE)
    })

    it('should able to remove coupon code', async () => {
      const initialActiveStep = 2
      const { user, handleRemoveCouponCodeMock } = setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const removeCouponCodeButton = screen.getByRole('button', { name: /Remove coupon code/i })
      expect(removeCouponCodeButton).toBeEnabled()

      await user.click(removeCouponCodeButton)
      expect(handleRemoveCouponCodeMock).toHaveBeenCalledWith(VALID_COUPON_CODE)
    })

    it('should make Review Step as active step when user clicks on review-order button', async () => {
      const initialActiveStep = 2
      const { user } = setup(initialActiveStep, STEP_STATUS.VALID)

      const paymentStepMock = screen.getByText(/Payment Step/i)
      const goToReviewButton = screen.getByRole('button', { name: /review-order/i })

      // Assertion
      expect(paymentStepMock).toBeVisible()
      expect(goToReviewButton).toBeEnabled()

      // Act
      await user.click(goToReviewButton)

      // Assertion
      expect(screen.getByText(/Review Step/i)).toBeVisible()
    })

    it('should make Shipping Step as active step when user clicks on go-back button', async () => {
      const initialActiveStep = 2
      const { user } = setup(initialActiveStep, STEP_STATUS.VALID)

      const paymentStepMock = screen.getByText(/Payment Step/i)
      const goBackButton = screen.getByRole('button', { name: /go-back/i })

      // Assertion
      expect(paymentStepMock).toBeVisible()
      expect(goBackButton).toBeEnabled()

      // Act
      await user.click(goBackButton)

      // Assertion
      expect(screen.getByText(/Shipping Step/i)).toBeVisible()
      expect(screen.getByRole('button', { name: /go-to-payment/i })).toBeVisible()
    })
  })

  describe('Review Step', () => {
    it('should render Review step and Order Review when active step is Review one', () => {
      const initialActiveStep = 3
      setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

      const reviewStepMock = screen.getByText(/Review Step/i)
      const orderReviewMock = screen.getByText(/Order Review/i)

      // Assertion
      expect(reviewStepMock).toBeVisible()
      expect(orderReviewMock).toBeVisible()
    })
  })
})

describe('Display Order Confirmation', () => {
  it('should render component', () => {
    const initialActiveStep = 4
    setup(initialActiveStep, STEP_STATUS.INCOMPLETE)

    const OrderConfirmationMock = screen.getByText(/Order Confirmation Mock/i)

    // Assertion
    expect(OrderConfirmationMock).toBeVisible()
  })
})
