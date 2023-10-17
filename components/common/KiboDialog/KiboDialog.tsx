import React, { ReactNode } from 'react'

import Close from '@mui/icons-material/Close'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Theme,
  Typography,
  useMediaQuery,
  Box,
} from '@mui/material'
import { Container } from '@mui/system'

import FullWidthDivider from '../FullWidthDivider/FullWidthDivider'
import theme from '@/styles/theme'

export interface KiboDialogProps {
  isOpen?: boolean
  Title?: ReactNode
  isAlignTitleCenter?: boolean
  showCloseButton?: boolean
  Content: ReactNode
  Actions?: ReactNode
  isDialogCentered?: boolean
  customMaxWidth: string
  onClose: () => void
}

interface StyledDialogProps {
  theme?: Theme
  customMaxWidth?: string
  isDialogCentered: boolean
}

const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'customMaxWidth' && prop !== 'isDialogCentered',
})(({ customMaxWidth, isDialogCentered }: StyledDialogProps) => ({
  '& .MuiDialogContent-root': {
    padding: 0,
    paddingBlock: '1rem',
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

const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: '0.625rem',
  top: '0.625rem',
}))

const StyledClose = styled(Close)(() => ({
  width: '1.25rem',
  height: '1.25rem',
  color: theme?.palette.grey[500],
}))

const KiboDialog = (props: KiboDialogProps) => {
  const {
    isOpen = true,
    Title,
    isAlignTitleCenter = false,
    showCloseButton = true,
    Content,
    Actions,
    customMaxWidth = '',
    onClose,
  } = props

  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="kibo-dialog-title"
      open={isOpen}
      customMaxWidth={customMaxWidth}
      isDialogCentered={mdScreen ? true : false}
      data-test-id="kibo-dialog"
      sx={{
        margin: 0,
      }}
    >
      <DialogTitle
        id="kibo-dialog-title"
        sx={{
          textAlign: isAlignTitleCenter ? 'center' : 'left',
        }}
      >
        <Typography variant="h3" fontWeight={'bold'} component="span">
          {Title}
        </Typography>
        {showCloseButton && (
          <Box paddingY={Title ? 0 : 1}>
            <StyledIconButton aria-label="close" onClick={onClose}>
              <StyledClose />
            </StyledIconButton>
          </Box>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Container maxWidth={'lg'}>{Content}</Container>
      </DialogContent>
      {Actions ? (
        <DialogActions>
          <Container maxWidth={'lg'}>{Actions}</Container>
        </DialogActions>
      ) : null}
    </StyledDialog>
  )
}

export default KiboDialog
