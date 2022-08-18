import React, { useEffect, useState } from 'react'

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Box, Button, Popover, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
interface WishlistPopoverProps {
  isInWishlist: boolean
}

const styles = {
  popOverStyle: {
    '& .MuiBox-root': {
      width: '16.438rem',
    },
    '& .MuiPaper-root': {
      border: '1px solid',
      borderColor: (theme: Theme) => theme.palette.grey['600'],
      borderRadius: '0',
      boxShadow: 'none',
    },
  },
  wishlistMessageContainerStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2.375rem',
  },
  wishlistMessageStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.625rem',
  },
  likeIconStyle: {
    color: 'red.900',
    marginRight: '0.25rem',
  },
  dislikeIconStyle: {
    color: 'grey.600',
    marginRight: '0.25rem',
  },
}

const WishlistPopover = (props: WishlistPopoverProps) => {
  const { isInWishlist } = props
  const { t } = useTranslation('common')
  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleViewWishlist = () => {
    router.push('/wishlist')
  }

  useEffect(() => {
    setIsOpen(true)
  }, [isInWishlist])

  const popOverTop = mdScreen ? '7.438rem' : '3.438rem'
  const popOverHorizontal = mdScreen ? 'right' : 'center'
  return (
    <Popover
      open={isOpen}
      sx={{
        ...styles.popOverStyle,
        top: popOverTop,
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: popOverHorizontal,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
      disableRestoreFocus
      data-testid="wishlist-component"
    >
      <Box sx={{ ...styles.wishlistMessageContainerStyle }}>
        {isInWishlist && (
          <Box sx={{ ...styles.wishlistMessageStyle }}>
            <FavoriteRoundedIcon sx={{ ...styles.likeIconStyle }} />
            <Typography variant="h3" fontWeight="bold">
              {t('added')}!
            </Typography>
          </Box>
        )}
        {!isInWishlist && (
          <Box sx={{ ...styles.wishlistMessageStyle }}>
            <FavoriteBorderRoundedIcon sx={{ ...styles.dislikeIconStyle }} />
            <Typography variant="h3" fontWeight="bold">
              {t('removed')}!
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            paddingBottom: '2.063rem',
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={handleViewWishlist}
            sx={{ maxWidth: '206px', width: '100%', margin: '0 auto' }}
          >
            {t('view-wishlist')}
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

export default WishlistPopover
