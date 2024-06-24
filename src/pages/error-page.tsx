import React from 'react'

import { Box, Typography } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      errorMessage: context.query?.message || '',
      status: context.query?.status,
    },
  }
}

interface ErrorPageProps {
  errorMessage: string
  status: number
}
export default function ErrorPage({ errorMessage = '', status }: ErrorPageProps) {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{status}</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          minHeight: '50vh',
          margin: 0,
          padding: '2rem',
        }}
      >
        {Boolean(status && errorMessage) && (
          <Box display={'flex'} gap={2}>
            <Box pr={2} borderRight={'1px solid rgba(0, 0,0,0.5)'}>
              <Typography variant="h4">{status}</Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography variant="subtitle2" gutterBottom>
                {errorMessage}
              </Typography>
            </Box>
          </Box>
        )}
        <Box>
          <Typography variant="h5">{t('error-cartTakeover')}</Typography>
        </Box>
      </Box>
    </>
  )
}
