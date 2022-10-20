/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import StoreFinderIcon from './StoreFinderIcon'
import { createMockRouter, createQueryClientWrapper, renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider, DialogRoot } from '@/context'

const setup = () => {
  const user = userEvent.setup()
  const router = createMockRouter()

  renderWithQueryClient(
    <RouterContext.Provider value={router}>
      <ModalContextProvider>
        <DialogRoot />
        <StoreFinderIcon size="large" />
      </ModalContextProvider>
    </RouterContext.Provider>
  )
  return {
    user,
    router,
  }
}

describe('[component] StoreFinderIcon component', () => {
  it('should render the component', () => {
    setup()

    expect(screen.getByText(/find-a-store/)).toBeVisible()
  })
})
