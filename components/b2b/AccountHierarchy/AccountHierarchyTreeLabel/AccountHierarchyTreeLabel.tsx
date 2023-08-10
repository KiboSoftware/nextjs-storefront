import React from 'react'

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import { AccountHierarchyActions } from '@/components/b2b'
import { B2BRoles } from '@/lib/constants'

interface AccountHierarchyTreeLabelProps {
  label: string
  icons?: any
  role: string
}

const AccountHierarchyTreeLabel = (props: AccountHierarchyTreeLabelProps) => {
  const { label, icons, role } = props

  return (
    <List dense={true}>
      <ListItem
        data-testid="tree-label"
        secondaryAction={
          role !== B2BRoles.NON_PURCHASER ? (
            <AccountHierarchyActions
              role={role}
              onBuyersClick={() => null}
              onQuotesClick={() => null}
              onAdd={() => null}
              onEdit={() => null}
              onDelete={() => null}
            />
          ) : null
        }
      >
        {icons ? <ListItemIcon>{icons}</ListItemIcon> : null}
        <ListItemText primary={label} />
      </ListItem>
    </List>
  )
}

export default AccountHierarchyTreeLabel
