import * as React from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Hydrate, QueryClientProvider } from 'react-query'

import TopBar from '../components/TopBar'
import createEmotionCache from '../lib/createEmotionCache'
import { generateQueryClient } from '../lib/react-query/queryClient'
import theme from '../styles/theme'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface KiboAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App = (props: KiboAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [queryClient] = React.useState(() => generateQueryClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Title</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <TopBar />
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default appWithTranslation<KiboAppProps>(App)
