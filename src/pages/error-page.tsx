import React, { useEffect, useState } from 'react'

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ErrorPageTemplate from '@/components/page-templates/ErrorPageTemplate/ErrorPageTemplate'
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
const ErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get('errorMessage');
    setErrorMessage(error || 'Unknown error');
  }, []);
  
  return (
    <>
      <ErrorPageTemplate errorMessage={errorMessage}></ErrorPageTemplate>
    </>
  );
};

export default ErrorMessage;


