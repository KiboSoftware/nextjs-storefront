import React from "react"

import {  Menu, MenuItem } from "@mui/material"
import { useTranslation } from "next-i18next"

import { useAuthContext } from "@/context"


interface SwitchAccountMenuProps {
    open: boolean
    anchorEl: HTMLElement | null
    handleClose: () => void
}

export const SwitchAccountMenu = (props: SwitchAccountMenuProps) => {
    const { t } = useTranslation('common')

    const {open, handleClose, anchorEl} = props;

    const { accountsByUser, selectedAccountId } = useAuthContext()
    
    const handleMenuItemClick = () => {
        // Implementation

        fetch('/api/switch-user')
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

        {accountsByUser?.map((account) => (
            <MenuItem selected={selectedAccountId === account} sx={{ typography: 'body2' }} key={account} onClick={handleMenuItemClick}>
                {account}
            </MenuItem>
        ))}
      </Menu>
    )
    }