import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  Theme,
  useTheme,
  Checkbox,
  FormControlLabel,
  FormControl,
  SxProps,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import {
  KiboTextBox,
  OrderPrice,
  PasswordValidation,
  ProductItem,
  ProductItemList,
} from '@/components/common'
import type { OrderPriceProps } from '@/components/common/OrderPrice/OrderPrice'
import { useCheckoutStepContext, useAuthContext } from '@/context'
import { addressGetters, checkoutGetters, orderGetters, productGetters } from '@/lib/getters'
import { isPasswordValid } from '@/lib/helpers/validations/validations'

import type { CrOrder, Maybe, Checkout, CrOrderItem, CrProduct, CrContact } from '@/lib/gql/types'

export interface PersonalDetails {
  email: Maybe<string> | undefined
  showAccountFields: boolean
  firstName: string
  lastNameOrSurname: string
  password: string
}

interface ReviewStepProps {
  checkout: CrOrder | Checkout
  shipItems: any
  pickupItems: any
  personalDetails: any
  orderSummaryProps: any
  isMultiShipEnabled: boolean
  onCreateOrder: (params: any) => void
}

const buttonStyle = {
  height: '2.625rem',
  maxWidth: '23.5rem',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const commonStyle = {
  width: '100%',
  maxWidth: '421px',
}

const styles = {
  confirmAndPayButtonStyle: {
    ...buttonStyle,
    marginBottom: '0.75rem',
    '&:disabled': {
      backgroundColor: '#C0E3DF',
    },
  },
  goBackButtonStyle: {
    ...buttonStyle,
  },
}

const useDetailsSchema = () => {
  const { t } = useTranslation('common')

  return yup.object().shape({
    email: yup.string().email().required(t('this-field-is-required')),
    showAccountFields: yup.boolean(),
    firstName: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required(t('this-field-is-required')),
    }),
    lastNameOrSurname: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required(t('this-field-is-required')),
    }),
    password: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required(t('this-field-is-required')),
    }),
  })
}

const ReviewStep = (props: ReviewStepProps) => {
  const {
    checkout,
    personalDetails,
    orderSummaryProps,
    shipItems,
    pickupItems,
    onCreateOrder,
    isMultiShipEnabled,
  } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const { isAuthenticated, createAccount } = useAuthContext()
  const [isAgreeWithTermsAndConditions, setAgreeWithTermsAndConditions] = useState<boolean>(false)

  const { setStepNext, setStepBack, setStepStatusComplete } = useCheckoutStepContext()
  const { subTotal, shippingTotal, taxTotal, total } = orderSummaryProps

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
    getValues,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: personalDetails ? { ...personalDetails, email: checkout?.email } : undefined,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })

  const showAccountFields: boolean = watch(['showAccountFields']).join('') === 'true'
  const userEnteredPassword: string = watch(['password']).join('')
  const isEnabled = () => {
    if (showAccountFields) {
      const isUserEnteredPasswordValid = showAccountFields
        ? isPasswordValid(userEnteredPassword)
        : true

      const isFormValid = showAccountFields ? isValid && isUserEnteredPasswordValid : true

      return isAgreeWithTermsAndConditions && isFormValid
    }
    return isAgreeWithTermsAndConditions
  }

  const handleAgreeTermsConditions = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAgreeWithTermsAndConditions(event.target.checked)

  const onValid = async (formData: PersonalDetails) => {
    onCreateOrder(checkout)

    if (formData?.showAccountFields) {
      await createAccount({
        email: checkout.email as string,
        firstName: formData.firstName,
        lastNameOrSurname: formData.lastNameOrSurname,
        password: formData.password,
      })
    }

    setStepStatusComplete()
    setStepNext()
  }

  const onInvalidForm = () => console.log('Invalid Form')
  const handleComplete = () => handleSubmit(onValid, onInvalidForm)()

  const orderPriceProps: OrderPriceProps = {
    subTotalLabel: t('subtotal'),
    shippingTotalLabel: t('shipping'),
    taxLabel: t('estimated-tax'),
    totalLabel: t('total'),
    subTotal: t('currency', { val: subTotal }),
    shippingTotal: shippingTotal ? t('currency', { val: shippingTotal }) : t('free'),
    tax: t('currency', { val: taxTotal }),
    total: t('currency', { val: total }),
  }

  return (
    <Box data-testid={'review-step-component'}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }} color="text.primary">
        {t('order-details')}
      </Typography>

      <Divider color={theme.palette.primary.main} sx={{ mt: '1.688rem', mb: '1.438rem' }} />

      {/* MultiShip Checkout */}
      {isMultiShipEnabled && shipItems && shipItems.length > 0 && (
        <Stack gap={4}>
          <Typography variant="h3" component="h3" fontWeight={600} color="text.primary">
            {t('shipping-to-address')}
          </Typography>
          {/* <ReviewProductItemsWithAddresses items={shipItems} /> */}

          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
            data-testid="product-item-stack-multi-ship"
          >
            {shipItems?.map((item: Maybe<CrOrderItem>) => {
              const product = item?.product as CrProduct
              const destination = (checkout as unknown as Checkout).destinations?.find(
                (destination) => destination?.id === item?.destinationId
              )
              const formattedAddress = destination
                ? addressGetters.getFormattedAddress(destination?.destinationContact as CrContact)
                : ''
              return (
                <>
                  <Typography variant="h4" component="h4" fontWeight={'bold'} color="text.primary">
                    {t('ship-to')}
                    <Typography
                      variant="h4"
                      component="span"
                      color="text.primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {`${formattedAddress}`}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="h4"
                    component="h4"
                    marginTop="0"
                    fontWeight="bold"
                    color="primary"
                  >
                    {t('est-arrival')}{' '}
                    {checkoutGetters.getFormattedDate(item?.expectedDeliveryDate)}
                  </Typography>

                  <Stack key={item?.id}>
                    <ProductItem
                      id={orderGetters.getCartItemId(item as CrOrderItem)}
                      qty={orderGetters.getProductQuantity(item as CrOrderItem)}
                      purchaseLocation={orderGetters.getPurchaseLocation(item as CrOrderItem)}
                      productCode={productGetters.getProductId(product)}
                      image={productGetters.getProductImage(product)}
                      name={productGetters.getName(product)}
                      options={productGetters.getOptions(product)}
                      price={productGetters.getPrice(product).regular?.toString()}
                      salePrice={productGetters.getPrice(product).special?.toString()}
                      expectedDeliveryDate={item?.expectedDeliveryDate}
                      data-testid="product-item-multi-ship"
                    />
                  </Stack>
                </>
              )
            })}
          </Stack>

          <Divider sx={{ mb: '1.438rem' }} />
        </Stack>
      )}

      {/* Standard Checkout */}
      {!isMultiShipEnabled && shipItems && shipItems.length > 0 && (
        <Stack gap={4}>
          <Typography variant="h3" component="h3" sx={{ fontWeight: 'bold' }} color="text.primary">
            {t('shipping-to-home')}
          </Typography>
          <ProductItemList items={shipItems} />
          <Divider sx={{ mb: '1.438rem' }} />
        </Stack>
      )}

      {/* Standard and MultiShip Checkout */}
      {pickupItems && pickupItems.length > 0 && (
        <Stack gap={4}>
          <Typography variant="h3" component="h3" sx={{ fontWeight: 'bold' }} color="text.primary">
            {t('pickup-in-store')}
          </Typography>
          <ProductItemList items={pickupItems} />
          <Divider sx={{ mt: '1.ZZ438rem', mb: '1.188rem' }} />
        </Stack>
      )}

      <OrderPrice {...orderPriceProps} />

      <Box sx={{ mt: '31px', mb: '35px' }}>
        <FormControlLabel
          control={
            <Checkbox
              inputProps={{
                'aria-label': 'termsConditions',
              }}
              data-testid="termsConditions"
              size="medium"
              color="primary"
              value={isAgreeWithTermsAndConditions}
              onChange={handleAgreeTermsConditions}
            />
          }
          label={`${t('terms-conditions')}`}
        />

        <Box>
          <FormControl>
            <Controller
              name="showAccountFields"
              control={control}
              defaultValue={personalDetails?.showAccountFields}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      inputProps={{
                        'aria-label': 'showAccountFields',
                      }}
                      data-testid="showAccountFields"
                      size="medium"
                      color="primary"
                      disabled={isAuthenticated}
                      value={field.value}
                      onChange={(_name, value) => field.onChange(value)}
                    />
                  }
                  label={t('i-want-to-create-an-account').toString()}
                />
              )}
            />
          </FormControl>
        </Box>

        {getValues()?.showAccountFields && (
          <FormControl>
            <Controller
              name="firstName"
              control={control}
              defaultValue={personalDetails?.firstName || ''}
              render={({ field }) => (
                <KiboTextBox
                  value={field.value}
                  label={t('first-name')}
                  required
                  sx={{ ...commonStyle }}
                  onBlur={field.onBlur}
                  onChange={(_name, value) => field.onChange(value)}
                  error={!!errors?.firstName}
                  helperText={errors?.firstName?.message as string}
                />
              )}
            />
            <Controller
              name="lastNameOrSurname"
              control={control}
              defaultValue={personalDetails?.lastNameOrSurname || ''}
              render={({ field }) => (
                <KiboTextBox
                  value={field.value}
                  label={t('last-name-or-sur-name')}
                  required
                  sx={{ ...commonStyle }}
                  onBlur={field.onBlur}
                  onChange={(_name, value) => field.onChange(value)}
                  error={!!errors?.lastNameOrSurname}
                  helperText={errors?.lastNameOrSurname?.message as string}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={personalDetails?.password || ''}
              render={({ field }) => (
                <KiboTextBox
                  value={field.value}
                  label={t('password')}
                  required
                  sx={{ ...commonStyle }}
                  onBlur={field.onBlur}
                  onChange={(_name, value) => field.onChange(value)}
                  error={!!errors?.password}
                  helperText={errors?.password?.message as string}
                  type="password"
                  placeholder="password"
                />
              )}
            />

            <PasswordValidation password={userEnteredPassword} />
          </FormControl>
        )}
      </Box>
      <Stack alignItems="left">
        <Button
          variant="contained"
          color="primary"
          sx={{
            ...styles.confirmAndPayButtonStyle,
          }}
          disabled={!isEnabled()}
          onClick={handleComplete}
        >
          {t('confirm-and-pay')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            ...styles.goBackButtonStyle,
          }}
          onClick={() => setStepBack()}
        >
          {t('go-back')}
        </Button>
      </Stack>
    </Box>
  )
}

export default ReviewStep
