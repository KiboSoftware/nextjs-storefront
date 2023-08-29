import React from 'react'

import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

import { AccountHierarchyActions } from '@/components/b2b'
import { B2BRoles } from '@/lib/constants'
import { AddChildAccountProps, EditChildAccountProps } from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTreeLabelProps {
  item: B2BAccount
  accounts: B2BAccount[]
  customerAccount: CustomerAccount | undefined
  icons?: any
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
    item,
    accounts,
    customerAccount,
    icons,
    role,
    mdScreen,
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleChangeParent,
    handleBuyersBtnClick,
    handleQuotesBtnClick,
  } = props

  const currentAccount: B2BAccount = accounts?.find(
    (account: B2BAccount) => account.id === item.id
  ) as B2BAccount

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
    <ListItem
      data-testid="tree-label"
      secondaryAction={
        role !== B2BRoles.NON_PURCHASER ? (
          <AccountHierarchyActions
            role={role}
            mdScreen={mdScreen}
            onBuyersClick={onBuyersClick}
            onQuotesClick={onQuotesClick}
            onAdd={onAddAccountClick}
            onView={onViewAccountClick}
            onEdit={onEditAccountClick}
          />
        ) : null
      }
    >
      {icons ? <ListItemIcon>{icons}</ListItemIcon> : null}
      <ListItemText primary={currentAccount?.companyOrOrganization} />
    </ListItem>
  )
}

export default AccountHierarchyTreeLabel
