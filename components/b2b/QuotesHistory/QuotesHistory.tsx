import React from 'react'

import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { quoteGetters } from '@/lib/getters'

import { AuditRecord, AuditRecordChange, AuditRecordChangeField } from '@/lib/gql/types'

const ChangeDetails = ({ field }: { field: AuditRecordChangeField }) => {
  return (
    <Grid container key={field?.name} display="flex" justifyContent={'space-between'}>
      <Grid item xs={4}>
        <Typography variant={'body2'} sx={{ pr: 1 }} gutterBottom>
          {field?.name ?? '-'}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant={'body2'} gutterBottom sx={{ pr: 1, marginInline: 3 }}>
          {field?.oldValue ?? '-'}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant={'body2'} gutterBottom sx={{ pr: 1 }}>
          {field?.newValue ?? '-'}
        </Typography>
      </Grid>
    </Grid>
  )
}

interface QuoteHistoryProps {
  // Define your props here
  auditHistory: AuditRecord[]
  userIdAndEmails?: any
}

const QuoteHistoryItem = ({
  record,
  userIdAndEmails,
}: {
  record: AuditRecord
  userIdAndEmails?: any
}) => {
  const { id, getRecordCreatedBy, getRecordUpdateDate } = quoteGetters.getRecordDetails(record)

  const { t } = useTranslation('common')

  const actionText: any = {
    Add: t('added'),
    Update: t('updated'),
    Remove: t('removed'),
  }

  return (
    <Stack spacing={2} pb={1} data-testid={`quote-history-item`}>
      <Box display="flex" flexDirection="row">
        <Typography variant={'body2'} fontWeight={'bold'} color={'text.primary'} gutterBottom>{`${t(
          'updated-by'
        )}: `}</Typography>
        <Typography variant="body2" color={'grey.600'}>
          {quoteGetters.getEmailAddressAndDate(
            getRecordCreatedBy,
            getRecordUpdateDate,
            userIdAndEmails
          )}
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
      {record?.changes?.map((change, index) => {
        return (
          <Stack key={(change?.type as string) + index}>
            <Typography variant="body2">
              {actionText[quoteGetters.getRecordType(change as AuditRecordChange)]}
            </Typography>
            {change?.fields?.map((field, index) => (
              <ChangeDetails
                key={(field?.name as string) + index}
                field={field as AuditRecordChangeField}
              />
            ))}
          </Stack>
        )
      })}
      <Box>
        <Divider />
      </Box>
    </Stack>
  )
}

const QuoteHistory = (props: QuoteHistoryProps) => {
  const { auditHistory, userIdAndEmails } = props
  const { t } = useTranslation('common')

  if (auditHistory?.length === 0) {
    return <Typography variant="body2">{t('no-quote-history')}</Typography>
  }

  return (
    <>
      {auditHistory?.map((record, index) => (
        <QuoteHistoryItem
          key={(record?.auditInfo?.createBy as string) + index}
          record={record}
          userIdAndEmails={userIdAndEmails}
        />
      ))}
    </>
  )
}

export default QuoteHistory
