import * as React from 'react'

// eslint-disable-next-line @next/next/no-document-import-in-page
import createEmotionServer from '@emotion/server/create-instance'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import createEmotionCache from '../../lib/createEmotionCache'
import theme from '../../styles/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          {/* acsbapp.com added, comment if not required */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  var s = document.createElement('script');
                  var h = document.querySelector('head') || document.body;
                  s.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
                  s.async = true;
                  s.onload = function(){
                    acsbJS.init({
                      statementLink : '',
                      footerHtml : '',
                      hideMobile : false,
                      hideTrigger : false,
                      disableBgProcess : false,
                      language : 'en',
                      position : 'right',
                      leadColor : '#146FF8',
                      triggerColor : '#146FF8',
                      triggerRadius : '50%',
                      triggerPositionX : 'right',
                      triggerPositionY : 'bottom',
                      triggerIcon : 'people',
                      triggerSize : 'bottom',
                      triggerOffsetX : 20,
                      triggerOffsetY : 20,
                      mobile : {
                        triggerSize : 'small',
                        triggerPositionX : 'right',
                        triggerPositionY : 'bottom',
                        triggerOffsetX : 10,
                        triggerOffsetY : 10,
                        triggerRadius : '20'
                      }
                    });
                  };
                  h.appendChild(s);
                })();
              `,
            }}
          />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const view = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    view({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  }
}
