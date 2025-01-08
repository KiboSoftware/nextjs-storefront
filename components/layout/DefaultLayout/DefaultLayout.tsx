import React, { ReactElement, useEffect, useRef } from 'react'

import { Container, Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { HydrationBoundary } from '@tanstack/react-query'
import creditCardType from 'credit-card-type'
import Router, { useRouter } from 'next/router'

import { GlobalFetchingIndicator } from '@/components/common'
import { Footer, KiboHeader, Preview } from '@/components/layout'
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
  const router = useRouter()
  const dfMessengerRef = useRef<any>(null)
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
    if(dfMessengerRef.current){
      dfMessengerRef.current.setAttribute('location', 'us')
      dfMessengerRef.current.setAttribute("chat-title", "KiboShopper")
      dfMessengerRef.current.setAttribute("location", "us")
      dfMessengerRef.current.setAttribute("project-id", "kibo-bq-dev-presentation")
      dfMessengerRef.current.setAttribute("agent-id", "33c36d2a-8171-4f3a-807e-50bafe98c3c1")
      dfMessengerRef.current.setAttribute("max-query-length", "-1")
      dfMessengerRef.current.setAttribute("language-code", "en")
    }
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
              <Stack sx={{ minHeight: '100vh' }}>
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
                {router?.isPreview && <Preview />}
              </Stack>
              <df-messenger

        ref={dfMessengerRef}
      >
        <df-messenger-chat-bubble chat-title="Shopping Agent"></df-messenger-chat-bubble>
      </df-messenger>
            </HeaderContextProvider>
          </AuthContextProvider>
        </ModalContextProvider>
      </ThemeProvider>
    </HydrationBoundary>
  )
}

export default DefaultLayout
