import { useAuthContext } from '@/context'
import { useGetB2BUserQueries } from '@/hooks'

export const useGetB2BUsersEmailAndId = (initialB2BUsers?: any) => {
  const { user } = useAuthContext()

  const { data: b2bUserData } = useGetB2BUserQueries({
    accountId: user?.id as number,
    isB2BUser: true,
    initialB2BUsers,
  })
  const userIdToEmail: { [userId: string]: string } = {}

  b2bUserData?.items?.forEach((item) => {
    userIdToEmail[item?.userId as string] = item?.emailAddress as string
  })

  return userIdToEmail
}
