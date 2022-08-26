import React from 'react'

import { Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { useModalContext } from '@/context/ModalContext'

interface ConfirmationDialogProps {
  contentText: string
  primaryButtonText: string
  onConfirm: () => void
}

const ConfirmationDialogContent = ({ contentText }: { contentText: string }) => {
  return (
    <Typography variant="body1" align="center">
      {contentText}
    </Typography>
  )
}

// Component
const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { contentText, primaryButtonText, onConfirm } = props
  const { t } = useTranslation('common')
  const { closeModal } = useModalContext()

  const handlePrimaryButtonClick = () => {
    onConfirm()
    closeModal()
  }

  const DialogArgs = {
    Content: <ConfirmationDialogContent contentText={contentText} />,
    Actions: (
      <Stack gap={2} width="100%">
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          color="secondary"
          onClick={() => closeModal()}
        >
          {t('cancel')}
        </Button>
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          onClick={() => handlePrimaryButtonClick()}
        >
          {primaryButtonText}
        </Button>
      </Stack>
    ),
    isDialogCentered: true,
    customMaxWidth: '34.19rem',
    showContentTopDivider: false,
    showContentBottomDivider: false,
    onClose: closeModal,
  }

  return <KiboDialog {...DialogArgs} />
}
export default ConfirmationDialog
