import React, { useCallback, useMemo, useReducer, useContext, createContext } from 'react'

export type State = {
  activeStep: number
  steps: string[]
  stepStatus: string
}

type CheckoutStepContextType = any

type Action = {
  type: string
  status?: string
  activeStep?: number
}

const initialState: State = {
  activeStep: 0,
  steps: [],
  stepStatus: '',
}

export const CheckoutStepContext = createContext<CheckoutStepContextType>(initialState)

CheckoutStepContext.displayName = 'CheckoutStepContext'

const checkoutStepReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STEP_STATUS':
      return {
        ...state,
        stepStatus: action.status as string,
      }
    case 'SET_ACTIVE_STEP':
      return {
        ...state,
        activeStep: action.activeStep as number,
      }
    default:
      return state
  }
}

export const STEP_STATUS = {
  SUBMIT: 'SUBMIT',
  COMPLETE: 'COMPLETE',
  INCOMPLETE: 'INCOMPLETE',
}
interface CheckoutStepProviderProps {
  steps?: string[]
  children: any
}
export const CheckoutStepProvider = (props: CheckoutStepProviderProps) => {
  const { steps: stepsProp, ...otherProps } = props
  const [state, dispatch] = useReducer(
    checkoutStepReducer,
    stepsProp ? { ...initialState, steps: stepsProp } : initialState
  )

  const activeStep = useMemo(() => state.activeStep, [state.activeStep])
  const stepStatus = useMemo(() => state.stepStatus, [state.stepStatus])
  const steps = useMemo(() => state.steps, [state.steps])

  const setStepStatusSubmit = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', status: STEP_STATUS.SUBMIT }),
    [dispatch]
  )
  const setStepStatusComplete = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', status: STEP_STATUS.COMPLETE }),
    [dispatch]
  )
  const setStepStatusIncomplete = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', status: STEP_STATUS.INCOMPLETE }),
    [dispatch]
  )
  const setStepNext = useCallback(
    () => dispatch({ type: 'SET_ACTIVE_STEP', activeStep: activeStep + 1 }),
    [dispatch]
  )
  const setStepBack = useCallback(
    () => dispatch({ type: 'SET_ACTIVE_STEP', activeStep: activeStep - 1 }),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      activeStep,
      stepStatus,
      steps,
      setStepNext,
      setStepBack,
      setStepStatusComplete,
      setStepStatusIncomplete,
      setStepStatusSubmit,
    }),
    [
      activeStep,
      stepStatus,
      steps,
      setStepBack,
      setStepNext,
      setStepStatusIncomplete,
      setStepStatusComplete,
      setStepStatusSubmit,
    ]
  )

  return <CheckoutStepContext.Provider value={value} {...otherProps} />
}

export const useCheckoutStepContext = () => {
  const context = useContext<CheckoutStepContextType>(CheckoutStepContext)
  if (context === undefined) {
    throw new Error(`useCheckoutStepContext must be used within a CheckoutStepProvider`)
  }
  return context
}
