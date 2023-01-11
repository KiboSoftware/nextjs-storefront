import React, { useState } from 'react'

import { Stack, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import AddressForm from '@/components/common/AddressForm/AddressForm'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { useModalContext } from '@/context'
import type { Address, ContactForm } from '@/lib/types'
interface AddressFormDialogProps {
  isUserLoggedIn: boolean
  setAutoFocus: boolean
  formTitle?: string
  contact?: ContactForm
  onSaveAddress: (data: Address) => void
}
const AddressFormDialog = (props: AddressFormDialogProps) => {
  const { closeModal } = useModalContext()
  const { t } = useTranslation('common')
  const isAddressFormInDialog = true
  const {
    formTitle = t('add-new-address'),
    contact,
    isUserLoggedIn,
    setAutoFocus,
    onSaveAddress,
  } = props
  const [isDialogAddressFormValid, setIsAddressFormDialogValid] = useState<boolean>(false)
  const [validateDialogForm, setValidateDialogForm] = useState<boolean>(false)
  const handleFormStatusChange = (status: boolean) => {
    setIsAddressFormDialogValid(status)
  }
  const handleAddressValidationAndSave = () => {
    setValidateDialogForm(true)
  }
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
            validateForm={validateDialogForm}
            isAddressFormInDialog={isAddressFormInDialog}
            onSaveAddress={onSaveAddress}
            onFormStatusChange={handleFormStatusChange}
          />
          <Stack pl={1} gap={2} sx={{ width: '100%' }}>
            <Button variant="contained" color="secondary" onClick={closeModal}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!isDialogAddressFormValid}
              onClick={handleAddressValidationAndSave}
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
