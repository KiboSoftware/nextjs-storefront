/** @format */

import React, { useState } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProfileDetailsForm } from '@/components/my-account'
import { useUpdateUserDataMutations, useUpdateUserPasswordMutations } from '@/hooks'
import { userGetters } from '@/lib/getters'
import { UpdateProfileDataParam, PasswordTypes } from '@/lib/types'

import { CustomerAccount } from '@/lib/gql/types'

enum ProfileSections {
  Name = 1,
  Email,
  Password,
}
interface MyProfileProps {
  user: CustomerAccount
}

const MyProfile = (props: MyProfileProps) => {
  const { user } = props
  const { t } = useTranslation('common')
  const { updateUserData } = useUpdateUserDataMutations()
  const { updateUserPasswordData } = useUpdateUserPasswordMutations()

  const [currentEditableField, setCurrentEditableField] = useState<number | null>(null)

  const { id, firstName, lastName, emailAddress, fullName } =
    userGetters.getCustomerAccountDetails(user)

  const viewProfileDetails = [
    {
      id: ProfileSections.Name,
      label: t('customer-name'),
      value: fullName,
    },
    {
      id: ProfileSections.Email,
      label: t('email'),
      value: emailAddress,
    },
    {
      id: ProfileSections.Password,
      label: t('password'),
      value: '**************',
    },
  ]

  const handleUpdateProfileData = async (profileFormData: UpdateProfileDataParam) => {
    if (profileFormData.oldPassword && profileFormData.newPassword) {
      handleUpdateUserPassword(profileFormData)
      return
    }

    try {
      await updateUserData.mutateAsync({
        accountId: id,
        customerAccountInput: {
          id: id,
          firstName: profileFormData.firstName || firstName,
          lastName: profileFormData.lastName || lastName,
          emailAddress: profileFormData.emailAddress || emailAddress,
        },
      })
    } catch (err) {
      console.log(err)
    }
    setCurrentEditableField(null)
  }

  const handleUpdateUserPassword = async (updatedPassword: PasswordTypes) => {
    try {
      await updateUserPasswordData.mutateAsync({
        accountId: id,
        passwordInfoInput: {
          oldPassword: updatedPassword.oldPassword as string,
          newPassword: updatedPassword.newPassword as string,
          externalPassword: updatedPassword.newPassword as string,
        },
      })
    } catch (err) {
      console.log(err)
    }

    setCurrentEditableField(null)
  }

  if (Boolean(currentEditableField)) {
    return (
      <ProfileDetailsForm
        {...(currentEditableField === ProfileSections.Email && { isEmailForm: true })}
        {...(currentEditableField === ProfileSections.Password && { isPasswordForm: true })}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
        onSaveProfileData={handleUpdateProfileData}
        onCancel={() => setCurrentEditableField(null)}
      />
    )
  }

  return (
    <>
      <Stack gap={2}>
        {viewProfileDetails.map((each) => {
          return (
            <Box
              key={each.label}
              display="flex"
              alignItems={'flex-end'}
              justifyContent={'space-between'}
            >
              <Stack gap={1}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {each.label}
                </Typography>
                <Typography variant="body1" data-testid={each.label}>
                  {each.value}
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                onClick={() => {
                  setCurrentEditableField(each.id)
                }}
                sx={{ cursor: 'pointer' }}
              >
                {t('edit')}
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </>
  )
}

export default MyProfile
