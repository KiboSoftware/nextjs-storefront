import React from 'react'

import { Box, Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { QuotesTable } from '@/components/b2b'
import { useAuthContext } from '@/context'
import { useCreateQuote } from '@/hooks'
import { QuoteFilters, QuoteSortingOptions } from '@/lib/types'

import { QueryQuotesArgs, QuoteCollection } from '@/lib/gql/types'

interface QuotesTemplateProps {
  sortingValues: QuoteSortingOptions
  quoteCollection: QuoteCollection
  filters: QuoteFilters
  setQuotesSearchParam: (param: QueryQuotesArgs) => void
}

const QuotesTemplate = (props: QuotesTemplateProps) => {
  const { quoteCollection, sortingValues, filters, setQuotesSearchParam } = props
  const { t } = useTranslation('common')
  const router = useRouter()
  const { createQuote } = useCreateQuote()
  const { user } = useAuthContext()

  const handleCreateNewTemplate = async () => {
    try {
      const createQuoteResponse = await createQuote.mutateAsync({
        customerAccountId: user?.id as number,
      })
      console.log('createquoteresponse', createQuoteResponse)

      if (createQuoteResponse?.id) {
        router.push(`/my-account/quote/${createQuoteResponse.id}`)
      }
      return null
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1">{t('quotes')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box width={'100%'}>
          <Button variant="contained" color="inherit" onClick={handleCreateNewTemplate}>
            {t('create-a-quote')}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <QuotesTable
          setQuotesSearchParam={setQuotesSearchParam}
          quoteCollection={quoteCollection}
          sortingValues={sortingValues}
          filters={filters}
        />
      </Grid>
    </Grid>
  )
}

export default QuotesTemplate
