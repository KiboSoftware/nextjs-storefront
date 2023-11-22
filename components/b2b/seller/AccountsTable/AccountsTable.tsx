import React, { useState } from 'react'

import FilterList from '@mui/icons-material/FilterList'
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { AccountsTableStyles } from './AccountsTable.styles'
import { KiboPagination, SearchBar } from '@/components/common'
import { QuotesFilterDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useDebounce } from '@/hooks'
import { addressGetters } from '@/lib/getters'
// import { buildQuotesFilterParam } from '@/lib/helpers'
// import { QuoteFilters,  } from '@/lib/types'

import { QueryQuotesArgs } from '@/lib/gql/types'

interface AccountsTableProps {
  b2bContacts: {
    startIndex: number
    pageSize: number
    totalCount: number
    pageCount: number
    items: any[]
  }
  showActionButtons?: boolean
  // filters?: QuoteFilters
  setB2BContactsSearchParam: (param: QueryQuotesArgs) => void
}

const AccountsTable = (props: AccountsTableProps) => {
  const { b2bContacts, showActionButtons = true, setB2BContactsSearchParam } = props

  const { publicRuntimeConfig } = getConfig()

  const { t } = useTranslation('common')

  const columns = [
    {
      field: 'accountName',
      headerName: t('account-name'),
    },
    {
      field: 'email',
      headerName: t('email'),
    },
    {
      field: 'address',
      headerName: t('address'),
    },
    {
      field: 'city',
      headerName: t('city-or-town'),
    },
    {
      field: 'state',
      headerName: t('state-or-province'),
    },
    {
      field: 'country',
      headerName: t('country-code'),
    },
    {
      field: 'zipcode',
      headerName: t('zip-code'),
    },
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, publicRuntimeConfig.debounceTimeout)

  // const handleFilterAction = (filters: QuoteFilters) => {
  //   setQuotesSearchParam({ filter: buildQuotesFilterParam(filters) })
  // }

  // const handleFilterButtonClick = () => {
  //   showModal({
  //     Component: QuotesFilterDialog,
  //     props: {
  //       filters: filters,
  //       // onFilterAction: handleFilterAction,
  //     },
  //   })
  // }

  const handleAccountSearch = (term: string) => {
    setSearchTerm(term)
  }

  const b2bContactsPaginationDetails = {
    count: b2bContacts?.pageCount,
    startIndex: b2bContacts?.startIndex,
    pageSize: b2bContacts?.pageSize,
  }

  // useEffect(() => {
  //   handleFilterAction({
  //     ...filters,
  //     ...(!parseInt(debouncedTerm) && { name: debouncedTerm.trim(), number: '' }),
  //     ...(parseInt(debouncedTerm) && { number: debouncedTerm, name: debouncedTerm }),
  //   })
  // }, [debouncedTerm])

  return (
    <>
      <Box sx={AccountsTableStyles.container}>
        <Box width="100%">
          <SearchBar searchTerm={searchTerm} onSearch={handleAccountSearch} showClearButton />
        </Box>
        <Box sx={AccountsTableStyles.filterBar}>
          <Box>
            <Tooltip title="Filter list">
              <IconButton
                // onClick={handleFilterButtonClick}
                data-testid="filter-button"
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '100%' }} aria-label="quick order table">
          <TableHead>
            <TableRow
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              {columns.map((column) => (
                <TableCell component={'th'} key={column.field} sx={{ fontWeight: 700 }}>
                  {t(column.headerName)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {b2bContacts?.items?.length === 0 ? (
            <caption>{t('no-quotes-found')}</caption>
          ) : (
            <TableBody data-testid="quotes-table-body">
              {b2bContacts?.items?.map((contact) => {
                const { id, accountName, email, address, city, country, state, zipCode } =
                  addressGetters.getB2BContactDetails(contact)
                return (
                  <TableRow
                    key={id}
                    sx={{
                      ...AccountsTableStyles.tableRow,
                      cursor: 'pointer',
                    }}
                    // onClick={() => router.push(`/my-account/b2b/quote/${quoteId}`)}
                  >
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-number`}>
                        {accountName}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row" sx={{ whiteSpace: 'break-spaces' }}>
                      <Typography variant="body2" data-testid={`quote-name`}>
                        {email}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-expirationDate`}>
                        {address}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-expirationDate`}>
                        {city}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-expirationDate`}>
                        {state}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-expirationDate`}>
                        {country}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-expirationDate`}>
                        {zipCode}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box py={2}>
        <KiboPagination
          {...b2bContactsPaginationDetails}
          onPaginationChange={setB2BContactsSearchParam}
        />
      </Box>
    </>
  )
}

export default AccountsTable
