// Figma- https://www.figma.com/file/bKJuIwUx6VXmubHZo4rCBq/B2B?type=design&node-id=4-10&mode=design&t=X8mxlj1ofQdYh19o-0

import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Grid, Button, useMediaQuery, useTheme, IconButton, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { styles } from './ListsTemplate.styles'
import { CreateList, ViewLists } from '@/components/b2b'
import { useAddItemsToCurrentCart } from '@/hooks/mutations/cart/useAddItemsToCurrentCart/useAddItemsToCurrentCart'

import { CrWishlistItem } from '@/lib/gql/types'

const ListsTemplate = () => {
  const [state, setState] = useState({
    isCreateFormOpen: false,
    isEditFormOpen: false,
  })

  const router = useRouter()
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const smScreen = useMediaQuery<boolean>(theme.breakpoints.up('sm'))
  const { t } = useTranslation('common')
  const { addItemsToCurrentCart } = useAddItemsToCurrentCart()

  const handleEditFormToggle = () =>
    setState((prevState) => ({ ...prevState, isEditFormOpen: !state.isEditFormOpen }))

  const handleCreateFormToggle = () =>
    setState((prevState) => ({ ...prevState, isCreateFormOpen: !state.isCreateFormOpen }))

  const handleAddListToCart = async (items: CrWishlistItem[]) => {
    try {
      const response = await addItemsToCurrentCart.mutateAsync({
        items,
      })
      return response
    } catch (e) {
      console.error(e)
    }
  }

  const showCreateButton = !(state.isEditFormOpen || state.isCreateFormOpen)

  if (state.isCreateFormOpen)
    return (
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          <CreateList
            onCreateFormToggle={(val: boolean) => setState({ ...state, isCreateFormOpen: val })}
            onAddListToCart={handleAddListToCart}
          />
        </Grid>
      </Grid>
    )

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <Box>
          {mdScreen && (
            <Button
              style={{ paddingLeft: 0, fontSize: '14px', marginBottom: '20px' }}
              color="inherit"
              data-testid="my-account-button"
              onClick={() => {
                router.push('/my-account')
              }}
              startIcon={<ArrowBackIosIcon sx={{ width: '14px' }} />}
            >
              {t('my-account')}
            </Button>
          )}
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: mdScreen ? 'left' : 'center',
              alignItems: 'center',
            }}
          >
            {mdScreen ? (
              !state.isEditFormOpen && t('lists')
            ) : (
              <>
                <IconButton
                  sx={{ paddingLeft: 0, marginLeft: 0 }}
                  onClick={() => {
                    router.push('/my-account')
                  }}
                  data-testid="my-account-button"
                >
                  <ArrowBackIosIcon sx={{ width: '14px', color: '#000' }} />
                </IconButton>
                <Box component="span" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  {state.isEditFormOpen ? t('edit-list') : t('lists')}
                </Box>
              </>
            )}
          </Typography>
          {showCreateButton && (
            <Button
              onClick={handleCreateFormToggle}
              sx={{ ...styles.addNewListButtonStyles, width: smScreen ? 'auto' : '100%' }}
              variant="contained"
              color="inherit"
              startIcon={<AddCircleOutlineIcon />}
              data-testid="create-new-list-btn"
            >
              {t('create-new-list')}
            </Button>
          )}
        </Box>

        <ViewLists
          onEditFormToggle={handleEditFormToggle}
          isEditFormOpen={state.isEditFormOpen}
          onAddListToCart={handleAddListToCart}
        />
      </Grid>
    </Grid>
  )
}

export default ListsTemplate
