import React from 'react'

import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { quoteGetters } from '@/lib/getters'

import { AuditRecord } from '@/lib/gql/types'

interface QuoteHistoryProps {
  // Define your props here
  auditHistory: AuditRecord[]
}

const QuoteHistoryItem = ({ record }: { record: AuditRecord }) => {
  const { id, recordType, getRecordCreatedBy, getRecordUpdateDate, changedFields } =
    quoteGetters.getRecordDetails(record)

  const { t } = useTranslation('common')

  const actionText: any = {
    Add: t('added-by'),
    Update: t('updated-by'),
  }

  return (
    <Stack spacing={2} pb={1} data-testid={`quote-history-item`}>
      <Box>
        <Typography
          variant={'body2'}
          fontWeight={'bold'}
          color={'text.primary'}
          gutterBottom
        >{`${actionText[recordType]}: ${getRecordCreatedBy}`}</Typography>
        <Typography variant="body2" color={'grey.600'}>
          {getRecordUpdateDate}
        </Typography>
      </Box>
      <Grid container display="flex" justifyContent={'space-between'}>
        <Grid item xs={4}>
          <Typography variant={'body2'} color="grey.600" sx={{ pr: 1 }}>
            {t('field-change')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant={'body2'} color="grey.600" sx={{ pr: 1 }}>
            {t('changed-from')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant={'body2'} color="grey.600" sx={{ pr: 1 }}>
            {t('changed-to')}
          </Typography>
        </Grid>
      </Grid>
      {changedFields.map((field) => (
        <Grid container key={field.name} display="flex" justifyContent={'space-between'}>
          <Grid item xs={4}>
            <Typography variant={'body2'} sx={{ pr: 1 }} data-testid={`field-name-${id}`}>
              {field?.name ?? '-'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant={'body2'} sx={{ pr: 1 }} data-testid={`old-value-${id}`}>
              {field.oldValue ?? '-'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant={'body2'} sx={{ pr: 1 }} data-testid={`new-value-${id}`}>
              {field?.newValue ?? '-'}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Box>
        <Divider />
      </Box>
    </Stack>
  )
}

const QuoteHistory = (props: QuoteHistoryProps) => {
  const { auditHistory } = props
  const { t } = useTranslation('common')

  // Your component logic here

  if (auditHistory.length === 0) {
    return <Typography variant="body2">{t('no-quote-history')}</Typography>
  }

  return (
    <>
      {auditHistory.map((record) => (
        <QuoteHistoryItem key={record.id} record={record} />
      ))}
    </>
  )
}

export default QuoteHistory
