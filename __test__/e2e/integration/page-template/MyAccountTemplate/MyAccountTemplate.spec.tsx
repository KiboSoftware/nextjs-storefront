import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import * as stories from '@/components/page-templates/MyAccountTemplate/MyAccountTemplate.stories'

const { Common } = composeStories(stories)

const user = userEvent.setup()

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => {
    return {
      user: {
        id: 1012,
      },
    }
  },
}))

jest.mock('@/lib/helpers/tokenizeCreditCardPayment', () => {
  return {
    tokenizeCreditCardPayment: jest.fn().mockImplementation(() => {
      return {
        id: 'ec66e2c7625842c191d0870aed5ec0e7',
        numberPart: '************1111',
      }
    }),
  }
})

describe('[component] - PaymentMethod (has saved payment methods)', () => {
  it('should handle adding new card', async () => {
    render(<Common />)

    await user.click(screen.getByText('payment-method'))

    await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    const savePaymentMethodButton = screen.getByRole('button', { name: 'save-payment-method' })

    expect(savePaymentMethodButton).toBeDisabled()

    const addressRadios = screen.getAllByRole('radio')

    await addCardDetails(user)

    await user.click(addressRadios[2])

    expect(savePaymentMethodButton).toBeEnabled()

    server.use(
      graphql.query('customerAccountCards', (_req, res, ctx) => {
        return res(
          ctx.data({
            customerAccountCards: {
              totalCount: 1,
              items: [
                {
                  id: '726df82aaf8a406fac8efdecb54964dd',
                  cardType: 'VISA',
                  expireMonth: 12,
                  expireYear: 2027,
                  cardNumberPart: '************1111',
                  contactId: 1495,
                  isDefaultPayMethod: true,
                },
                {
                  id: 'ec66e2c7625842c191d0870aed5ec0e7',
                  cardType: 'VISA',
                  expireMonth: 1,
                  expireYear: 2026,
                  cardNumberPart: '************1111',
                  contactId: 1495,
                  isDefaultPayMethod: true,
                },
              ],
            },
          })
        )
      })
    )

    await user.click(savePaymentMethodButton)

    await waitFor(() => {
      expect(screen.getAllByTestId('saved-cards-and-contacts')).toHaveLength(2)
    })
  })
})

const addCardDetails = async (user: UserEvent) => {
  // Card form values
  const cardNumber = screen.getByRole('textbox', {
    name: /card-number/i,
  })

  const expiryDate = screen.getByRole('textbox', {
    name: /expiry-date/i,
  })

  const cvv = screen.getByPlaceholderText(/security-code-placeholder/i)

  await user.type(cardNumber, '4111111111111111')
  await user.type(expiryDate, '01/2026')
  await user.type(cvv, '123')
  await user.tab()
}
