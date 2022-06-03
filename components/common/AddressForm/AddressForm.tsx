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

import { type Action } from '@/components/checkout'
import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import KiboTextField from '@/components/common/KiboTextBox/KiboTextBox'
import { FormStates } from '@/lib/constants'

import type { Order } from '@/lib/gql/types'

// Interface
export interface Contact {
  id?: number
  firstName: string
  lastNameOrSurname: string
  middleNameOrInitial?: string
  email?: string
  address: {
    address1: string
    address2: string
    address3?: string
    address4?: string
    addressType?: string
    cityOrTown: string
    countryCode: string
    isValidated?: boolean
    postalOrZipCode: string
    stateOrProvince: string
  }
  phoneNumbers: {
    home: string
    mobile?: string
    work?: string
  }
}
export interface Address {
  contact: Contact
  saveAddress: boolean
}
interface AddressFormProps {
  contact?: Contact
  countries?: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  setAutoFocus?: boolean
  checkout: Order | undefined
  validateForm: boolean
  onSaveAddress: (data: Address) => void
  onCompleteCallback: (action: Action) => void
  setValidateForm: (isValidForm: boolean) => void
}

// Component
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

const AddressForm = (props: AddressFormProps) => {
  const { publicRuntimeConfig } = getConfig()

  const {
    contact,
    countries = publicRuntimeConfig.countries,
    isUserLoggedIn = false,
    saveAddressLabel,
    setAutoFocus = true,
    validateForm = false,
    onSaveAddress,
    onCompleteCallback,
    setValidateForm,
  } = props

  // Define Variables and States
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: contact ? contact : undefined,
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  // Declare custom hooks, functions, event handlers
  const [saveAddress, setSaveAddress] = useState<boolean>(false)
  const { t } = useTranslation('checkout')

  const generateSelectOptions = () =>
    countries?.map((country: string) => {
      return (
        <MenuItem key={country} value={country}>
          {country}
        </MenuItem>
      )
    })

  const onValid = async (formData: Contact) => {
    onSaveAddress({ contact: formData, saveAddress })
  }

  // form is invalid, notify parent form is incomplete
  const onInvalidForm = () => {
    onCompleteCallback({ type: FormStates.INCOMPLETE })
    setValidateForm(false)
  }

  useEffect(() => {
    // if form is valid, onSubmit callback
    if (validateForm) {
      handleSubmit(onValid, onInvalidForm)()
    }
  }, [validateForm])

  return (
    <Box
      component="form"
      sx={{
        m: 1,
        maxWidth: '872px',
        width: '100%',
      }}
      noValidate
      autoComplete="off"
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
                label={t('first-name')}
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
                label={t('last-name-or-sur-name')}
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
                label={t('address1')}
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
                label={t('address2')}
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
                label={t('city-or-town')}
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
                label={t('state-or-province')}
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
                label={t('postal-or-zip-code')}
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
                label={t('phone-number-home')}
                error={!!errors?.phoneNumbers?.home}
                helperText={errors?.phoneNumbers?.home?.message}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
        </Grid>

        {isUserLoggedIn && (
          <Grid item md={12}>
            <FormControlLabel
              control={<Checkbox onChange={() => setSaveAddress((prevState) => !prevState)} />}
              label={saveAddressLabel as string}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AddressForm
