import { getCookie } from 'cookies-next'

import { guestUserPermissions, mappings } from './permissions'

function getUserBehaviors() {
  const behaviorsFromCookie = getCookie('behaviors') as string
  if (!behaviorsFromCookie) return [0]
  const behaviorsFromCookieArray = behaviorsFromCookie?.split(',')
  const behaviors = behaviorsFromCookieArray.map((value) => parseInt(value, 10))
  return [...behaviors] // giving default permission
}

export const hasAnyPermission = (...actionsToCheck: any[]) => {
  const behaviorsFromCookie = getCookie('behaviors') as string
  // If user is not logged in (no behaviors cookie), check if action is guest-allowed
  if (!behaviorsFromCookie) {
    return actionsToCheck.some((action) => guestUserPermissions.includes(action))
  }

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

export const hasAnyPermissionForAccountBehaviors = (
  behaviors: number[],
  ...actionsToCheck: string[]
) => {
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
  if (
    !accountUserBehaviorsForAllAccounts ||
    Object.keys(accountUserBehaviorsForAllAccounts).length === 0
  ) {
    return false
  }
  // Check if the behavior exists in ALL accounts
  return Object.values(accountUserBehaviorsForAllAccounts).every((behaviors) =>
    behaviors.includes(behaviorId)
  )
}

/**
 * Check if user has complex permission requirements
 * Example: Must have VIEW_ROLE AND (UPDATE_BUYER OR EDIT_USERS)
 * @param behaviors - Array of behavior IDs
 * @param requiredActions - Array of actions that ALL must be present
 * @param optionalActions - Array of actions where AT LEAST ONE must be present (if provided)
 * @returns true if user has all required actions AND (at least one optional action OR no optional actions specified)
 */
export const hasComplexPermissionForAccountBehaviors = (
  behaviors: number[],
  requiredActions: string[],
  optionalActions: string[] = []
) => {
  const userPermissions = new Set<string>()

  behaviors.forEach((behavior) => {
    if (mappings.has(behavior)) {
      const permissions = mappings.get(behavior) || []
      permissions.forEach((permission: string) => userPermissions.add(permission))
    }
  })

  // Check if all required actions are present
  const hasAllRequired = requiredActions.every((action) => userPermissions.has(action))

  // If no optional actions specified, return hasAllRequired
  if (optionalActions.length === 0) {
    return hasAllRequired
  }

  // Check if at least one optional action is present
  const hasAnyOptional = optionalActions.some((action) => userPermissions.has(action))

  return hasAllRequired && hasAnyOptional
}
