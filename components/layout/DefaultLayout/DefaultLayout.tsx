import React, { ReactElement, useEffect } from 'react'

import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { HydrationBoundary } from '@tanstack/react-query'
import creditCardType from 'credit-card-type'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { Hydrate } from 'react-query'

const Footer = dynamic(() => import('@/components/layout').then((mod) => mod.Footer), {
  ssr: false,
})
import { GlobalFetchingIndicator } from '@/components/common'
import { KiboHeader } from '@/components/layout'
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

// const nonSupportedCards = [
//   'diners-club',
//   'elo',
//   'hiper',
//   'hipercard',
//   'jcb',
//   'maestro',
//   'mir',
//   'unionpay',
// ]

// nonSupportedCards.forEach((card) => creditCardType.removeCard(card))

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
    <Hydrate state={pageProps.dehydratedState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalContextProvider>
          <AuthContextProvider>
            <HeaderContextProvider>
              <HydrationBoundary state={pageProps.dehydratedState}>
                <GlobalFetchingIndicator />
                <KiboHeader
                  navLinks={[
                    {
                      link: '/order-status',
                      text: 'order-status',
                    },
                  ]}
                  categoriesTree={pageProps.categoriesTree || []}
                  isSticky={true}
                />
                <DialogRoot />
                <SnackbarRoot />
                <Container maxWidth={'lg'}>{children}</Container>
                <Footer content={pageProps.footer} />
              </HydrationBoundary>
            </HeaderContextProvider>
          </AuthContextProvider>
        </ModalContextProvider>
      </ThemeProvider>
    </Hydrate>
  )
}

export default DefaultLayout
