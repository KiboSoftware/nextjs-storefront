import React, { useCallback } from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
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
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useReCaptcha } from 'next-recaptcha-v3'

import { MyAccountTemplateStyle } from './MyAccountTemplate.styles'
import { MyProfile, PaymentMethod, AddressBook } from '@/components/my-account'
import { useAuthContext, useSnackbarContext } from '@/context'
import { useCardContactActions } from '@/hooks'
import { validateGoogleReCaptcha } from '@/lib/helpers'
import type { BillingAddress, CardType } from '@/lib/types'

import type { CustomerAccount } from '@/lib/gql/types'

interface MyAccountTemplateProps {
  user?: CustomerAccount
}

const MyAccountTemplate = (props: MyAccountTemplateProps) => {
  const { user } = props
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const isSubscriptionEnabled = publicRuntimeConfig.isSubscriptionEnabled
  const reCaptchaKey = publicRuntimeConfig.recaptcha.reCaptchaKey
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { logout } = useAuthContext()

  const { cards, contacts, handleSave } = useCardContactActions(user?.id as number)

  const handleGoToOrderHistory = () => {
    router.push('/my-account/order-history?filters=M-6')
  }

  const handleGoToSubscription = useCallback(() => {
    router.push('/my-account/subscription')
  }, [router])

  const { executeRecaptcha } = useReCaptcha()
  const { showSnackbar } = useSnackbarContext()

  const submitFormWithRecaptcha = (
    address: BillingAddress,
    card: CardType,
    isUpdatingAddress: boolean
  ) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    executeRecaptcha('enquiryFormSubmit').then(async (gReCaptchaToken: any) => {
      const captcha = await validateGoogleReCaptcha(gReCaptchaToken)

      if (captcha?.status === 'success') {
        await handleSave(address, card, isUpdatingAddress)
      } else {
        showSnackbar(captcha.message, 'error')
      }
    })
  }

  const shopperAccountActionList = [
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
          onSave={(address, card, isUpdatingAddress) =>
            reCaptchaKey
              ? submitFormWithRecaptcha(address, card, isUpdatingAddress)
              : handleSave(address, card, isUpdatingAddress)
          }
        />
      ),
    },
  ]

  return (
    <Grid container>
      <Grid item md={8} xs={12}>
        {!mdScreen && (
          <Link aria-label={t('back')} sx={{ ...MyAccountTemplateStyle.backButton }} href="/">
            <ChevronLeft />
            {t('back')}
          </Link>
        )}
        <Box
          sx={{
            display: { md: 'flex', xs: 'block' },
            alignItems: 'center',
            ...MyAccountTemplateStyle.myAccountChildren,
          }}
        >
          <Box sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }}>
            <AccountCircle sx={{ ...MyAccountTemplateStyle.accountCircle }} />
          </Box>
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ paddingLeft: { md: '0.5rem', xs: 0 } }}
          >
            {t('my-account')}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'grey.500' }} />

        {shopperAccountActionList.map((data) => {
          return (
            <Box key={data.id}>
              <Accordion disableGutters sx={{ ...MyAccountTemplateStyle.accordion }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ ...MyAccountTemplateStyle.expandedIcon }} />}
                  aria-controls={data.controls}
                  id={data.id}
                  sx={{ ...MyAccountTemplateStyle.accordionSummary }}
                >
                  <Typography variant="h3">{data.header}</Typography>
                </AccordionSummary>
                <AccordionDetails>{data.component}</AccordionDetails>
              </Accordion>
              <Divider sx={{ borderColor: 'grey.500' }} />
            </Box>
          )
        })}

        <Box sx={{ ...MyAccountTemplateStyle.myAccountChildren }}>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('order-details')}</Typography>
        </Box>

        {/* code for subscription below */}
        <Divider sx={{ borderColor: 'grey.500' }} />
        {isSubscriptionEnabled && (
          <Box
            sx={{
              ...MyAccountTemplateStyle.myAccountChildren,
              ...MyAccountTemplateStyle.orderHistory,
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
            ...MyAccountTemplateStyle.myAccountChildren,
            ...MyAccountTemplateStyle.orderHistory,
          }}
          onClick={handleGoToOrderHistory}
        >
          <Typography variant="h3">{t('order-history')}</Typography>
          <ChevronRightIcon />
        </Box>
        <Divider sx={{ backgroundColor: 'grey.300', ...MyAccountTemplateStyle.divider }} />
        <Box
          sx={{ ...MyAccountTemplateStyle.myAccountChildren, cursor: 'pointer' }}
          onClick={logout}
        >
          <Typography variant="h3">{t('logout')}</Typography>
        </Box>
        <Divider sx={{ borderColor: 'grey.500' }} />
      </Grid>
    </Grid>
  )
}

export default MyAccountTemplate
