import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ViewAccountStyles } from './ViewAccountDetails.styles'

import { B2BAccount } from '@/lib/gql/types'

interface ViewAccountDetailsProps {
  b2BAccount: B2BAccount
}

const ViewAccountDetails = (props: ViewAccountDetailsProps) => {
  const theme = useTheme()
  const { t } = useTranslation('common')
  const { b2BAccount } = props

  return (
    <Box>
      <Typography component="h2" sx={{ color: theme.palette.grey[600] }}>
        {t('b2b-account-id')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {b2BAccount?.id}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('parent-account')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {b2BAccount?.parentAccountId}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('company-name')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {b2BAccount?.companyOrOrganization}
      </Typography>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('tax-id')} {t('optional')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {b2BAccount?.taxId}
      </Typography>

      <Box sx={{ display: { sx: 'column', md: 'flex' } }}>
        <Box sx={{ width: '50%' }}>
          <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
            {t('user-first-name')}
          </Typography>
          <Typography component="p" sx={{ marginTop: 1 }}>
            {b2BAccount?.users?.[0]?.firstName}
          </Typography>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
            {t('user-last-name')}
          </Typography>
          <Typography component="p" sx={{ marginTop: 1 }}>
            {b2BAccount?.users?.[0]?.lastName}
          </Typography>
        </Box>
      </Box>

      <Typography component="h2" sx={{ ...ViewAccountStyles.heading }}>
        {t('email')}
      </Typography>
      <Typography component="p" sx={{ marginTop: 1 }}>
        {b2BAccount?.users?.[0]?.emailAddress}
      </Typography>
    </Box>
  )
}

export default ViewAccountDetails
