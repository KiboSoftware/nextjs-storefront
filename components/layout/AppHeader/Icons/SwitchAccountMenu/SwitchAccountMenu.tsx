import React from "react"

import {  Menu, MenuItem } from "@mui/material"
import { useTranslation } from "next-i18next"

import { useAuthContext } from "@/context"
import { useGetAccountsByUser } from "@/hooks"


interface SwitchAccountMenuProps {
    open: boolean
    anchorEl: HTMLElement | null
    handleClose: () => void
}

export const SwitchAccountMenu = (props: SwitchAccountMenuProps) => {
    const { t } = useTranslation('common')

    const {open, handleClose, anchorEl} = props;

    const { user, setUser, selectedAccountId, setSelectedAccountId } = useAuthContext()
    const { activeUsersAccount, isLoading, isSuccess } = useGetAccountsByUser(user?.emailAddress as string )
  
    const handleMenuItemClick = async (id: any) => {
        // Implementation
       const res = await fetch(`/api/switch-user?id=${id}`)
        const data = await res.json()
        console.log(data)
        setSelectedAccountId(parseInt(id))
        if (data?.id) {
          setUser(data)
        }
        console.log('selectedAccountId', selectedAccountId)
    }
    
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
              }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {activeUsersAccount?.map((account: any) => (
            <MenuItem selected={selectedAccountId === account?.id} sx={{ typography: 'body2' }} key={account?.id} onClick={() => handleMenuItemClick(account?.id)}>
                {account?.companyOrOrganization || account?.emailAddress}
            </MenuItem>
        ))}
      </Menu>
    )
    }