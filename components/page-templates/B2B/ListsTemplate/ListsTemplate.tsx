// Figma- https://www.figma.com/file/bKJuIwUx6VXmubHZo4rCBq/B2B?type=design&node-id=4-10&mode=design&t=X8mxlj1ofQdYh19o-0

import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Grid, Button, useMediaQuery, useTheme, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import ViewLists from '@/components/my-account/Lists/ViewLists/ViewLists'
import { styles } from '@/components/page-templates/B2B/ListsTemplate/ListTemplate.styles'

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

  const showCreateListButton = !(state.isCreateFormOpen || state.isEditFormOpen)

  const handleEditFormToggle = (val: boolean) =>
    setState((prevState) => ({ ...prevState, isEditFormOpen: val }))
  const handleCreateFormToggle = () =>
    setState((prevState) => ({ ...prevState, isCreateFormOpen: !state.isCreateFormOpen }))

  if (!state.isCreateFormOpen) {
    return (
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12}>
          {showCreateListButton && (
            <div>
              {mdScreen ? (
                <IconButton
                  style={{ paddingLeft: 0, fontSize: '14px', color: '#000' }}
                  onClick={() => {
                    router.push('/my-account')
                  }}
                >
                  <ArrowBackIosIcon style={{ width: '14px', color: '#000' }} />
                  {t('my-account')}
                </IconButton>
              ) : null}
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {mdScreen ? (
                  <span style={{ fontSize: '28px', marginRight: 'auto' }}> {t('lists')} </span>
                ) : (
                  <>
                    <IconButton
                      style={{ paddingLeft: 0, marginLeft: 0 }}
                      onClick={() => {
                        router.push('/my-account')
                      }}
                    >
                      <ArrowBackIosIcon style={{ width: '14px', color: '#000' }} />
                    </IconButton>
                    <span style={{ marginLeft: 'auto', marginRight: 'auto' }}> {t('lists')} </span>
                  </>
                )}
              </h1>
              <Button
                onClick={handleCreateFormToggle}
                sx={styles.addNewListButtonStyles}
                startIcon={<AddCircleOutlineIcon />}
                style={smScreen ? {} : { width: '100%' }}
              >
                {t('create-new-list')}
              </Button>
            </div>
          )}
          <ViewLists
            onEditFormToggle={handleEditFormToggle}
            isEditFormOpen={state.isEditFormOpen}
          />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Create New List</Typography>
        <Typography>Work in progress</Typography>
      </Grid>
    </Grid>
  )
}

export default ListsTemplate
