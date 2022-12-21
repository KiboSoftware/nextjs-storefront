import React from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import SubscriptionItemList from '../SubscriptionItemList/SubscriptionItemList'
import { useSubscriptionsQueries } from '@/hooks'

interface SubscriptionProps {
  onAccountTitleClick: () => void
}

const style = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  button: {
    width: {
      xs: '100%',
      sm: '50%',
      lg: '100%',
    },
    mt: '5%',
  },
  card: {
    maxWidth: '100%',
    border: 1,
    borderRadius: 1,
    mt: '1%',
  },
  subscriptionNumber: {
    pt: {
      xs: '2%',
      md: '0',
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'space-between',
    },
  },
  subscriptionItem: {
    pt: {
      xs: '2%',
      md: '1%',
    },
    justifyContent: 'space-between',
  },
}

const MySubscription = (props: SubscriptionProps) => {
  const { onAccountTitleClick } = props

  const { data: subscriptionDetails } = useSubscriptionsQueries()

  const { t } = useTranslation('common')

  const handleAccountTitleClick = () => onAccountTitleClick()

  return (
    <>
      <Stack mt={2}>
        <Stack sx={style.wrapIcon} direction="row" gap={2} onClick={handleAccountTitleClick}>
          <ArrowBackIos fontSize="inherit" sx={style.wrapIcon} />
          <Typography variant="body2">{t('my-account')}</Typography>
        </Stack>
        <Stack py={'1.2rem'}>
          <Typography variant="h1">{t('my-subscription')}</Typography>
        </Stack>
      </Stack>
      <SubscriptionItemList subscriptionDetailsData={subscriptionDetails} />
    </>
  )
}

export default MySubscription
