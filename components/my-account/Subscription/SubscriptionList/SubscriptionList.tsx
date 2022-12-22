import React from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { SubscriptionItem } from '@/components/my-account'
import { useSubscriptionsQueries } from '@/hooks'

import type { Subscription } from '@/lib/gql/types'

interface SubscriptionListProps {
  onAccountTitleClick: () => void
}

const style = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
}

const SubscriptionList = (props: SubscriptionListProps) => {
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

      {subscriptionDetails?.totalCount > 0 &&
        subscriptionDetails?.items?.map((subscriptionItemData) => (
          <SubscriptionItem
            key={subscriptionItemData?.id as string}
            subscriptionDetailsData={subscriptionItemData as Subscription}
          />
        ))}
      {subscriptionDetails?.totalCount === 0 && (
        <Typography>{t('no-subscription-message')}</Typography>
      )}
    </>
  )
}

export default SubscriptionList
