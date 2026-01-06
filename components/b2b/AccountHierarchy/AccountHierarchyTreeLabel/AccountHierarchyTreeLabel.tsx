import React from 'react'

import { ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AccountHierarchyActions } from '@/components/b2b'
import { ConfirmationDialog } from '@/components/dialogs'
import { CustomerAccountWithRole, useAuthContext, useModalContext } from '@/context'
import { AddChildAccountProps } from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTreeLabelProps {
  disableSorting?: boolean
  currentAccount: B2BAccount
  customerAccount: CustomerAccount | undefined
  mdScreen?: boolean
  handleViewAccount: (item: B2BAccount) => void
  handleAddAccount: ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => void
  handleEditAccount: (b2BAccount: B2BAccount) => void
  handleChangeParent: (b2BAccount: B2BAccount) => void
}

const AccountHierarchyTreeLabel = (props: AccountHierarchyTreeLabelProps) => {
  const {
    disableSorting,
    currentAccount,
    customerAccount,
    mdScreen,
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleChangeParent,
  } = props

  const { t } = useTranslation('common')
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showModal } = useModalContext()
  const { user, setUser, selectedAccountId, setSelectedAccountId, setAccountsByUser } =
    useAuthContext()

  const onSwitchAccount = () => {
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          contentText: t('switch-account-message'),
          primaryButtonText: t('Yes'),
          onConfirm: async () => {
            const res = await fetch(
              `/api/switch-user?id=${currentAccount.id}&t=${new Date().getTime()}`
            )
            const data = await res.json()
            setSelectedAccountId && setSelectedAccountId(currentAccount.id)
            if (data?.id && setUser) {
              document.cookie = `behaviors=${data?.behaviors}; path=/`
              setUser(data)
              queryClient.removeQueries()
              if (router.pathname.startsWith('/my-account')) {
                router.push('/my-account')
              }
            }
          },
        },
      })
    } catch (error) {
      console.error('Error switching account', error)
    }
  }

  const onAddAccountClick = () =>
    handleAddAccount({
      isAddingAccountToChild: true,
      accounts: [currentAccount],
    })

  const onEditAccountClick = () => {
    if (customerAccount?.id === currentAccount.id) {
      handleEditAccount(currentAccount)
    } else {
      handleChangeParent(currentAccount)
    }
  }

  const companyTextColor =
    customerAccount?.id === currentAccount?.id
      ? 'primary'
      : disableSorting
      ? 'text.disabled'
      : 'text.primary'

  return (
    <>
      <ListItemText
        data-testid="tree-label"
        primary={
          <Typography color={companyTextColor}>{currentAccount?.companyOrOrganization}</Typography>
        }
        sx={{ pl: 1 }}
      />
      <ListItemIcon sx={{ ml: 'auto' }}>
        {!disableSorting && customerAccount?.id !== currentAccount.id ? (
          <AccountHierarchyActions
            mdScreen={mdScreen}
            user={user as CustomerAccountWithRole}
            selectedAccountId={selectedAccountId}
            currentAccount={currentAccount}
            onAdd={onAddAccountClick}
            onAccess={onSwitchAccount}
            onEdit={onEditAccountClick}
          />
        ) : null}
      </ListItemIcon>
    </>
  )
}

export default AccountHierarchyTreeLabel
