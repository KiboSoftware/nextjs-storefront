import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ViewAccountStyles } from './ViewUserDetail.styles'
import { userGetters } from '@/lib/getters'

import { B2BUser } from '@/lib/gql/types'

interface ViewUserDetailProps {
  b2BUser: B2BUser
}

const ViewUserDetail = (props: ViewUserDetailProps) => {
  const theme = useTheme()
  const { t } = useTranslation('common')
  const { b2BUser } = props

  return (
    <Box>
      <Typography component="h2" sx={{ color: theme.palette.grey[600] }}>
        {t('email-address')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {userGetters.getEmailAddress(b2BUser)}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('first-name')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {userGetters.getFirstName(b2BUser)}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('last-name')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {userGetters.getLastName(b2BUser)}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('role')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {userGetters.getRole(b2BUser)}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('status')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {userGetters.getStatus(b2BUser) ? t('active') : t('in-active')}
      </Typography>
    </Box>
  )
}

export default ViewUserDetail
