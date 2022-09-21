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
  Grid,
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
import { userGetters } from '@/lib/getters'
import { buildAddressParams } from '@/lib/helpers'
import type { Address, ContactForm, DeleteAddressParams } from '@/lib/types'

import type { UpdateCustomerAccountContactDetailsParams } from '@/hooks'
import type {
  CuAddress,
  CustomerAccount,
  CustomerContact,
  CustomerContactCollection,
} from '@/lib/gql/types'

interface AddressBookProps {
  user: CustomerAccount
  contacts: CustomerContactCollection
}

interface AccountAddressProps {
  customerContact: CustomerContact
  isPrimaryAddress: boolean
  addressType: string
  editAddress: (customerContact: CustomerContact) => void
  deleteAddress: (deleteAddressParams: { accountId: number; contactId: number }) => void
}

const styles = {
  addNewAddressButtonStyle: {
    maxWidth: '26.313rem',
    '& > *:first-of-type': {
      fontSize: 'inherit',
    },
  },
}
const buildAddressProps = (customerContact: CustomerContact) => {
  const { firstName, lastNameOrSurname, address } = customerContact
  const { address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = address as CuAddress
  return {
    firstName: firstName as string,
    lastNameOrSurname: lastNameOrSurname as string,
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  }
}

const AccountAddress = (props: AccountAddressProps) => {
  const { customerContact, isPrimaryAddress, addressType, editAddress, deleteAddress } = props
  const { t } = useTranslation('common')
  return (
    <Box>
      {isPrimaryAddress && (
        <Stack>
          <Typography variant="h3" sx={{ pb: '1rem', fontWeight: '700' }}>
            {addressType === AddressType.SHIPPING ? t('shipping-address') : t('billing-address')}
          </Typography>
          <Typography variant="h4" fontWeight="500">
            {t('primary')}
          </Typography>
        </Stack>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <AddressCard {...buildAddressProps(customerContact)} />
        <Stack>
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={() => editAddress(customerContact)}
            data-testid={`address-edit`}
          >
            {t('edit')}
          </Typography>
          {!isPrimaryAddress && (
            <Delete
              sx={{ marginTop: '1.375rem' }}
              onClick={() =>
                deleteAddress({
                  accountId: customerContact?.accountId,
                  contactId: customerContact?.id as number,
                })
              }
            />
          )}
        </Stack>
      </Box>
      <Divider sx={{ marginTop: '1.75rem', marginBottom: '0.25rem' }} />
    </Box>
  )
}

const AddressBook = (props: AddressBookProps) => {
  const { user, contacts } = props

  const [isAddNewAddress, setIsAddNewAddress] = useState<boolean>(false)
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false)
  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)
  const [editAddress, setEditAddress] = useState<CustomerContact>()
  const [addressType, setAddressType] = useState<string>(AddressType.SHIPPING)

  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const { addSavedAddressDetails } = useCreateCustomerAddressMutation()
  const { updateSavedAddressDetails } = useUpdateCustomerAddressMutation()
  const { deleteSavedAddressDetails } = useDeleteCustomerAddressMutation()

  const shippingAddresses = userGetters.getUserShippingAddress(contacts?.items as CustomerContact[])
  const billingAddresses = userGetters.getUserBillingAddresses(contacts?.items as CustomerContact[])

  const handleNewAddress = () => {
    setIsAddNewAddress(true)
    setEditAddress(undefined)
    setAddressType(AddressType.SHIPPING)
  }

  const handleEditAddress = (contact: CustomerContact) => {
    if (contact?.types) {
      setIsDefaultAddress(contact?.types[0]?.isPrimary as boolean)
      setAddressType(contact?.types[0]?.name as string)
      setIsEditAddress(true)
    }
    setEditAddress(contact)
  }

  const handleAddressValidationAndSave = () => setValidateForm(true)

  const handleSaveAddress = async (address: Address) => {
    const params = buildAddressParams({
      accountId: user?.id,
      address,
      isDefaultAddress,
      addressType: addressType,
    })

    try {
      if (address?.contact?.id) {
        await updateSavedAddressDetails.mutateAsync(
          params as UpdateCustomerAccountContactDetailsParams
        )
        setIsEditAddress(false)
      } else {
        await addSavedAddressDetails.mutateAsync(params)
        setIsAddNewAddress(false)
      }

      setValidateForm(false)
    } catch (error) {
      console.log('Error: add/edit saved address from my account', error)
    }
  }

  const handleCancelUpdateAddress = () => {
    setIsAddNewAddress(false)
    setIsEditAddress(false)
  }

  const handleConfirmDeleteAddress = (deleteAddressProps: DeleteAddressParams) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        onConfirm: () => handleDeleteAddress(deleteAddressProps),
        contentText: t('delete-address-confirm-message'),
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
      {!isAddNewAddress && !isEditAddress && (
        <Box>
          {shippingAddresses?.map((item: CustomerContact, index: number) => (
            <Box paddingY={1} key={`${item?.id}address`}>
              <AccountAddress
                customerContact={item}
                isPrimaryAddress={index === 0}
                addressType={AddressType.SHIPPING}
                editAddress={handleEditAddress}
                deleteAddress={handleConfirmDeleteAddress}
              />
            </Box>
          ))}

          {billingAddresses?.map((item: CustomerContact, index: number) => (
            <Box paddingY={1} key={item?.id + 'address'}>
              <AccountAddress
                customerContact={item}
                isPrimaryAddress={index === 0}
                addressType={AddressType.BILLING}
                editAddress={handleEditAddress}
                deleteAddress={handleConfirmDeleteAddress}
              />
            </Box>
          ))}
        </Box>
      )}
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
          <Grid item xs={12} md={6} pl={1} pb={2.5} pr={6.5}>
            <KiboSelect
              sx={{ typography: 'body2', width: '100%' }}
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
          </Grid>

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
              {t('cancel')}
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
