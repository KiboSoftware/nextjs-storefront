import React from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'

interface DeleteAddressConfirmationDialogProps {
  isOpen: boolean
  isDialogCentered: boolean
  onClose: () => void
  onDeleteAddress: () => void
}

// Component
const DeleteAddressConfirmationDialog = (props: DeleteAddressConfirmationDialogProps) => {
  const { isOpen, isDialogCentered, onClose, onDeleteAddress } = props

  const { t } = useTranslation('common')
  const DialogArgs = {
    isOpen: isOpen,
    Content: (
      <Typography variant="body1" textAlign={'center'}>
        {t('are-you-sure-you-want-to-delete-this-address')}
      </Typography>
    ),
    showContentTopDivider: false,
    showContentBottomDivider: false,
    Actions: (
      <Box
        sx={{
          width: '29.063rem',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: '0 2%',
          marginBottom: '1.438rem',
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: '100%', marginBottom: '0.75rem' }}
          fullWidth
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '100%' }}
          fullWidth
          onClick={onDeleteAddress}
        >
          {t('delete')}
        </Button>
      </Box>
    ),
    isDialogCentered: isDialogCentered,
    customMaxWidth: '29.063rem',
    onClose: onClose,
  }

  return <KiboDialog {...DialogArgs} />
}
export default DeleteAddressConfirmationDialog
