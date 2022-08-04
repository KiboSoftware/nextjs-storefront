import React, { MouseEvent, useState } from 'react'

import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface CartItemActionsMobileProps {
  actions: string[]
  onMenuItemSelection: (option: string) => void
}

const styles = {
  menuItemStyle: {
    typography: {
      sm: 'body2',
    },
    padding: '0.5rem 1rem',
  },
}

const CartItemActionsMobile = (props: CartItemActionsMobileProps) => {
  const { actions, onMenuItemSelection } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation('common')

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (option: string) => {
    onMenuItemSelection(option)
    handleClose()
  }

  return (
    <>
      <IconButton
        sx={{ p: 0.5 }}
        aria-label={t('more')}
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '12.063rem',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {actions.map((action) => (
          <MenuItem
            key={action}
            onClick={() => handleMenuItemClick(action)}
            sx={{ ...styles.menuItemStyle }}
          >
            {action}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default CartItemActionsMobile
