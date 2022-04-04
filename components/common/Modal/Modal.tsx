import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
} from '@mui/material'

// Interface
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
}

interface ModalTitleProps {
  id: string
  children?: React.ReactNode
  classes?: object
  sx?: Object
  showCloseButton?: boolean
  onClose?: () => void
}

interface ModalContentProps {
  children?: React.ReactNode
  classes?: object
  dividers?: boolean
  sx?: Object
}

interface ModalActionsProps {
  children?: React.ReactNode
  classes?: object
  disableSpacing?: boolean
  sx?: Object
}

// MUI
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

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
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
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
}: ModalProps) => {
  const [isOpen, setOpen] = React.useState(open)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <StyledDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <ModalTitle
          id="customized-dialog-title"
          onClose={handleClose}
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

export default Modal
