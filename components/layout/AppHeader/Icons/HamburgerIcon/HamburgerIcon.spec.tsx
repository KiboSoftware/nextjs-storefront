/* eslint-disable @typescript-eslint/no-var-requires */
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { mock } from 'jest-mock-extended'

import HamburgerIcon from './HamburgerIcon'
import { renderWithQueryClient } from '@/__test__/utils'
import { HeaderContext, HeaderContextType } from '@/context'

const setup = () => {
  const user = userEvent.setup()

  const mockValues = mock<HeaderContextType>()

  renderWithQueryClient(
    <HeaderContext.Provider value={mockValues}>
      <HamburgerIcon />
    </HeaderContext.Provider>
  )
  return {
    user,
    mockValues,
  }
}

describe('[component] AccountIcon component', () => {
  it('should render the component for unauthenticated user', () => {
    setup()

    expect(screen.getByTestId('MenuIcon')).toBeVisible()
  })

  it('should call toggleHamburgerMenu function', async () => {
    const { user, mockValues } = setup()

    await user.click(screen.getByTestId('MenuIcon'))

    expect(mockValues.toggleHamburgerMenu).toBeCalled()
  })
})
