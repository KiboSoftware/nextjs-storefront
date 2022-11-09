import { screen, waitFor, within } from '@testing-library/react'

export const addNewCard = async (user: any) => {
  await addCardDetails(user)
  await addBillingAddress(user)

  const saveMethod = screen.getByRole('button', {
    name: /save-payment-method/i,
  })

  await waitFor(() => {
    expect(saveMethod).toBeEnabled()
  })

  await user.click(saveMethod)
}

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

const addBillingAddress = async (user: any) => {
  const firstName = screen.getByRole('textbox', { name: /first-name/i })
  const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
  const address1 = screen.getByRole('textbox', { name: /address1/i })
  const address2 = screen.getByRole('textbox', { name: /address2/i })
  const cityOrTown = screen.getByRole('textbox', { name: /city/i })
  const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
  const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
  const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
  const countryCode = screen.getByRole('button', { name: 'country-code' })

  await user.type(firstName, 'John')
  await user.type(lastNameOrSurname, 'Doe')
  await user.type(address1, '400, Lamar Street')
  await user.type(address2, '23/1')
  await user.type(cityOrTown, 'Austin')
  await user.type(stateOrProvince, 'TX')
  await user.type(postalOrZipCode, '98984')
  await user.type(phoneNumberHome, '9938938494')
  await user.click(countryCode)

  const listbox = within(screen.getByRole('listbox'))
  await user.click(listbox.getByText(/US/i))
  await user.tab()
}
