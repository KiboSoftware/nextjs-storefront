import { screen, waitFor, within } from '@testing-library/react'

import { customerAccountCardsMock, userAddressMock } from '@/__mocks__/stories'

export const addNewCard = async (user: any) => {
  await addCardDetails(user)
  await addAddress(user)

  const saveMethod = screen.getByRole('button', {
    name: /save-payment-method/i,
  })

  await waitFor(() => {
    expect(saveMethod).toBeEnabled()
  })

  await user.click(saveMethod)
}

export const addCardDetails = async (user: any) => {
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

export const addAddress = async (user: any, addAnotherAddress?: boolean) => {
  const firstName = screen.getByRole('textbox', { name: /first-name/i })
  const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
  const address1 = screen.getByRole('textbox', { name: /address1/i })
  const address2 = screen.getByRole('textbox', { name: /address2/i })
  const cityOrTown = screen.getByRole('textbox', { name: /city/i })
  const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
  const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
  const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
  const countryCode = screen.getByRole('button', { name: 'country-code' })

  if (addAnotherAddress) {
    await user.type(firstName, 'Mike')
    await user.type(lastNameOrSurname, 'Tyson')
    await user.type(address1, '100, Lamar Street')
    await user.type(address2, '13/1')
    await user.type(cityOrTown, 'Austin')
    await user.type(stateOrProvince, 'TX')
    await user.type(postalOrZipCode, '98984')
    await user.type(phoneNumberHome, '9999999999')
    await user.click(countryCode)

    const listbox = within(screen.getByRole('listbox'))
    await user.click(listbox.getByText(/US/i))
    await user.tab()
  } else {
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
}

export const getBillingAddresses = () => {
  return userAddressMock?.customerAccountContacts?.items?.filter(
    (item) => item?.accountId === 1012 && item?.types?.find((type) => type?.name === 'Billing')
  )
}

export const getBillingAddressAssociatedCard = (contactId: number) => {
  return customerAccountCardsMock.customerAccountCards.items?.find(
    (item) => item?.contactId === contactId
  )
}

export const getAccountCardId = (): string => {
  const addresses = getBillingAddresses()

  const contactId = addresses?.length && addresses[0]?.id

  return getBillingAddressAssociatedCard(contactId as number)?.id as string
}
