/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import CartIcon from './CartIcon'
import { createMockRouter, renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider, DialogRoot } from '@/context'

const setup = () => {
  const user = userEvent.setup()
  const router = createMockRouter()

  renderWithQueryClient(
    <RouterContext.Provider value={router}>
      <ModalContextProvider>
        <DialogRoot />
        <CartIcon size="large" />
      </ModalContextProvider>
    </RouterContext.Provider>
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
    const { user, router } = setup()

    await user.click(screen.getByText(/cart/))

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/cart')
    })
  })
})
