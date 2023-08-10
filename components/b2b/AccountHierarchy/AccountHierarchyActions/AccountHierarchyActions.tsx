import React from 'react'

import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { B2BRoles } from '@/lib/constants'

interface AccountHierarchyActionsProps {
  role?: string
  onBuyersClick: () => void
  onQuotesClick: () => void
  onAdd: () => void
  onEdit: () => void
  onDelete: () => void
}

const AccountHierarchyActions = (props: AccountHierarchyActionsProps) => {
  const { role, onAdd, onEdit, onDelete, onBuyersClick, onQuotesClick } = props

  const { t } = useTranslation('common')

  return (
    <Box
      data-testid="account-actions"
      display={'flex'}
      gap={2}
      alignItems={'center'}
      onClick={(e) => e.stopPropagation()}
    >
      <Typography variant="caption" onClick={onBuyersClick}>
        {t('buyers')}
      </Typography>
      <Typography variant="caption" onClick={onQuotesClick}>
        {t('quotes')}
      </Typography>
      {role === B2BRoles.ADMIN && (
        <Box display={'flex'} gap={2}>
          <IconButton
            size="small"
            sx={{ p: 0.5 }}
            aria-label="item-add"
            name="item-add"
            onClick={onAdd}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ p: 0.5 }}
            aria-label="item-edit"
            name="item-edit"
            onClick={onEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ p: 0.5 }}
            aria-label="item-delete"
            name="item-delete"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default AccountHierarchyActions
