import * as React from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DragIndicator from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Nestable from 'react-nestable'

import { AccountHierarchyStyles } from './AccountHierarchyTree.styles'
import { AccountHierarchyTreeLabel } from '@/components/b2b'
import { getSwapAccountParams } from '@/lib/helpers'
import {
  AddChildAccountProps,
  EditChildAccountProps,
  HierarchyNode,
  NestableOnChangeArgs,
} from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTreeProps {
  role: string
  accounts: any[]
  customerAccount: CustomerAccount | undefined
  hierarchy: HierarchyNode[] | undefined
  handleViewAccount: (item: B2BAccount) => void
  handleAddAccount: ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => void
  handleEditAccount: ({ accounts }: EditChildAccountProps) => void
  handleChangeParent: ({ accounts }: EditChildAccountProps) => void
  handleSwapAccount: (accountId: number, parentAccountId: number) => void
  handleBuyersBtnClick: (b2BUsers: B2BUser[]) => void
  handleQuotesBtnClick: (id: number) => void
}

export default function AccountHierarchyTree(props: AccountHierarchyTreeProps) {
  const {
    accounts,
    hierarchy,
    role,
    customerAccount,
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleChangeParent,
    handleSwapAccount,
    handleBuyersBtnClick,
    handleQuotesBtnClick,
  } = props

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { t } = useTranslation('common')

  const handleCollapse = (collapseCase: 'ALL' | 'NONE') => {
    const instance = refNestable.current as any
    instance?.collapse(collapseCase)
  }

  const refNestable = React.useRef<Nestable | null>(null)

  const onAccountSwap = ({ dragItem, items, targetPath }: NestableOnChangeArgs) => {
    const { accountId, parentAccountId } = getSwapAccountParams({ dragItem, items, targetPath })
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

      <List dense={true}>
        <Nestable
          ref={(el) => (refNestable.current = el)}
          items={hierarchy as HierarchyNode[]}
          renderItem={({ item, collapseIcon, handler }: any) => (
            <AccountHierarchyTreeLabel
              role={role}
              mdScreen={mdScreen}
              item={item}
              accounts={accounts}
              customerAccount={customerAccount}
              handleViewAccount={handleViewAccount}
              handleAddAccount={handleAddAccount}
              handleEditAccount={handleEditAccount}
              handleChangeParent={handleChangeParent}
              handleBuyersBtnClick={handleBuyersBtnClick}
              handleQuotesBtnClick={handleQuotesBtnClick}
              icons={
                <ListItemIcon sx={{ display: 'flex' }}>
                  <IconButton size="small">{handler}</IconButton>
                  {collapseIcon ? <IconButton size="small">{collapseIcon}</IconButton> : null}
                </ListItemIcon>
              }
            />
          )}
          renderCollapseIcon={({ isCollapsed }) => (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isCollapsed ? <ChevronRightIcon /> : <ExpandMoreIcon />}
            </Box>
          )}
          onChange={(accountSwapArgs: NestableOnChangeArgs) => onAccountSwap(accountSwapArgs)}
          handler={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              data-testid="drag-handler"
            >
              <DragIndicator />
            </Box>
          }
        />
      </List>
    </>
  )
}
