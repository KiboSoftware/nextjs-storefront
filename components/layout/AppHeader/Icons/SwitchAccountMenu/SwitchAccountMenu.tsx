import React, { useEffect } from 'react'

import { Menu, MenuItem } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ConfirmationDialog } from '@/components/dialogs'
import { useAuthContext, useModalContext } from '@/context'
import { useGetAccountsByUser } from '@/hooks'

import type { CustomerAccount } from '@/lib/gql/types'

interface SwitchAccountMenuProps {
  open: boolean
  anchorEl: any
  handleClose: () => void
}

export const SwitchAccountMenu = (props: SwitchAccountMenuProps) => {
  const { open, handleClose, anchorEl } = props
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showModal } = useModalContext()
  const { t } = useTranslation('common')
  const { user, setUser, selectedAccountId, setSelectedAccountId, setAccountsByUser } =
    useAuthContext()
  const { activeUsersAccount } = useGetAccountsByUser(user?.emailAddress as string)

  const sortActiveUsersAccountBySelectedId = activeUsersAccount.sort((a, b) => {
    if (a.id === selectedAccountId) return -1
    if (b.id === selectedAccountId) return 1
    return 0
  })

  const handleMenuItemClick = async (id: number) => {
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          contentText: t('switch-account-message'),
          primaryButtonText: t('Yes'),
          onConfirm: async () => {
            const res = await fetch(`/api/switch-user?id=${id}&t=${new Date().getTime()}`)
            const data = await res.json()
            setSelectedAccountId && setSelectedAccountId(id)
            if (data?.id && setUser) {
              document.cookie = `behaviors=${data?.behaviors}; path=/`
              setUser(data)
              queryClient.removeQueries()
              if (router.pathname.startsWith('/my-account')) {
                router.push('/my-account')
              }
            }
          },
        },
      })
    } catch (error) {
      console.error('Error switching account', error)
    }
  }

  useEffect(() => {
    if (activeUsersAccount?.length) {
      setAccountsByUser && setAccountsByUser(activeUsersAccount)
    }
  }, [activeUsersAccount?.length])

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {sortActiveUsersAccountBySelectedId?.map((account: CustomerAccount) => (
        <MenuItem
          selected={selectedAccountId === account?.id}
          sx={{
            typography: 'body2',
            '&.Mui-selected': {
              fontWeight: 'bold',
              backgroundColor: 'rgba(46, 161, 149, 0.5)',
            },
          }}
          key={account?.id}
          onClick={() => handleMenuItemClick(account?.id)}
        >
          {account?.companyOrOrganization || account?.emailAddress}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default SwitchAccountMenu
