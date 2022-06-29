import { render, act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DialogRoot, ModalContextProvider, useModalContext } from './ModalContext'
import LoginDialog from '@/components/layout/Login'

const TestComponent = () => {
  const { props, showModal, closeModal } = useModalContext()

  const showYourModal = () => {
    showModal({ Component: LoginDialog, props: { isOpen: true } })
  }

  return (
    <div>
      <DialogRoot />
      <div data-testid="is-dialog-open">{props.isOpen}</div>
      <button data-testid="show-modal" onClick={showYourModal}>
        Show Modal
      </button>
      <button data-testid="close-modal" onClick={closeModal}>
        Close Modal
      </button>
    </div>
  )
}

const LoginDialogMock = () => <div data-testid="login-dialog-test" />
jest.mock('../components/layout/Login/LoginDialog/LoginDialog', () => LoginDialogMock)

describe('[context] - ModalContext', () => {
  const setup = (ui: any) => {
    return render(<ModalContextProvider>{ui}</ModalContextProvider>)
  }

  it('should show initial context values', () => {
    setup(<TestComponent />)
    const isOpen = screen.getByTestId('is-dialog-open')
    const loginModal = screen.queryByTestId('login-dialog-test')

    expect(isOpen).toHaveTextContent('')
    expect(loginModal).not.toBeInTheDocument()
  })

  describe('when using useAuthContext hook', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should show modal when click showModal', async () => {
      setup(<TestComponent />)
      const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
      await act(async () => {
        userEvent.click(showModalButton)
      })
      const loginModal = screen.queryByTestId('login-dialog-test')
      await waitFor(() => expect(loginModal).toBeInTheDocument())
    })

    it('should close modal when click closeModal', async () => {
      setup(<TestComponent />)
      const closeModalButton = screen.getByRole('button', { name: 'Close Modal' })
      await act(async () => {
        userEvent.click(closeModalButton)
      })
      const loginModal = screen.queryByTestId('login-dialog-test')
      await waitFor(() => expect(loginModal).not.toBeInTheDocument())
    })
  })
})
