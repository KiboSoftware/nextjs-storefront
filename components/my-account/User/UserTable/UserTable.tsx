import React, { useEffect } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'

import { SearchBar } from '@/components/common'
import KiboDataTable from '@/components/common/KiboDataTable/KiboDataTable'
import Pagination from '@/components/common/Pagination/Pagination'
import { ConfirmationDialog } from '@/components/dialogs'
import { useCustomerB2bUserContext, useAuthContext, useModalContext } from '@/context'
import { useCustomerB2BUsersQueries, useDebounce } from '@/hooks'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

import { B2BUser } from '@/lib/gql/types'

const style = {
  searchBarBox: {
    marginBottom: '20px',
    width: '100%',
  },
  userStatus: {
    height: '12px',
    width: '12px',
    left: 0,
    top: '3.5px',
    borderRadius: '100px',
    marginRight: '8px',
  },
}

const UserTable = () => {
  const { t } = useTranslation('common')
  const queryClient = useQueryClient()
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [userList, setUserList] = React.useState<B2BUser[]>([])
  const pageSize = 5
  const [page, setPage] = React.useState(1)
  const [startIndex, setStartIndex] = React.useState(0)
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [editUserId, setEditUserId] = React.useState<number | null>(null)
  const [debounceTerm, setDebounceTerm] = React.useState<string>('')
  const debounceSearchTerm = useDebounce(searchTerm, 600)

  const { user } = useAuthContext()
  const { showModal } = useModalContext()
  const { deleteCustomerB2bUser } = useCustomerB2bUserContext()
  const { data, isLoading } = useCustomerB2BUsersQueries({
    b2bAccountId: user?.id,
    pageSize,
    startIndex,
    searchTerm: debounceTerm,
  })

  const totalCount = data?.totalCount || 0
  const pageCount = parseInt((totalCount / pageSize + 1).toString())

  // For page range
  const indexOfLastRow = page * pageSize
  const indexOfFirstRow = indexOfLastRow - pageSize
  const startRange = indexOfFirstRow + 1
  const endRange = Math.min(indexOfLastRow, totalCount) || 0

  useEffect(() => {
    setDebounceTerm(debounceSearchTerm)
    queryClient.removeQueries(customerB2BUserKeys.users)
  }, [debounceSearchTerm])

  useEffect(() => {
    setStartIndex(pageSize * (page - 1))
    queryClient.removeQueries(customerB2BUserKeys.users)
  }, [page])

  useEffect(() => {
    if (data?.items) setUserList(data?.items)
  }, [data])

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
    setStartIndex(0)
  }

  const confirmDelete = (id: any) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: 'Are you sure want to delete this user?',
        primaryButtonText: 'Delete',
        onConfirm: () => {
          const accountId = user?.id
          const queryVars = { accountId, userId: id }
          deleteCustomerB2bUser(queryVars)
        },
      },
    })
  }

  return (
    <>
      <Box sx={style.searchBarBox}>
        <SearchBar
          onSearch={handleSearch}
          placeHolder="Search user by first name, last name, or email address."
          searchTerm={searchTerm}
          showClearButton={true}
        />
      </Box>
      <KiboDataTable
        columnVisibilityModel={{
          firstName: mdScreen,
          lastName: mdScreen,
          isActive: mdScreen,
        }}
        loading={isLoading}
        columns={[
          {
            field: 'emailAddress',
            headerName: mdScreen ? 'Email Address' : 'Email',
            type: 'string',
            sortable: false,
            filterable: false,
            flex: mdScreen ? 2 : 1,
            headerClassName: 'super-app-theme--header',
          },
          {
            field: 'firstName',
            headerName: 'First Name',
            type: 'string',
            sortable: false,
            filterable: false,
            flex: 1.5,
            headerClassName: 'super-app-theme--header',
          },
          {
            field: 'lastName',
            headerName: 'Last Name',
            type: 'string',
            sortable: false,
            filterable: false,
            flex: 1.2,
            headerClassName: 'super-app-theme--header',
          },
          {
            field: 'role',
            headerName: 'Role',
            type: 'string',
            sortable: false,
            filterable: false,
            flex: mdScreen ? 1.2 : 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams<any>) => (
              <Typography>
                {params.row.roles.length
                  ? params.row.roles.reduce((roleList: string, role: any) => {
                      roleList += `${role.roleName} `
                      return roleList
                    }, '')
                  : 'N/A'}
              </Typography>
            ),
          },
          {
            field: 'isActive',
            headerName: 'Status',
            type: 'string',
            sortable: false,
            filterable: false,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams<any>) => (
              <>
                <div
                  style={{
                    ...style.userStatus,
                    background: params.row.isActive ? '#2EA195' : '#7C7C7C',
                  }}
                ></div>
                {params.row.isActive ? 'Active' : 'Inactive'}
              </>
            ),
          },
          {
            field: ' ',
            headerName: '',
            type: 'string',
            sortable: false,
            filterable: false,
            flex: 0.5,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams<any>) => (
              <>
                <EditIcon
                  onClick={() => setEditUserId(params?.row?.userId)}
                  style={{ marginRight: '16px', cursor: 'pointer' }}
                />
                <RemoveCircleIcon
                  onClick={() => confirmDelete(params?.row?.userId)}
                  style={{ cursor: 'pointer' }}
                />
              </>
            ),
          },
        ]}
        rows={[...userList.map((list: any) => ({ ...list, id: list?.emailAddress }))]}
      />

      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '-3.5rem',
        }}
      >
        <Pagination
          count={pageCount}
          onChange={setPage}
          size="small"
          sx={{ paddingLeft: '-1.5rem' }}
        />
        <Typography
          sx={{
            textAlign: 'end',
            color: theme.palette.grey[600],
            width: { xs: '10rem', md: '12rem' },
          }}
        >
          {mdScreen && 'Displaying '} {startRange} - {endRange} of {totalCount}
        </Typography>
      </Box>
    </>
  )
}

export default UserTable
