import React, { ReactElement, useEffect } from 'react'

import { Container, Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { HydrationBoundary } from '@tanstack/react-query'
import creditCardType from 'credit-card-type'
import Router from 'next/router'

import { GlobalFetchingIndicator } from '@/components/common'
import { Footer, KiboHeader } from '@/components/layout'
import {
  AuthContextProvider,
  ModalContextProvider,
  DialogRoot,
  HeaderContextProvider,
  SnackbarRoot,
} from '@/context'
import theme from '@/styles/theme'

creditCardType.updateCard('mastercard', {
  niceType: 'MC',
})

creditCardType.updateCard('american-express', {
  niceType: 'AMEX',
})

const DefaultLayout = ({ pageProps, children }: { pageProps: any; children: ReactElement }) => {
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      const isMyAccountPage = url.includes('/my-account')
      const isCheckoutPage = url.includes('/checkout')
      const divElement = document.querySelector<HTMLElement>('.grecaptcha-badge')
      if (divElement) {
        if (isMyAccountPage || isCheckoutPage) {
          divElement.style.visibility = 'visible'
        } else {
          divElement.style.visibility = 'hidden'
        }
      }
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return (
    <HydrationBoundary state={pageProps.dehydratedState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalContextProvider>
          <AuthContextProvider>
            <HeaderContextProvider>
              <GlobalFetchingIndicator />
              <Stack>
                <KiboHeader
                  navLinks={[
                    {
                      link: '/order-status',
                      text: 'order-status',
                    },
                    {
                      link: '/wishlist',
                      text: 'wishlist',
                    },
                  ]}
                  categoriesTree={pageProps.categoriesTree || []}
                  isSticky={true}
                />
                <DialogRoot />
                <SnackbarRoot />
                <Container maxWidth={'xl'} sx={{ py: 2, flex: '1 0 auto' }}>
                  {children}
                </Container>
                <Footer content={pageProps.footer} />
              </Stack>
            </HeaderContextProvider>
          </AuthContextProvider>
        </ModalContextProvider>
      </ThemeProvider>
    </HydrationBoundary>
  )
}

export default DefaultLayout
