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

type Window = {
  pickupTime: { startsAt: number; endsAt?: number }
  dropoffTime: { startsAt: number; endsAt: number }
  readable: string
}
type InstantDelivery = {
  address?:
    | {
        street: string
        city: string
        country: string
        state: string
        zipcode: string
      }
    | undefined
  storeBoundary?: string[] | undefined | null
  window?:
    | {
        confirmedDate: string
        confirmedWindow: Window
        confirmedStoreId: string
      }
    | undefined
  notification?: { isSendSMS: boolean; isSendEmail: boolean }
}

type DeliveryAddressProps = {
  instantDelivery?: InstantDelivery
  setInstantDelivery: (instantDelivery: InstantDelivery) => void
}

const DeliveryAddress = ({ instantDelivery, setInstantDelivery }: DeliveryAddressProps) => {
  const address = instantDelivery?.address

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const { t } = useTranslation('common')
  const addressSchema = useFormSchema()

  const submitDeliveryAddress = isSubmitted ? address : undefined
  const { data: storeBoundary } = useGetStoreServiceBoundary(submitDeliveryAddress)

  const showErrorMessage = storeBoundary === null

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: address ? address : undefined,
    resolver: yupResolver(addressSchema),
    shouldFocusError: true,
  })

  const onSubmit = (address: DeliveryLocation) => {
    setInstantDelivery({ ...instantDelivery, address, storeBoundary: undefined })
    setIsSubmitted(true)
  }

  // clear storeBoundary when address is changed
  useEffect(() => {
    if (storeBoundary && isDirty) {
      setInstantDelivery({ ...instantDelivery, address: undefined, storeBoundary: undefined })
    }

    setIsSubmitted(false)
  }, [isDirty])

  // update storeBoundary
  useEffect(() => {
    if (storeBoundary) {
      setInstantDelivery({ ...instantDelivery, address: getValues(), storeBoundary })
    }
  }, [storeBoundary])

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
              defaultValue={address?.street}
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
              defaultValue={address?.city}
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
              defaultValue={address?.country}
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
              defaultValue={address?.state}
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
              defaultValue={address?.zipcode}
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
