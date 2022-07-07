import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Typography,
  Divider,
  Stack,
  Button,
  SxProps,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { FullWidthDivider, KiboTextBox } from '@/components/common'

interface FormData {
  orderNumber: string
  billingEmail: string
}

export interface ViewOrderStatusProps {
  onOrderStatusSubmit: (data: FormData) => void
  lookupErrorMessage?: string
}

const buttonStyle = {
  height: '42px',
  maxWidth: '421px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const useViewOrderStatusSchema = () => {
  const { t } = useTranslation('orderhistory')

  return yup.object().shape({
    orderNumber: yup.string().required(t('order-number-is-required')),
    billingEmail: yup
      .string()
      .email(t('billing-email-must-be-a-valid-email'))
      .required(t('billing-email-is-required')),
  })
}

const ViewOrderStatus = (props: ViewOrderStatusProps) => {
  const { onOrderStatusSubmit, lookupErrorMessage } = props
  const { t } = useTranslation('orderhistory')

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: undefined,
    resolver: yupResolver(useViewOrderStatusSchema()),
    shouldFocusError: true,
  })

  const onValid = async (formData: FormData) => onOrderStatusSubmit(formData)

  return (
    <Stack gap={4}>
      <Typography variant="h1">{t('view-order-status')}</Typography>

      {mdScreen ? (
        <Divider sx={{ borderColor: 'primary.main' }} />
      ) : (
        <FullWidthDivider color="primary.main" />
      )}

      <Stack gap={1}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {t('check-order-status-fast-simple')}
        </Typography>
        <Typography>{t('check-order-status-instruction')}</Typography>
      </Stack>

      <Stack>
        <form onSubmit={handleSubmit(onValid)}>
          <Stack sx={{ maxWidth: '910px' }} direction={{ xs: 'column', md: 'row' }}>
            <Controller
              name="orderNumber"
              control={control}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('order-number')}
                  ref={null}
                  error={!!errors?.orderNumber}
                  helperText={errors?.orderNumber?.message}
                  onChange={(_name, value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                  sx={{ maxWidth: '421px' }}
                />
              )}
            />

            <Controller
              name="billingEmail"
              control={control}
              render={({ field }) => (
                <KiboTextBox
                  {...field}
                  value={field.value || ''}
                  label={t('billing-email')}
                  ref={null}
                  error={!!errors?.billingEmail}
                  helperText={errors?.billingEmail?.message}
                  onChange={(_name, value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  required={true}
                  sx={{ maxWidth: '421px' }}
                />
              )}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            sx={{ ...buttonStyle }}
            fullWidth
            disabled={!isDirty || !isValid}
          >
            {t('check-order-status')}
          </Button>
        </form>
      </Stack>

      {lookupErrorMessage && <Box>{lookupErrorMessage}</Box>}

      {mdScreen ? <Divider sx={{ borderColor: 'grey.500' }} /> : <FullWidthDivider />}
    </Stack>
  )
}

export default ViewOrderStatus
