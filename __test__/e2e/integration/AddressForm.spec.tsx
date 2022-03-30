import userEvent from '@testing-library/user-event'
import { render, screen, act } from '@testing-library/react'
import * as stories from '@/components/common/AddressForm/AddressForm.stories'
import { composeStories } from '@storybook/testing-react'
import type { Contact } from '@/components/common/AddressForm//AddressForm'

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

    // assert
    expect(firstName).toBeVisible()
    expect(lastNameOrSurname).toBeVisible()
    expect(address1).toBeVisible()
    expect(address2).toBeVisible()
    expect(cityOrTown).toBeVisible()
    expect(stateOrProvince).toBeVisible()
    expect(postalOrZipCode).toBeVisible()
    expect(phoneNumberHome).toBeVisible()
    //TODO: Test countryCode
  })

  describe('should show user entered values', () => {
    it('firstName', async () => {
      // arrange
      setup()

      // act
      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      await act(async () => {
        userEvent.type(firstName, contact.firstName)
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
        userEvent.type(lastNameOrSurname, contact.lastNameOrSurname)
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
        userEvent.type(address1, contact.address.address1)
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
        userEvent.type(address2, contact.address.address2)
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
        userEvent.type(cityOrTown, contact.address.cityOrTown)
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
        userEvent.type(stateOrProvince, contact.address.stateOrProvince)
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
        userEvent.type(postalOrZipCode, contact.address.postalOrZipCode)
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

    it('countryCode', async () => {
      // TODO:
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
        userEvent.type(firstName, contact.firstName)
        userEvent.clear(firstName)
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
        userEvent.type(lastNameOrSurname, contact.lastNameOrSurname)
        userEvent.clear(lastNameOrSurname)
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
        userEvent.type(address1, contact.address.address1)
        userEvent.clear(address1)
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
        userEvent.type(address2, contact.address.address2)
        userEvent.clear(address2)
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
        userEvent.type(cityOrTown, contact.address.cityOrTown)
        userEvent.clear(cityOrTown)
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
        userEvent.type(stateOrProvince, contact.address.stateOrProvince)
        userEvent.clear(stateOrProvince)
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
        userEvent.type(postalOrZipCode, contact.address.postalOrZipCode)
        userEvent.clear(postalOrZipCode)
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
        userEvent.type(phoneNumberHome, contact.phoneNumbers.home)
        userEvent.clear(phoneNumberHome)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('countryCode', async () => {
      // TODO:
    })
  })
})
