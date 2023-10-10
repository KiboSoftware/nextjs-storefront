import React from 'react'

import { ListItemIcon, ListItemText, Typography } from '@mui/material'

import { AccountHierarchyActions } from '@/components/b2b'
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
  handleBuyersBtnClick: (id: number) => void
  handleQuotesBtnClick: (id: number) => void
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
      handleEditAccount(currentAccount)
    } else {
      handleChangeParent(currentAccount)
    }
  }

  const onBuyersClick = () => handleBuyersBtnClick(currentAccount.id)

  const onQuotesClick = () => handleQuotesBtnClick(currentAccount.id)

  const companyTextColor =
    customerAccount?.id === currentAccount.id
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
