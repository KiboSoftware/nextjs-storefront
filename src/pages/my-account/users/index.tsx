import { useState } from 'react'

import { ChevronLeft } from '@mui/icons-material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import UserTable from '@/components/my-account/User/UserTable/UserTable'

import type { NextPage } from 'next'

const style = {
  backButton: {
    typography: 'body2',
    textDecoration: 'none',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0rem',
    cursor: 'pointer',
  },
}

const UsersPage: NextPage = () => {
  const theme = useTheme()
  const { t } = useTranslation('common')
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [isAddUserFormOpen, setAddUserFormState] = useState<boolean>(false)

  const openForm = () => {
    setAddUserFormState(false)
  }

  const closeForm = () => {
    setAddUserFormState(false)
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '40px' }}>
        {mdScreen && (
          <Link aria-label={t('my-account')} sx={{ ...style.backButton }} href="/my-account">
            <ChevronLeft />
            {t('my-account')}
          </Link>
        )}
        <Box
          sx={{
            display: { md: 'flex', xs: 'block' },
            alignItems: 'center',
            margin: '1rem 0',
          }}
        >
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ paddingLeft: { md: '0.5rem', xs: 0 } }}
          >
            {t('Users')}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={1.25}>
            <Button
              variant="primary"
              style={{ fontSize: '18px', width: '100%' }}
              disableElevation
              disabled={isAddUserFormOpen}
              id="formOpenButton"
              onClick={openForm}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <AddCircleOutlineIcon style={{ marginRight: '8px', width: '20px' }} />
                <span>{t('add-user')}</span>
              </span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <UserTable />
      </Grid>
    </Grid>
  )
}

export default UsersPage
