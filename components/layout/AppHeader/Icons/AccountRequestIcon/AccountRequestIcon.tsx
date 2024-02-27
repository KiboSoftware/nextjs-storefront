import { Fragment } from 'react'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Button, IconButton, IconProps, Tooltip, Typography } from '@mui/material'

import { AccountRequestStyles } from './AccountRequestIcon.styles'

interface AccountRequestIconProps {
  iconProps: IconProps
  buttonText: string
  onClick?: () => void
  isMobileView?: boolean
  isElementVisible?: boolean
}

const AccountRequestIcon = (props: AccountRequestIconProps) => {
  const {
    iconProps: { fontSize },
    buttonText,
    isElementVisible,
    isMobileView = false,
    onClick,
  } = props

  return !isElementVisible ? (
    <Tooltip
      title={
        <Fragment>
          <Typography variant="body2">{buttonText}</Typography>
        </Fragment>
      }
    >
      <IconButton onClick={onClick}>
        {!isMobileView && <PersonAddIcon sx={{ color: 'grey.900' }} fontSize={fontSize} />}
      </IconButton>
    </Tooltip>
  ) : (
    <IconButton onClick={onClick}>
      {!isMobileView && <PersonAddIcon sx={{ color: 'grey.900' }} fontSize={fontSize} />}
      <Typography variant="body2" component="span" color="text.primary">
        {buttonText}
      </Typography>
    </IconButton>
  )
}

export default AccountRequestIcon
