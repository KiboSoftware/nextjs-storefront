import React from 'react'

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
import { useRouter } from 'next/router'

import { PaymentMethod } from '@/components/my-account'
import { useAuthContext } from '@/context'
import { useCustomerCards, useCustomerContacts } from '@/hooks'

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
  const { t } = useTranslation(['checkout', 'common'])
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { user } = useAuthContext()

  const { data: cards } = useCustomerCards(user?.id as number)
  const { data: contacts } = useCustomerContacts(user?.id as number)

  const handleGoToOrderHistory = () => {
    router.push('/my-account/order-history?filters=M-6')
  }

  const accordionData = [
    {
      id: 'my-profile-accordion',
      controls: 'my-profile-content',
      header: t('common:my-profile'),
      component: null,
    },
    {
      id: 'address-book-accordion',
      controls: 'address-book-content',
      header: t('address-book'),
      component: null,
    },
    {
      id: 'payment-method-accordion',
      controls: 'payment-method-content',
      header: t('payment-method'),
      component: <PaymentMethod user={user as CustomerAccount} cards={cards} contacts={contacts} />,
    },
  ]

  return (
    <Grid container>
      <Grid item md={8} xs={12}>
        {!mdScreen && (
          <Link aria-label={t('common:back')} sx={{ ...style.backButton }}>
            <ChevronLeft />
            {t('common:back')}
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
            {t('common:my-account')}
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
        <Divider sx={{ borderColor: 'grey.500' }} />
        <Box
          sx={{
            ...style.myAccountChildren,
            ...style.orderHistory,
          }}
          onClick={handleGoToOrderHistory}
        >
          <Typography variant="h3">{t('common:order-history')}</Typography>
          <ChevronRightIcon />
        </Box>
        <Divider sx={{ backgroundColor: 'grey.300', ...style.divider }} />
        <Box sx={{ ...style.myAccountChildren, cursor: 'pointer' }}>
          <Typography variant="h3">{t('common:logout')}</Typography>
        </Box>
        <Divider sx={{ borderColor: 'grey.500' }} />
      </Grid>
    </Grid>
  )
}

export default MyAccountTemplate
