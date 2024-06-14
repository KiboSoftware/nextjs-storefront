import React, { useEffect, useState } from 'react'

import { GetServerSidePropsContext } from 'next'
import Error from 'next/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ErrorPageTemplate from '@/components/page-templates/ErrorPageTemplate/ErrorPageTemplate'
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  return {
    props: {
      customMessage: { ...(await serverSideTranslations(locale as string, ['common'])) },
      errorMessage: context.query?.errorMessage || '',
    },
  }
}
export default function ErrorMessage({ customMessage = '', errorMessage = '' }) {
  return <Error statusCode={404} title={errorMessage} />
}
