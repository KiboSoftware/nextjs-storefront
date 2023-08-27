import * as React from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DragIndicator from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Nestable from 'react-nestable'

import { AccountHierarchyStyles } from './AccountHierarchyTree.styles'
import { AccountHierarchyTreeLabel } from '@/components/b2b'
import { AddChildAccountProps, EditChildAccountProps, HierarchyNode } from '@/lib/types'

import { B2BAccount } from '@/lib/gql/types'

interface AccountHierarchyTreeProps {
  role: string
  accounts: any[]
  hierarchy: HierarchyNode[] | undefined
  handleViewAccount: (item: B2BAccount) => void
  handleAddAccount: ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => void
  handleEditAccount: ({ accounts }: EditChildAccountProps) => void
  handleSwapAccount: (accountId: number, parentAccountId: number) => void
  handleDisableAccount: (b2BAccount: B2BAccount) => void
  handleBuyersBtnClick: () => void
  handleQuotesBtnClick: (id: number) => void
}

const CollapseStateIndicator = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {isCollapsed ? <ChevronRightIcon /> : <ExpandMoreIcon />}
    </Box>
  )
}

export default function AccountHierarchyTree(props: AccountHierarchyTreeProps) {
  const {
    accounts,
    hierarchy,
    role,
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleDisableAccount,
    handleSwapAccount,
    handleBuyersBtnClick,
    handleQuotesBtnClick,
  } = props

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { t } = useTranslation('common')

  const renderItem = (props: any) => {
    const { item, collapseIcon, handler } = props

    const currentAccount: B2BAccount = accounts?.find(
      (account: B2BAccount) => account.id === item.id
    )

    const onViewAccountClick = () => {
      handleViewAccount(currentAccount)
    }

    const onAddAccountClick = () =>
      handleAddAccount({
        isAddingAccountToChild: true,
        accounts: [currentAccount],
      })

    const onEditAccountClick = () =>
      handleEditAccount({
        accounts,
        b2BAccount: currentAccount,
      })

    const onDisableAccountClick = () => handleDisableAccount(currentAccount)

    const onAccountSwap = (parentAccountId: number) =>
      handleSwapAccount(currentAccount?.id, parentAccountId)

    return (
      <AccountHierarchyTreeLabel
        role={role}
        mdScreen={mdScreen}
        label={currentAccount?.companyOrOrganization as string}
        onViewAccountClick={onViewAccountClick}
        onAddAccountClick={onAddAccountClick}
        onEditAccountClick={onEditAccountClick}
        onDisableAccountClick={onDisableAccountClick}
        onAccountSwap={onAccountSwap}
        onBuyersBtnClick={handleBuyersBtnClick}
        onQuotesBtnClick={() => handleQuotesBtnClick(currentAccount.id)}
        icons={
          <ListItemIcon sx={{ display: 'flex' }}>
            <IconButton size="small">{handler}</IconButton>
            {collapseIcon ? <IconButton size="small">{collapseIcon}</IconButton> : null}
          </ListItemIcon>
        }
      />
    )
  }

  const handleCollapse = (collapseCase: 'ALL' | 'NONE') => {
    const instance = refNestable.current as any
    instance?.collapse(collapseCase)
  }

  const refNestable = React.useRef<Nestable | null>(null)

  const getSwapAccountParams = ({ items, targetPath }: any) => {
    let parent = items
    targetPath.forEach((h: number) => {
      parent = parent[h] ?? parent?.children[h]
    })

    return parent?.id
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

      <Nestable
        ref={(el) => (refNestable.current = el)}
        items={hierarchy as HierarchyNode[]}
        renderItem={renderItem}
        renderCollapseIcon={({ isCollapsed }) => (
          <CollapseStateIndicator isCollapsed={isCollapsed} />
        )}
        onChange={({ dragItem, items, targetPath }) =>
          handleSwapAccount(dragItem?.id, getSwapAccountParams({ items, targetPath }))
        }
        handler={
          <Box display="flex" justifyContent="center" alignItems="center">
            <DragIndicator />
          </Box>
        }
      />
    </>
  )
}
