import React, { useState } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import UserForm from '../UserForm/UserForm'
import { UserFormDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { userGetters } from '@/lib/getters'
import { B2BUserInput } from '@/lib/types'

import { B2BUser } from '@/lib/gql/types'

interface UserTableProps {
  b2bUsers: B2BUser[] | undefined
  onDelete: (id: string | undefined) => void
  onSave: (formValues: B2BUserInput, b2BUser?: B2BUser | undefined) => void
}

const style = {
  emailAddressCell: {
    flex: { md: 1, xs: 0.5 },
    maxWidth: { xs: '120px', sm: '130px', md: '100%' },
    overflow: { xs: 'hidden' },
    textOverflow: { xs: 'ellipsis' },
  },
}

const UserTable = (props: UserTableProps) => {
  const { b2bUsers, onDelete, onSave } = props

  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [editUserId, setEditUserId] = useState<string | undefined>(undefined)

  const onEditUserButtonClick = (b2BUser: B2BUser) => {
    if (mdScreen) {
      setEditUserId(b2BUser.userId as string)
      return
    }
    showModal({
      Component: UserFormDialog,
      props: {
        isEditMode: true,
        isUserFormInDialog: true,
        formTitle: t('edit-user'),
        b2BUser,
        onSave: (b2BUserInput: B2BUserInput) => onSave(b2BUserInput, b2BUser),
        onClose: () => {
          setEditUserId(undefined)
          closeModal()
        },
      },
    })
  }

  return (
    <Table>
      {!b2bUsers?.length ? (
        <caption style={{ textAlign: 'center' }}>{t('no-record-found')}</caption>
      ) : null}
      <TableHead>
        <TableRow style={{ backgroundColor: theme.palette.grey[100] }}>
          <TableCell
            colSpan={2}
            sx={{ flex: 1, width: { xs: '150px' }, overflow: { xs: 'hidden' } }}
          >
            {t('email')}
          </TableCell>
          {mdScreen && (
            <>
              <TableCell>{t('first-name')}</TableCell>
              <TableCell>{t('last-name-or-sur-name')}</TableCell>
            </>
          )}
          <TableCell>{t('role')}</TableCell>
          {mdScreen && <TableCell>{t('status')}</TableCell>}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {b2bUsers?.map((b2bUser: B2BUser) =>
          editUserId && editUserId === b2bUser?.userId ? (
            <TableRow key={b2bUser?.userId}>
              <TableCell colSpan={7} style={{ width: '100%', padding: 0 }}>
                <UserForm
                  isEditMode={true}
                  b2BUser={b2bUser}
                  onClose={() => setEditUserId(undefined)}
                  onSave={onSave}
                />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow key={b2bUser?.userId}>
              <TableCell colSpan={2} sx={style.emailAddressCell}>
                {userGetters.getEmailAddress(b2bUser)}
              </TableCell>
              {mdScreen && (
                <>
                  <TableCell sx={{ flex: 1 }}>{userGetters.getFirstName(b2bUser)}</TableCell>
                  <TableCell sx={{ flex: 1 }}>{userGetters.getLastName(b2bUser)}</TableCell>
                </>
              )}
              <TableCell sx={{ flex: 1 }}>{userGetters.getRole(b2bUser)}</TableCell>
              {mdScreen && (
                <TableCell sx={{ flex: 1 }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1 }}
                  >
                    {b2bUser?.isActive ? (
                      <CircleIcon sx={{ fontSize: '14px' }} color="success" />
                    ) : (
                      <CircleIcon sx={{ fontSize: '14px' }} color="disabled" />
                    )}
                    <Typography>
                      {userGetters.getStatus(b2bUser) ? t('active') : t('in-active')}
                    </Typography>
                  </Box>
                </TableCell>
              )}
              <TableCell sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <IconButton
                    aria-label="item-edit"
                    name="item-edit"
                    onClick={() => onEditUserButtonClick(b2bUser)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="item-delete"
                    name="item-delete"
                    onClick={() => onDelete(b2bUser?.userId as string)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}

export default UserTable
