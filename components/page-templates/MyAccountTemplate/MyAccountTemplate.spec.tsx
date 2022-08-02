/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './MyAccountTemplate.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => jest.fn(),
  removeListener: () => jest.fn(),
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

const FullWidthDividerMock = () => <div data-testid="full-width-divider-component" />
jest.mock('../../common/FullWidthDivider/FullWidthDivider', () => FullWidthDividerMock)
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({
  push,
}))

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

    const myAccount = screen.getByText(/common:my-account/i)
    const myProfile = screen.getByText(/common:my-profile/i)
    const addressBook = screen.getByText(/address-book/i)
    const paymentMethod = screen.getByText(/payment-method/i)
    const orderDetails = screen.getByText(/order-details/i)
    const orderHistory = screen.getByText(/common:order-history/i)
    const logout = screen.getByText(/common:logout/i)

    expect(myAccount).toBeInTheDocument()
    expect(myProfile).toBeInTheDocument()
    expect(addressBook).toBeInTheDocument()
    expect(paymentMethod).toBeInTheDocument()
    expect(orderDetails).toBeInTheDocument()
    expect(orderHistory).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
  })

  it('should redirect to order-history page when users click on Order History link', async () => {
    const { user } = setup()

    const orderHistory = screen.getByText(/common:order-history/i)

    await user.click(orderHistory)

    expect(push).toHaveBeenCalledWith('/my-account/order-history')
  })

  it('should render desktop view elements', async () => {
    window.matchMedia = createMatchMedia(1000)

    setup()
    const fullWidthDividerComponent = screen.queryByTestId('full-width-divider-component')
    const headingArray = screen.getAllByRole('heading', { level: 1 })
    expect(fullWidthDividerComponent).not.toBeInTheDocument()
    expect(headingArray[0]).toHaveTextContent('common:my-account')
    expect(headingArray[1]).toHaveTextContent('order-details')
  })

  it('should render mobile view elements', async () => {
    window.matchMedia = createMatchMedia(200)

    setup()
    const fullWidthDividerComponent = screen.queryAllByTestId('full-width-divider-component')
    const headingArray = screen.getAllByRole('heading', { level: 2 })
    expect(fullWidthDividerComponent.length).toEqual(7)
    expect(headingArray[0]).toHaveTextContent('common:my-account')
    expect(headingArray[1]).toHaveTextContent('order-details')
  })
})
