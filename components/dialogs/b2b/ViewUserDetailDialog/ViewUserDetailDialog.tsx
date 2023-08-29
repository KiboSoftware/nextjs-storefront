import React from 'react'

import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ViewUserDetail } from '@/components/b2b'
import { KiboDialog } from '@/components/common'

import { B2BUser } from '@/lib/gql/types'

interface ViewUserDetailDialogProps {
  formTitle?: string
  b2BUser: B2BUser
  onClose: () => void
}
const ViewUserDetailDialog = (props: ViewUserDetailDialogProps) => {
  const { t } = useTranslation('common')
  const { formTitle = t('buyer-info'), b2BUser, onClose } = props

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
      Content={<ViewUserDetail b2BUser={b2BUser} />}
      customMaxWidth="50rem"
      onClose={onClose}
    />
  )
}
export default ViewUserDetailDialog
