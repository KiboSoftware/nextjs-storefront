import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { QuotesTemplate } from '@/components/page-templates'
import { useB2BQuote, useGetQuotes } from '@/hooks'
import { getQuotes } from '@/lib/api/operations'
import { parseFilterParamToObject } from '@/lib/helpers'

import { QuoteCollection } from '@/lib/gql/types'

interface QuotesPageProps {
  quotes: QuoteCollection
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const quotes = await getQuotes(req as NextApiRequest, res as NextApiResponse)

  return {
    props: {
      quotes,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const QuotesPage: NextPage<QuotesPageProps> = (props) => {
  const { quotes } = props

  const { quotesSearchParam, sortingValues, handleQuotesSearchParam } = useB2BQuote(quotes)

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
