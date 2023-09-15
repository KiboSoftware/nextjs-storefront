/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import AccountRequestIcon from './AccountRequestIcon'
import { renderWithQueryClient } from '@/__test__/utils'

const setup = () => {
  const user = userEvent.setup()

  const handleAccountRequestIconClickMock = jest.fn()
  renderWithQueryClient(
    <AccountRequestIcon
      iconProps={{ fontSize: 'large' }}
      buttonText="B2B Account Request"
      isElementVisible={true}
      onClick={handleAccountRequestIconClickMock}
    />
  )
  return {
    user,
    handleAccountRequestIconClickMock,
  }
}

describe('[component] AccountRequestIcon component', () => {
  it('should render the component for unauthenticated user', () => {
    setup()

    const buttonText = screen.getByText('B2B Account Request')
    expect(buttonText).toBeVisible()
  })

  it('should call handleAccountRequestIconClick function', async () => {
    const { user, handleAccountRequestIconClickMock } = setup()

    const accountRequestIcon = screen.getByTestId('PersonAddIcon')
    user.click(accountRequestIcon)

    await waitFor(() => {
      expect(handleAccountRequestIconClickMock).toBeCalled()
    })
  })
})
