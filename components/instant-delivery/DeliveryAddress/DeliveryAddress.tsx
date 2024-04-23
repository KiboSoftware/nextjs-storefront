import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox } from '@/components/common'
import { useGetStoreServiceBoundary, DeliveryLocation } from '@/hooks'

export const useFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object().shape({
    street: yup.string().required(t('this-field-is-required')),
    city: yup.string().required(t('this-field-is-required')),
    country: yup.string().required(t('this-field-is-required')),
    state: yup.string().required(t('this-field-is-required')),
    zipcode: yup.string().required(t('this-field-is-required')),
  })
}

type Props = {
  storeBoundary: string | undefined | null
  setStoreBoundary: (storeBoundary: string | undefined | null) => void
  deliveryAddress: DeliveryLocation | undefined
  setDeliveryAddress: (address: DeliveryLocation | undefined) => void
}

const DeliveryAddress = ({
  storeBoundary,
  setStoreBoundary,
  deliveryAddress,
  setDeliveryAddress,
}: Props) => {
  const { t } = useTranslation('common')
  const addressSchema = useFormSchema()

  const { data: newStoreBoundary } = useGetStoreServiceBoundary(deliveryAddress)
  setStoreBoundary(newStoreBoundary)

  const showErrorMessage = storeBoundary === null

  const {
    control,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: deliveryAddress ? deliveryAddress : undefined,
    resolver: yupResolver(addressSchema),
    shouldFocusError: true,
  })

  const onSubmit = (data: DeliveryLocation) => {
    setStoreBoundary(undefined)
    setDeliveryAddress({ ...data })
  }

  // clear storeBoundary when address is changed
  useEffect(() => {
    if (storeBoundary && isDirty) {
      setStoreBoundary(undefined)
      setDeliveryAddress(undefined)
      console.log(`clear storeBoundary`)
    }
  }, [isDirty])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {showErrorMessage && (
          <Typography variant="caption" component="h2">
            {t('delivery-address-error-message')}
          </Typography>
        )}
      </Box>
      <Box
        component="form"
        sx={{
          m: 1,
          maxWidth: '872px',
        }}
        noValidate
        autoComplete="off"
        data-testid="address-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container rowSpacing={1} columnSpacing={{ md: 4 }}>
          <Grid item xs={12}>
            <Controller
              name="street"
              control={control}
              defaultValue={deliveryAddress?.street}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('delivery-solutions-street')}
                  ref={null}
                  error={!!errors?.street}
                  helperText={errors?.street?.message}
                  onChange={(_name: string, value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="city"
              control={control}
              defaultValue={deliveryAddress?.city}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('delivery-solutions-city')}
                  ref={null}
                  error={!!errors?.city}
                  helperText={errors?.city?.message}
                  onChange={(_name: string, value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="country"
              control={control}
              defaultValue={deliveryAddress?.country}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('delivery-solutions-country')}
                  ref={null}
                  error={!!errors?.country}
                  helperText={errors?.country?.message}
                  onChange={(_name: string, value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="state"
              control={control}
              defaultValue={deliveryAddress?.state}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('delivery-solutions-state')}
                  ref={null}
                  error={!!errors?.state}
                  helperText={errors?.state?.message}
                  onChange={(_name: string, value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="zipcode"
              control={control}
              defaultValue={deliveryAddress?.zipcode}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('delivery-solutions-zipcode')}
                  ref={null}
                  error={!!errors?.zipcode}
                  helperText={errors?.zipcode?.message}
                  onChange={(_name: string, value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {t('confirm-address')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default DeliveryAddress
