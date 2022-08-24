import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Typography, Divider, Button, Stack, Checkbox, FormControlLabel } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { AddressCard, AddressForm } from '@/components/common'
import { DeleteAddressConfirmationDialog } from '@/components/dialogs'
import { useModalContext, useAuthContext } from '@/context'
import {
  useCustomerContacts,
  useCreateCustomerAddressMutation,
  useUpdateCustomerAddressMutation,
  useDeleteCustomerAddressMutation,
} from '@/hooks'
import { userAddressGetters } from '@/lib/getters'
import { buildAddressParams, buildAddressProps } from '@/lib/helpers'
import type { Address, ContactForm } from '@/lib/types'

import type { UpdateCustomerAccountContactDetailsParams } from '@/hooks'
import type { CuAddress, CustomerContact, Maybe } from '@/lib/gql/types'

const AddressBook = () => {
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const { isAuthenticated, user } = useAuthContext()
  const [isAddNewAddress, setIsAddNewAddress] = useState<boolean>(false)
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false)

  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)

  const [editAddress, setEditAddress] = useState<CustomerContact>()

  const { addSavedAddressDetails } = useCreateCustomerAddressMutation()
  const { updateSavedAddressDetails } = useUpdateCustomerAddressMutation()
  const { deleteSavedAddressDetails } = useDeleteCustomerAddressMutation()

  const { data: customerContactsCollection } = useCustomerContacts(user?.id as number)

  const addresses = userAddressGetters.getUserShippingAddress(customerContactsCollection?.items)
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
          accountId: user?.id as number,
          address,
          isDefaultAddress,
          addressType: 'shipping',
          action: 'update',
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
          accountId: user?.id as number,
          address,
          isDefaultAddress,
          addressType: 'shipping',
          action: 'add',
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

  const handleConfirmDeleteAddress = (deleteAddressProps: {
    accountId: number
    contactId: number
  }) => {
    showModal({
      Component: DeleteAddressConfirmationDialog,
      props: {
        isOpen: true,
        isDialogCentered: false,
        onClose: closeModal,
        onDeleteAddress: async () => {
          try {
            await deleteSavedAddressDetails.mutateAsync(deleteAddressProps)
            closeModal()
          } catch (error) {
            console.log('Error: delete saved address from my account', error)
          }
        },
      },
    })
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
              <Link href="" passHref>
                <Box
                  component="span"
                  sx={{ fontSize: '1rem', color: 'text.primary', textDecoration: 'none' }}
                  onClick={() => handleEditAddress(item as CustomerContact)}
                >
                  {t('edit')}
                </Box>
              </Link>

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

      {isAuthenticated && !isAddNewAddress && !isEditAddress && (
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
            validateForm={validateForm}
            onSaveAddress={handleSaveAddress}
            setValidateForm={setValidateForm}
            contact={editAddress as ContactForm}
            isUserLoggedIn={isAuthenticated}
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
