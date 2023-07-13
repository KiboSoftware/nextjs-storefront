/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from './B2BTemplate.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const FullWidthDividerMock = () => <div data-testid="full-width-divider-component" />
jest.mock('../../../common/FullWidthDivider/FullWidthDivider', () => () => FullWidthDividerMock())

const MyProfileMock = () => <div data-testid="my-profile-component" />
jest.mock('../../../my-account/MyProfile/MyProfile', () => () => MyProfileMock())

const PaymentMethodMock = () => <div data-testid="payment-method-component" />
jest.mock('../../../my-account/PaymentMethod/PaymentMethod', () => () => PaymentMethodMock())

const AddressBookMock = () => <div data-testid="address-book-component" />
jest.mock('../../../my-account/AddressBook/AddressBook', () => () => AddressBookMock())

describe('[component] - MyAccountTemplate', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common />)
    return {
      user,
    }
  }

  it('should render component', async () => {
    setup()

    const myAccount = screen.getAllByText(/account/i)[0]
    const accountInformation = screen.getByText(/account-information/i)
    const accountHierarchy = screen.getByText(/account-hierarchy/i)
    const users = screen.getByText(/users/i)
    const shippingInformation = screen.getByText(/shipping-information/i)
    const paymentInformation = screen.getAllByText(/payment-information/)[0]
    const customAttributes = screen.getAllByText(/custom-attributes/i)[0]
    const quickOrder = screen.getByText(/quick-order/i)
    const orderHistory = screen.getByText(/order-history/i)
    const returns = screen.getByText(/returns/i)
    const quotes = screen.getByText(/quotes/i)
    const lists = screen.getByText(/lists/i)
    const logout = screen.getByText(/logout/i)

    expect(myAccount).toBeInTheDocument()
    expect(accountInformation).toBeInTheDocument()
    expect(accountHierarchy).toBeInTheDocument()
    expect(users).toBeInTheDocument()
    expect(shippingInformation).toBeInTheDocument()
    expect(paymentInformation).toBeInTheDocument()
    expect(customAttributes).toBeInTheDocument()
    expect(quickOrder).toBeInTheDocument()
    expect(orderHistory).toBeInTheDocument()
    expect(returns).toBeInTheDocument()
    expect(quotes).toBeInTheDocument()
    expect(lists).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
  })

  it('should redirect to order-history page when users click on Order History link', async () => {
    const { user } = setup()

    const orderHistory = screen.getByText(/order-history/i)

    user.click(orderHistory)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account/order-history?filters=M-6',
        pathname: '/my-account/order-history',
        query: { filters: 'M-6' },
      })
    })
  })

  it('should redirect to users page when users click on Users link', async () => {
    const { user } = setup()

    const users = screen.getByText(/users/i)

    user.click(users)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account/b2b/users',
        pathname: '/my-account/b2b/users',
        query: {},
      })
    })
  })
})
