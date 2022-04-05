/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, forwardRef, useImperativeHandle } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, FormControlLabel, Checkbox } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import KiboSelect from '../KiboSelect/KiboSelect'
import KiboTextField from '../KiboTextBox/KiboTextBox'

import type { Maybe, Scalars } from '@/lib/gql/types'

// Interface
export interface Contact {
  id?: Maybe<Scalars['Int']>
  firstName: Maybe<Scalars['String']>
  lastNameOrSurname: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  address: {
    address1: Maybe<Scalars['String']>
    address2: Maybe<Scalars['String']>
    address3?: Maybe<Scalars['String']>
    address4?: Maybe<Scalars['String']>
    addressType?: Maybe<Scalars['String']>
    cityOrTown: Maybe<Scalars['String']>
    countryCode: Maybe<Scalars['String']>
    isValidated?: Maybe<Scalars['Boolean']>
    postalOrZipCode: Maybe<Scalars['String']>
    stateOrProvince: Maybe<Scalars['String']>
  }
  phoneNumbers: {
    home: string
    mobile?: string
    work?: string
  }
}
export interface Data {
  isFormValid: boolean
  contact: Contact
  saveAddress: boolean
}
interface AddressFormProps {
  contact?: Contact
  countries: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  onSave: (data: Data) => void
}
interface AddressFormHandler {
  listener: () => void
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

const AddressForm = forwardRef<AddressFormHandler, AddressFormProps>((props, ref) => {
  const { contact, countries = [], isUserLoggedIn = false, saveAddressLabel, onSave } = props

  // Define Variables and States
  const {
    getValues,
    formState: { errors, isValid },
    trigger,
    control,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: contact ? contact : undefined,
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  // Declare custom hooks, functions, event handlers
  const [saveAddress, setSaveAddress] = useState<boolean>(false)
  const { t }: { t: any } = useTranslation('common')

  const generateSelectOptions = () =>
    countries?.map((country) => {
      return (
        <MenuItem key={country} value={country}>
          {country}
        </MenuItem>
      )
    })

  const listener = () => {
    trigger()
    const data = {
      isFormValid: isValid,
      contact: getValues(),
      saveAddress,
    }

    onSave(data)
  }

  // Declare your useEffects, useCallback, etc
  useImperativeHandle(ref, () => ({
    listener,
  }))

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
                ref={null}
                label={t('first-name')}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
                onChange={(_name, value) => field.onChange(value)}
                autoFocus={true}
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
                ref={null}
                label={t('last-name-or-sur-name')}
                error={!!errors?.lastNameOrSurname}
                helperText={errors?.lastNameOrSurname?.message}
                onChange={(_name, value) => field.onChange(value)}
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
                ref={null}
                label={t('address1')}
                error={!!errors?.address?.address1}
                helperText={errors?.address?.address1?.message}
                onChange={(_name, value) => field.onChange(value)}
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
                ref={null}
                label={t('address2')}
                error={!!errors?.address?.address2}
                helperText={errors?.address?.address2?.message}
                onChange={(_name, value) => field.onChange(value)}
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
                ref={null}
                label={t('city-or-town')}
                error={!!errors?.address?.cityOrTown}
                helperText={errors?.address?.cityOrTown?.message}
                onChange={(_name, value) => field.onChange(value)}
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
                ref={null}
                label={t('state-or-province')}
                error={!!errors?.address?.stateOrProvince}
                helperText={errors?.address?.stateOrProvince?.message}
                onChange={(_name, value) => field.onChange(value)}
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
                ref={null}
                label={t('postal-or-zip-code')}
                error={!!errors?.address?.postalOrZipCode}
                helperText={errors?.address?.postalOrZipCode?.message}
                onChange={(_name, value) => field.onChange(value)}
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
                ref={null}
                label={t('phone-number-home')}
                error={!!errors?.phoneNumbers?.home}
                helperText={errors?.phoneNumbers?.home?.message}
                onChange={(_name, value) => field.onChange(value)}
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
})

AddressForm.displayName = 'AddressForm'
export default AddressForm
