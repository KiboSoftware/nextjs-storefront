import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { QuoteDetailsTemplate } from '@/components/page-templates'
import { useGetQuoteByID } from '@/hooks/queries/b2b/quotes/useGetQuoteById/useGetQuoteById'
import { getB2BAccount, getB2BUsers, getQuote } from '@/lib/api/operations'

import type { Quote } from '@/lib/gql/types'
import type { NextPage, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

interface QuotePageProps {
  quoteId: string
  quote: Quote
  mode: string
  currentB2BUser: any
  b2bUsers: any
  b2bAccount: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res, query } = context
  const { quoteId, mode = '' } = query as any
  const draft = true
  const quote = await getQuote(quoteId, draft, req as NextApiRequest, res as NextApiResponse)
  const b2bUsers = (await getB2BUsers(req as NextApiRequest, res as NextApiResponse)) ?? null
  const currentB2BUser =
    (await getB2BUsers(req as NextApiRequest, res as NextApiResponse, quote?.userId as string)) ??
    null
  const b2bAccount = await getB2BAccount(
    req as NextApiRequest,
    res as NextApiResponse,
    quote?.customerAccountId as number
  )

  if (!quote) {
    return { notFound: true }
  }

  return {
    props: {
      quote,
      quoteId,
      mode,
      b2bUsers,
      currentB2BUser,
      b2bAccount,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const QuotePage: NextPage<QuotePageProps> = (props) => {
  const { quoteId, quote: initialQuote, mode, currentB2BUser, b2bUsers, b2bAccount } = props
  const draft = true
  const router = useRouter()
  const { data: quoteResult } = useGetQuoteByID({ quoteId, draft, initialQuote })
  const handleGoToQuotes = () => {
    router.push('/my-account/b2b/quotes')
  }

  return (
    <QuoteDetailsTemplate
      quote={quoteResult as Quote}
      mode={mode}
      currentB2BUser={currentB2BUser}
      initialB2BUsers={b2bUsers}
      onAccountTitleClick={handleGoToQuotes}
      b2bAccount={b2bAccount}
    />
  )
}

export default QuotePage
