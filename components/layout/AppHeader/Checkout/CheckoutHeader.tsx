import React from 'react'

import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { KiboLogo } from '@/components/common'
import { useCheckoutQueries } from '@/hooks'
import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

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

const CheckoutHeader = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { checkoutId } = router.query
  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
  })
  const numberOfItems = orderGetters.getCheckoutItemCount(checkout as Order)

  return (
    <>
      <Container maxWidth="xl" sx={checkoutHeaderStyles.container} data-testid="checkout-header">
        <Box position="relative">
          <Link href="/" passHref>
            {/* <MuiLink>
              <KiboLogo small />
            </MuiLink> */}
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
