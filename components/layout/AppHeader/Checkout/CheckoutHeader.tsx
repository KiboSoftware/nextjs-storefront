import React from 'react'

import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { KiboLogo } from '@/components/common'
import { useCheckoutQueries, useMultiShipCheckoutQueries } from '@/hooks'

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

const CheckoutHeader = ({ isMultiShipEnabled }: { isMultiShipEnabled: boolean }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { checkoutId } = router.query
  const { data: multishipCheckout } = useMultiShipCheckoutQueries({
    checkoutId: checkoutId as string,
    isMultiship: isMultiShipEnabled,
  })

  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
    isMultiship: isMultiShipEnabled,
  })
  const numberOfItems = multishipCheckout?.items?.length || checkout?.items?.length

  return (
    <>
      <Container maxWidth="xl" sx={checkoutHeaderStyles.container} data-testid="checkout-header">
        <Box position="relative">
          <Link href="/" passHref>
            <KiboLogo small />
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
