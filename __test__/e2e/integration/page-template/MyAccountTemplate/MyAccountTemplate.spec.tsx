import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import { customerAccountCardsMock } from '@/__mocks__/stories/customerAccountCardsMock'
import * as stories from '@/components/page-templates/MyAccountTemplate/MyAccountTemplate.stories'
import { DialogRoot, ModalContextProvider } from '@/context'

import type { Card } from '@/lib/gql/types'

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

describe('[component] - AddressBook (has saved addresses )', () => {
  it('should handle adding new address', async () => {
    render(<Common />)
    const addressBook = screen.getByRole('heading', {
      name: /address-book/i,
    })
    await user.click(addressBook)

    const addNewAddressButton = screen.getByRole('button', { name: /add-new-address/i })
    await user.click(addNewAddressButton)

    expect(screen.getByTestId('address-form')).toBeVisible()

    await addUpdateAddress(user)
    const saveAddressButton = screen.getByRole('button', {
      name: /save/i,
    })
    await user.click(saveAddressButton)

    await waitFor(() => expect(screen.queryByTestId('address-form')).not.toBeInTheDocument())
  })

  it('should handle edit address', async () => {
    render(<Common />)
    const addressBook = screen.getByRole('heading', {
      name: /address-book/i,
    })
    await user.click(addressBook)

    const editAddressLinks = screen.getAllByText('edit')
    await user.click(editAddressLinks[0])

    await addUpdateAddress(user)
    const saveAddressButton = screen.getByRole('button', {
      name: /save/i,
    })
    await user.click(saveAddressButton)

    await waitFor(() => expect(screen.queryByTestId('address-form')).not.toBeInTheDocument())
  })

  it('should handle delete address', async () => {
    render(
      <ModalContextProvider>
        <DialogRoot />
        <Common />
      </ModalContextProvider>
    )

    const addressBook = screen.getByRole('heading', {
      name: /address-book/i,
    })
    await user.click(addressBook)

    const deleteAddressIcons = screen.getAllByTestId('DeleteIcon')
    await user.click(deleteAddressIcons[0])

    const deleteConfirmMessage = screen.getByText(/delete-address-confirm-message/i)

    const deleteButton = screen.getByRole('button', {
      name: /delete/i,
    })

    expect(deleteConfirmMessage).toBeVisible()
    expect(deleteButton).toBeVisible()

    await user.click(deleteButton)
    expect(deleteButton).not.toBeVisible()
  })
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

    await user.click(addressRadios[0])

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

  it('should handle editing payment method', async () => {
    render(<Common />)

    await user.click(
      screen.getByRole('heading', {
        name: /payment-method/i,
      })
    )

    const firstPaymentMethodEditText = screen.getAllByTestId('payment-method-edit-link')[0]

    expect(firstPaymentMethodEditText).toBeVisible()

    await user.click(firstPaymentMethodEditText)

    if (customerAccountCardsMock.customerAccountCards.items) {
      const { cardNumberPart, expireMonth, expireYear } = customerAccountCardsMock
        .customerAccountCards.items[0] as Card

      const cardNumber = screen.getByRole('textbox', {
        name: /card-number/i,
      })

      expect(cardNumber).toHaveDisplayValue(cardNumberPart as string)

      const expiryDate = screen.getByRole('textbox', {
        name: /expiry-date/i,
      })

      expect(expiryDate).toHaveDisplayValue(`${expireMonth}/${expireYear}`)

      await user.type(expiryDate, '11/2029')
    }
    const addressRadios = screen.getAllByRole('radio')

    expect(addressRadios[0]).toBeChecked()

    const savePaymentMethodButton = screen.getByRole('button', { name: 'save-payment-method' })

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
                  expireMonth: 11,
                  expireYear: 2029,
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
  })
})

const addCardDetails = async (user: any) => {
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

const addUpdateAddress = async (user: any) => {
  const firstName = screen.getByRole('textbox', { name: /first-name/i })
  const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
  const address1 = screen.getByRole('textbox', { name: /address1/i })
  const address2 = screen.getByRole('textbox', { name: /address2/i })
  const cityOrTown = screen.getByRole('textbox', { name: /city/i })
  const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
  const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
  const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
  const countryCode = screen.getByRole('button', { name: 'country-code' })

  await user.type(firstName, 'Ron')
  await user.type(lastNameOrSurname, 'Batman')
  await user.type(address1, '1523 Stellar Dr')
  await user.type(address2, '23/1')
  await user.type(cityOrTown, 'Kenai')
  await user.type(stateOrProvince, 'AK')
  await user.type(postalOrZipCode, '99611')
  await user.type(phoneNumberHome, '9072832799')
  fireEvent.mouseDown(countryCode)

  const listbox = within(screen.getByRole('listbox'))
  await user.click(listbox.getByText(/US/i))
  await user.tab()
}
