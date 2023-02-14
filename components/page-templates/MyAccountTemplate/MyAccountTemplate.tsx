import React, { useCallback } from 'react'

import { AccountCircle, ChevronLeft } from '@mui/icons-material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
  Grid,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { MyProfile, PaymentMethod, AddressBook } from '@/components/my-account'
import { useAuthContext } from '@/context'
import {
  useCustomerCardsQueries,
  useCustomerContactsQueries,
  useCreateCustomerCardsMutation,
  useUpdateCustomerCardsMutation,
  useCreateCustomerAddressMutation,
  useUpdateCustomerAddressMutation,
} from '@/hooks'
import type { BillingAddress, CardType } from '@/lib/types'

import type { CustomerAccount } from '@/lib/gql/types'

const style = {
  accordion: {
    ':before': {
      backgroundColor: 'transparent',
    },
    boxShadow: 0,
    borderRadius: 0,
  },

  accordionDetails: {
    pt: 0,
    p: { md: 0 },
  },
  myAccountChildren: {
    paddingLeft: { md: 0, xs: '1rem' },
    paddingRight: { md: 0, xs: '1rem' },
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
  },
  accordionSummary: {
    padding: { md: 0 },
  },
  expandedIcon: {
    color: 'text.primary',
  },
  orderHistory: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    alignItems: 'center',
  },
  accountCircle: {
    fontSize: {
      md: '2.7rem',
      xs: '3.3rem',
    },
  },
  backButton: {
    typography: 'body2',
    textDecoration: 'none',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0.5rem',
    cursor: 'pointer',
  },
  divider: {
    height: '1.188rem',
    borderColor: 'transparent',
  },
}

const MyAccountTemplate = () => {
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const isSubscriptionEnabled = publicRuntimeConfig.isSubscriptionEnabled
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { user, logout } = useAuthContext()

  const { data: cards } = useCustomerCardsQueries(user?.id as number)
  const { data: contacts } = useCustomerContactsQueries(user?.id as number)

  const { addSavedCardDetails } = useCreateCustomerCardsMutation()
  const { updateSavedCardDetails } = useUpdateCustomerCardsMutation()
  const { addSavedAddressDetails } = useCreateCustomerAddressMutation()
  const { updateSavedAddressDetails } = useUpdateCustomerAddressMutation()

  const handleGoToOrderHistory = () => {
    router.push('/my-account/order-history?filters=M-6')
  }

  const handleGoToSubscription = useCallback(() => {
    router.push('/my-account/subscription')
  }, [router])

  const handleSave = async (
    address: BillingAddress,
    card: CardType,
    isUpdatingAddress: boolean
  ) => {
    let response

    // Add update address
    if (isUpdatingAddress) {
      response = await updateSavedAddressDetails.mutateAsync(address)
    } else {
      response = await addSavedAddressDetails.mutateAsync(address)
    }

    const params = {
      accountId: card.accountId,
      cardId: card.cardId,
      cardInput: card.cardInput,
    }
    params.cardInput.contactId = response.id

    // Add update card
    if (card.cardId) {
      await updateSavedCardDetails.mutateAsync(params)
    } else {
      await addSavedCardDetails.mutateAsync(params)
    }
  }

  const accordionData = [
    {
      id: 'my-profile-accordion',
      controls: 'my-profile-content',
      header: t('my-profile'),
      component: <MyProfile user={user as CustomerAccount} />,
    },
    {
      id: 'address-book-accordion',
      controls: 'address-book-content',
      header: t('address-book'),
      component: <AddressBook user={user as CustomerAccount} contacts={contacts} />,
    },
    {
      id: 'payment-method-accordion',
      controls: 'payment-method-content',
      header: t('payment-method'),
      component: (
        <PaymentMethod
          user={user as CustomerAccount}
          cards={cards}
          contacts={contacts}
          onSave={handleSave}
        />
      ),
    },
  ]

  return (
    <Grid container>
      <Grid item md={8} xs={12}>
        {!mdScreen && (
          <Link aria-label={t('back')} sx={{ ...style.backButton }} href="/">
            <ChevronLeft />
            {t('back')}
          </Link>
        )}
        <Box
          sx={{
            display: { md: 'flex', xs: 'block' },
            alignItems: 'center',
            ...style.myAccountChildren,
          }}
        >
          <Box sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }}>
            <AccountCircle sx={{ ...style.accountCircle }} />
          </Box>
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ paddingLeft: { md: '0.5rem', xs: 0 } }}
          >
            {t('my-account')}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'grey.500' }} />

        {accordionData.map((data) => {
          return (
            <Box key={data.id}>
              <Accordion disableGutters sx={{ ...style.accordion }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ ...style.expandedIcon }} />}
                  aria-controls={data.controls}
                  id={data.id}
                  sx={{ ...style.accordionSummary }}
                >
                  <Typography variant="h3">{data.header}</Typography>
                </AccordionSummary>
                <AccordionDetails>{data.component}</AccordionDetails>
              </Accordion>
              <Divider sx={{ borderColor: 'grey.500' }} />
            </Box>
          )
        })}

        <Box sx={{ ...style.myAccountChildren }}>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('order-details')}</Typography>
        </Box>

        {/* code for subscription below */}
        <Divider sx={{ borderColor: 'grey.500' }} />
        {isSubscriptionEnabled && (
          <Box
            sx={{
              ...style.myAccountChildren,
              ...style.orderHistory,
            }}
            onClick={handleGoToSubscription}
          >
            <Typography variant="h3">{t('my-subscription')}</Typography>
            <ChevronRightIcon />
          </Box>
        )}
        {/* code for subscription ends here */}

        <Divider sx={{ borderColor: 'grey.500' }} />
        <Box
          sx={{
            ...style.myAccountChildren,
            ...style.orderHistory,
          }}
          onClick={handleGoToOrderHistory}
        >
          <Typography variant="h3">{t('order-history')}</Typography>
          <ChevronRightIcon />
        </Box>
        <Divider sx={{ backgroundColor: 'grey.300', ...style.divider }} />
        <Box sx={{ ...style.myAccountChildren, cursor: 'pointer' }} onClick={logout}>
          <Typography variant="h3">{t('logout')}</Typography>
        </Box>
        <Divider sx={{ borderColor: 'grey.500' }} />
      </Grid>
    </Grid>
  )
}

export default MyAccountTemplate
