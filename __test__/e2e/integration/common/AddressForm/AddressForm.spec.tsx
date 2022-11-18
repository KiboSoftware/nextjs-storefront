import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/common/AddressForm/AddressForm.stories'
import type { ContactForm } from '@/lib/types'

const { Common } = composeStories(stories)

describe('[components] - AddressForm integration', () => {
  const contact = stories.WithProps.args?.contact as ContactForm
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const firstName = screen.getByRole('textbox', { name: /first-name/i })
    const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
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
      const { user } = setup()

      // act
      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      await act(async () => {
        await user.type(firstName, contact.firstName)
      })

      // assert
      expect(firstName).toHaveValue(contact.firstName)
    })

    it('lastNameOrSurname', async () => {
      // arrange
      const { user } = setup()

      // act
      const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
      await act(async () => {
        await user.type(lastNameOrSurname, contact.lastNameOrSurname)
      })

      // assert
      expect(lastNameOrSurname).toHaveValue(contact.lastNameOrSurname)
    })

    it('address1', async () => {
      // arrange
      const { user } = setup()

      // act
      const address1 = screen.getByRole('textbox', { name: /address1/i })
      await act(async () => {
        await user.type(address1, contact.address.address1)
      })

      // assert
      expect(address1).toHaveValue(contact.address.address1)
    })

    it('address2', async () => {
      // arrange
      const { user } = setup()

      // act
      const address2 = screen.getByRole('textbox', { name: /address2/i })
      await act(async () => {
        await user.type(address2, contact.address.address2)
      })

      // assert
      expect(address2).toHaveValue(contact.address.address2)
    })

    it('cityOrTown', async () => {
      // arrange
      const { user } = setup()

      // act
      const cityOrTown = screen.getByRole('textbox', { name: /city/i })
      await act(async () => {
        await user.type(cityOrTown, contact.address.cityOrTown)
      })

      // assert
      expect(cityOrTown).toHaveValue(contact.address.cityOrTown)
    })

    it('stateOrProvince', async () => {
      // arrange
      const { user } = setup()

      // act
      const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
      await act(async () => {
        await user.type(stateOrProvince, contact.address.stateOrProvince)
      })

      // assert
      expect(stateOrProvince).toHaveValue(contact.address.stateOrProvince)
    })

    it('postalOrZipCode', async () => {
      // arrange
      const { user } = setup()

      // act
      const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
      await act(async () => {
        await user.type(postalOrZipCode, contact.address.postalOrZipCode)
      })

      // assert
      expect(postalOrZipCode).toHaveValue(contact.address.postalOrZipCode)
    })

    it('phoneNumbers.home', async () => {
      // arrange
      const { user } = setup()

      // act
      const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
      await act(async () => {
        await user.type(phoneNumberHome, contact.phoneNumbers.home)
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

    it('should only show when showDefaultPaymentMethodCheckbox = true', () => {
      // arrange
      setup({ showDefaultPaymentMethodCheckbox: true })

      // act
      const savePaymentMethod = screen.getByRole('checkbox')

      // asert
      expect(savePaymentMethod).toBeInTheDocument()
    })
  })

  describe('should display half width form fields when not in dialog for desktop', () => {
    it('should have half width form fields except Street and Apt when isAddressFormInDialog = false', () => {
      // arrange
      setup({ isAddressFormInDialog: false })

      // // act
      const classElements = document.getElementsByClassName('MuiGrid-grid-md-6')

      // asert
      expect(classElements.length).toBe(7)
    })

    it('should have full width form fields when isAddressFormInDialog = true', () => {
      // arrange
      setup({ isAddressFormInDialog: true })

      // // act
      const classElements = document.getElementsByClassName('MuiGrid-grid-md-12')

      // asert
      expect(classElements.length).toBe(5)
    })
  })

  describe('should display validation message', () => {
    const emptyInput = { target: { value: '' } }
    it('Should display required message onBlur of inputs', async () => {
      // arrange
      setup()

      const allInputs = screen.getAllByRole('textbox')
      await act(async () => {
        allInputs.forEach((input) => {
          input.focus()
          fireEvent.blur(input, emptyInput)
        })
      })
      const validationMessage = screen.getAllByText(/this field is required/i)
      expect(validationMessage).toHaveLength(7)
    })
  })
})
