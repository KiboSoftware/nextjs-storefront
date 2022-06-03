import {
  CheckoutStepContext,
  CheckoutStepProvider,
  useCheckoutStepContext,
  STEP_STATUS,
} from './CheckoutStepContext'
import { render, act, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

describe('[context] - CheckoutStepContext', () => {
  const setup = (ui: any, { providerProps, ...renderOptions }: any) => {
    return render(
      <CheckoutStepProvider {...providerProps}>{ui}</CheckoutStepProvider>,
      renderOptions
    )
  }
  const wrapper = (props: any) => <CheckoutStepProvider {...props} />

  it('should render list of steps from provider props', async () => {
    setup(
      <CheckoutStepContext.Consumer>
        {(value) => (
          <ul>
            {value.steps.map((step: string) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        )}
      </CheckoutStepContext.Consumer>,
      {
        providerProps: {
          steps: ['shipping', 'billing'],
        },
      }
    )
    const step1 = screen.getByText('shipping')
    const step2 = screen.getByText('billing')
    expect(step1).toBeVisible()
    expect(step2).toBeVisible()
  })
  describe('when using useCheckoutStepContext hook', () => {
    it('should set step status to complete', async () => {
      const { result } = renderHook(() => useCheckoutStepContext(), { wrapper })
      act(() => {
        result.current.setStepStatusComplete()
      })
      expect(result.current.stepStatus).toEqual(STEP_STATUS.COMPLETE)
    })

    it('should set step status to submit', async () => {
      const { result } = renderHook(() => useCheckoutStepContext(), { wrapper })
      act(() => {
        result.current.setStepStatusSubmit()
      })
      expect(result.current.stepStatus).toEqual(STEP_STATUS.SUBMIT)
    })

    it('should set step status to incomplete', async () => {
      const { result } = renderHook(() => useCheckoutStepContext(), { wrapper })
      act(() => {
        result.current.setStepStatusIncomplete()
      })
      expect(result.current.stepStatus).toEqual(STEP_STATUS.INCOMPLETE)
    })
    it('should set increase active step by one', async () => {
      const { result } = renderHook(() => useCheckoutStepContext(), { wrapper })
      act(() => {
        result.current.setStepNext()
      })
      expect(result.current.activeStep).toEqual(result.all[0].activeStep + 1)
    })
    it('should set step status to incomplete', async () => {
      const { result } = renderHook(() => useCheckoutStepContext(), { wrapper })
      act(() => {
        result.current.setStepBack()
      })
      expect(result.current.activeStep).toEqual(result.all[0].activeStep - 1)
    })
  })
})
