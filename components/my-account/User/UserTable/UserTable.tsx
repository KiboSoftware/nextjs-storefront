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

import { B2BUser } from '@/lib/gql/types'

interface UserTableProps {
  b2bAccountUsers: B2BUser[] | undefined
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
  const { b2bAccountUsers } = props

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
          b2bAccountUsers.map((b2bUser) => (
            <TableRow key={b2bUser?.userId}>
              <TableCell colSpan={2} sx={style.emailAddressCell}>
                {b2bUser?.emailAddress}
              </TableCell>
              {mdScreen && <TableCell sx={{ flex: 1 }}>{b2bUser?.firstName}</TableCell>}
              {mdScreen && <TableCell sx={{ flex: 1 }}>{b2bUser?.lastName}</TableCell>}
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
                    <Typography>{b2bUser.isActive ? 'Active' : 'Inactive'}</Typography>
                  </Box>
                </TableCell>
              )}
              <TableCell sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <EditIcon style={{ marginRight: '16px', cursor: 'pointer' }} />
                  <RemoveCircleIcon style={{ cursor: 'pointer' }} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default UserTable
