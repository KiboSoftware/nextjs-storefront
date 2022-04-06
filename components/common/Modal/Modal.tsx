import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
  Theme,
} from '@mui/material' // Interface
import { makeStyles } from '@mui/styles'

interface ModalProps {
  open: boolean
  title?: React.ReactNode
  titleClasses?: object
  titleSX?: object
  showCloseButton?: boolean
  content?: React.ReactNode
  contentClasses?: object
  contentSX?: object
  dividers?: boolean
  actions?: React.ReactNode
  actionsClasses?: object
  actionsSX?: object
  disableSpacing?: boolean
  isCenteredModal?: boolean
  customMaxWidth: string
  onClose: () => void
}

interface ModalTitleProps {
  id: string
  children?: React.ReactNode
  classes?: object
  sx?: object
  showCloseButton?: boolean
  onClose?: () => void
}

interface ModalContentProps {
  children?: React.ReactNode
  classes?: object
  dividers?: boolean
  sx?: object
}

interface ModalActionsProps {
  children?: React.ReactNode
  classes?: object
  disableSpacing?: boolean
  sx?: object
}

// MUI
const StyledDialog = styled(Dialog)(({ theme }: { theme?: Theme }) => ({
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
  },
}))

const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: 'flex-start',
  },
  topPaperScrollBody: {
    verticalAlign: 'top',
  },
})

const ModalTitle = (props: ModalTitleProps) => {
  const { children, onClose, showCloseButton, sx, ...other } = props

  return (
    <DialogTitle sx={sx} {...other}>
      {children}
      {showCloseButton ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        >
          <CloseIcon
            sx={{ width: '20px', height: '20px', color: (theme) => theme.palette.grey[600] }}
          />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

ModalTitle.defaultProps = {
  showCloseButton: true,
  sx: { m: 0, p: 2 },
}

const ModalContent = (props: ModalContentProps) => {
  const { children, classes, dividers, sx } = props

  return (
    <DialogContent sx={sx} classes={classes} dividers={dividers}>
      {children}
    </DialogContent>
  )
}

const ModalActions = (props: ModalActionsProps) => {
  const { children, classes, disableSpacing, sx } = props

  return (
    <DialogActions sx={sx} classes={classes} disableSpacing={disableSpacing}>
      {children}
    </DialogActions>
  )
}

// Component
const Modal = ({
  open,
  title,
  titleClasses,
  titleSX,
  showCloseButton,
  content,
  contentClasses,
  contentSX,
  dividers,
  actions,
  actionsClasses,
  actionsSX,
  disableSpacing,
  isCenteredModal,
  customMaxWidth,
  onClose,
}: ModalProps) => {
  const classes = useStyles()

  return (
    <>
      <StyledDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          ...(isCenteredModal === false && {
            scrollPaper: classes.topScrollPaper,
            paperScrollBody: classes.topPaperScrollBody,
          }),
        }}
        sx={{
          ...(isCenteredModal === false && {
            top: '55px',
          }),
          '& .MuiDialog-paper': {
            ...(customMaxWidth && {
              maxWidth: customMaxWidth,
            }),
          },
        }}
      >
        <ModalTitle
          id="customized-dialog-title"
          onClose={onClose}
          classes={titleClasses}
          showCloseButton={showCloseButton}
          sx={titleSX}
        >
          {title}
        </ModalTitle>
        <ModalContent dividers={dividers} classes={contentClasses} sx={contentSX}>
          {content}
        </ModalContent>
        <ModalActions classes={actionsClasses} sx={actionsSX} disableSpacing={disableSpacing}>
          {actions}
        </ModalActions>
      </StyledDialog>
    </>
  )
}

Modal.defaultProps = {
  isCenteredModal: true,
  customMaxWidth: '',
}

export default Modal
