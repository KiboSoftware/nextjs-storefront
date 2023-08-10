import * as React from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DragIndicator from '@mui/icons-material/DragIndicator'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, IconButton, ListItemIcon } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Nestable from 'react-nestable'

import { AccountHierarchyTreeLabel } from '@/components/b2b'
interface Hierarchy {
  id: string | number
  children: Hierarchy[]
}

interface TreeItemListProps {
  accounts: any[]
  hierarchy: Hierarchy
}

interface AccountHierarchyTreeProps extends TreeItemListProps {
  role: string
}

const CollapseStateIndicator = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {isCollapsed ? <ChevronRightIcon /> : <ExpandMoreIcon />}
    </Box>
  )
}

export default function AccountHierarchyTree(props: AccountHierarchyTreeProps) {
  const { accounts, hierarchy, role } = props

  const RoleContext = React.createContext(role)

  const { t } = useTranslation('common')

  const renderItem = (props: any) => {
    const { item, collapseIcon, handler } = props

    const currentAccount = accounts?.find((account: any) => account.id === item.id)

    return (
      <AccountHierarchyTreeLabel
        role={role}
        label={currentAccount?.companyOrOrganization}
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

  // Use Confirmation Dialog
  const confirmChange = () => null

  const refNestable = React.useRef<Nestable | null>(null)

  return (
    <RoleContext.Provider value={role}>
      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <Button onClick={() => handleCollapse('NONE')}>{t('expand-all')}</Button>
        <Button onClick={() => handleCollapse('ALL')}>{t('collapse-all')}</Button>
      </Box>
      <Nestable
        ref={(el) => (refNestable.current = el)}
        items={[hierarchy]}
        renderItem={renderItem}
        handler={
          <Box display="flex" justifyContent="center" alignItems="center">
            <DragIndicator />
          </Box>
        }
        renderCollapseIcon={({ isCollapsed }) => (
          <CollapseStateIndicator isCollapsed={isCollapsed} />
        )}
        onChange={confirmChange}
      />
    </RoleContext.Provider>
  )
}
