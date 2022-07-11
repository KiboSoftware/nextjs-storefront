import React, { ReactNode } from 'react'

import { Close } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Theme,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'

import FullWidthDivider from '../FullWidthDivider/FullWidthDivider'

export interface KiboDialogProps {
  isOpen?: boolean
  Title?: ReactNode
  showCloseButton?: boolean
  Content: ReactNode
  Actions?: ReactNode
  isDialogCentered?: boolean
  customMaxWidth: string
  showContentTopDivider?: boolean
  showContentBottomDivider?: boolean
  onClose: () => void
}

interface StyledDialogProps {
  theme?: Theme
  customMaxWidth?: string
  isDialogCentered: boolean
}
interface StyledCloseProps {
  theme?: Theme
}

const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'customMaxWidth' && prop !== 'isDialogCentered',
})(({ customMaxWidth, isDialogCentered }: StyledDialogProps) => ({
  '& .MuiDialogContent-root': {
    padding: 0,
    paddingBlock: '1rem',
    overflowY: 'unset',
  },
  '& .MuiDialogActions-root': {
    padding: 0,
    paddingBlock: '1rem',
  },
  '& .MuiDialog-paper': {
    margin: 0,
    width: '100%',
    borderRadius: 0,
    ...(customMaxWidth && {
      maxWidth: customMaxWidth,
    }),
  },
  ...(isDialogCentered === false && {
    top: '3.438rem',
    '& .MuiDialog-scrollPaper': {
      alignItems: 'flex-start',
    },
    '& .MuiDialog-paperScrollBody': {
      verticalAlign: 'top',
    },
  }),
}))

const StyledDialogTitle = styled(DialogTitle)(() => ({
  margin: 0,
  padding: 0,
  paddingBlock: '1rem',
}))

const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: '0.625rem',
  top: '0.625rem',
}))

const StyledClose = styled(Close)(({ theme }: StyledCloseProps) => ({
  width: '1.25rem',
  height: '1.25rem',
  color: theme?.palette.grey[500],
}))

const KiboDialog = (props: KiboDialogProps) => {
  const {
    isOpen = true,
    Title,
    showCloseButton = true,
    Content,
    Actions,
    isDialogCentered = true,
    customMaxWidth = '',
    showContentTopDivider = true,
    showContentBottomDivider = true,
    onClose,
  } = props
  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="kibo-dialog-title"
      open={isOpen}
      customMaxWidth={customMaxWidth}
      isDialogCentered={isDialogCentered}
      data-test-id="kibo-dialog"
    >
      <Container maxWidth={'xl'}>
        {Title && (
          <StyledDialogTitle id="kibo-dialog-title">
            <Typography color="text.secendary" variant="h3" fontWeight={'bold'} component="span">
              {Title}
            </Typography>
            {showCloseButton && (
              <StyledIconButton aria-label="close" onClick={onClose}>
                <StyledClose />
              </StyledIconButton>
            )}
          </StyledDialogTitle>
        )}
        {showContentTopDivider && <FullWidthDivider />}
        <DialogContent>{Content}</DialogContent>
        {showContentBottomDivider && <FullWidthDivider />}
        {Actions != '' ? <DialogActions>{Actions}</DialogActions> : ''}
      </Container>
    </StyledDialog>
  )
}

export default KiboDialog
