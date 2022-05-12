import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Contact } from '@/components/common/AddressForm//AddressForm'
import * as stories from '@/components/common/AddressForm/AddressForm.stories'

const { Common } = composeStories(stories)

describe('[components] - AddressForm integration', () => {
  const contact = stories.WithProps.args?.contact as Contact
  const setup = (params = {}) => {
    render(<Common {...params} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const firstName = screen.getByRole('textbox', { name: /first-name/i })
    const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name/i })
    const address1 = screen.getByRole('textbox', { name: /address1/i })
    const address2 = screen.getByRole('textbox', { name: /address2/i })
    const cityOrTown = screen.getByRole('textbox', { name: /city/i })
    const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
    const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
    const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
    const countryCode = screen.getByRole('button')

    // assert
    expect(firstName).toBeVisible()
    expect(lastNameOrSurname).toBeVisible()
    expect(address1).toBeVisible()
    expect(address2).toBeVisible()
    expect(cityOrTown).toBeVisible()
    expect(stateOrProvince).toBeVisible()
    expect(postalOrZipCode).toBeVisible()
    expect(phoneNumberHome).toBeVisible()
    expect(countryCode).toBeVisible()
  })

  describe('should show user entered values', () => {
    it('firstName', async () => {
      // arrange
      setup()

      // act
      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      await act(async () => {
        userEvent.type(firstName, contact.firstName as string)
      })

      // assert
      expect(firstName).toHaveValue(contact.firstName)
    })

    it('lastNameOrSurname', async () => {
      // arrange
      setup()

      // act
      const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name/i })
      await act(async () => {
        userEvent.type(lastNameOrSurname, contact.lastNameOrSurname as string)
      })

      // assert
      expect(lastNameOrSurname).toHaveValue(contact.lastNameOrSurname)
    })

    it('address1', async () => {
      // arrange
      setup()

      // act
      const address1 = screen.getByRole('textbox', { name: /address1/i })
      await act(async () => {
        userEvent.type(address1, contact.address.address1 as string)
      })

      // assert
      expect(address1).toHaveValue(contact.address.address1)
    })

    it('address2', async () => {
      // arrange
      setup()

      // act
      const address2 = screen.getByRole('textbox', { name: /address2/i })
      await act(async () => {
        userEvent.type(address2, contact.address.address2 as string)
      })

      // assert
      expect(address2).toHaveValue(contact.address.address2)
    })

    it('cityOrTown', async () => {
      // arrange
      setup()

      // act
      const cityOrTown = screen.getByRole('textbox', { name: /city/i })
      await act(async () => {
        userEvent.type(cityOrTown, contact.address.cityOrTown as string)
      })

      // assert
      expect(cityOrTown).toHaveValue(contact.address.cityOrTown)
    })

    it('stateOrProvince', async () => {
      // arrange
      setup()

      // act
      const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
      await act(async () => {
        userEvent.type(stateOrProvince, contact.address.stateOrProvince as string)
      })

      // assert
      expect(stateOrProvince).toHaveValue(contact.address.stateOrProvince)
    })

    it('postalOrZipCode', async () => {
      // arrange
      setup()

      // act
      const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
      await act(async () => {
        userEvent.type(postalOrZipCode, contact.address.postalOrZipCode as string)
      })

      // assert
      expect(postalOrZipCode).toHaveValue(contact.address.postalOrZipCode)
    })

    it('phoneNumbers.home', async () => {
      // arrange
      setup()

      // act
      const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
      await act(async () => {
        userEvent.type(phoneNumberHome, contact.phoneNumbers.home)
      })

      // assert
      expect(phoneNumberHome).toHaveValue(contact.phoneNumbers.home)
    })
  })

  describe('save shipping address (checkbox)', () => {
    it('should not render when isUserLoggedIn = false', () => {
      // arrange
      setup({ isUserLoggedIn: false })

      // act
      const saveShippingAddress = screen.queryByRole('checkbox')

      // asert
      expect(saveShippingAddress).not.toBeInTheDocument()
    })

    it('should only  when isUserLoggedIn = true', () => {
      // arrange
      setup({ isUserLoggedIn: true })

      // act
      const saveShippingAddress = screen.getByRole('checkbox')

      // asert
      expect(saveShippingAddress).toBeInTheDocument()
    })
  })

  describe('should display validation message', () => {
    it('firstName', async () => {
      // arrange
      setup()

      // act
      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      await act(async () => {
        // userEvent.type(firstName, contact.firstName as string)
        // userEvent.clear(firstName)
        // userEvent.tab()
        // firstName.focus()
        // fireEvent.blur(firstName)

        firstName.focus()
        fireEvent.blur(firstName, { target: { value: '' } })
      })

      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('lastNameOrSurname', async () => {
      // arrange
      setup()

      // act
      const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name/i })
      await act(async () => {
        lastNameOrSurname.focus()
        fireEvent.blur(lastNameOrSurname, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('address1', async () => {
      // arrange
      setup()

      // act
      const address1 = screen.getByRole('textbox', { name: /address1/i })
      await act(async () => {
        address1.focus()
        fireEvent.blur(address1, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('address2', async () => {
      // arrange
      setup()

      // act
      const address2 = screen.getByRole('textbox', { name: /address2/i })
      await act(async () => {
        address2.focus()
        fireEvent.blur(address2, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('cityOrTown', async () => {
      // arrange
      setup()

      // act
      const cityOrTown = screen.getByRole('textbox', { name: /city/i })
      await act(async () => {
        cityOrTown.focus()
        fireEvent.blur(cityOrTown, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('stateOrProvince', async () => {
      // arrange
      setup()

      // act
      const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
      await act(async () => {
        stateOrProvince.focus()
        fireEvent.blur(stateOrProvince, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('postalOrZipCode', async () => {
      // arrange
      setup()

      // act
      const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
      await act(async () => {
        postalOrZipCode.focus()
        fireEvent.blur(postalOrZipCode, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('phoneNumbers.home', async () => {
      // arrange
      setup()

      // act
      const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
      await act(async () => {
        phoneNumberHome.focus()
        fireEvent.blur(phoneNumberHome, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })
  })
})
