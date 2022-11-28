import { render, screen } from '@testing-library/react'

import * as operations from '@/lib/api/operations'
import CheckoutPage, { getServerSideProps } from '@/pages/checkout/[checkoutId]'

import type { Order } from '@/lib/gql/types'

const mockOperations = operations as {
  getCheckout(checkoutId: string, req: any, res: any): Promise<Order>
}
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { checkoutId: '13cbf88a39c9fb00010137fd0000678b' },
    }
  },
}))

jest.mock('@/lib/api/operations', () => ({
  __esModule: true,
  getCheckout: jest.fn(),
}))

jest.mock('@/components/page-templates/Checkout/Checkout', () => ({
  __esModule: true,
  default: () => <div data-testid="checkout-template-mock" />,
}))
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
      const expectedProps = { props: { checkoutId, checkout: mockCheckout } }

      const ssrProps = await getServerSideProps({ params: { checkoutId } } as any)

      expect(ssrProps).toEqual(expectedProps)
    })

    it('should return not found for invalid checkout Id', async () => {
      const checkoutId = '1'
      mockOperations.getCheckout = jest.fn().mockImplementationOnce(async () => null)

      const expectedProps = { notFound: true }
      const ssrProps = await getServerSideProps({ params: { checkoutId } } as any)

      expect(ssrProps).toEqual(expectedProps)
    })
  })

  it('should render checkout template', () => {
    const checkoutId = '12345'
    const checkout = { id: checkoutId } as any
    const props = {
      checkoutId,
      checkout,
    }

    render(<CheckoutPage {...props} />)

    const checkoutTemplate = screen.getByTestId('checkout-template-mock')
    const checkoutStepProvider = screen.getByTestId('checkout-step-provider-mock')

    expect(checkoutTemplate).toBeVisible()
    expect(checkoutStepProvider).toBeVisible()
  })
})
