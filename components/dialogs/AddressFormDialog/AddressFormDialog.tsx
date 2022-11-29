import React, { useState } from 'react'

import { Stack, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import AddressForm from '@/components/common/AddressForm/AddressForm'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { useModalContext } from '@/context'
import type { Address, ContactForm } from '@/lib/types'
interface AddressFormDialogProps {
  isAddressFormValid: boolean
  isUserLoggedIn: boolean
  setAutoFocus: boolean
  validateForm: boolean
  formTitle?: string
  contact?: ContactForm
  onSaveAddress: (data: Address) => void
  onFormStatusChange: (status: boolean) => void
  onAddressValidationAndSave: () => void
}

const AddressFormDialog = (props: AddressFormDialogProps) => {
  const { closeModal } = useModalContext()
  const { t } = useTranslation('common')
  const isAddressFormInDialog = true
  const {
    formTitle = t('add-new-address'),
    contact,
    isAddressFormValid,
    isUserLoggedIn,
    setAutoFocus,
    validateForm,
    onSaveAddress,
    onFormStatusChange,
    onAddressValidationAndSave,
  } = props

  return (
    <KiboDialog
      showCloseButton
      Title={formTitle}
      showContentTopDivider={true}
      showContentBottomDivider={false}
      Actions={''}
      Content={
        <>
          <AddressForm
            contact={contact}
            isUserLoggedIn={isUserLoggedIn}
            setAutoFocus={setAutoFocus}
            validateForm={validateForm}
            isAddressFormInDialog={isAddressFormInDialog}
            onSaveAddress={onSaveAddress}
            onFormStatusChange={onFormStatusChange}
          />
          <Stack pl={1} gap={2} sx={{ width: '100%' }}>
            <Button variant="contained" color="secondary" onClick={closeModal}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              {...(!isAddressFormValid && { disabled: true })}
              onClick={onAddressValidationAndSave}
            >
              {t('save')}
            </Button>
          </Stack>
        </>
      }
      customMaxWidth="35rem"
      onClose={closeModal}
    />
  )
}
export default AddressFormDialog
