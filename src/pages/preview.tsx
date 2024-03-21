import { setCookie } from 'cookies-next'

import type { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context
  await fetch(`http://localhost:3000/api/preview?siteId=${params?.siteId}`)

  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  }
}

const PreviewPage = () => {
  return <></>
}

export default PreviewPage
