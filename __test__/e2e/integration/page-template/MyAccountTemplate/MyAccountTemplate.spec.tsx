import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import { userMock } from '@/__mocks__/stories'
import { customerAccountCardsMock } from '@/__mocks__/stories/customerAccountCardsMock'
import { createQueryClientWrapper } from '@/__test__/utils'
import * as stories from '@/components/page-templates/MyAccountTemplate/MyAccountTemplate.stories'
import { AuthContextProvider, DialogRoot, ModalContextProvider } from '@/context'

import type { Card } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(
    <AuthContextProvider>
      <Common />
    </AuthContextProvider>,
    {
      wrapper: createQueryClientWrapper(),
    }
  )

  return {
    user,
  }
}

afterEach(() => {
  cleanup()
})

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

describe('[component] - MyProfile', () => {
  it(`should handle email form edit`, async () => {
    const { user } = setup()

    server.use(
      graphql.query('getUser', (_req, res, ctx) => {
        return res.once(
          ctx.data({
            customerAccount: {
              ...userMock.customerAccount,
              emailAddress: 'johnDoe@gmail.com',
            },
          })
        )
      })
    )

    const MyProfile = screen.getByRole('heading', {
      name: /my-profile/i,
    })
    await user.click(MyProfile)

    const editName = screen.getAllByText(/edit/i)
    await user.click(editName[1])

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    expect(emailInput).toHaveValue('suman@email.com')

    await user.type(emailInput, 'johnDoe@gmail.com')

    await user.click(screen.getByRole('button', { name: 'save' }))

    await waitFor(() => {
      expect(screen.getByTestId('email')).toHaveTextContent('johnDoe@gmail.com')
    })
  })

  it(`should handle names form edit`, async () => {
    const { user } = setup()

    server.use(
      graphql.query('getUser', (_req, res, ctx) => {
        return res.once(
          ctx.data({
            customerAccount: {
              ...userMock.customerAccount,
              firstName: 'John',
              lastName: 'Doe',
            },
          })
        )
      })
    )

    const MyProfile = screen.getByRole('heading', {
      name: /my-profile/i,
    })
    await user.click(MyProfile)

    const editName = screen.getAllByText(/edit/i)
    await user.click(editName[0])

    const firstNameInput = screen.getByRole('textbox', { name: 'first-name' })
    const lastNameInput = screen.getByRole('textbox', { name: 'last-name-or-sur-name' })

    expect(firstNameInput).toHaveValue('Suman')
    expect(lastNameInput).toHaveValue('Patro')

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')

    await user.click(screen.getByRole('button', { name: 'save' }))

    await waitFor(() => {
      expect(screen.getByTestId('customer-name')).toHaveTextContent('John Doe')
    })
  })

  it(`should handle password form edit`, async () => {
    const { user } = setup()

    server.use(
      graphql.query('getUser', (_req, res, ctx) => {
        return res.once(
          ctx.data({
            customerAccount: {
              ...userMock.customerAccount,
              firstName: 'John',
              lastName: 'Doe',
            },
          })
        )
      })
    )

    const MyProfile = screen.getByRole('heading', {
      name: /my-profile/i,
    })
    await user.click(MyProfile)

    const editName = screen.getAllByText(/edit/i)
    await user.click(editName[0])

    const firstNameInput = screen.getByRole('textbox', { name: 'first-name' })
    const lastNameInput = screen.getByRole('textbox', { name: 'last-name-or-sur-name' })

    expect(firstNameInput).toHaveValue('Suman')
    expect(lastNameInput).toHaveValue('Patro')

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')

    await user.click(screen.getByRole('button', { name: 'save' }))

    await waitFor(() => {
      expect(screen.getByTestId('customer-name')).toHaveTextContent('John Doe')
    })
  })
})

describe('[component] - AddressBook (has saved addresses )', () => {
  it('should handle adding new address', async () => {
    const { user } = setup()
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
    const { user } = setup()
    const addressBook = screen.getByRole('heading', {
      name: /address-book/i,
    })
    await user.click(addressBook)

    const editAddressLinks = screen.getAllByTestId(/address-edit/)
    await user.click(editAddressLinks[0])

    await addUpdateAddress(user)
    const saveAddressButton = screen.getByRole('button', {
      name: /save/i,
    })
    await user.click(saveAddressButton)

    await waitFor(() => expect(screen.queryByTestId('address-form')).not.toBeInTheDocument())
  })

  it('should handle delete address', async () => {
    const user = userEvent.setup()

    render(
      <AuthContextProvider>
        <ModalContextProvider>
          <DialogRoot />
          <Common />
        </ModalContextProvider>
      </AuthContextProvider>,
      {
        wrapper: createQueryClientWrapper(),
      }
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
    const { user } = setup()

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
    const { user } = setup()

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

const addUpdateAddress = async (user: UserEvent) => {
  const firstName = screen.getByRole('textbox', { name: /first-name/i })
  const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
  const address1 = screen.getByRole('textbox', { name: /address1/i })
  const address2 = screen.getByRole('textbox', { name: /address2/i })
  const cityOrTown = screen.getByRole('textbox', { name: /city/i })
  const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
  const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
  const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
  const countryCode = screen.getByRole('button', { name: 'country-code' })

  await user.clear(firstName)
  await user.type(firstName, 'Ron')
  await user.clear(lastNameOrSurname)
  await user.type(lastNameOrSurname, 'Batman')
  await user.clear(address1)
  await user.type(address1, '1523 Stellar Dr')
  await user.clear(address2)
  await user.type(address2, '23/1')
  await user.clear(cityOrTown)
  await user.type(cityOrTown, 'Kenai')
  await user.clear(stateOrProvince)
  await user.type(stateOrProvince, 'AK')
  await user.clear(postalOrZipCode)
  await user.type(postalOrZipCode, '98984')
  await user.clear(phoneNumberHome)
  await user.type(phoneNumberHome, '9072832799')
  fireEvent.mouseDown(countryCode)

  const listbox = within(screen.getByRole('listbox'))
  await user.click(listbox.getByText(/US/i))
  await user.tab()
}
