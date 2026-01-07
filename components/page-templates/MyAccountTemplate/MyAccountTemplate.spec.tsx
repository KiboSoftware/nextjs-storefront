/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from './MyAccountTemplate.stories' // import all stories from the stories file
import {
  AddressBookMock,
  FullWidthDividerMock,
  MyProfileMock,
  PaymentMethodMock,
} from '@/__test__/utils/componentMocks'
const { Common } = composeStories(stories)

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasAnyPermission: jest.fn(() => true),
}))

jest.mock('../../common/FullWidthDivider/FullWidthDivider', () => () => FullWidthDividerMock())
jest.mock('../../my-account/MyProfile/MyProfile', () => () => MyProfileMock())
jest.mock('../../my-account/PaymentMethod/PaymentMethod', () => () => PaymentMethodMock())
jest.mock('../../my-account/AddressBook/AddressBook', () => () => AddressBookMock())

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

    const myAccount = screen.getByText(/my-account/i)
    const myProfile = screen.getByText(/my-profile/i)
    const addressBook = screen.getByText(/address-book/i)
    const paymentMethod = screen.getAllByText(/payment-method/)[0]
    const orderDetails = screen.getByText(/order-details/i)
    const orderHistory = screen.getByText(/order-history/i)
    const logout = screen.getByText(/logout/i)
    const mySubscription = screen.getByText(/my-subscription/i)

    expect(myAccount).toBeInTheDocument()
    expect(myProfile).toBeInTheDocument()
    expect(addressBook).toBeInTheDocument()
    expect(paymentMethod).toBeInTheDocument()
    expect(orderDetails).toBeInTheDocument()
    expect(orderHistory).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
    expect(mySubscription).toBeInTheDocument()
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

  it('should redirect to my-subscription page when users click on My Subscription link', async () => {
    const { user } = setup()

    const mySubscription = screen.getByText(/my-subscription/i)

    user.click(mySubscription)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account/subscription',
        pathname: '/my-account/subscription',
        query: {},
      })
    })
  })
})
