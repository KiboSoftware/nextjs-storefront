import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressCard, AddressForm, KiboSelect } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import {
  useCreateCustomerAddressMutation,
  useUpdateCustomerAddressMutation,
  useDeleteCustomerAddressMutation,
} from '@/hooks'
import { AddressType } from '@/lib/constants'
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
} from '@/lib/gql/types'

interface PaymentMethodProps {
  user: CustomerAccount
  contacts: CustomerContactCollection
}

const styles = {
  addNewAddressButtonStyle: {
    maxWidth: '26.313rem',
    '& > *:first-child': {
      fontSize: 'inherit',
    },
  },
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
  const [addressType, setAddressType] = useState<string>(AddressType.SHIPPING)

  const { addSavedAddressDetails } = useCreateCustomerAddressMutation()
  const { updateSavedAddressDetails } = useUpdateCustomerAddressMutation()
  const { deleteSavedAddressDetails } = useDeleteCustomerAddressMutation()

  const shippingAddresses = userAddressGetters.getUserShippingAddress(contacts?.items)
  const billingAddresses = userAddressGetters.getUserBillingAddresses(contacts?.items)

  const handleNewAddress = () => {
    setIsAddNewAddress(true)
    setEditAddress(undefined)
  }
  const handleEditAddress = (contact: CustomerContact) => {
    setEditAddress(contact)

    if (contact?.types) {
      setIsDefaultAddress(contact?.types[0]?.isPrimary as boolean)
      setAddressType(contact?.types[0]?.name as string)
      setIsEditAddress(true)
    }
  }

  const handleAddressValidationAndSave = () => setValidateForm(true)
  const handleSaveAddress = async (address: Address) => {
    if (address?.contact?.id) {
      try {
        const params = buildAddressParams({
          accountId: user?.id,
          address,
          isDefaultAddress,
          addressType: addressType,
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
          addressType: addressType,
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
      {shippingAddresses?.map((item: CustomerContact, index: number) => (
        <Box paddingY={1} key={item?.id + 'address'}>
          {index === 0 && (
            <Typography variant="body1" fontWeight={700}>
              {t('shipping-address')}( {t('primary')} )
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <AddressCard {...buildAddressProps(item?.address as CuAddress)} />
            <Stack>
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
            </Stack>
          </Box>
          <Divider sx={{ marginTop: '1.75rem', marginBottom: '0.25rem' }} />
        </Box>
      ))}

      {billingAddresses?.map((item: CustomerContact, index: number) => (
        <Box paddingY={1} key={item?.id + 'address'}>
          {index === 0 && (
            <Typography variant="body1" fontWeight={700}>
              {t('billing-address')}( {t('primary')} )
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <AddressCard {...buildAddressProps(item?.address as CuAddress)} />
            <Stack>
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
            </Stack>
          </Box>
          <Divider sx={{ marginTop: '1.75rem', marginBottom: '0.25rem' }} />
        </Box>
      ))}
      {!isAddNewAddress && !isEditAddress && (
        <Button
          variant="contained"
          color="inherit"
          sx={{ ...styles.addNewAddressButtonStyle }}
          onClick={handleNewAddress}
          fullWidth
          startIcon={<AddCircleOutlineIcon />}
        >
          {t('add-new-address')}
        </Button>
      )}

      {(isAddNewAddress || isEditAddress) && (
        <Box pb={'1.813rem'}>
          <KiboSelect
            sx={{ typography: 'body2' }}
            value={addressType}
            onChange={(_name, value) => setAddressType(value)}
          >
            {Object.values(AddressType).map((addressTypeValue: string) => (
              <MenuItem
                sx={{ typography: 'body2' }}
                key={addressTypeValue}
                value={addressTypeValue}
              >
                {addressTypeValue}
              </MenuItem>
            ))}
          </KiboSelect>
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
