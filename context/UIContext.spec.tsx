import { render, act, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { UIStateContext, UIContextProvider, useUIContext } from './UIContext'

describe('[context] - UIContext', () => {
  const setup = (ui: any, { providerProps, ...renderOptions }: any) => {
    return render(<UIContextProvider {...providerProps}>{ui}</UIContextProvider>, renderOptions)
  }
  const wrapper = (props: any) => <UIContextProvider {...props} />

  it('should not render Is dialog open initially', () => {
    setup(
      <UIStateContext.Consumer>
        {(value) => (
          <div>
            {value.isLoginDialogOpen && <div data-testid="is-dialog-open">Is dialog open</div>}
          </div>
        )}
      </UIStateContext.Consumer>,
      {}
    )
    const dialog = screen.queryByTestId('is-dialog-open')
    expect(dialog).not.toBeInTheDocument()
  })

  describe('when using useUIContext hook', () => {
    it('should set isLoadingDialogOpen to true', async () => {
      const { result } = renderHook(() => useUIContext(), { wrapper })
      act(() => {
        result.current.toggleLoginDialog()
      })
      expect(result.current.isLoginDialogOpen).toBeTruthy()
    })
  })
})
