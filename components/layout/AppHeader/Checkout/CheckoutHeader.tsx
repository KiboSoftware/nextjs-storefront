import React from 'react'

import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { KiboLogo } from '@/components/common'

const checkoutHeaderStyles = {
  container: {
    backgroundColor: 'common.black',
    height: '55px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 2,
  },
}

const CheckoutHeader = ({ numberOfItems }: { numberOfItems: number }) => {
  const { t } = useTranslation()

  return (
    <>
      <Container maxWidth="xl" sx={checkoutHeaderStyles.container} data-testid="checkout-header">
        <Box position="relative">
          <Link href="/" passHref>
            <MuiLink>
              <KiboLogo small />
            </MuiLink>
          </Link>
        </Box>

        <Box>
          <Typography variant={'h2'} component="div">
            {t('checkout', { numberOfItems })}
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default CheckoutHeader
