import * as React from 'react'

import { Box, Button, Typography, useMediaQuery, useTheme, NoSsr } from '@mui/material'
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree'
import { useTranslation } from 'next-i18next'

import { AccountHierarchyStyles } from './AccountHierarchyTree.styles'
import { AccountHierarchyTreeLabel } from '@/components/b2b'
import { actions, hasPermission } from '@/lib/helpers'
import { AddChildAccountProps, B2BAccountHierarchyResult, HierarchyTree } from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTreeProps {
  accounts: B2BAccount[]
  customerAccount: CustomerAccount
  hierarchy: HierarchyTree[]
  handleViewAccount: (item: B2BAccount) => void
  handleAddAccount: ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => void
  handleEditAccount: (b2BAccount: B2BAccount) => void
  handleChangeParent: (b2BAccount: B2BAccount) => void
  handleSwapAccount: (accountId: number, parentAccountId: number) => void
  handleBuyersBtnClick: (id: number) => void
  handleQuotesBtnClick: (id: number) => void
  setAccountHierarchy: (items: B2BAccountHierarchyResult) => void
}

export default function AccountHierarchyTree(props: AccountHierarchyTreeProps) {
  const {
    accounts,
    hierarchy,
    customerAccount,
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleChangeParent,
    handleSwapAccount,
    handleBuyersBtnClick,
    handleQuotesBtnClick,
    setAccountHierarchy,
  } = props

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { t } = useTranslation('common')

  const handleCollapse = (type: string) => {
    const newHierarchy = hierarchy.map((item: HierarchyTree) => {
      if (type === 'ALL') {
        return {
          ...item,
          collapsed: true,
        }
      } else {
        return {
          ...item,
          collapsed: false,
        }
      }
    })

    setAccountHierarchy({
      accounts,
      hierarchy: newHierarchy,
    })
  }

  const onAccountSwap = ({
    accountId,
    parentAccountId,
  }: {
    accountId: number
    parentAccountId: number
  }) => {
    handleSwapAccount(accountId, parentAccountId)
  }

  return (
    <>
      <Box sx={{ ...AccountHierarchyStyles.expandCollapseButtonBox }} gap={1}>
        <Button
          sx={{ ...AccountHierarchyStyles.expandCollapseButtonStyle }}
          onClick={() => handleCollapse('NONE')}
        >
          {t('expand-all')}
        </Button>
        <Button
          sx={{ ...AccountHierarchyStyles.expandCollapseButtonStyle }}
          onClick={() => handleCollapse('ALL')}
        >
          {t('collapse-all')}
        </Button>
      </Box>
      <Box sx={{ backgroundColor: theme.palette.grey[100], padding: '15px' }}>
        <Typography fontWeight="bold">{t('org-name')}</Typography>
      </Box>

      <NoSsr>
        <SortableTree
          items={(hierarchy as TreeItems<HierarchyTree>) || []}
          disableSorting={!hasPermission(actions.EDIT_ACCOUNT)}
          canRootHaveChildren={false}
          onItemsChanged={(items, reason) => {
            if (reason.type === 'dropped') {
              if (!reason.droppedToParent?.disableSorting) {
                onAccountSwap({
                  accountId: reason.draggedItem.id,
                  parentAccountId: reason.draggedItem.parentId as number,
                })
              }
            } else {
              setAccountHierarchy({
                accounts,
                hierarchy: items as HierarchyTree[],
              })
            }
          }}
          // eslint-disable-next-line react/display-name
          TreeItemComponent={React.forwardRef<
            HTMLDivElement,
            TreeItemComponentProps<HierarchyTree>
          >((props, ref) => {
            const currentAccount: B2BAccount = accounts?.find(
              (account: B2BAccount) => account.id === props.item.id
            ) as B2BAccount

            return (
              <SimpleTreeItemWrapper
                {...props}
                disableCollapseOnItemClick
                disableSorting={props.item.disableSorting}
                disableInteraction={props.item.disableSorting}
                ref={ref}
              >
                <AccountHierarchyTreeLabel
                  disableSorting={props.item.disableSorting}
                  mdScreen={mdScreen}
                  currentAccount={currentAccount}
                  customerAccount={customerAccount}
                  handleViewAccount={handleViewAccount}
                  handleAddAccount={handleAddAccount}
                  handleEditAccount={handleEditAccount}
                  handleChangeParent={handleChangeParent}
                  handleBuyersBtnClick={handleBuyersBtnClick}
                  handleQuotesBtnClick={handleQuotesBtnClick}
                />
              </SimpleTreeItemWrapper>
            )
          })}
        />
      </NoSsr>
    </>
  )
}
