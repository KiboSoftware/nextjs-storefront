import { useMutation } from 'react-query'

import { OrderInput } from '@/lib/gql/types'

export interface PersonalInfo {
  orderId: string
  updateMode: string
  version: string
  orderInput: OrderInput
}

const setPersonalInfo = async (_personalInfo: PersonalInfo) => {
  // call the mutation
}

export const useSetPersonalInfo = () => {
  const setPersonalInfoMutation = useMutation((personalInfo: PersonalInfo) =>
    setPersonalInfo(personalInfo)
  )
  return { setPersonalInfoMutation }
}
