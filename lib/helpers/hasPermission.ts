import { getCookie } from 'cookies-next'

import { mappings } from './permissions'

function getUserBehaviors() {
  const behaviorsFromCookie = getCookie('behaviors') as string
  if (!behaviorsFromCookie) return [0]
  const behaviorsFromCookieArray = behaviorsFromCookie?.split(',')
  const behaviors = behaviorsFromCookieArray.map((value) => parseInt(value, 10))
  return [...behaviors, 0] // giving default permission
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

export const hasB2BPermissions = (
  action: number,
  accountUserBehaviors?: Record<number, number[]>,
  userId?: number
) => {
  let canAccess = false

  if (!accountUserBehaviors || !userId) return false

  const behaviors = accountUserBehaviors[userId]
  canAccess = behaviors ? behaviors.includes(action) : false

  return canAccess
}
