import { getCookie } from 'cookies-next'

import { mappings } from './permissions'

function getUserBehaviors() {
  const behaviorsFromCookie = getCookie('behaviors') as string
  if (!behaviorsFromCookie) return [0]
  const behaviorsFromCookieArray = behaviorsFromCookie?.split(',')
  const behaviors = behaviorsFromCookieArray.map((value) => parseInt(value, 10))
  return [...behaviors] // giving default permission
}

export const hasAnyPermission = (...actionsToCheck: any[]) => {
  const userBehaviors = getUserBehaviors()
  let canAccess = false

  // For users having behaviors
  userBehaviors.forEach((behavior) => {
    if (mappings.has(behavior)) {
      const permissions = mappings.get(behavior) || []
      // Check if any of the provided actions are included in the permissions
      const hasMatch = actionsToCheck.some((action) => permissions.includes(action))
      if (hasMatch) canAccess = true
    }
  })

  return canAccess
}

export const hasAnyPermissionForAccountBehaviors = (behaviors: number[], ...actionsToCheck: string[]) => {
  let canAccess = false

  behaviors.forEach((behavior) => {
    if (mappings.has(behavior)) {
      const permissions = mappings.get(behavior) || []
      // Check if any of the provided actions are included in the permissions
      const hasMatch = actionsToCheck.some((action) => permissions.includes(action))
      if (hasMatch) canAccess = true
    }
  })

  return canAccess
}

export const hasPermissionInAllAccounts = (
  behaviorId: number,
  accountUserBehaviorsForAllAccounts?: Record<number, number[]>
): boolean => {
  if (!accountUserBehaviorsForAllAccounts || Object.keys(accountUserBehaviorsForAllAccounts).length === 0) {
    return false
  }
  // Check if the behavior exists in ALL accounts
  return Object.values(accountUserBehaviorsForAllAccounts).every(
    (behaviors) => behaviors.includes(behaviorId)
  )
}
