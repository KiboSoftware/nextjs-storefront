import React, { useState } from 'react'

import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { QuotesTable } from '@/components/b2b'
import MobileB2BLayout from '@/components/layout/MobileB2BLayout/MobileB2BLayout'
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
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const breadcrumbList = [{ key: 'quotes', backText: t('my-account'), redirectURL: '/my-account' }]
  const activeBreadCrumb = breadcrumbList.filter((item) => item.key === 'quotes')[0]

  const onBackClick = () => {
    router.push(activeBreadCrumb.redirectURL)
  }

  const handleCreateNewTemplate = async () => {
    try {
      const createQuoteResponse = await createQuote.mutateAsync({
        customerAccountId: user?.id as number,
      })

      if (createQuoteResponse?.id) {
        router.push(`/my-account/b2b/quote/${createQuoteResponse.id}?mode=create`)
      }
      return null
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Grid container gap={3}>
      <MobileB2BLayout
        headerText={t('quotes')}
        backText={activeBreadCrumb?.backText}
        onBackClick={onBackClick}
      />

      <Grid item xs={12}>
        <Box width={'100%'}>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleCreateNewTemplate}
            {...(!mdScreen && { fullWidth: true })}
          >
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
          showActionButtons={true}
        />
      </Grid>
    </Grid>
  )
}

export default QuotesTemplate
