import React, { useCallback } from 'react'

import { ArrowBackIos } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import lodash from 'lodash'
import { useTranslation } from 'next-i18next'

import { SubscriptionItem } from '@/components/my-account'
import { useAuthContext } from '@/context'
import type {} from '@/components/my-account/Subscription/SubscriptionItem/SubscriptionItem'
import { useSubscriptionsQueries, useCustomerContactsQueries } from '@/hooks'
import { subscriptionGetters, userGetters } from '@/lib/getters'
import type { FulfillmentInfo } from '@/lib/types'

import type { Subscription, CustomerContact } from '@/lib/gql/types'
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
  const { t } = useTranslation('common')
  const { user } = useAuthContext()

  const { data: subscriptionDetails } = useSubscriptionsQueries()
  const { data: contacts } = useCustomerContactsQueries(user?.id as number)

  const handleAccountTitleClick = useCallback(() => onAccountTitleClick(), [onAccountTitleClick])

  // Get saved shipping addresses
  const savedShippingAddresses = userGetters.getUserShippingAddress(
    contacts?.items as CustomerContact[]
  )
  const formatedSavedShippingAddresses = savedShippingAddresses?.map((savedAddress) =>
    subscriptionGetters.getFormattedSubscriptionShippingAddress(savedAddress)
  )

  // Get subscription shipping address
  const formatedSubscriptionShippingAddress = subscriptionDetails?.items?.map((subscription) =>
    subscriptionGetters.getFormattedAddress(subscription as Subscription)
  )

  // Get unique shipping addresses
  let duplicateFulfillments = []
  duplicateFulfillments = formatedSavedShippingAddresses ? [...formatedSavedShippingAddresses] : []
  duplicateFulfillments = formatedSubscriptionShippingAddress
    ? [...duplicateFulfillments, ...formatedSubscriptionShippingAddress]
    : [...duplicateFulfillments]

  const fulfillmentInfoList = lodash.uniqBy(duplicateFulfillments, 'formattedAddress')

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
            fulfillmentInfoList={fulfillmentInfoList as FulfillmentInfo[]}
          />
        ))}
      {subscriptionDetails?.totalCount === 0 && (
        <Typography>{t('no-subscription-message')}</Typography>
      )}
    </>
  )
}

export default SubscriptionList
