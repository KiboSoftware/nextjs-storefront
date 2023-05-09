import { ReactNode, createContext, Dispatch, SetStateAction, useState, useContext } from 'react'

import {
  useAddCustomerB2bUserMutations,
  useUpdateCustomerB2bUserMutations,
  useRemoveCustomerB2bUserMutations,
} from '@/hooks/mutations/useB2bUserMutations/useB2bUserMutations'
import { useQueryClient } from 'react-query'

export interface CustomerB2bUserContextType {
  b2bUser?: any
  error: string
  isLoading: boolean
  setError: Dispatch<SetStateAction<string>>
  createCustomerB2bUser: (params: any, onSuccessCallBack?: () => void) => any
  updateCustomerB2bUser: (params: any, onSuccessCallBack?: () => void) => any
  deleteCustomerB2bUser: (params: any, onSuccessCallBack?: () => void) => any
}

interface CustomerB2bUserContextProviderProps {
  children: ReactNode
}

const initialState = {
  b2bUser: undefined,
  error: '',
  isLoading: false,
  setError: () => '',
  createCustomerB2bUser: () => null,
  updateCustomerB2bUser: () => null,
  deleteCustomerB2bUser: () => null,
}

export const CustomerB2bUserContext = createContext(initialState as CustomerB2bUserContextType)
CustomerB2bUserContext.displayName = 'CustomerB2bUserContext'

export const CustomerB2bUserContextProvider = ({
  children,
}: CustomerB2bUserContextProviderProps) => {
  const [b2bUser, setB2bUser] = useState<any>(undefined)
  const [error, setError] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const { mutate: createB2bUser } = useAddCustomerB2bUserMutations()
  const { mutate: updateB2bUser } = useUpdateCustomerB2bUserMutations()
  const { mutate: deleteB2bUser } = useRemoveCustomerB2bUserMutations()

  const queryClient = useQueryClient()

  // Create B2B User
  const createCustomerB2bUser = (params: any, onSuccessCallBack?: () => void) => {
    console.log(params)
    try {
      setLoading(true)
      createB2bUser(params, {
        onError: (error: any) => {
          setLoading(false)
          //@TO BE DONE GLOBALLY
          // const errorMessage = error?.response?.errors
          //   ? error?.response?.errors[0]?.message
          //   : 'Something Wrong !'
          // setAuthError(errorMessage)
        },
        onSuccess: (user: any) => {
          setLoading(false)
          if (onSuccessCallBack) onSuccessCallBack()
        },
      })
    } catch (err: any) {
      setLoading(false)
      throw new Error(err)
    }
  }

  // Update B2B User
  const updateCustomerB2bUser = (params: any, onSuccessCallBack?: () => void) => {
    try {
      setLoading(true)
      updateB2bUser(params, {
        onError: (error: any) => {
          setLoading(false)
          //@TO BE DONE GLOBALLY
          // const errorMessage = error?.response?.errors
          //   ? error?.response?.errors[0]?.message
          //   : 'Something Wrong !'
          // setAuthError(errorMessage)
        },
        onSuccess: (user: any) => {
          setLoading(false)
        },
      })
    } catch (err: any) {
      setLoading(false)
      throw new Error(err)
    }
  }

  // Delete B2B User
  const deleteCustomerB2bUser = (params: any, onSuccessCallBack?: () => void) => {
    try {
      setLoading(true)
      deleteB2bUser(params, {
        onError: (error: any) => {
          setLoading(false)
          //@TO BE DONE GLOBALLY
          // const errorMessage = error?.response?.errors
          //   ? error?.response?.errors[0]?.message
          //   : 'Something Wrong !'
          // setAuthError(errorMessage)
        },
        onSuccess: (data: any) => {
          setLoading(false)
        },
      })
    } catch (err: any) {
      setLoading(false)
      throw new Error(err)
    }
  }

  const values = {
    b2bUser,
    error,
    isLoading,
    setError,
    createCustomerB2bUser,
    updateCustomerB2bUser,
    deleteCustomerB2bUser,
  }

  return (
    <CustomerB2bUserContext.Provider value={values}>{children}</CustomerB2bUserContext.Provider>
  )
}

export const useCustomerB2bUserContext = () => {
  const context = useContext(CustomerB2bUserContext)

  if (context === undefined) throw new Error('useContext must be inside a Provider with a value')
  return context
}
