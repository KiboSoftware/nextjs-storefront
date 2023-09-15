import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, InputLabel, MenuItem, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { AccountHierarchyFormStyles } from '../AccountHierarchyForm/AccountHierarchyForm.styles'
import { KiboSelect } from '@/components/common'

import { B2BAccount } from '@/lib/gql/types'

interface AccountHierarchyChangeParentProps {
  accounts: B2BAccount[]
  parentAccount: B2BAccount
  onSave: (parentAccountId: number) => void
  onClose: () => void
}

const useAccountHierarchySchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    parentAccount: yup.string().required(t('this-field-is-required')),
  })
}

const AccountHierarchyChangeParent = (props: AccountHierarchyChangeParentProps) => {
  const { accounts, parentAccount, onSave, onClose } = props

  const [isLoading, setLoading] = useState<boolean>(false)
  const [selectedParentAccount, setSelectedParentAccount] = useState<B2BAccount>()

  const { t } = useTranslation()
  const accountHierarchySchema = useAccountHierarchySchema()

  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      parentAccount: '',
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
    if (isLoading || !selectedParentAccount) return
    setLoading(true)
    onSave(selectedParentAccount.id)
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
      <Box sx={{ marginBottom: 3 }}>
        <InputLabel shrink>{t('current-parent-account')}</InputLabel>
        <Typography>{parentAccount?.companyOrOrganization}</Typography>
      </Box>

      <FormControl sx={{ width: '100%' }}>
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
            {t('update-account')}
          </LoadingButton>
        </Stack>
      </FormControl>
    </form>
  )
}

export default AccountHierarchyChangeParent
