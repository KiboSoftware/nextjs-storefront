import React, { FC, useCallback, useMemo, useReducer, useContext, createContext } from 'react'

export type State = any

type CheckoutContextType = State

type Action = any

const initialState: State = {
  checkout: null,
  activeStep: 0,
  steps: [],
  stepStatus: '',
}

export const CheckoutContext = createContext<State | any>(initialState)

CheckoutContext.displayName = 'CheckoutContext'

const checkoutReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STEP_STATUS':
      return {
        ...state,
        stepStatus: action.status,
      }
    case 'SET_ACTIVE_STEP':
      return {
        ...state,
        activeStep: action.activeStep,
      }
    default:
      return state
  }
}

export const CheckoutProvider: FC = (props) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  const activeStep = useMemo(() => state.activeStep, [state.activeStep])
  const stepStatus = useMemo(() => state.stepStatus, [state.stepStatus])
  const setStepStatusSubmit = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', status: 'SUBMIT' }),
    [dispatch]
  )

  const setStepStatusComplete = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', status: 'COMPLETE' }),
    [dispatch]
  )

  const setStepStatusIncomplete = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', status: 'INCOMPLETE' }),
    [dispatch]
  )
  const setStepNext = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', activeStep: activeStep + 1 }),
    [dispatch]
  )
  const setStepBack = useCallback(
    () => dispatch({ type: 'SET_STEP_STATUS', activeStep: activeStep - 1 }),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      activeStep,
      stepStatus,
      setStepNext,
      setStepBack,
      setStepStatusComplete,
      setStepStatusIncomplete,
      setStepStatusSubmit,
    }),
    [
      activeStep,
      stepStatus,
      setStepBack,
      setStepNext,
      setStepStatusIncomplete,
      setStepStatusComplete,
      setStepStatusSubmit,
    ]
  )

  return <CheckoutContext.Provider value={value} {...props} />
}

export const useCheckoutContext = () => {
  const context = useContext<CheckoutContextType>(CheckoutContext)
  if (context === undefined) {
    throw new Error(`useCheckoutContext must be used within a CheckoutProvider`)
  }
  return context
}
