import React from 'react'

import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ViewAccountDetails } from '@/components/b2b'
import { KiboDialog } from '@/components/common'

import { B2BAccount } from '@/lib/gql/types'

interface ViewAccountDetailsDialogProps {
  formTitle?: string
  b2BAccount: B2BAccount
  onClose: () => void
}
const ViewAccountDetailsDialog = (props: ViewAccountDetailsDialogProps) => {
  const { t } = useTranslation('common')
  const { formTitle = t('view-account'), b2BAccount, onClose } = props

  return (
    <KiboDialog
      showCloseButton
      Title={formTitle}
      showContentTopDivider={false}
      showContentBottomDivider={false}
      Actions={
        <Stack gap={2} width="100%" alignItems={'end'}>
          <Button
            sx={{ width: { xs: '100%', md: '100px' } }}
            variant="contained"
            color="secondary"
            onClick={() => onClose()}
          >
            {t('cancel')}
          </Button>
        </Stack>
      }
      Content={<ViewAccountDetails b2BAccount={b2BAccount} />}
      customMaxWidth="50rem"
      onClose={onClose}
    />
  )
}
export default ViewAccountDetailsDialog
