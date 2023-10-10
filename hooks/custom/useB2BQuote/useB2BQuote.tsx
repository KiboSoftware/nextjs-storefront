import { useState } from 'react'

import getConfig from 'next/config'

import { QueryQuotesArgs, QuoteCollection } from '@/lib/gql/types'

export const useB2BQuote = ({
  accountId,
  quotes: initialData,
}: {
  accountId?: number
  quotes?: QuoteCollection
}) => {
  const { publicRuntimeConfig } = getConfig()

  const [quotesSearchParam, setQuotesSearchParam] = useState<QueryQuotesArgs>({
    filter: `customerAccountId eq ${accountId}`,
    pageSize: initialData?.pageSize || 5,
    sortBy: 'number desc',
    startIndex: initialData?.startIndex || 0,
    q: '',
  })

  const sortingValues = {
    options: publicRuntimeConfig.B2BQuotes.sortOptions,
    selected: quotesSearchParam.sortBy as string,
  }

  const handleQuotesSearchParam = (param: QueryQuotesArgs) => {
    if (param.filter === quotesSearchParam.filter) return
    setQuotesSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      ...param,
    }))
  }

  return {
    quotesSearchParam,
    sortingValues,
    handleQuotesSearchParam,
  }
}
