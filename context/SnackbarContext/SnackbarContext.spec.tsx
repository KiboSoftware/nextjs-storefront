import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SnackbarRoot, SnackbarContextProvider, useSnackbarContext } from './SnackbarContext'

const TestComponent = () => {
  const { snackbarInfo, showSnackbar, hideSnackbar } = useSnackbarContext()

  const showYourModal = () => {
    showSnackbar('Test Message', 'success')
  }

  return (
    <div>
      <SnackbarRoot />
      <div data-testid="is-snackbar-open">{String(snackbarInfo.visible)}</div>
      <div data-testid="snackbar-message">{String(snackbarInfo.message)}</div>
      <div data-testid="snackbar-message-type">{String(snackbarInfo.type)}</div>

      <button data-testid="show-snackbar" onClick={showYourModal}>
        Show Snackbar
      </button>
      <button data-testid="close-snackbar" onClick={hideSnackbar}>
        Hide Snackbar
      </button>
    </div>
  )
}

describe('[context] - SnackbarContext', () => {
  const setup = (ui: any) => {
    const user = userEvent.setup()
    render(<SnackbarContextProvider>{ui}</SnackbarContextProvider>)
    return {
      user,
    }
  }

  it('should show initial context values', () => {
    setup(<TestComponent />)
    const isVisible = screen.getByTestId('is-snackbar-open')

    expect(isVisible).toHaveTextContent('false')
  })

  it('should show snackbar message when clicked on show-snackbar button', async () => {
    const { user } = setup(<TestComponent />)
    const showSnackbarButton = screen.getByRole('button', { name: 'Show Snackbar' })

    await user.click(showSnackbarButton)

    const isVisible = screen.getByTestId('is-snackbar-open')
    expect(isVisible).toHaveTextContent('true')

    const message = screen.getByTestId('snackbar-message')
    expect(message).toHaveTextContent('Test Message')

    const messageType = screen.getByTestId('snackbar-message-type')
    expect(messageType).toHaveTextContent('success')
  })

  it('should hide snackbar when clicked on hide-snackbar button', async () => {
    const { user } = setup(<TestComponent />)
    const hideSnackbarButton = screen.getByRole('button', { name: 'Hide Snackbar' })

    await user.click(hideSnackbarButton)

    const isVisible = screen.getByTestId('is-snackbar-open')
    expect(isVisible).toHaveTextContent('false')
  })
})
