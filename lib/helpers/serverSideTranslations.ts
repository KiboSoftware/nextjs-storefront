/**
 * Wrapper for serverSideTranslations that includes the next-i18next config
 * This is required for Vercel serverless deployments
 *
 * NOTE: This file should only be imported in getServerSideProps or getStaticProps
 */

export const serverSideTranslations = async (locale: string, namespacesRequired?: string[]) => {
  // Dynamic imports to prevent webpack from bundling this in client
  const { serverSideTranslations: nextI18nextServerSideTranslations } = await import(
    'next-i18next/serverSideTranslations'
  )
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nextI18NextConfig = require('../../next-i18next.config')

  return nextI18nextServerSideTranslations(
    locale,
    namespacesRequired || ['common'],
    nextI18NextConfig
  )
}
