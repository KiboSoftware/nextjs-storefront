import { useState } from 'react'

import { GetServerSidePropsContext, NextPage } from 'next'
import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { QuotesTemplate } from '@/components/page-templates'
import { useGetQuotes } from '@/hooks'
import { parseFilterParamToObject } from '@/lib/helpers'

import { QueryQuotesArgs, QuoteCollection } from '@/lib/gql/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const QuotesPage: NextPage = (props) => {
  const { publicRuntimeConfig } = getConfig()

  const [quotesSearchParam, setQuotesSearchParam] = useState<QueryQuotesArgs>({
    filter: '',
    pageSize: parseInt(publicRuntimeConfig.B2BQuotes.pageSize) || 5,
    sortBy: 'number desc',
    startIndex: 0,
    q: '',
  })

  const sortingValues = {
    options: publicRuntimeConfig.B2BQuotes.sortOptions,
    selected: quotesSearchParam.sortBy as string,
  }

  const { data: quoteCollection } = useGetQuotes(quotesSearchParam)

  const handleQuotesSearchParam = (param: QueryQuotesArgs) => {
    setQuotesSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      ...param,
    }))
  }

  return (
    <>
      <QuotesTemplate
        {...props}
        quoteCollection={quoteCollection as QuoteCollection}
        sortingValues={sortingValues}
        filters={parseFilterParamToObject(quotesSearchParam.filter as string)}
        setQuotesSearchParam={handleQuotesSearchParam}
      />
    </>
  )
}

export default QuotesPage
