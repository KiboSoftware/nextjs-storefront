import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CreateNewQuoteTemplate } from '@/components/page-templates'
import { useGetQuoteByID } from '@/hooks/queries/quotes/useGetQuoteById/useGetQuoteById'
import { getQuote } from '@/lib/api/operations'

import type { Quote } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

interface QuotePageProps {
  quoteId: string
  quote: Quote
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params, req, res } = context
  const { quoteId } = params as any
  const draft = true
  const quote = await getQuote(quoteId, draft, req as NextApiRequest, res as NextApiResponse)

  if (!quote) {
    return { notFound: true }
  }

  return {
    props: {
      quote,
      quoteId,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const QuotePage: NextPage<QuotePageProps> = (props) => {
  const { quoteId, quote: initialQuote } = props
  const draft = true
  const router = useRouter()
  const { data: quoteResult } = useGetQuoteByID({ quoteId, draft, initialQuote })
  const handleGoToQuotes = () => {
    router.push('/my-account/b2b/quotes')
  }
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <CreateNewQuoteTemplate quote={quoteResult as Quote} onAccountTitleClick={handleGoToQuotes} />
    </>
  )
}

export default QuotePage
