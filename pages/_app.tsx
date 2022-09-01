import React, { useState } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'next-i18next.config'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Hydrate, QueryClientProvider } from 'react-query'
import '../styles/nprogress.css'

import createEmotionCache from '../lib/createEmotionCache'
import { generateQueryClient } from '../lib/react-query/queryClient'
import theme from '../styles/theme'
import { GlobalFetchingIndicator } from '@/components/common'
import { KiboHeader, Footer } from '@/components/layout'
import { AuthContextProvider, ModalContextProvider, DialogRoot } from '@/context'
import { footerConfig as footerProps } from '@/lib/constants'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface KiboAppProps extends AppProps {
  emotionCache?: EmotionCache
}
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = (props: KiboAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [queryClient] = useState(() => generateQueryClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Kibo Commerce - NextJS</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ModalContextProvider>
            <AuthContextProvider>
              <Hydrate state={pageProps.dehydratedState}>
                <GlobalFetchingIndicator />
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
                    {
                      link: '#',
                      text: 'Nav Link 2',
                    },
                    {
                      link: '#',
                      text: 'Nav Link 3',
                    },
                  ]}
                  categoriesTree={pageProps.categoriesTree || []}
                  sticky={true}
                />
                <DialogRoot />
                <Container maxWidth={'xl'}>
                  <Component {...pageProps} />
                </Container>
                <Footer {...footerProps} />
              </Hydrate>
            </AuthContextProvider>
          </ModalContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default appWithTranslation<KiboAppProps>(App)
