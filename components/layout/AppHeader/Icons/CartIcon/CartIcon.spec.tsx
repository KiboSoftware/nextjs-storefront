/* eslint-disable @typescript-eslint/no-var-requires */
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import singletonRouter from 'next/router'

import CartIcon from './CartIcon'
import { createMockRouter, renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider, DialogRoot } from '@/context'

const setup = () => {
  const user = userEvent.setup()
  const router = createMockRouter()

  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <CartIcon size="large" />
    </ModalContextProvider>
  )
  return {
    user,
    router,
  }
}

describe('[component] CartIcon component', () => {
  it('should render the component', () => {
    setup()

    expect(screen.getByText(/cart/)).toBeVisible()
  })

  it('should change route on click of icon', async () => {
    const { user } = setup()

    await user.click(screen.getByText(/cart/))

    expect(singletonRouter).toMatchObject({
      asPath: '/cart',
      pathname: '/cart',
    })
  })
})
