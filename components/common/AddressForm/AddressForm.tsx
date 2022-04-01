/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, forwardRef, useImperativeHandle } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  TextField,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

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
    stateOrProvince: yup.string().required('This fieldate is required'),
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

  const handleEnter = (event: any) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      form.elements[index + 1].focus()
      event.preventDefault()
    }
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
            render={({ field: { onChange, value = '' } }) => (
              <div>
                {/* TODO: Replce below code block with KiboSelect (once its ready) */}
                <InputLabel sx={{ mb: 1, typography: 'caption' }} htmlFor="countryCode">
                  {t('country-code')}
                </InputLabel>
                <TextField
                  select
                  id="countryCode"
                  name="country-code"
                  onChange={onChange}
                  value={value}
                  sx={{ width: '100%' }}
                  size="small"
                  required={true}
                >
                  {generateSelectOptions()}
                </TextField>
                <FormHelperText id="helper-text" error>
                  {errors?.address?.countryCode ? errors?.address?.countryCode?.message : ' '}
                </FormHelperText>
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
                onChange={(name, value) => field.onChange(value)}
                onKeyDown={handleEnter}
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
