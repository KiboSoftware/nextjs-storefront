import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { QuotesTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { useB2BQuote, useGetQuotes } from '@/hooks'
import { getCurrentUser, getQuotes } from '@/lib/api/operations'
import { parseFilterParamToObject } from '@/lib/helpers'

import { QuoteCollection } from '@/lib/gql/types'

interface QuotesPageProps {
  quotes: QuoteCollection
  customerAccount?: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const response = await getCurrentUser(req as NextApiRequest, res as NextApiResponse)
  const quotes = await getQuotes(
    req as NextApiRequest,
    res as NextApiResponse,
    response?.customerAccount?.id
  )

  return {
    props: {
      quotes,
      customerAccount: response?.customerAccount,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const QuotesPage: NextPage<QuotesPageProps> = (props) => {
  const { quotes, customerAccount: customerAccountFromServer } = props
  const { user: customerAccountFromClient } = useAuthContext()

  const customerAccount = {
    ...customerAccountFromServer,
    ...customerAccountFromClient,
  }
  const { quotesSearchParam, sortingValues, handleQuotesSearchParam } = useB2BQuote({
    accountId: customerAccount?.id,
    quotes,
  })

  const { data: quoteCollection } = useGetQuotes(quotesSearchParam, quotes)

  return (
    <QuotesTemplate
      quoteCollection={quoteCollection as QuoteCollection}
      sortingValues={sortingValues}
      filters={parseFilterParamToObject(quotesSearchParam.filter as string)}
      setQuotesSearchParam={handleQuotesSearchParam}
    />
  )
}

export default QuotesPage
