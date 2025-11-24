import { getCookie } from 'cookies-next'

import { mappings } from './permissions'

function getUserBehaviors() {
  const behaviorsFromCookie = getCookie('behaviors') as string
  if (!behaviorsFromCookie) return [0]
  const behaviorsFromCookieArray = behaviorsFromCookie?.split(',')
  const behaviors = behaviorsFromCookieArray.map((value) => parseInt(value, 10))
  return [...behaviors, 0] // giving default permission
}

export const hasPermission = (action: any) => {
  const userBehaviors = getUserBehaviors()
  let canAccess = false

  // For users having behaviors
  userBehaviors.forEach((behavior) => {
    if (mappings.has(behavior)) {
      const permissions = mappings.get(behavior)?.includes(action)
      if (permissions) canAccess = true
    }
  })

  return canAccess
}


export const hasB2BPermissions = (action: number, accountUserBehaviors?: Record<number, number[]>, userId?: number) => {
  let canAccess = false

  if (!accountUserBehaviors || !userId) return false
  
  const behaviors = accountUserBehaviors[userId]
  canAccess = behaviors ? behaviors.includes(action) : false

  return canAccess
}