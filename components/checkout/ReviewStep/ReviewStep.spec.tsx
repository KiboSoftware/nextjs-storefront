import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import * as stories from '../ReviewStep/ReviewStep.stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { AuthContext, AuthContextType } from '@/context'
const { Common } = composeStories(stories)

const orderPriceMock = () => <div data-testid="order-price-component" />
const productItemListMock = () => <div data-testid="product-item-list-mock" />
jest.mock('@/components/common/OrderPrice/OrderPrice', () => () => orderPriceMock())
jest.mock('@/components/common/ProductItemList/ProductItemList', () => () => productItemListMock())

const setup = (isAuthenticated = false) => {
  const user = userEvent.setup()

  const mockValues = mock<AuthContextType>()
  mockValues.isAuthenticated = isAuthenticated
  render(
    <AuthContext.Provider value={mockValues}>
      <Common {...Common.args} />
    </AuthContext.Provider>,
    {
      wrapper: createQueryClientWrapper(),
    }
  )

  return {
    user,
  }
}

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      maxCookieAge: 0,
      productListing: {
        sortOptions: [
          { value: 'Best Match', id: '' },
          { value: 'Price: Low to High', id: 'price asc' },
          { value: 'Price: High to Low', id: 'price desc' },
          { value: 'Latest', id: 'createDate desc' },
          { value: 'Oldest', id: 'createDate asc' },
        ],
        pageSize: 16,
      },
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
    },
  })
})

describe('[components] ReviewStep', () => {
  describe('[StandardCheckout]', () => {
    it('should render component', () => {
      const isAuthenticated = false
      setup(isAuthenticated)
      const reviewComponent = screen.getByTestId(/review-step-component/i)
      const orderDetailsHeading = screen.getByRole('heading', {
        name: /order-details/i,
      })
      const shippingToHomeHeading = screen.getByRole('heading', {
        name: /shipping-to-home/i,
      })
      const pickupInStoreHeading = screen.getByRole('heading', {
        name: /pickup-in-store/i,
      })
      const productItemListMock = screen.getAllByTestId('product-item-list-mock')
      const iAgreeCheckbox = screen.getByRole('checkbox', { name: /termsConditions/i })
      const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
        name: /showaccountfields/i,
      })
      const confirmAndPayButton = screen.getByRole('button', {
        name: /confirm-and-pay/i,
      })
      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })
      expect(reviewComponent).toBeInTheDocument()
      expect(orderDetailsHeading).toBeVisible()
      expect(shippingToHomeHeading).toBeVisible()
      expect(pickupInStoreHeading).toBeVisible()
      expect(productItemListMock.length).toBe(2)
      expect(iAgreeCheckbox).toBeInTheDocument()
      expect(iWantToCreateAccountCheckbox).toBeInTheDocument()
      expect(confirmAndPayButton).toBeVisible()
      expect(goBackButton).toBeVisible()
    })
  })

  it('should enable "Go To Payment" button when "terms and conditions" is checked and "I want to create an account" is unchecked', async () => {
    const isAuthenticated = true
    const { user } = setup(isAuthenticated)

    const iAgreeCheckbox = screen.getByRole('checkbox', { name: /termsConditions/i })
    const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
      name: /showaccountfields/i,
    })

    user.click(iAgreeCheckbox)
    await waitFor(() => {
      expect(iAgreeCheckbox).toBeChecked()
    })

    expect(iWantToCreateAccountCheckbox).not.toBeChecked()

    const confirmAndPayButton = screen.getByRole('button', {
      name: /confirm-and-pay/i,
    })
    expect(confirmAndPayButton).toBeEnabled()
  })

  describe('If user is not authenticated', () => {
    it("should enable 'I want to create an account' checkbox when user is not loggedIn", async () => {
      const isAuthenticated = false
      setup(isAuthenticated)

      const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
        name: /showaccountfields/i,
      })

      expect(iWantToCreateAccountCheckbox).toBeEnabled()
    })

    it('should display firstName, lastName and password fields when user selects "I want to create account"', async () => {
      const isAuthenticated = false
      const { user } = setup(isAuthenticated)

      const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
      user.click(iWantToCreateAccount)

      const firstNameLabel = await screen.findByLabelText(/last-name/i)
      expect(firstNameLabel).toBeVisible()

      const lastNameLabel = screen.getByLabelText(/last-name/i)
      const passwordLabel = screen.getByLabelText(/password/i)
      const firstNameTexBox = screen.getByRole('textbox', { name: /first-name/i })
      const lastNameTexBox = screen.getByRole('textbox', { name: /last-name/i })
      const passwordTexBox = screen.getByPlaceholderText(/password/i)

      expect(lastNameLabel).toBeVisible()
      expect(passwordLabel).toBeVisible()
      expect(firstNameTexBox).toBeVisible()
      expect(lastNameTexBox).toBeVisible()
      expect(passwordTexBox).toBeVisible()
    })

    //TODO: solve act issue and some issue with test case, its not taking the user entered password
    it('should enable "Go To Payment" button only when user checks both "terms and conditions" and "I want to create an account" checkboxes and fills valid account information ', async () => {
      const isAuthenticated = false
      const { user } = setup(isAuthenticated)

      const iAgreeCheckbox = screen.getByRole('checkbox', { name: /termsConditions/i })
      const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
        name: /showAccountFields/i,
      })

      expect(iAgreeCheckbox).not.toBeChecked()
      expect(iWantToCreateAccountCheckbox).not.toBeChecked()

      await user.click(iAgreeCheckbox)

      await user.click(iWantToCreateAccountCheckbox)

      await waitFor(() => expect(iAgreeCheckbox).toBeChecked())
      await waitFor(() => expect(iWantToCreateAccountCheckbox).toBeChecked())

      const firstNameTexBox = screen.getByRole('textbox', { name: /first-name/i })
      const lastNameTexBox = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
      const passwordTexBox = screen.getByPlaceholderText(/password/i)

      await user.clear(firstNameTexBox)
      await user.clear(lastNameTexBox)
      await user.clear(passwordTexBox)

      const confirmAndPayButton = screen.getByRole('button', {
        name: /confirm-and-pay/i,
      })

      expect(confirmAndPayButton).toBeDisabled()

      await user.type(firstNameTexBox, 'first name')
      await user.type(lastNameTexBox, 'last name')
      await user.type(passwordTexBox, 'Password@1')
      await user.tab()

      // await waitFor(() => {
      expect(confirmAndPayButton).toBeEnabled()
      // })
    })

    describe('Should display validation message', () => {
      it("should display 'Required Field Message' when user tabs out 'First Name' field without entering First Name", async () => {
        const isAuthenticated = false
        const { user } = setup(isAuthenticated)

        const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
          name: /showaccountfields/i,
        })
        user.click(iWantToCreateAccountCheckbox)

        const firstNameTexBox = await screen.findByRole('textbox', { name: /first-name/i })
        user.clear(firstNameTexBox)
        user.tab()

        const requiredFieldMessage = await screen.findByText(/this-field-is-required/i)
        expect(requiredFieldMessage).toBeVisible()
      })

      it("should display 'Required Field Message' when user tabs out 'Last Name' field without entering Last Name", async () => {
        const isAuthenticated = false
        const { user } = setup(isAuthenticated)

        const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
          name: /showaccountfields/i,
        })
        user.click(iWantToCreateAccountCheckbox)

        const lastNameTexBox = await screen.findByRole('textbox', { name: /last-name/i })
        user.clear(lastNameTexBox)
        user.tab()

        const requiredFieldMessage = await screen.findByText(/this-field-is-required/i)
        expect(requiredFieldMessage).toBeVisible()
      })

      it("should display 'Required Field Message' when user tabs out 'Password' field without entering Password", async () => {
        const isAuthenticated = false
        const { user } = setup(isAuthenticated)

        const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
          name: /showaccountfields/i,
        })
        user.click(iWantToCreateAccountCheckbox)

        await waitFor(() => {
          const passwordTexBox = screen.getByLabelText(/password/i)
          user.clear(passwordTexBox)
          user.tab()

          const requiredFieldMessage = screen.getByText(/this-field-is-required/i)
          expect(requiredFieldMessage).toBeVisible()
        })
      })
    })

    describe('Should display user entered values', () => {
      it('should display user entered value when user enters First Name', async () => {
        const isAuthenticated = false
        const { user } = setup(isAuthenticated)

        const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
          name: /showaccountfields/i,
        })
        user.click(iWantToCreateAccountCheckbox)
        const firstNameTexBox = await screen.findByRole('textbox', { name: /first-name/i })
        await waitFor(() => {
          user.clear(firstNameTexBox)
          user.type(firstNameTexBox, 'First Name')
        })
        await waitFor(() => {
          expect(firstNameTexBox).toHaveValue('First Name')
        })
      })

      it('should display user entered value when user enters Last Name', async () => {
        const isAuthenticated = false
        const { user } = setup(isAuthenticated)

        const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
          name: /showaccountfields/i,
        })
        user.click(iWantToCreateAccountCheckbox)

        const lastNameTexBox = await screen.findByRole('textbox', { name: /last-name/i })
        await waitFor(() => {
          user.clear(lastNameTexBox)
          user.type(lastNameTexBox, 'Last Name')
        })
        await waitFor(() => {
          expect(lastNameTexBox).toHaveValue('Last Name')
        })
      })

      it('should display user entered value when user enters Password', async () => {
        const isAuthenticated = false
        const { user } = setup(isAuthenticated)

        const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
          name: /showaccountfields/i,
        })
        user.click(iWantToCreateAccountCheckbox)

        const passwordTexBox = await screen.findByPlaceholderText(/password/i)
        await waitFor(() => {
          user.type(passwordTexBox, 'Password@1')
        })
        await waitFor(() => {
          expect(passwordTexBox).toHaveValue('Password@1')
        })
      })
    })
  })

  describe('If user is authenticated ', () => {
    it("should disable 'I want to create an account' checkbox when user is loggedIn", async () => {
      const isAuthenticated = true
      await act(async () => {
        setup(isAuthenticated)
      })

      const iWantToCreateAccountCheckbox = screen.getByRole('checkbox', {
        name: /showaccountfields/i,
      })

      expect(iWantToCreateAccountCheckbox).toBeDisabled()
    })
  })
})
