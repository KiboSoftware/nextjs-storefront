import React from 'react'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, NoSsr, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CartItemActionsMobile } from '@/components/cart'
import { CustomerAccountWithRole } from '@/context'
import { useGetAccountsByUser } from '@/hooks'
import { AllAccountActions } from '@/lib/constants'
import { actions, b2bUserActions, hasAnyPermission } from '@/lib/helpers'

interface AccountHierarchyActionsProps {
  mdScreen?: boolean
  currentAccount: { id: number }
  user: CustomerAccountWithRole
  selectedAccountId?: number
  onAdd: () => void
  onAccess: () => void
  onEdit: () => void
}

const AccountHierarchyActions = (props: AccountHierarchyActionsProps) => {
  const { mdScreen, user, selectedAccountId, currentAccount, onAdd, onAccess, onEdit } = props
  const { t } = useTranslation('common')
  const { activeUsersAccount } = useGetAccountsByUser(user?.emailAddress as string)

  const sortActiveUsersAccountBySelectedId = activeUsersAccount.sort((a, b) => {
    if (a.id === selectedAccountId) return -1
    if (b.id === selectedAccountId) return 1
    return 0
  })

  const isCurrentAccountAccessible = sortActiveUsersAccountBySelectedId.some(
    (account) => account.id === currentAccount.id
  )

  const onMenuItemSelection = (option: string) => {
    const menuItemSelectionMap = {
      [AllAccountActions.ADD_ACCOUNT]: onAdd,
      [AllAccountActions.ACCESS_ACCOUNT]: onAccess,
      [AllAccountActions.EDIT_ACCOUNT]: onEdit,
    }

    const selectedAction = menuItemSelectionMap[option]
    if (selectedAction) {
      selectedAction()
    }
  }
  const actionsList = () => {
    const permissionArray = []
    if (isCurrentAccountAccessible) {
      permissionArray.push(AllAccountActions.ACCESS_ACCOUNT)
    }
    if (
      hasAnyPermission(
        actions.CREATE_ACCOUNT,
        b2bUserActions.UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES
      )
    ) {
      permissionArray.push(AllAccountActions.ADD_ACCOUNT)
    }
    if (
      hasAnyPermission(
        actions.EDIT_ACCOUNT,
        b2bUserActions.UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES
      )
    ) {
      permissionArray.push(AllAccountActions.EDIT_ACCOUNT)
    }
    return permissionArray
  }

  return mdScreen ? (
    <Box
      data-testid="account-actions"
      display={'flex'}
      gap={2}
      alignItems={'center'}
      onClick={(e) => e.stopPropagation()}
    >
      <NoSsr>
        {isCurrentAccountAccessible && (
          <Typography
            variant="caption"
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={onAccess}
          >
            {t('access-account')}
          </Typography>
        )}
      </NoSsr>
      <Box display={'flex'} gap={2}>
        <NoSsr>
          {hasAnyPermission(
            actions.CREATE_ACCOUNT,
            b2bUserActions.UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES
          ) && (
            <IconButton
              size="small"
              sx={{ p: 0.5 }}
              aria-label="item-add"
              name="item-add"
              onClick={onAdd}
            >
              <AddCircleIcon />
            </IconButton>
          )}
          {hasAnyPermission(
            actions.EDIT_ACCOUNT,
            b2bUserActions.UPDATE_ACCOUNT_INFO_HIERARCHY_AND_ATTRIBUTES
          ) && (
            <IconButton
              size="small"
              sx={{ p: 0.5 }}
              aria-label="item-edit"
              name="item-edit"
              onClick={onEdit}
            >
              <EditIcon />
            </IconButton>
          )}
        </NoSsr>
      </Box>
    </Box>
  ) : (
    <CartItemActionsMobile
      data-testid="mobile-account-actions"
      actions={actionsList()}
      width="15.5rem"
      onMenuItemSelection={onMenuItemSelection}
    />
  )
}

export default AccountHierarchyActions
