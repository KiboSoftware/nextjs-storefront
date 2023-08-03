import React from 'react'

import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { quoteMock } from '@/__mocks__/stories/quoteMock'
import { QuotesHistory } from '@/components/b2b'
import { KiboDialog } from '@/components/common'

interface QuoteHistoryDialogProps {
  closeModal: () => void
}

const QuoteHistoryDialog = (props: QuoteHistoryDialogProps) => {
  const { closeModal } = props
  const { t } = useTranslation('common')

  const DialogArgs = {
    Title: t('quote-history'),
    Content: <QuotesHistory auditHistory={quoteMock.auditHistory} />,
    Actions: (
      <Stack width="20%">
        <Button
          name="clear"
          size="small"
          sx={{ width: '100%' }}
          variant="contained"
          color="secondary"
          onClick={() => closeModal()}
        >
          {t('close')}
        </Button>
      </Stack>
    ),
    showContentTopDivider: true,
    showContentBottomDivider: false,
    isDialogCentered: true,
    customMaxWidth: '35rem',
    onClose: () => closeModal(),
  }

  return <KiboDialog {...DialogArgs} />
}
export default QuoteHistoryDialog
