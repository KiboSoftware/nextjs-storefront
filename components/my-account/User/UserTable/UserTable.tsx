import React from 'react'

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

import { B2BUser, Maybe } from '@/lib/gql/types'

interface UserTableProps {
  b2bAccountUsers: B2BUser[] | undefined
  deleteUser: (id: Maybe<string> | undefined) => void
  editUserId: Maybe<string> | undefined
  setEditUserId: (id: Maybe<string> | undefined) => void
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
    maxWidth: { xs: '150px', md: '100%' },
    overflow: { xs: 'hidden' },
    textOverflow: { xs: 'ellipsis' },
  },
}

const UserTable = (props: UserTableProps) => {
  const { b2bAccountUsers, deleteUser, editUserId, setEditUserId } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Table style={{ minHeight: b2bAccountUsers && b2bAccountUsers.length ? 0 : '345px' }}>
      <TableHead>
        <TableRow style={{ backgroundColor: theme.palette.grey[100] }}>
          <TableCell
            colSpan={2}
            sx={{ flex: 1, width: { xs: '150px' }, overflow: { xs: 'hidden' } }}
          >
            {mdScreen ? t('email-address') : t('email')}
          </TableCell>
          {mdScreen && <TableCell>{t('first-name')}</TableCell>}
          {mdScreen && <TableCell>{t('last-name-or-sur-name')}</TableCell>}
          <TableCell>{t('role')}</TableCell>
          {mdScreen && <TableCell>{t('status')}</TableCell>}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {b2bAccountUsers &&
          b2bAccountUsers.map((b2bUser) =>
            editUserId && editUserId === b2bUser?.userId ? (
              <TableRow key={b2bUser?.userId}>
                <TableCell colSpan={6} style={{ width: '100%' }}>
                  <UserForm
                    isEditMode={true}
                    b2BUser={b2bUser}
                    closeUserForm={() => setEditUserId(undefined)}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={b2bUser?.userId}>
                <TableCell colSpan={2} sx={style.emailAddressCell}>
                  {b2bUser?.emailAddress}
                </TableCell>
                {mdScreen && <TableCell sx={{ flex: 1 }}>{b2bUser?.firstName}</TableCell>}
                {mdScreen && <TableCell sx={{ flex: 1 }}>{b2bUser?.lastName}</TableCell>}
                <TableCell sx={{ flex: 1 }}>
                  {(b2bUser?.roles && b2bUser?.roles.length && b2bUser?.roles[0]?.roleName) ||
                    'N/A'}
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
                      onClick={() => setEditUserId(b2bUser?.userId)}
                      style={{ marginRight: '16px', cursor: 'pointer' }}
                    />
                    <RemoveCircleIcon
                      onClick={() => deleteUser(b2bUser?.userId)}
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
