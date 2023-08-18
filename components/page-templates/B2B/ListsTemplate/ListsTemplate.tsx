// Figma- https://www.figma.com/file/bKJuIwUx6VXmubHZo4rCBq/B2B?type=design&node-id=4-10&mode=design&t=X8mxlj1ofQdYh19o-0

import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Grid, Button, useMediaQuery, useTheme, IconButton, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import CreateList from '@/components/my-account/Lists/CreateList/CreateList'
import ViewLists from '@/components/my-account/Lists/ViewLists/ViewLists'
import { styles } from '@/components/page-templates/B2B/ListsTemplate/ListsTemplate.styles'

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

  const handleEditFormToggle = (val: boolean) =>
    setState((prevState) => ({ ...prevState, isEditFormOpen: val }))

  const handleCreateFormToggle = () =>
    setState((prevState) => ({ ...prevState, isCreateFormOpen: !state.isCreateFormOpen }))

  const showCreateButton = !(state.isEditFormOpen || state.isCreateFormOpen)

  if (state.isCreateFormOpen)
    return (
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          <CreateList
            onCreateFormToggle={(val: boolean) => setState({ ...state, isCreateFormOpen: val })}
          />
        </Grid>
      </Grid>
    )

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <Box>
          {mdScreen ? (
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
          ) : null}
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: mdScreen ? '28px' : '20px',
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

        <ViewLists onEditFormToggle={handleEditFormToggle} isEditFormOpen={state.isEditFormOpen} />
      </Grid>
    </Grid>
  )
}

export default ListsTemplate
