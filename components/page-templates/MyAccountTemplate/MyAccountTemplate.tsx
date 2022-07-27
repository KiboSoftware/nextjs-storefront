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
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { FullWidthDivider } from '@/components/common'

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

const MyAcccountTemplate = () => {
  const { t } = useTranslation(['checkout', 'common'])
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const handleGoToOrderHistory = () => {
    router.push('/my-account/order-history')
  }

  const handleLogOut = () => {
    console.log('logout')
  }

  return (
    <>
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
        <Typography variant={mdScreen ? 'h1' : 'h2'} sx={{ paddingLeft: { md: '0.5rem', xs: 0 } }}>
          {t('common:my-account')}
        </Typography>
      </Box>
      {mdScreen ? (
        <Divider sx={{ borderColor: 'grey.500' }} />
      ) : (
        <FullWidthDivider color="grey.500" />
      )}
      <Accordion disableGutters sx={{ ...style.accordion }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ ...style.expandedIcon }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ ...style.accordionSummary }}
        >
          <Typography variant="h3">{t('common:my-profile')}</Typography>
        </AccordionSummary>
        <AccordionDetails>{/* Todo */}</AccordionDetails>
      </Accordion>
      {mdScreen ? (
        <Divider sx={{ borderColor: 'grey.500' }} />
      ) : (
        <FullWidthDivider color="grey.500" />
      )}
      <Accordion disableGutters sx={{ ...style.accordion }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ ...style.expandedIcon }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ ...style.accordionSummary }}
        >
          <Typography variant="h3">{t('address-book')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{/* TODO */}</Typography>
        </AccordionDetails>
      </Accordion>
      {mdScreen ? (
        <Divider sx={{ borderColor: 'grey.500' }} />
      ) : (
        <FullWidthDivider color="grey.500" />
      )}
      <Accordion disableGutters sx={{ ...style.accordion }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ ...style.expandedIcon }} />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          sx={{ ...style.accordionSummary }}
        >
          <Typography variant="h3">{t('payment-method')}</Typography>
        </AccordionSummary>
        <AccordionDetails>{/* TODO */}</AccordionDetails>
      </Accordion>
      {mdScreen ? (
        <Divider sx={{ borderColor: 'grey.500' }} />
      ) : (
        <FullWidthDivider color="grey.500" />
      )}
      <Box sx={{ ...style.myAccountChildren }}>
        <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('order-details')}</Typography>
      </Box>
      {mdScreen ? (
        <Divider sx={{ borderColor: 'grey.500' }} />
      ) : (
        <FullWidthDivider color="grey.500" />
      )}
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
      {mdScreen ? (
        <Divider sx={{ backgroundColor: 'grey.300', ...style.divider }} />
      ) : (
        <FullWidthDivider sx={{ backgroundColor: 'grey.500', ...style.divider }} />
      )}
      <Box sx={{ ...style.myAccountChildren, cursor: 'pointer' }} onClick={handleLogOut}>
        <Typography variant="h3">{t('common:logout')}</Typography>
      </Box>
      {mdScreen ? (
        <Divider sx={{ borderColor: 'grey.500' }} />
      ) : (
        <FullWidthDivider color="grey.500" />
      )}
    </>
  )
}

export default MyAcccountTemplate
