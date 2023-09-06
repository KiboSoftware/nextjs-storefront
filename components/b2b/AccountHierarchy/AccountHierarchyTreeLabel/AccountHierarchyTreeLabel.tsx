import React from 'react'

import { ListItemIcon, ListItemText } from '@mui/material'

import { AccountHierarchyActions } from '@/components/b2b'
import { B2BRoles } from '@/lib/constants'
import { AddChildAccountProps, EditChildAccountProps } from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTreeLabelProps {
  currentAccount: B2BAccount
  accounts: B2BAccount[]
  customerAccount: CustomerAccount | undefined
  role: string
  mdScreen?: boolean
  handleViewAccount: (item: B2BAccount) => void
  handleAddAccount: ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => void
  handleEditAccount: ({ accounts }: EditChildAccountProps) => void
  handleChangeParent: ({ accounts }: EditChildAccountProps) => void
  handleBuyersBtnClick: (b2BUsers: B2BUser[]) => void
  handleQuotesBtnClick: (id: number) => void
}

const AccountHierarchyTreeLabel = (props: AccountHierarchyTreeLabelProps) => {
  const {
    currentAccount,
    accounts,
    customerAccount,
    role,
    mdScreen,
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleChangeParent,
    handleBuyersBtnClick,
    handleQuotesBtnClick,
  } = props

  const onViewAccountClick = () => {
    handleViewAccount(currentAccount)
  }

  const onAddAccountClick = () =>
    handleAddAccount({
      isAddingAccountToChild: true,
      accounts: [currentAccount],
    })

  const onEditAccountClick = () => {
    if (customerAccount?.id === currentAccount.id) {
      handleEditAccount({
        accounts,
        b2BAccount: currentAccount,
      })
    } else {
      handleChangeParent({
        accounts,
        b2BAccount: currentAccount,
      })
    }
  }

  const onBuyersClick = () => handleBuyersBtnClick(currentAccount.users as B2BUser[])

  const onQuotesClick = () => handleQuotesBtnClick(currentAccount.id)

  return (
    <>
      <ListItemText
        data-testid="tree-label"
        primary={currentAccount?.companyOrOrganization}
        sx={{ pl: 1 }}
      />
      <ListItemIcon sx={{ ml: 'auto' }}>
        {role !== B2BRoles.NON_PURCHASER ? (
          <AccountHierarchyActions
            role={role}
            mdScreen={mdScreen}
            onBuyersClick={onBuyersClick}
            onQuotesClick={onQuotesClick}
            onAdd={onAddAccountClick}
            onView={onViewAccountClick}
            onEdit={onEditAccountClick}
          />
        ) : null}
      </ListItemIcon>
    </>
  )
}

export default AccountHierarchyTreeLabel
