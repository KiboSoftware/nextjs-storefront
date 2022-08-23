import React from 'react'

import { Stack, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'
import { useModalContext } from '@/context/ModalContext'

interface DeleteConfirmationProps {
  contentText: string
  onDelete: () => void
}

const DeleteConfirmationContent = ({ contentText }: { contentText: string }) => {
  return (
    <Typography variant="body1" align="center">
      {contentText}
    </Typography>
  )
}

// Component
const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const { contentText, onDelete } = props
  const { t } = useTranslation('common')
  const { closeModal } = useModalContext()

  const handleDelete = () => {
    onDelete()
    closeModal()
  }

  const DialogArgs = {
    Content: <DeleteConfirmationContent contentText={contentText} />,
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
        <Button sx={{ width: '100%' }} variant="contained" onClick={() => handleDelete()}>
          {t('delete')}
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
export default DeleteConfirmation
