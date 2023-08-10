import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
  Theme,
  Stack,
  MenuItem,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboSelect, KiboTextBox } from '@/components/common'

import { CrPurchaseOrderPayment, CustomerPurchaseOrderPaymentTerm } from '@/lib/gql/types'

const schema = yup.object().shape({
  purchaseOrderNumber: yup.string().required('This field is required'),
  paymentTerm: yup.string().when('$purchaseOrderPaymentTerms', {
    is: (purchaseOrderPaymentTerms: any) =>
      purchaseOrderPaymentTerms && purchaseOrderPaymentTerms.length > 1,
    then: yup.string().required('This field is required when more data is present.'),
    otherwise: yup.string().nullable(),
  }),
})

interface PurchaseOrderFormProps {
  creditLimit: number
  availableBalance: number
  purchaseOrderPaymentTerms: CustomerPurchaseOrderPaymentTerm[]
  validateForm: boolean
  onFormStatusChange: (isValid: boolean) => void
  onSavePurchaseData: (data: CrPurchaseOrderPayment & { isDataUpdated: boolean }) => void
}

const PurchaseOrderForm = (props: PurchaseOrderFormProps) => {
  const {
    creditLimit,
    availableBalance,
    purchaseOrderPaymentTerms,
    validateForm,
    onFormStatusChange,
    onSavePurchaseData,
  } = props
  const { t } = useTranslation('common')
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    shouldFocusError: true,
    context: { purchaseOrderPaymentTerms },
  })
  const singlePurchaseOrderPaymentTerms =
    purchaseOrderPaymentTerms?.length === 1 ? purchaseOrderPaymentTerms?.[0] : null

  const generateSelectOptions = () =>
    purchaseOrderPaymentTerms?.map((paymentTerm: any) => {
      return (
        <MenuItem key={paymentTerm?.code} value={paymentTerm.description}>
          {paymentTerm.description}
        </MenuItem>
      )
    })

  const onValid = async (formData: any) => {
    const purchaseOrderFormData = {
      isDataUpdated: true,
      ...formData,
      paymentTerm: singlePurchaseOrderPaymentTerms
        ? singlePurchaseOrderPaymentTerms
        : purchaseOrderPaymentTerms.find((term: any) => term.description === formData.paymentTerm),
    }
    onSavePurchaseData(purchaseOrderFormData)
  }

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
      data-testid="purchase-order-form"
    >
      <Grid container rowSpacing={1} columnSpacing={{ md: 4 }}>
        {!mdScreen && (
          <Grid item xs={6} md={6}>
            <InputLabel shrink={true} sx={{ position: 'relative', left: '-13px' }}>
              {t('credit-limit')}
            </InputLabel>
            <Typography>{t('currency', { val: creditLimit })}</Typography>
          </Grid>
        )}
        {!mdScreen && (
          <Grid item xs={6} md={6}>
            <InputLabel shrink={true} sx={{ position: 'relative', left: '-13px' }}>
              {t('available-balance')}
            </InputLabel>
            <Typography>{t('currency', { val: availableBalance })}</Typography>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Controller
            name="purchaseOrderNumber"
            control={control}
            // defaultValue={contact?.address?.address1}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('po-number')}
                ref={null}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </Grid>
        {mdScreen && (
          <Grid item xs={12} md={6}>
            <Stack direction="row" mt={'1rem'} mb={'1rem'}>
              <Typography fontWeight="bold" sx={{ marginRight: '1rem' }}>
                {t('credit-limit')}
              </Typography>
              <Typography>{t('currency', { val: creditLimit })}</Typography>
            </Stack>
            <Stack direction="row">
              <Typography fontWeight="bold" sx={{ marginRight: '1rem' }}>
                {t('available-balance')}
              </Typography>
              <Typography>{t('currency', { val: availableBalance })}</Typography>
            </Stack>
          </Grid>
        )}
        {singlePurchaseOrderPaymentTerms && (
          <Grid item xs={12} md={12}>
            <InputLabel shrink={true} sx={{ position: 'relative', left: '-13px' }}>
              {t('payment-terms')}
            </InputLabel>
            {singlePurchaseOrderPaymentTerms && (
              <Typography>{singlePurchaseOrderPaymentTerms.description}</Typography>
            )}
          </Grid>
        )}
        {purchaseOrderPaymentTerms.length > 1 && (
          <Grid item xs={12} md={6}>
            <Controller
              name="paymentTerm"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <KiboSelect
                    name="payment-terms"
                    label={t('payment-terms')}
                    value={field.value}
                    placeholder={t('select-payment-term')}
                    onChange={(_name, value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    required={true}
                  >
                    {generateSelectOptions()}
                  </KiboSelect>
                </div>
              )}
            />
          </Grid>
        )}

        {/* <Grid item xs={12} md={6}>
          <Controller
            name="po-external-id"
            control={control}
            // defaultValue={contact?.address?.address2}
            render={({ field }) => (
              <KiboTextBox
                {...field}
                value={field.value || ''}
                label={t('po-external-id')}
                ref={null}
                placeholder="XXX"
                // error={!!errors?.address?.address2}
                // helperText={errors?.address?.address2?.message}
                onChange={(_name: string, value: string) => field.onChange(value)}
                onBlur={field.onBlur}
              />
            )}
          />
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default PurchaseOrderForm
