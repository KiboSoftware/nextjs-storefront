import { useMutation, UseMutationResult } from 'react-query'

import { querykeys } from '../react-query/queryKeys'

import { OrderInput } from '@/lib/gql/types'

export interface PersonalInfo {
  orderId: string
  updateMode: string
  version: string
  orderInput: OrderInput
}

const setPersonalInfo = async (personalInfo: PersonalInfo) => {
  // call the mutation
}

export const useSetPersonalInfo = () => {
  const setPersonalInfoMutation = useMutation((personalInfo: PersonalInfo) =>
    setPersonalInfo(personalInfo)
  )
  return { setPersonalInfoMutation }
}
