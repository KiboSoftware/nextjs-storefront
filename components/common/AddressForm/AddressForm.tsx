/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, FormControlLabel, Checkbox } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import KiboTextField from '@/components/common/KiboTextBox/KiboTextBox'
import { Address, ContactForm } from '@/lib/types'

interface AddressFormProps {
  contact?: ContactForm
  countries?: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  setAutoFocus?: boolean
  validateForm: boolean
  showDefaultPaymentMethodCheckbox?: boolean
  onSaveAddress: (data: Address) => void
  onFormStatusChange?: (status: boolean) => void
  onDefaultPaymentChange?: (value: boolean) => void
}

const schema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  lastNameOrSurname: yup.string().required('This field is required'),
  address: yup.object().shape({
    address1: yup.string().required('This field is required'),
    address2: yup.string().required('This field is required'),
    cityOrTown: yup.string().required('This field is required'),
    stateOrProvince: yup.string().required('This field is required'),
    postalOrZipCode: yup.string().required('This field is required'),
    countryCode: yup.string().required('This field is required'),
  }),
  phoneNumbers: yup.object().shape({
    home: yup.string().required('This field is required'),
  }),
})

// Component
const AddressForm = (props: AddressFormProps) => {
  const { publicRuntimeConfig } = getConfig()

  const {
    contact,
    countries = publicRuntimeConfig.countries,
    isUserLoggedIn = false,
    saveAddressLabel,
    setAutoFocus = false,
    validateForm = false,
    showDefaultPaymentMethodCheckbox = false,
    onSaveAddress,
    onFormStatusChange,
    onDefaultPaymentChange,
  } = props

  // Define Variables and States
  const {
    control,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: contact ? contact : undefined,
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const [_, setSaveAddress] = useState<boolean>(false)

  const { t } = useTranslation('checkout')

  const generateSelectOptions = () =>
    countries?.map((country: string) => {
      return (
        <MenuItem key={country} value={country}>
          {country}
        </MenuItem>
      )
    })

  const onValid = async (formData: ContactForm) => {
    onSaveAddress({ contact: formData, isDataUpdated: true })
  }

  useEffect(() => {
    if (onFormStatusChange) onFormStatusChange(isValid)
    if (validateForm) handleSubmit(onValid)()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, validateForm])

  useEffect(() => {
    reset(contact)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact])

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
      <Grid container rowSpacing={1} columnSpacing={{ md: 4 }}>
        <Grid item xs={12} md={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue={contact?.firstName}
            render={({ field }) => (
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('first-name')}
                ref={null}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                autoFocus={setAutoFocus}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="lastNameOrSurname"
            control={control}
            defaultValue={contact?.lastNameOrSurname}
            render={({ field }) => (
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('last-name-or-sur-name')}
                ref={null}
                error={!!errors?.lastNameOrSurname}
                helperText={errors?.lastNameOrSurname?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
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
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('address1')}
                ref={null}
                error={!!errors?.address?.address1}
                helperText={errors?.address?.address1?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
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
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('address2')}
                ref={null}
                error={!!errors?.address?.address2}
                helperText={errors?.address?.address2?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="address.cityOrTown"
            control={control}
            defaultValue={contact?.address?.cityOrTown}
            render={({ field }) => (
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('city-or-town')}
                ref={null}
                error={!!errors?.address?.cityOrTown}
                helperText={errors?.address?.cityOrTown?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="address.stateOrProvince"
            control={control}
            defaultValue={contact?.address?.stateOrProvince}
            render={({ field }) => (
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('state-or-province')}
                ref={null}
                error={!!errors?.address?.stateOrProvince}
                helperText={errors?.address?.stateOrProvince?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="address.postalOrZipCode"
            control={control}
            defaultValue={contact?.address?.postalOrZipCode}
            render={({ field }) => (
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('postal-or-zip-code')}
                ref={null}
                error={!!errors?.address?.postalOrZipCode}
                helperText={errors?.address?.postalOrZipCode?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="address.countryCode"
            control={control}
            defaultValue={contact?.address?.countryCode}
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
                >
                  {generateSelectOptions()}
                </KiboSelect>
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="phoneNumbers.home"
            control={control}
            defaultValue={contact?.phoneNumbers?.home}
            render={({ field }) => (
              <KiboTextField
                {...field}
                value={field.value || ''}
                label={t('phone-number-home')}
                ref={null}
                error={!!errors?.phoneNumbers?.home}
                helperText={errors?.phoneNumbers?.home?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
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
              label={'Make this my default payment'}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AddressForm
