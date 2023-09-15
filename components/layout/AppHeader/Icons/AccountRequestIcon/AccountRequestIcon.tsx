import { Fragment } from 'react'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Button, IconProps, Tooltip, Typography } from '@mui/material'

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
      <Button sx={AccountRequestStyles.button} onClick={onClick}>
        {!isMobileView && (
          <PersonAddIcon sx={{ color: 'grey.900', marginRight: 1 }} fontSize={fontSize} />
        )}
      </Button>
    </Tooltip>
  ) : (
    <Button sx={AccountRequestStyles.button} onClick={onClick}>
      {!isMobileView && (
        <PersonAddIcon sx={{ color: 'grey.900', marginRight: 1 }} fontSize={fontSize} />
      )}
      <Typography variant="body2" component="span" color="text.primary">
        {buttonText}
      </Typography>
    </Button>
  )
}

export default AccountRequestIcon
