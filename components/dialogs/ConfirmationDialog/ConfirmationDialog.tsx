import React from 'react'

import { Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { useModalContext } from '@/context/ModalContext'

interface ConfirmationDialogProps {
  title?: string
  contentText: string
  primaryButtonText: string
  showContentTopDivider: boolean
  showContentBottomDivider: boolean
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
  const {
    title,
    contentText,
    primaryButtonText,
    showContentTopDivider = false,
    showContentBottomDivider = false,
    onConfirm,
  } = props
  const { t } = useTranslation('common')
  const { closeModal } = useModalContext()

  const handlePrimaryButtonClick = () => {
    onConfirm()
    closeModal()
  }

  const DialogArgs = {
    Title: title,
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
    showContentTopDivider,
    showContentBottomDivider,
    onClose: closeModal,
  }

  return <KiboDialog {...DialogArgs} />
}
export default ConfirmationDialog
