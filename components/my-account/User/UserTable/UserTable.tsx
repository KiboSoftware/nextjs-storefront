import React, { useState } from 'react'

import { Edit as EditIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import UserForm from '../UserForm/UserForm'
import UserFormDialog from '@/components/dialogs/UserFormDialog/UserFormDialog'
import { useModalContext } from '@/context'
import { B2BUserInput } from '@/lib/types/CustomerB2BUser'

import { B2BUser } from '@/lib/gql/types'

interface UserTableProps {
  b2bUsers: B2BUser[] | undefined
  onDelete: (id: string | undefined) => void
  onSave: (formValues: B2BUserInput, b2BUser?: B2BUser | undefined) => void
}

const UserStatusCircle = styled('div', {
  shouldForwardProp: (prop) => prop == 'color',
})<{ color: string }>(({ color }) => ({
  height: '12px',
  width: '12px',
  left: 0,
  top: '3.5px',
  borderRadius: '100px',
  marginRight: '8px',
  background: color,
}))

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
        onSave: (b2BUserInput: B2BUserInput) => onSave(b2BUserInput),
        onClose: () => {
          setEditUserId(undefined)
          closeModal()
        },
      },
    })
  }

  return (
    <Table style={{ minHeight: b2bUsers?.length ? 0 : '345px' }}>
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
        {!b2bUsers?.length ? (
          <TableRow key="no-record-found">
            <TableCell colSpan={7} style={{ width: '100%', padding: 0 }}>
              <Typography style={{ textAlign: 'center' }}>No record found</Typography>
            </TableCell>
          </TableRow>
        ) : null}
        {b2bUsers?.map((b2bUser) =>
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
                {b2bUser?.emailAddress}
              </TableCell>
              {mdScreen && (
                <>
                  <TableCell sx={{ flex: 1 }}>{b2bUser?.firstName}</TableCell>
                  <TableCell sx={{ flex: 1 }}>{b2bUser?.lastName}</TableCell>
                </>
              )}
              <TableCell sx={{ flex: 1 }}>
                {(b2bUser?.roles && b2bUser?.roles.length && b2bUser?.roles[0]?.roleName) || 'N/A'}
              </TableCell>
              {mdScreen && (
                <TableCell sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <UserStatusCircle
                      color={
                        b2bUser.isActive ? theme.palette.primary.main : theme.palette.grey[600]
                      }
                    ></UserStatusCircle>
                    <Typography>{b2bUser.isActive ? t('active') : t('in-active')}</Typography>
                  </Box>
                </TableCell>
              )}
              <TableCell sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <EditIcon
                    onClick={() => onEditUserButtonClick(b2bUser)}
                    style={{ marginRight: '16px', cursor: 'pointer' }}
                  />
                  <RemoveCircleIcon
                    onClick={() => onDelete(b2bUser?.userId as string)}
                    style={{ cursor: 'pointer' }}
                  />
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
