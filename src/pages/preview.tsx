import { setCookie } from 'cookies-next'

import type { GetServerSidePropsContext } from 'next'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { req, res, query } = context
  if (query.isPreview === 'true') {
    setCookie('isPreview', true, { req, res, maxAge: 60 * 60 * 24 * 365, path: '/' })
    return {
      redirect: {
        destination: `/`,
        permanent: true,
      },
    }
  }

  return {
    notFound: true,
  }
}

const PreviewPage = () => {
  return <></>
}

export default PreviewPage
