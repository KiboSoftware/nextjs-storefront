import { render, screen } from '@testing-library/react'

import * as operations from '@/lib/api/operations'
import CheckoutPage, { getServerSideProps } from '@/pages/checkout/[checkoutId]'

import type { Checkout, CrOrder } from '@/lib/gql/types'

const mockOperations = operations as {
  getCheckout(checkoutId: string, req: any, res: any): Promise<CrOrder>
  getMultiShipCheckout(checkoutId: string, req: any, res: any): Promise<Checkout>
}

jest.mock('@/lib/api/operations', () => ({
  __esModule: true,
  getCheckout: jest.fn(),
  getMultiShipCheckout: jest.fn(),
}))

jest.mock(
  '@/components/page-templates/StandardShipCheckoutTemplate/StandardShipCheckoutTemplate',
  () => ({
    __esModule: true,
    default: () => <div data-testid="standard-ship-checkout-template-mock" />,
  })
)

jest.mock(
  '@/components/page-templates/MultiShipCheckoutTemplate/MultiShipCheckoutTemplate',
  () => ({
    __esModule: true,
    default: () => <div data-testid="multi-ship-checkout-template-mock" />,
  })
)

jest.mock('@/context/CheckoutStepContext/CheckoutStepContext', () => ({
  CheckoutStepProvider: ({ children }: any) => (
    <div data-testid="checkout-step-provider-mock">{children}</div>
  ),
}))
jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(),
}))

describe('[pages] Checkout', () => {
  describe('when getServerSide props is called', () => {
    it('should return checkout props for valid checkout Id', async () => {
      const checkoutId = '12345'
      const mockCheckout = { id: checkoutId }
      mockOperations.getCheckout = jest.fn().mockImplementationOnce(async () => mockCheckout)
      mockOperations.getMultiShipCheckout = jest
        .fn()
        .mockImplementationOnce(async () => mockCheckout)
      const expectedProps = {
        props: { checkoutId, checkout: mockCheckout, isMultiShipEnabled: false },
      }

      const ssrProps = await getServerSideProps({ params: { checkoutId } } as any)

      expect(ssrProps).toEqual(expectedProps)
    })

    it('should return not found for invalid checkout Id', async () => {
      const checkoutId = '1'
      mockOperations.getCheckout = jest.fn().mockImplementationOnce(async () => null)
      mockOperations.getMultiShipCheckout = jest.fn().mockImplementationOnce(async () => null)

      const expectedProps = { notFound: true }
      const ssrProps = await getServerSideProps({ params: { checkoutId } } as any)

      expect(ssrProps).toEqual(expectedProps)
    })
  })

  it('should render StandardShip Checkout Template template when multiship is disabled', () => {
    const checkoutId = '12345'
    const checkout = { id: checkoutId } as any
    const isMultiShipEnabled = false
    const props = {
      checkoutId,
      checkout,
      isMultiShipEnabled,
    }

    render(<CheckoutPage {...props} />)

    const checkoutTemplate = screen.getByTestId('standard-ship-checkout-template-mock')
    const checkoutStepProvider = screen.getByTestId('checkout-step-provider-mock')

    expect(checkoutTemplate).toBeVisible()
    expect(checkoutStepProvider).toBeVisible()
  })

  it('should render MultiShip Checkout Template template when multiship is enabled', () => {
    const checkoutId = '12345'
    const checkout = { id: checkoutId } as any
    const isMultiShipEnabled = true
    const props = {
      checkoutId,
      checkout,
      isMultiShipEnabled,
    }

    render(<CheckoutPage {...props} />)

    const checkoutTemplate = screen.getByTestId('multi-ship-checkout-template-mock')
    const checkoutStepProvider = screen.getByTestId('checkout-step-provider-mock')

    expect(checkoutTemplate).toBeVisible()
    expect(checkoutStepProvider).toBeVisible()
  })
})
