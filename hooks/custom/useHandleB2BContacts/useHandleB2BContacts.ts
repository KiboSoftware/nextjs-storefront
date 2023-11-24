import { useState } from 'react'

import { QueryQuotesArgs } from '@/lib/gql/types'

export const useHandleB2BContacts = ({
  salesRepUserId,
  b2bContacts: initialData,
}: {
  salesRepUserId: string
  b2bContacts?: {
    startIndex: number
    pageSize: number
    pageCount: number
    totalCount: number
    items: any[]
  }
}) => {
  const [b2bContactsSearchParam, setB2BContactsSearchParam] = useState<QueryQuotesArgs>({
    filter: `salesrep.userid eq '${salesRepUserId}'`,
    pageSize: initialData?.pageSize || 5,
    sortBy: 'email asc',
    startIndex: initialData?.startIndex || 0,
    q: '',
  })

  const handleB2BContactsSearchParam = (param: QueryQuotesArgs) => {
    if (param.filter === b2bContactsSearchParam.filter) return
    setB2BContactsSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      ...param,
    }))
  }

  return {
    b2bContactsSearchParam,
    handleB2BContactsSearchParam,
  }
}
