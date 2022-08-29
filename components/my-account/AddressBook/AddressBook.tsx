import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Typography, Divider, Button, Stack, Checkbox, FormControlLabel } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressCard, AddressForm } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import {
  useCreateCustomerAddressMutation,
  useUpdateCustomerAddressMutation,
  useDeleteCustomerAddressMutation,
} from '@/hooks'
import { userAddressGetters } from '@/lib/getters'
import { buildAddressParams } from '@/lib/helpers'
import type { Address, ContactForm, DeleteAddressParams } from '@/lib/types'

import type { UpdateCustomerAccountContactDetailsParams } from '@/hooks'
import type {
  CrAddress,
  CuAddress,
  CustomerAccount,
  CustomerContact,
  CustomerContactCollection,
  Maybe,
} from '@/lib/gql/types'

interface PaymentMethodProps {
  user: CustomerAccount
  contacts: CustomerContactCollection
}

const buildAddressProps = (address: CuAddress | CrAddress) => {
  const { address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = address
  return {
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  }
}

const AddressBook = (props: PaymentMethodProps) => {
  const { user, contacts } = props

  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const [isAddNewAddress, setIsAddNewAddress] = useState<boolean>(false)
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false)

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)

  const [editAddress, setEditAddress] = useState<CustomerContact>()

  const { addSavedAddressDetails } = useCreateCustomerAddressMutation()
  const { updateSavedAddressDetails } = useUpdateCustomerAddressMutation()
  const { deleteSavedAddressDetails } = useDeleteCustomerAddressMutation()

  const addresses = userAddressGetters.getUserShippingAddress(contacts?.items)
  const handleNewAddress = () => {
    setIsAddNewAddress(true)
    setEditAddress(undefined)
  }
  const handleEditAddress = (contact: CustomerContact) => {
    setEditAddress(contact)
    setIsEditAddress(true)
    const isPrimaryAddress = contact?.types && contact?.types[0]?.isPrimary
    setIsDefaultAddress(isPrimaryAddress as boolean)
  }

  const handleAddressValidationAndSave = () => setValidateForm(true)
  const handleSaveAddress = async (address: Address) => {
    if (address?.contact?.id) {
      try {
        const params = buildAddressParams({
          accountId: user?.id,
          address,
          isDefaultAddress,
          addressType: 'shipping',
        })

        await updateSavedAddressDetails.mutateAsync(
          params as UpdateCustomerAccountContactDetailsParams
        )
        setIsEditAddress(false)
      } catch (error) {
        console.log('Error: edit saved address from my account', error)
      }
    } else {
      try {
        const params = buildAddressParams({
          accountId: user?.id,
          address,
          isDefaultAddress,
          addressType: 'shipping',
        })

        await addSavedAddressDetails.mutateAsync(params)
        setIsAddNewAddress(false)
      } catch (error) {
        console.log('Error: add new address from my account', error)
      }
    }
  }
  const handleCancelUpdateAddress = async () => {
    setIsAddNewAddress(false)
    setIsEditAddress(false)
  }

  const handleConfirmDeleteAddress = (deleteAddressProps: DeleteAddressParams) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: () => handleDeleteAddress(deleteAddressProps),
        contentText: t('are-you-sure-you-want-to-delete-this-address'),
        primaryButtonText: t('delete'),
      },
    })
  }

  const handleDeleteAddress = async (deleteAddressProps: DeleteAddressParams) => {
    try {
      await deleteSavedAddressDetails.mutateAsync(deleteAddressProps)
      closeModal()
    } catch (error) {
      console.log('Error: delete saved address from my account', error)
    }
  }

  return (
    <Box data-testid={'address-book-component'}>
      {addresses?.map((item: Maybe<CustomerContact>, index: number) => (
        <Box paddingY={1} key={item?.id + 'address'}>
          {index === 0 && (
            <Typography variant="h2" fontWeight={'500'}>
              {t('primary')}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'block' }}>
              <AddressCard {...buildAddressProps(item?.address as CuAddress)} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleEditAddress(item as CustomerContact)}
              >
                {t('edit')}
              </Typography>
              {index > 0 && (
                <Delete
                  sx={{ marginTop: '1.375rem' }}
                  onClick={() =>
                    handleConfirmDeleteAddress({
                      accountId: item?.accountId as number,
                      contactId: item?.id as number,
                    })
                  }
                />
              )}
            </Box>
          </Box>
          <Divider sx={{ marginTop: '1.75rem', marginBottom: '0.25rem' }} />
        </Box>
      ))}

      {!isAddNewAddress && !isEditAddress && (
        <Button
          variant="contained"
          color="inherit"
          sx={{ maxWidth: '26.313rem' }}
          onClick={handleNewAddress}
          fullWidth
        >
          <AddCircleOutlineIcon sx={{ paddingRight: '1rem' }} />
          {t('add-new-address')}
        </Button>
      )}

      {(isAddNewAddress || isEditAddress) && (
        <Box pb={'1.813rem'}>
          <AddressForm
            saveAddressLabel={''}
            setAutoFocus={true}
            isUserLoggedIn={true}
            validateForm={validateForm}
            onSaveAddress={handleSaveAddress}
            contact={editAddress as ContactForm}
          />
          <FormControlLabel
            label={t('make-this-my-default-address')}
            control={
              <Checkbox
                sx={{ marginLeft: '0.5rem' }}
                inputProps={{
                  'aria-label': t('make-this-my-default-address'),
                }}
                checked={isDefaultAddress}
                onChange={() => setIsDefaultAddress(!isDefaultAddress)}
              />
            }
          />
          <Stack pl={1} gap={2} sx={{ width: { xs: '100%', md: '50%', maxWidth: '26.313rem' } }}>
            <Button variant="contained" color="secondary" onClick={handleCancelUpdateAddress}>
              {t('common:cancel')}
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddressValidationAndSave}>
              {t('save')}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default AddressBook
