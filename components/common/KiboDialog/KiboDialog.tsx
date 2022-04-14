import React, { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Theme,
} from '@mui/material'
import { grey } from '@mui/material/colors'

export interface KiboDialogProps {
  isOpen: boolean
  title?: ReactNode
  showCloseIconButton?: boolean
  content: ReactNode
  dividers?: boolean
  actions?: ReactNode
  isCenteredDialog?: boolean
  customMaxWidth: string
  onClose: () => void
}

const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'customMaxWidth' && prop !== 'isCenteredDialog',
})(
  ({
    theme,
    customMaxWidth,
    isCenteredDialog,
  }: {
    theme?: Theme
    customMaxWidth?: string
    isCenteredDialog: boolean
  }) => ({
    '& .MuiDialogContent-root': {
      padding: theme?.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme?.spacing(1),
    },
    '& .MuiDialog-paper': {
      margin: 0,
      width: '100%',
      borderRadius: 0,
      ...(customMaxWidth && {
        maxWidth: customMaxWidth,
      }),
    },
    ...(isCenteredDialog === false && {
      top: '55px',
      '& .MuiDialog-scrollPaper': {
        alignItems: 'flex-start',
      },
      '& .MuiDialog-paperScrollBody': {
        verticalAlign: 'top',
      },
    }),
  })
)

const KiboDialog = (props: KiboDialogProps) => {
  const {
    isOpen = false,
    title,
    showCloseIconButton = true,
    content,
    dividers,
    actions,
    isCenteredDialog = true,
    customMaxWidth = '',
    onClose,
  } = props

  const titleSX = { m: 0, p: 2 }
  const iconButtonStyle = { position: 'absolute', right: 10, top: 10 }
  const closeIconStyle = { width: '20px', height: '20px', color: grey[600] }

  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="kibo-dialog-title"
      open={isOpen}
      customMaxWidth={customMaxWidth}
      isCenteredDialog={isCenteredDialog}
      data-test-id="kibo-dialog"
    >
      {title != '' ? (
        <DialogTitle id="kibo-dialog-title" sx={titleSX}>
          {title}
          {showCloseIconButton ? (
            <IconButton aria-label="close" onClick={onClose} sx={{ ...iconButtonStyle }}>
              <CloseIcon sx={{ ...closeIconStyle }} />
            </IconButton>
          ) : null}
        </DialogTitle>
      ) : (
        ''
      )}
      <DialogContent dividers={dividers}>{content}</DialogContent>
      {actions != '' ? <DialogActions>{actions}</DialogActions> : ''}
    </StyledDialog>
  )
}

export default KiboDialog
