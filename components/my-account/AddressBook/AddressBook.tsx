import React, { useEffect, useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Delete from '@mui/icons-material/Delete'
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
  Collapse,
  NoSsr,
} from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useReCaptcha } from 'next-recaptcha-v3'
import { TransitionGroup } from 'react-transition-group'

import { AddressCard, AddressForm, KiboSelect, KiboPagination } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext, useSnackbarContext } from '@/context'
import {
  useCreateCustomerAddress,
  useUpdateCustomerAddress,
  useDeleteCustomerAddress,
  useValidateCustomerAddress,
} from '@/hooks'
import { AddressType, CountryCode } from '@/lib/constants'
import { userGetters } from '@/lib/getters'
import { actions, buildAddressParams, hasPermission, validateGoogleReCaptcha } from '@/lib/helpers'
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
          {addressType === AddressType.SHIPPING && (
            <Typography id="shipping-address" variant="h3" sx={{ pb: '1rem', fontWeight: '700' }}>
              {t('shipping-address')}
            </Typography>
          )}
          {addressType === AddressType.BILLING && (
            <Typography id="billing-address" variant="h3" sx={{ pb: '1rem', fontWeight: '700' }}>
              {t('billing-address')}
            </Typography>
          )}
          {customerContact?.types?.[0]?.isPrimary && (
            <Typography variant="h4" fontWeight="500">
              {t('primary')}
            </Typography>
          )}
        </Stack>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <AddressCard {...buildAddressProps(customerContact)} />
        <Stack>
          <NoSsr>
            {hasPermission(actions.EDIT_CONTACTS) && (
              <Typography
                variant="body2"
                sx={{ cursor: 'pointer' }}
                onClick={() => editAddress(customerContact)}
                data-testid={`address-edit`}
              >
                {t('edit')}
              </Typography>
            )}
            {hasPermission(actions.DELETE_CONTACTS) && !isPrimaryAddress && (
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
          </NoSsr>
        </Stack>
      </Box>
      <Divider sx={{ marginTop: '1.75rem', marginBottom: '0.25rem' }} />
    </Box>
  )
}

const AddressBook = (props: AddressBookProps) => {
  const { user, contacts } = props

  const { publicRuntimeConfig } = getConfig()
  const shippingAddressPageSize = publicRuntimeConfig.shippingAddressPageSize
  const billingAddressPageSize = publicRuntimeConfig.billingAddressPageSize
  const reCaptchaKey = publicRuntimeConfig.recaptcha.reCaptchaKey
  const allowInvalidAddresses = publicRuntimeConfig.allowInvalidAddresses

  const [isAddressModified, setIsAddressModified] = useState<boolean>(false)
  const [validateForm, setValidateForm] = useState<boolean>(false)
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false)
  const [saveAsShippingBillingCheckbox, setSaveAsShippingBillingCheckbox] = useState<boolean>(false)
  const [editAddress, setEditAddress] = useState<CustomerContact>()
  const [addressType, setAddressType] = useState<string>(AddressType.SHIPPING)

  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const { createCustomerAddress } = useCreateCustomerAddress()
  const { updateCustomerAddress } = useUpdateCustomerAddress()
  const { deleteCustomerAddress } = useDeleteCustomerAddress()
  const { validateCustomerAddress } = useValidateCustomerAddress()
  const { executeRecaptcha } = useReCaptcha()
  const { showSnackbar } = useSnackbarContext()

  const shippingAddresses =
    userGetters.getUserShippingAddress(contacts?.items as CustomerContact[]) ?? []
  const billingAddresses =
    userGetters.getUserBillingAddresses(contacts?.items as CustomerContact[]) ?? []

  const [shippingAddressStartIndex, setShippingAddressStartIndex] = useState<number>(0)
  const [billingAddressStartIndex, setBillingAddressStartIndex] = useState<number>(0)
  const [displayShippingAddresses, setDisplayShippingAddresses] = useState<CustomerContact[]>(
    shippingAddresses?.slice(shippingAddressStartIndex, shippingAddressPageSize)
  )
  const [displayBillingAddresses, setDisplayBillingAddresses] = useState<CustomerContact[]>(
    billingAddresses.slice(billingAddressStartIndex, billingAddressPageSize)
  )

  const [isAddressFormValid, setIsAddressFormValid] = useState<boolean>(false)

  const scrollToShippingAddressHeading = () => {
    const shippingAddressHeading = document.getElementById('shipping-address')
    if (shippingAddressHeading) {
      shippingAddressHeading.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const scrollToBillingAddressHeading = () => {
    const billingAddressHeading = document.getElementById('billing-address')
    if (billingAddressHeading) {
      billingAddressHeading.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleNewAddress = () => {
    setIsAddressModified(true)
    setEditAddress(undefined)
    setAddressType(AddressType.SHIPPING)
  }

  const handleEditAddress = (contact: CustomerContact) => {
    if (contact?.types) {
      setIsDefaultAddress(contact?.types[0]?.isPrimary as boolean)
      setAddressType(contact?.types[0]?.name as string)
      setIsAddressModified(true)
    }
    setEditAddress(contact)
  }

  const handleAddressValidationAndSave = () => setValidateForm(true)

  const submitFormWithRecaptcha = (address: Address) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    executeRecaptcha('enquiryFormSubmit').then(async (gReCaptchaToken) => {
      const captcha = await validateGoogleReCaptcha(gReCaptchaToken)

      if (captcha?.status === 'success') {
        await handleSaveAddress(address)
      } else {
        showSnackbar(captcha.message, 'error')
      }
    })
  }

  const handleSaveAddress = async (address: Address) => {
    address = {
      ...address,
      contact: {
        ...address.contact,
        email: user.emailAddress as string,
      },
    }
    const params = buildAddressParams({
      accountId: user?.id,
      address,
      isDefaultAddress,
      addressType: addressType,
    })

    try {
      if (!allowInvalidAddresses && address?.contact?.address?.countryCode === CountryCode.US) {
        await validateCustomerAddress.mutateAsync({
          addressValidationRequestInput: { address: address?.contact?.address as CuAddress },
        })
      }

      if (address?.contact?.id) {
        await updateCustomerAddress.mutateAsync(params as UpdateCustomerAccountContactDetailsParams)
        setIsAddressModified(false)
      } else {
        await createCustomerAddress.mutateAsync(params)
        if (saveAsShippingBillingCheckbox) {
          const addressParam = buildAddressParams({
            accountId: user?.id,
            address,
            isDefaultAddress,
            addressType:
              addressType === AddressType.SHIPPING ? AddressType.BILLING : AddressType.SHIPPING,
          })
          await createCustomerAddress.mutateAsync(addressParam)
        }
        setIsAddressModified(false)
      }

      setValidateForm(false)
    } catch (error) {
      setValidateForm(false)
      console.error('Error: add/edit saved address from my account', error)
    }
  }

  const handleCancelUpdateAddress = () => {
    setIsAddressModified(false)
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
      await deleteCustomerAddress.mutateAsync(deleteAddressProps)
      closeModal()
    } catch (error) {
      console.log('Error: delete saved address from my account', error)
    }
  }

  const shouldShowDefaultCheckbox = () => {
    if (addressType === AddressType.SHIPPING && shippingAddresses && shippingAddresses.length > 0)
      return true
    if (addressType === AddressType.BILLING && billingAddresses && billingAddresses.length > 0)
      return true
    return false
  }

  const handleFormStatusChange = (status: boolean) => setIsAddressFormValid(status)

  const handleShippingAddressPagination = (value: any) => {
    const { startIndex } = value
    setShippingAddressStartIndex(startIndex)
    setDisplayShippingAddresses(
      shippingAddresses?.slice(startIndex, startIndex + shippingAddressPageSize)
    )
    scrollToShippingAddressHeading()
  }

  const handleBillingAddressPagination = (value: any) => {
    const { startIndex } = value
    setBillingAddressStartIndex(startIndex)
    setDisplayBillingAddresses(
      billingAddresses.slice(startIndex, startIndex + billingAddressPageSize)
    )
    scrollToBillingAddressHeading()
  }

  useEffect(() => {
    setDisplayShippingAddresses(
      shippingAddresses?.slice(
        shippingAddressStartIndex,
        shippingAddressStartIndex + shippingAddressPageSize
      )
    )
  }, [JSON.stringify(shippingAddresses)])

  useEffect(() => {
    setDisplayBillingAddresses(
      billingAddresses.slice(
        billingAddressStartIndex,
        billingAddressStartIndex + billingAddressPageSize
      )
    )
  }, [JSON.stringify(billingAddresses)])

  return (
    <Box data-testid={'address-book-component'}>
      <Box pb={2}>
        <NoSsr>
          {hasPermission(actions.VIEW_CONTACTS) &&
            !isAddressModified &&
            !displayShippingAddresses?.length &&
            !displayBillingAddresses?.length && (
              <Typography variant="body1">{t('no-saved-addresses-yet')}</Typography>
            )}
        </NoSsr>
      </Box>
      <NoSsr>
        {!hasPermission(actions.VIEW_CONTACTS) && (
          <Typography variant="body1">{t('not-authorized-shipping-information')}</Typography>
        )}
      </NoSsr>
      <NoSsr>
        {hasPermission(actions.VIEW_CONTACTS) && !isAddressModified && (
          <Box>
            <TransitionGroup>
              {displayShippingAddresses?.map((item: CustomerContact, index: number) => (
                <Collapse
                  key={`${item?.id}address`}
                  sx={{
                    '.MuiCollapse-wrapperInner': {
                      width: '100%',
                    },
                  }}
                >
                  <Box paddingY={1}>
                    <AccountAddress
                      customerContact={item}
                      isPrimaryAddress={index === 0}
                      addressType={AddressType.SHIPPING}
                      editAddress={handleEditAddress}
                      deleteAddress={handleConfirmDeleteAddress}
                    />
                  </Box>
                </Collapse>
              ))}
              {displayShippingAddresses?.length > 0 && shippingAddresses.length > 5 && (
                <Box display={'flex'} justifyContent={'center'} width="100%" py={10}>
                  <KiboPagination
                    count={Math.ceil(shippingAddresses?.length / shippingAddressPageSize)}
                    startIndex={shippingAddressStartIndex}
                    pageSize={shippingAddressPageSize}
                    onPaginationChange={handleShippingAddressPagination}
                  />
                </Box>
              )}
              {displayBillingAddresses?.map((item: CustomerContact, index: number) => (
                <Collapse
                  key={`${item?.id}address`}
                  sx={{
                    '.MuiCollapse-wrapperInner': {
                      width: '100%',
                    },
                  }}
                >
                  <Box paddingY={1}>
                    <AccountAddress
                      customerContact={item}
                      isPrimaryAddress={index === 0}
                      addressType={AddressType.BILLING}
                      editAddress={handleEditAddress}
                      deleteAddress={handleConfirmDeleteAddress}
                    />
                  </Box>
                </Collapse>
              ))}
              {displayBillingAddresses?.length > 0 && billingAddresses?.length > 5 && (
                <Box display={'flex'} justifyContent={'center'} width="100%" py={10}>
                  <KiboPagination
                    count={Math.ceil(billingAddresses?.length / billingAddressPageSize)}
                    startIndex={billingAddressStartIndex}
                    pageSize={billingAddressPageSize}
                    onPaginationChange={handleBillingAddressPagination}
                  />
                </Box>
              )}
            </TransitionGroup>
          </Box>
        )}
      </NoSsr>
      <NoSsr>
        {hasPermission(actions.CREATE_CONTACTS) && !isAddressModified && (
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
      </NoSsr>
      {isAddressModified && (
        <Box pb={'1.813rem'}>
          <Box m={1}>
            <Grid container rowSpacing={1} columnSpacing={{ md: 3 }}>
              <Grid item xs={12} md={6} pb={2}>
                <KiboSelect
                  name="address-type"
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
              <Grid item xs={12} md={6} pb={2}>
                <Box>
                  {!editAddress && (
                    <FormControlLabel
                      label={t('shipping-billing-addresses-are-same')}
                      control={
                        <Checkbox
                          sx={{ marginLeft: '0.5rem' }}
                          inputProps={{
                            'aria-label': t('shipping-billing-addresses-are-same'),
                          }}
                          checked={saveAsShippingBillingCheckbox}
                          onChange={() =>
                            setSaveAsShippingBillingCheckbox(!saveAsShippingBillingCheckbox)
                          }
                        />
                      }
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <AddressForm
            saveAddressLabel={''}
            setAutoFocus={true}
            isUserLoggedIn={true}
            validateForm={validateForm}
            onSaveAddress={(address) =>
              reCaptchaKey ? submitFormWithRecaptcha(address) : handleSaveAddress(address)
            }
            onFormStatusChange={handleFormStatusChange}
            contact={editAddress as ContactForm}
          />

          {shouldShowDefaultCheckbox() && (
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
          )}

          <Stack
            pl={1}
            pt={1}
            gap={2}
            sx={{ width: { xs: '100%', md: '50%', maxWidth: '26.313rem' } }}
          >
            <Button variant="contained" color="secondary" onClick={handleCancelUpdateAddress}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddressValidationAndSave}
              {...(!isAddressFormValid && { disabled: true })}
            >
              {t('save')}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default AddressBook
