import React, { useMemo, useReducer, useContext, createContext, useEffect, useRef } from 'react'

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

export const STEP_STATUS = {
  SUBMIT: 'SUBMIT',
  COMPLETE: 'COMPLETE',
  INCOMPLETE: 'INCOMPLETE',
}

const initialState: State = {
  activeStep: 0,
  steps: [],
  stepStatus: STEP_STATUS.INCOMPLETE,
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
        stepStatus: STEP_STATUS.INCOMPLETE,
      }
    default:
      return state
  }
}

interface CheckoutStepProviderProps {
  initialActiveStep?: number
  steps?: string[]
  children: any
}
export const CheckoutStepProvider = (props: CheckoutStepProviderProps) => {
  const { initialActiveStep = 0, steps: stepsProp, ...otherProps } = props
  const [state, dispatch] = useReducer(
    checkoutStepReducer,
    stepsProp ? { ...initialState, steps: stepsProp, activeStep: initialActiveStep } : initialState
  )

  const activeStep = useMemo(() => state.activeStep, [state.activeStep])
  const stepStatus = useMemo(() => state.stepStatus, [state.stepStatus])
  const steps = useMemo(() => state.steps, [state.steps])

  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])

  const setStepStatusSubmit = () =>
    dispatch({ type: 'SET_STEP_STATUS', status: STEP_STATUS.SUBMIT })

  const setStepStatusComplete = () =>
    dispatch({ type: 'SET_STEP_STATUS', status: STEP_STATUS.COMPLETE })

  const setStepStatusIncomplete = () =>
    dispatch({ type: 'SET_STEP_STATUS', status: STEP_STATUS.INCOMPLETE })

  const setStepNext = () => dispatch({ type: 'SET_ACTIVE_STEP', activeStep: activeStep + 1 })

  const setStepBack = () => dispatch({ type: 'SET_ACTIVE_STEP', activeStep: activeStep - 1 })

  const setActiveStep = (stepIndex: number) =>
    dispatch({ type: 'SET_ACTIVE_STEP', activeStep: stepIndex })

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
      setActiveStep,
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
      setActiveStep,
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
