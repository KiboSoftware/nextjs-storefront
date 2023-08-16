import React from 'react'

import { Box, Button, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { QuotesTable } from '@/components/b2b'
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

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1">{t('quotes')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box width={'100%'}>
          <Button variant="contained" color="inherit">
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
