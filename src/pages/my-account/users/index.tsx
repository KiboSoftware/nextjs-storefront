import { ChangeEvent, useState } from 'react'

import {
  ChevronLeft as ChevronLeftIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GetServerSidePropsContext, NextPage } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SearchBar } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { UserTable } from '@/components/my-account'
import UserForm from '@/components/my-account/User/UserForm/UserForm'
import { useAuthContext, useModalContext } from '@/context'
import { useDebounce, useGetB2BUserQueries, useRemoveCustomerB2bUserMutation } from '@/hooks'

import { Maybe } from '@/lib/gql/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const BackButtonLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  typography: 'body2',
  textDecoration: 'none',
  color: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0rem',
  cursor: 'pointer',
}))

const SearchBoxContainer = styled(Box)({
  marginBottom: '20px',
  width: '100%',
})

const PaginationContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.grey[600],
  alignItems: 'center',
  margin: '20px 0',
}))

const style = {
  heading: {
    display: { md: 'flex', xs: 'block' },
    alignItems: 'center',
    margin: '1rem 0',
  },
  perPageItemText: {
    textAlign: 'end',
    width: { xs: '10rem', md: '12rem' },
    fontSize: { xs: '0.9rem', md: '1rem' },
  },
}

const UsersPage: NextPage = () => {
  const theme = useTheme()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { publicRuntimeConfig } = getConfig()

  const [isUserFormOpen, setUserFormOpen] = useState(false)
  const [editUserId, setEditUserId] = useState<Maybe<string> | undefined>(undefined)

  const [paginationState, setPaginationState] = useState({
    searchTerm: '',
    page: publicRuntimeConfig.b2bUserListing.defaultPage,
    pageSize: publicRuntimeConfig.b2bUserListing.defaultPageSize,
    startIndex: publicRuntimeConfig.b2bUserListing.defaultStartIndex,
  })

  const { data, isLoading } = useGetB2BUserQueries({
    b2bAccountId: user?.id,
    pageSize: paginationState.pageSize,
    startIndex: paginationState.startIndex,
    searchTerm: useDebounce(paginationState.searchTerm, publicRuntimeConfig.debounceTimeout),
  })

  const { removeCustomerB2bUser } = useRemoveCustomerB2bUserMutation({
    removeCustomerB2bAccountUser: true,
    delay: 1000,
  })

  const getPerPageItemText = () => {
    if (!data) return `${mdScreen && t('displaying')} 0 - 0 of 0`
    const { startIndex, pageSize, totalCount } = data
    const startRange = startIndex + 1
    const endRange = startIndex + pageSize
    return `${mdScreen && t('displaying')} ${startRange} - ${
      endRange > totalCount ? totalCount : endRange
    } of ${totalCount}`
  }

  const confirmDelete = (id: string | undefined | null) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('delete-user-confirmation-text'),
        primaryButtonText: 'Delete',
        onConfirm: () => {
          const accountId = user?.id
          const queryVars = { accountId, userId: id }
          removeCustomerB2bUser.mutateAsync({ ...queryVars })
        },
      },
    })
  }

  const AddUserButton = () => {
    return (
      <Button
        variant="primary"
        disabled={isUserFormOpen}
        onClick={() => setUserFormOpen(true)}
        disableElevation
        id="formOpenButton"
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <AddCircleOutlineIcon style={{ marginRight: '8px', width: '19px' }} />
          <span style={{ paddingTop: '2px', fontWeight: '400' }}>{t('add-user')}</span>
        </span>
      </Button>
    )
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '40px' }}>
        <BackButtonLink aria-label={t('my-account')} href="/my-account">
          <ChevronLeftIcon />
          {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
        </BackButtonLink>
        <Box sx={style.heading}>
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ textAlign: { xs: 'center' }, marginTop: { xs: '-3.6rem', md: 0 } }}
          >
            {t('users')}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={12}>
            {mdScreen && <AddUserButton />}
            {!mdScreen && !isUserFormOpen && <AddUserButton />}
            {isUserFormOpen && (
              <UserForm isEditMode={false} closeUserForm={() => setUserFormOpen(false)} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <SearchBoxContainer>
          <SearchBar
            onSearch={(searchText) =>
              setPaginationState({
                ...paginationState,
                searchTerm: searchText,
              })
            }
            placeHolder={t('user-search-placeholder')}
            searchTerm={paginationState.searchTerm}
            showClearButton={true}
          />
        </SearchBoxContainer>

        {isLoading ? (
          <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <UserTable
              b2bAccountUsers={data?.items}
              deleteUser={confirmDelete}
              editUserId={editUserId}
              setEditUserId={(id: Maybe<string> | undefined) => setEditUserId(id)}
            />
            <PaginationContainer>
              <Pagination
                count={data?.pageCount || 0}
                shape={`rounded`}
                onChange={(event: ChangeEvent<any>, page: number) =>
                  setPaginationState({
                    ...paginationState,
                    startIndex: (data?.pageSize || 0) * (page - 1),
                  })
                }
                size="small"
              />
              <Typography sx={style.perPageItemText}>{getPerPageItemText()}</Typography>
            </PaginationContainer>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default UsersPage
