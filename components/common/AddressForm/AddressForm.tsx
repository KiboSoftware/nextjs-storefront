/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, FormControlLabel, Checkbox } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboSelect, KiboTextBox } from '@/components/common'
import { CountryCode } from '@/lib/constants'
import type { Address, ContactForm } from '@/lib/types'

interface AddressFormProps {
  contact?: ContactForm
  countries?: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  isAddressFormInDialog?: boolean
  setAutoFocus?: boolean
  validateForm: boolean
  showDefaultPaymentMethodCheckbox?: boolean
  onSaveAddress: (data: Address) => void
  onFormStatusChange?: (status: boolean) => void
  onDefaultPaymentChange?: (value: boolean) => void
  isDisabled?: boolean
}

type InternalContactForm = Omit<ContactForm, 'lastNameOrSurname'>

export const useFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object().shape({
    firstName: yup
      .string()
      .required(t('this-field-is-required'))
      .matches(/^\w+(\s\w+){1,2}$/, t('enter-valid-full-name')),
    address: yup.object().shape({
      address1: yup.string().required(t('this-field-is-required')),
      address2: yup.string().nullable(true).notRequired(),
      cityOrTown: yup.string().required(t('this-field-is-required')),
      stateOrProvince: yup.string().when('countryCode', {
        is: CountryCode.US || CountryCode.CA,
        then: yup.string().required(t('this-field-is-required')),
      }),
      postalOrZipCode: yup.string().when('countryCode', {
        is: CountryCode.US || CountryCode.CA,
        then: yup.string().required(t('this-field-is-required')).min(4, t('enter-valid-zip-code')),
      }),
      countryCode: yup.string().required(t('this-field-is-required')),
    }),
    phoneNumbers: yup.object().shape({
      home: yup.string().required(t('this-field-is-required')),
    }),
  })
}

const mapToInternalContactForm = (contact: ContactForm): InternalContactForm => {
  const fullName = `${contact.firstName} ${contact.lastNameOrSurname}`
  const { lastNameOrSurname, ...rest } = contact

  const internalContact = rest
  internalContact.firstName = fullName

  return internalContact
}

const mapToContactForm = (internalContact: InternalContactForm): ContactForm => {
  const name = internalContact.firstName.trim().split(/\s+/)

  const contact = { ...internalContact, lastNameOrSurname: '' }
  contact.firstName = name[0]
  contact['lastNameOrSurname'] = name.slice(1).join(' ')

  return contact as ContactForm
}

// Component
const AddressForm = (props: AddressFormProps) => {
  const { publicRuntimeConfig } = getConfig()

  const {
    contact,
    countries = publicRuntimeConfig.countries,
    isUserLoggedIn = false,
    saveAddressLabel,
    isAddressFormInDialog = false,
    setAutoFocus = false,
    validateForm = false,
    showDefaultPaymentMethodCheckbox = false,
    onSaveAddress,
    onFormStatusChange,
    onDefaultPaymentChange,
    isDisabled,
  } = props

  const addressSchema = useFormSchema()
  // Define Variables and States
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: contact ? mapToInternalContactForm(contact) : undefined,
    resolver: yupResolver(addressSchema),
    shouldFocusError: true,
  })

  const [_, setSaveAddress] = useState<boolean>(false)

  const { t } = useTranslation('common')

  const generateSelectOptions = () =>
    countries?.map((country: string) => {
      return (
        <MenuItem key={country} value={country}>
          {country}
        </MenuItem>
      )
    })

  const onValid = async (formData: InternalContactForm) =>
    onSaveAddress({ contact: mapToContactForm(formData), isDataUpdated: true })

  useEffect(() => {
    if (onFormStatusChange) onFormStatusChange(isValid)
    if (validateForm) handleSubmit(onValid)()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, validateForm])

  return (
    <Box
      component="form"
      sx={{
        m: 1,
        maxWidth: '872px',
      }}
      noValidate
      autoComplete="off"
      data-testid="address-form"
    >
      <Grid container rowSpacing={1} columnSpacing={{ md: 1 }}>
        <Grid item xs={12}>
          <Controller
            name="address.countryCode"
            control={control}
            defaultValue={
              contact?.address?.countryCode || countries.length === 1 ? countries[0] : ''
            }
            render={({ field }) => (
              <div>
                <KiboSelect
                  name="country-code"
                  label={t('country-code')}
                  value={field.value}
                  error={!!errors?.address?.countryCode}
                  helperText={errors?.address?.countryCode?.message}
                  onChange={(_name, value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                  disabled={isDisabled}
                >
                  {generateSelectOptions()}
                </KiboSelect>
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="firstName"
            control={control}
            defaultValue={contact?.firstName}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('full-name-first-and-last')}
                ref={null}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                autoFocus={setAutoFocus}
                required={true}
                disabled={isDisabled}
                placeholder={t('full-name-first-and-last')}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address.address1"
            control={control}
            defaultValue={contact?.address?.address1}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('address1')}
                ref={null}
                error={!!errors?.address?.address1}
                helperText={errors?.address?.address1?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
                disabled={isDisabled}
                placeholder={t('address1-info')}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address.address2"
            control={control}
            defaultValue={contact?.address?.address2}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                ref={null}
                error={!!errors?.address?.address2}
                helperText={errors?.address?.address2?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                disabled={isDisabled}
                placeholder={t('address2-info')}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 12}>
          <Controller
            name="phoneNumbers.home"
            control={control}
            defaultValue={contact?.phoneNumbers?.home}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('phone-number-home')}
                ref={null}
                error={!!errors?.phoneNumbers?.home}
                helperText={errors?.phoneNumbers?.home?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
                disabled={isDisabled}
                placeholder={t('phone-number-home')}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 12 : 4}>
          <Controller
            name="address.cityOrTown"
            control={control}
            defaultValue={contact?.address?.cityOrTown}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('city-or-town')}
                ref={null}
                error={!!errors?.address?.cityOrTown}
                helperText={errors?.address?.cityOrTown?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
                disabled={isDisabled}
                placeholder={t('city-or-town')}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 8 : 4}>
          <Controller
            name="address.stateOrProvince"
            control={control}
            defaultValue={contact?.address?.stateOrProvince}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('state-or-province')}
                ref={null}
                error={!!errors?.address?.stateOrProvince}
                helperText={errors?.address?.stateOrProvince?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
                disabled={isDisabled}
                placeholder={t('state-or-province')}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={isAddressFormInDialog ? 4 : 4}>
          <Controller
            name="address.postalOrZipCode"
            control={control}
            defaultValue={contact?.address?.postalOrZipCode}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('postal-or-zip-code')}
                ref={null}
                error={!!errors?.address?.postalOrZipCode}
                helperText={errors?.address?.postalOrZipCode?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
                disabled={isDisabled}
                placeholder={t('postal-or-zip-code')}
              />
            )}
          />
        </Grid>

        {isUserLoggedIn && saveAddressLabel && (
          <Grid item md={12}>
            <FormControlLabel
              control={<Checkbox onChange={() => setSaveAddress((prevState) => !prevState)} />}
              label={saveAddressLabel}
            />
          </Grid>
        )}

        {showDefaultPaymentMethodCheckbox && (
          <Grid item md={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(_, checked) =>
                    onDefaultPaymentChange && onDefaultPaymentChange(checked)
                  }
                />
              }
              label={t('make-this-my-default-payment')}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AddressForm
