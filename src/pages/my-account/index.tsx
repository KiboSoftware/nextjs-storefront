import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import { MyAccountTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { decodeParseCookieValue } from '@/lib/helpers'

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, req } = context

  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()
  const cookies = req?.cookies
  const authTicket = decodeParseCookieValue(cookies[authCookieName])

  return {
    props: {
      isAuthenticated: !!authTicket,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const MyAccountPage: NextPage = (props: any) => {
  const { isAuthenticated: serverSideIsAuthenticated } = props
  const { user: customerAccount } = useAuthContext()
  const { publicRuntimeConfig } = getConfig()
  const { reCaptchaKey } = publicRuntimeConfig.recaptcha

  return (
    <>
      {serverSideIsAuthenticated && customerAccount ? (
        <ReCaptchaProvider reCaptchaKey={reCaptchaKey}>
          <MyAccountTemplate user={customerAccount} />
        </ReCaptchaProvider>
      ) : null}
    </>
  )
}

export default MyAccountPage
