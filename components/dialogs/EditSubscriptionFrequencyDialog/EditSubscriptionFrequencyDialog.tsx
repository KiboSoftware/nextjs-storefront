import React, { useState } from 'react'

import { Stack, Button, MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboSelect, KiboDialog } from '@/components/common'
import { subscriptionGetters } from '@/lib/getters'

import type { SbProductPropertyValue } from '@/lib/gql/types'

export interface OnFrequencySave {
  subscriptionId: string
  frequencyInput: {
    value: number
    unit: string
  }
}

interface EditSubscriptionFrequencyDialogProps {
  subscriptionId: string
  values: SbProductPropertyValue[]
  onFrequencySave: (params: OnFrequencySave) => void
  onClose: () => void
}

const EditSubscriptionFrequencyDialog = (props: EditSubscriptionFrequencyDialogProps) => {
  const { subscriptionId, values, onFrequencySave, onClose } = props

  const [selectedFrequency, setSelectedFrequency] = useState<string>('')

  const { t } = useTranslation('common')

  const updateFrequency = async () => {
    const params = {
      subscriptionId,
      frequencyInput: subscriptionGetters.getFrequencyUnitAndValue(selectedFrequency),
    }

    await onFrequencySave(params)
  }

  const handleFrequencyChange = async (name: string, value: string) => setSelectedFrequency(value)

  const Actions = (
    <>
      <Stack gap={2} width="100%">
        <Button
          name="cancel"
          sx={{ width: '100%' }}
          variant="contained"
          color="secondary"
          onClick={() => onClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          name="confirm"
          sx={{ width: '100%' }}
          variant="contained"
          onClick={updateFrequency}
          disabled={!selectedFrequency}
        >
          {t('confirm')}
        </Button>
      </Stack>
    </>
  )

  return (
    <KiboDialog
      Title={t('edit-subscription-frequency')}
      showCloseButton
      showContentTopDivider={true}
      showContentBottomDivider={true}
      Actions={Actions}
      Content={
        <KiboSelect
          name="selectSubscriptionFrequency"
          onChange={handleFrequencyChange}
          placeholder={t('select-subscription-frequency')}
          value={selectedFrequency}
        >
          {values?.map((value) => {
            return (
              <MenuItem key={value.stringValue} value={`${value.stringValue}`}>
                {`${value.stringValue}`}
              </MenuItem>
            )
          })}
        </KiboSelect>
      }
      customMaxWidth="30rem"
      onClose={onClose}
    />
  )
}

export default EditSubscriptionFrequencyDialog
