import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Button, IconProps, Typography } from '@mui/material'

import { AccountRequestStyles } from './AccountRequestIcon.styles'

interface AccountRequestIconProps {
  iconProps: IconProps
  buttonText: string
  onClick?: () => void
  isMobileView?: boolean
}

const AccountRequestIcon = (props: AccountRequestIconProps) => {
  const {
    iconProps: { fontSize },
    buttonText,
    isMobileView = false,
    onClick,
  } = props

  return (
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
