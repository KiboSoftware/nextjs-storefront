import React from 'react'

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

import { B2BTemplateStyle } from './B2BTemplate.styles'
import { MyAccountTemplateStyle } from '../../MyAccountTemplate/MyAccountTemplate.styles'
import { MyProfile, PaymentMethod, AddressBook } from '@/components/my-account'
import { useAuthContext, useSnackbarContext } from '@/context'
import { useCardContactActions } from '@/hooks'
import { validateGoogleReCaptcha } from '@/lib/helpers'
import type { BillingAddress, CardType } from '@/lib/types'

import type { CustomerAccount } from '@/lib/gql/types'

interface B2BTemplateProps {
  user?: CustomerAccount
  children?: React.ReactNode
}

interface B2BTemplateListItemProps {
  heading: string
  onClick?: () => void
}

export const B2BTemplateListItem = ({ heading, onClick }: B2BTemplateListItemProps) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Divider sx={{ borderColor: 'grey.500' }} />
      <Box
        sx={{
          ...MyAccountTemplateStyle.myAccountChildren,
          ...MyAccountTemplateStyle.orderHistory,
        }}
        onClick={onClick}
      >
        <Typography variant="h3">{t(heading)}</Typography>
        <ChevronRightIcon />
      </Box>
    </>
  )
}

const B2BTemplate = (props: B2BTemplateProps) => {
  const { user } = props
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const reCaptchaKey = publicRuntimeConfig.recaptcha.reCaptchaKey
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { logout } = useAuthContext()
  const { executeRecaptcha } = useReCaptcha()
  const { showSnackbar } = useSnackbarContext()

  const { cards, contacts, handleSave } = useCardContactActions(user?.id as number)

  const handleGoToOrderHistory = () => {
    router.push('/my-account/order-history?filters=M-6')
  }

  const handleGoToQuickOrder = () => {
    router.push('/my-account/b2b/quick-order')
  }

  const handleGoToQuotes = () => {
    router.push('/my-account/b2b/quotes')
  }

  const handleGoToLists = () => {
    router.push('/my-account/b2b/lists')
  }

  const submitFormWithRecaptcha = async (
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
      id: 'account-information-accordion',
      controls: 'account-information-content',
      header: t('account-information'),
      component: <MyProfile user={user as CustomerAccount} isB2BTemplate />,
      path: null,
    },
    {
      id: 'account-hierarchy-accordion',
      controls: 'account-hierarchy-content',
      header: t('account-hierarchy'),
      component: null,
      path: '/my-account/b2b/account-hierarchy',
    },
    {
      id: 'users-accordion',
      controls: 'users-content',
      header: t('users'),
      component: null,
      path: '/my-account/b2b/users',
    },
    {
      id: 'address-book-accordion',
      controls: 'address-book-content',
      header: t('address-book'),
      component: <AddressBook user={user as CustomerAccount} contacts={contacts} />,
    },
    {
      id: 'payment-information-accordion',
      controls: 'payment-information-content',
      header: t('payment-information'),
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
    {
      id: 'custom-attributes-accordion',
      controls: 'custom-attributes-content',
      header: t('custom-attributes'),
      component: null,
      path: null,
    },
  ]

  return (
    <Grid container>
      <Grid item md={8} xs={12}>
        <Link aria-label={t('back')} sx={{ ...B2BTemplateStyle.backButton }} href="/">
          <ChevronLeft />
          {t('back')}
        </Link>
        <Box sx={{ ...B2BTemplateStyle.accountCircleBox }}>
          <AccountCircle sx={{ ...B2BTemplateStyle.accountCircle }} />
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ paddingLeft: { md: '0.5rem', xs: 0 } }}
          >
            {user?.companyOrOrganization}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { md: 'flex', xs: 'block' },
            alignItems: 'center',
            ...MyAccountTemplateStyle.myAccountChildren,
          }}
        >
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ paddingLeft: { md: '0.5rem', xs: 0 } }}
          >
            {t('account')}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'grey.500' }} />

        {shopperAccountActionList.map((data) => {
          return (
            <Box key={data.id}>
              <Accordion disableGutters sx={{ ...MyAccountTemplateStyle.accordion }}>
                <AccordionSummary
                  onClick={() => data.path && router.push(data.path)}
                  expandIcon={
                    data.component && (
                      <ExpandMoreIcon sx={{ ...MyAccountTemplateStyle.expandedIcon }} />
                    )
                  }
                  aria-controls={data.controls}
                  id={data.id}
                  sx={{ ...MyAccountTemplateStyle.accordionSummary }}
                >
                  <Typography variant="h3">{data.header}</Typography>
                </AccordionSummary>
                {data.component && <AccordionDetails>{data.component}</AccordionDetails>}
              </Accordion>
              <Divider sx={{ borderColor: 'grey.500' }} />
            </Box>
          )
        })}

        <Box sx={{ ...MyAccountTemplateStyle.myAccountChildren }}>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('orders')}</Typography>
        </Box>

        <B2BTemplateListItem heading="quick-order" onClick={handleGoToQuickOrder} />
        <B2BTemplateListItem heading="order-history" onClick={handleGoToOrderHistory} />
        <B2BTemplateListItem heading="returns" />
        <B2BTemplateListItem heading="quotes" onClick={handleGoToQuotes} />
        <B2BTemplateListItem heading="lists" onClick={handleGoToLists} />

        <Divider sx={{ backgroundColor: 'grey.300', ...B2BTemplateStyle.divider }} />
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

export default B2BTemplate
