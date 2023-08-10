import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, FormControl, MenuItem, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { AccountHierarchyFormStyles } from './AccountHierarchyForm.styles'
import { KiboSelect, KiboTextBox } from '@/components/common'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

import { B2BAccount } from '@/lib/gql/types'

interface AccountHierarchyFormProps {
  accounts?: B2BAccount[]
  isAddingAccountToChild: boolean
  onSave: (data: CreateCustomerB2bAccountParams) => void
  onClose: () => void
}

const useAccountHierarchySchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    parentAccount: yup.string().required(t('this-field-is-required')),
    companyOrOrganization: yup.string().required(t('this-field-is-required')),
    firstName: yup.string().required(t('this-field-is-required')),
    lastName: yup.string().required(t('this-field-is-required')),
    emailAddress: yup.string().required(t('this-field-is-required')),
  })
}

const AccountHierarchyForm = (props: AccountHierarchyFormProps) => {
  const { accounts, isAddingAccountToChild, onSave, onClose } = props

  const [isLoading, setLoading] = useState<boolean>(false)
  const [selectedParentAccount, setSelectedParentAccount] = useState<B2BAccount>()

  const { t } = useTranslation()
  const accountHierarchySchema = useAccountHierarchySchema()

  const {
    formState: { errors, isValid },
    control,
    getValues,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      parentAccount: '',
      companyOrOrganization: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      taxId: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    resolver: yupResolver(accountHierarchySchema),
    shouldFocusError: true,
  })

  useEffect(() => {
    const hasMultipleAccounts = accounts?.length && accounts.length > 1
    if (!hasMultipleAccounts) {
      setValue('parentAccount', accounts?.[0]?.companyOrOrganization as string)
      setSelectedParentAccount(accounts?.[0])
    }
  }, [accounts])

  const onSubmit = () => {
    if (isLoading || !isValid) return
    setLoading(true)
    const formValues = getValues()
    onSave({
      ...formValues,
      parentAccount: selectedParentAccount,
    })
  }

  const handleParentAccountChange = (name: string, value: string) => {
    const account: B2BAccount | undefined = accounts?.find(
      (account: B2BAccount) => account.id === parseInt(value)
    )
    setValue('parentAccount', account?.companyOrOrganization as string)
    setSelectedParentAccount(account)
  }

  return (
    <form data-testid="account-hierarchy-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{ width: '100%' }}>
        {isAddingAccountToChild ? (
          <Controller
            name="parentAccount"
            control={control}
            render={({ field }) => (
              <KiboTextBox
                value={field.value ?? ''}
                label={t('parent-account')}
                onChange={(_name, value) => field.onChange(value)}
                onBlur={field.onBlur}
                disabled
                error={!!errors?.parentAccount}
                helperText={errors?.parentAccount?.message as string}
              />
            )}
          />
        ) : (
          <Controller
            name="parentAccount"
            control={control}
            render={({ field }) => (
              <KiboSelect
                sx={{ marginBottom: '20px' }}
                name="parentAccount"
                label={t('parent-account')}
                onChange={handleParentAccountChange}
                placeholder={t('select-parent-account')}
                error={!!errors?.parentAccount}
                helperText={errors?.parentAccount?.message as string}
                value={selectedParentAccount?.id?.toString() ?? ''}
              >
                {accounts?.map((account: B2BAccount) => {
                  return (
                    <MenuItem key={account?.id} value={`${account?.id}`}>
                      {account?.companyOrOrganization}
                    </MenuItem>
                  )
                })}
              </KiboSelect>
            )}
          />
        )}

        <Controller
          name="companyOrOrganization"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value ?? ''}
              label={t('company-name')}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.companyOrOrganization}
              helperText={errors?.companyOrOrganization?.message as string}
            />
          )}
        />

        <Controller
          name="taxId"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value ?? ''}
              label={`${t('tax-id')} (${t('optional')})`}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.taxId}
              helperText={errors?.taxId?.message as string}
            />
          )}
        />

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value ?? ''}
              label={t('first-name')}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message as string}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value ?? ''}
              label={t('last-name-or-sur-name')}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message as string}
            />
          )}
        />

        <Controller
          name="emailAddress"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              type="email"
              value={field.value ?? ''}
              label={t('email')}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.emailAddress}
              helperText={errors?.emailAddress?.message as string}
            />
          )}
        />

        <Stack gap={2} sx={{ ...AccountHierarchyFormStyles.buttonStackStyle }}>
          <Button
            data-testid="cancel-button"
            variant="contained"
            color="secondary"
            type="reset"
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <LoadingButton
            data-testid="submit-button"
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {t('create-account')}
          </LoadingButton>
        </Stack>
      </FormControl>
    </form>
  )
}

export default AccountHierarchyForm
