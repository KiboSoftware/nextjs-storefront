import React from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  IconButton,
  NoSsr,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { userGetters } from '@/lib/getters'
import { actions, b2bUserActions, hasAnyPermission } from '@/lib/helpers'
import { B2BUserInput } from '@/lib/types'

import { B2BUser } from '@/lib/gql/types'

/** Email cell styles - extracted to prevent recreation on each render */
const EMAIL_CELL_STYLES = {
  flex: { md: 1, xs: 0.5 },
  maxWidth: { xs: '120px', sm: '130px', md: '100%' },
  overflow: { xs: 'hidden' },
  textOverflow: { xs: 'ellipsis' },
} as const

/** Standard flex cell styles */
const FLEX_CELL_STYLES = { flex: 1 } as const

/** Status icon size styles */
const STATUS_ICON_STYLES = { fontSize: '14px' } as const

/** Action buttons container styles */
const ACTION_BUTTONS_CONTAINER_STYLES = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
} as const

/** Status container styles */
const STATUS_CONTAINER_STYLES = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: 1,
} as const

/** Table header row inline styles */
const TABLE_HEADER_CELL_STYLES = {
  flex: 1,
  width: { xs: '150px' },
  overflow: { xs: 'hidden' },
} as const

/** Caption inline styles */
const CAPTION_STYLES = { textAlign: 'center' } as const

/**
 * Props for the UserTable component
 */
interface UserTableProps {
  /** Whether screen is medium or larger */
  mdScreen: boolean
  /** Array of B2B users to display */
  b2bUsers: B2BUser[] | undefined
  /** Whether to show edit/delete action buttons */
  showActionButtons?: boolean
  /** Callback when user row is clicked (mobile view) */
  onView?: (b2BUser: B2BUser) => void
  /** Callback when delete button is clicked */
  onDelete?: (id: string | undefined) => void
  /** Map of account IDs to user behavior/permission arrays */
  accountUserBehaviors?: Record<number, number[]>
  /** Current logged-in user ID */
  userId?: number
}

/**
 * UserTable Component
 * Enterprise-grade table for displaying B2B users with edit/delete actions
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const UserTable: React.FC<UserTableProps> = React.memo((props) => {
  const { mdScreen, b2bUsers, showActionButtons = true, onView, onDelete } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()

  /**
   * Navigate to user edit page
   * Memoized to prevent recreation on every render
   */
  const handleEditUser = React.useCallback(
    (b2BUser: B2BUser) => {
      const userId = b2BUser?.userId
      if (userId) {
        router.push(`/my-account/b2b/users/${userId}`)
      }
    },
    [router]
  )

  /**
   * Memoize table header background color from theme
   */
  const headerBackgroundColor = React.useMemo(() => theme.palette.grey[100], [theme.palette.grey])

  return (
    <Table>
      {!b2bUsers?.length ? <caption style={CAPTION_STYLES}>{t('no-record-found')}</caption> : null}
      <TableHead>
        <TableRow style={{ backgroundColor: headerBackgroundColor }}>
          <TableCell colSpan={2} sx={TABLE_HEADER_CELL_STYLES}>
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
        {b2bUsers?.map((b2bUser: B2BUser) => (
          <TableRow key={b2bUser?.userId} onClick={() => !mdScreen && onView?.(b2bUser)}>
            <TableCell colSpan={2} sx={EMAIL_CELL_STYLES}>
              {userGetters.getEmailAddress(b2bUser)}
            </TableCell>
            {mdScreen && (
              <>
                <TableCell sx={FLEX_CELL_STYLES}>{userGetters.getFirstName(b2bUser)}</TableCell>
                <TableCell sx={FLEX_CELL_STYLES}>{userGetters.getLastName(b2bUser)}</TableCell>
              </>
            )}
            <TableCell sx={FLEX_CELL_STYLES}>{userGetters.getRole(b2bUser)}</TableCell>
            {mdScreen && (
              <TableCell sx={FLEX_CELL_STYLES}>
                <Box sx={STATUS_CONTAINER_STYLES}>
                  {b2bUser?.isActive ? (
                    <CircleIcon sx={STATUS_ICON_STYLES} color="success" />
                  ) : (
                    <CircleIcon sx={STATUS_ICON_STYLES} color="disabled" />
                  )}
                  <Typography>
                    {userGetters.getStatus(b2bUser) ? t('active') : t('in-active')}
                  </Typography>
                </Box>
              </TableCell>
            )}
            <NoSsr>
              <TableCell sx={FLEX_CELL_STYLES}>
                {showActionButtons && (
                  <Box sx={ACTION_BUTTONS_CONTAINER_STYLES}>
                    {hasAnyPermission(actions.EDIT_USERS, b2bUserActions.UPDATE_BUYER) && (
                      <IconButton
                        aria-label="edit-user"
                        name="edit-user"
                        onClick={() => handleEditUser(b2bUser)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {hasAnyPermission(actions.DELETE_USERS, b2bUserActions.DELETE_BUYER) && (
                      <IconButton
                        aria-label="delete-user"
                        name="delete-user"
                        onClick={() => onDelete?.(b2bUser?.userId as string)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                )}
              </TableCell>
            </NoSsr>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

UserTable.displayName = 'UserTable'

export default UserTable
