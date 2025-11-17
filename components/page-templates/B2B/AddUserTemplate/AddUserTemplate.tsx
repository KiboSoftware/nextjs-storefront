// Add User Template - New page for adding B2B users

import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import {
  Typography,
  Paper,
  styled,
  Theme,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { UserForm } from '@/components/b2b'
import { useAuthContext } from '@/context'
import { useAddUserRolesAsync } from '@/hooks'
import { B2BAccountHierarchyResult } from '@/lib/types'
import { B2BUserInput } from '@/lib/types/CustomerB2BUser'

const BackButtonLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  typography: 'body2',
  textDecoration: 'none',
  color: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0rem',
  cursor: 'pointer',
}))

const ContentPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2)
}))

interface AddUserTemplateProps {
  initialData?: B2BAccountHierarchyResult
  accountUserBehaviors?: Record<number, number[]>
}

const AddUserTemplate = ({ initialData, accountUserBehaviors }: AddUserTemplateProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { user } = useAuthContext()

  const { addUserRoles } = useAddUserRolesAsync()

  const handleAddUser = async (formValues: B2BUserInput & { roleAssignments?: Record<number, string[]> }) => {
    try {
      if (!user?.userId) {
        console.error('User ID not found')
        return
      }

      const userId = user.userId
      const roleAssignments = formValues.roleAssignments || {}
      
      // Assign each role for each account
      const roleAssignmentPromises: Promise<boolean>[] = []
      
      Object.entries(roleAssignments).forEach(([accountId, roleIds]) => {
        roleIds.forEach((roleId) => {
          roleAssignmentPromises.push(
            addUserRoles.mutateAsync({
              accountId: parseInt(accountId),
              userId: userId,
              roleId: parseInt(roleId),
            })
          )
        })
      })
      
      // Wait for all role assignments to complete
      await Promise.all(roleAssignmentPromises)
      
      // Navigate back to users list after successful role assignment
      router.push('/my-account/b2b/users')
    } catch (e) {
      console.error(e)
    }
  }

  const handleClose = () => {
    router.push('/my-account/b2b/users')
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '15px', marginBottom: '20px' }}>
        <BackButtonLink aria-label={t('users')} href="/my-account/b2b/users">
          <ChevronLeftIcon />
          {mdScreen && <Typography variant="body1">{t('users')}</Typography>}
        </BackButtonLink>
        <Typography variant={mdScreen ? 'h1' : 'h2'} sx={{ marginTop: 2 }}>
          {t('add-new-user')}
        </Typography>
      </Grid>

      {/* Form Content in Paper */}
      <ContentPaper elevation={0}>
        <UserForm
          isEditMode={false}
          isUserFormInDialog={false}
          b2BUser={undefined}
          onSave={handleAddUser}
          onClose={handleClose}
          accounts={initialData?.accounts || []}
          accountUserBehaviors={accountUserBehaviors}
        />
      </ContentPaper>
    </Grid>
  )
}

export default AddUserTemplate
