import React, { useEffect, useState, SyntheticEvent } from 'react'

import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import FiberManualRecord from '@mui/icons-material/FiberManualRecord'
import FilterList from '@mui/icons-material/FilterList'
import Mail from '@mui/icons-material/Mail'
import MoreVert from '@mui/icons-material/MoreVert'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
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
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { QuotesTableStyles } from './QuotesTable.styles'
import { KiboPagination, KiboSelect, Price, SearchBar } from '@/components/common'
import { ConfirmationDialog, EmailQuoteDialog, QuotesFilterDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useDebounce, useDeleteQuote, useEmailQuote } from '@/hooks'
import { QuoteStatus, StatusColorCode } from '@/lib/constants'
import { quoteGetters } from '@/lib/getters'
import { buildQuotesFilterParam } from '@/lib/helpers'
import { QuoteFilters, QuoteSortingOptions } from '@/lib/types'

import { QueryQuotesArgs, Quote, QuoteCollection } from '@/lib/gql/types'

interface QuotesTableProps {
  quoteCollection: QuoteCollection
  sortingValues: QuoteSortingOptions
  filters: QuoteFilters
  showActionButtons?: boolean
  setQuotesSearchParam: (param: QueryQuotesArgs) => void
}

const desktopColumns = [
  {
    field: 'quoteNumber',
    headerName: '#',
  },
  {
    field: 'quoteName',
    headerName: 'name',
  },
  {
    field: 'expirationDate',
    headerName: 'expires-on',
  },
  {
    field: 'createdDate',
    headerName: 'created-date',
  },
  {
    field: 'total',
    headerName: 'total',
  },
  {
    field: 'status',
    headerName: 'status',
  },
  {
    field: 'actions',
    headerName: '',
  },
]

const mobileColumns = [
  {
    field: 'quoteNumber',
    headerName: '#',
  },
  {
    field: 'quoteName',
    headerName: 'name',
  },
  {
    field: 'expirationDate',
    headerName: 'expires-on',
  },
  {
    field: 'actions',
    headerName: '',
  },
]

const QuotesTable = (props: QuotesTableProps) => {
  const {
    quoteCollection,
    sortingValues,
    filters,
    showActionButtons = true,
    setQuotesSearchParam,
  } = props

  const { publicRuntimeConfig } = getConfig()

  const { t } = useTranslation('common')
  const theme = useTheme()

  const { showModal } = useModalContext()
  const { emailQuote } = useEmailQuote()
  const tabAndDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, publicRuntimeConfig.debounceTimeout)

  const { deleteQuote } = useDeleteQuote({ draft: false })

  const router = useRouter()
  const getStatusColorCode = (status: string) => {
    return StatusColorCode[status]
  }

  // Mobile Actions
  const [anchorEl, setAnchorEl] = React.useState<{
    element: null | HTMLElement
    quote: Quote | null
  }>({
    element: null,
    quote: null,
  })

  const open = Boolean(anchorEl.element)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, quote: Quote | null) => {
    event.stopPropagation()
    setAnchorEl({
      element: event.currentTarget,
      quote,
    })
  }

  const handleClose = () => {
    setAnchorEl({
      element: null,
      quote: null,
    })
  }

  const handleEditQuote = (e: SyntheticEvent<Element, Event>, quoteId: string) => {
    e.stopPropagation()
    router.push(`/my-account/b2b/quote/${quoteId}`)
    handleClose()
  }

  const handleEmailQuote = (e: SyntheticEvent<Element, Event>, quoteId: string) => {
    e.stopPropagation()
    showModal({
      Component: EmailQuoteDialog,
      props: {
        onEmailSend: (emails: string[]) => emailQuote.mutate({ quoteId, emails }),
      },
    })
    handleClose()
  }

  const handleDeleteQuote = (
    e: SyntheticEvent<Element, Event>,
    quoteId: string,
    draft: boolean
  ) => {
    e.stopPropagation()
    try {
      showModal({
        Component: ConfirmationDialog,
        props: {
          onConfirm: () => {
            deleteQuote.mutate({ quoteId, draft }, { onSettled: () => handleClose() })
          },
          contentText: t('delete-quote-confirm-message'),
          primaryButtonText: t('delete'),
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleFilterAction = (filters: QuoteFilters) => {
    setQuotesSearchParam({ filter: buildQuotesFilterParam(filters) })
  }

  const handleFilterButtonClick = () => {
    showModal({
      Component: QuotesFilterDialog,
      props: {
        filters: filters,
        onFilterAction: handleFilterAction,
      },
    })
  }

  const handleQuoteSearch = (term: string) => {
    setSearchTerm(term)
  }

  const quotes = quoteGetters.getQuotes(quoteCollection)

  const quotesPaginationDetails = quoteGetters.getQuotesPaginationDetails(quoteCollection)

  const columns = tabAndDesktop ? desktopColumns : mobileColumns

  const onSortItemSelection = (value: any) => setQuotesSearchParam({ sortBy: value })

  useEffect(() => {
    handleFilterAction({
      ...filters,
      ...(!parseInt(debouncedTerm) && { name: debouncedTerm.trim(), number: '' }),
      ...(parseInt(debouncedTerm) && { number: debouncedTerm, name: debouncedTerm }),
    })
  }, [debouncedTerm])

  return (
    <>
      <Box sx={QuotesTableStyles.container}>
        <Box width="100%">
          <SearchBar searchTerm={searchTerm} onSearch={handleQuoteSearch} showClearButton />
        </Box>
        <Box sx={QuotesTableStyles.filterBar}>
          <Box>
            <KiboSelect
              name="sort-plp"
              sx={{ typography: 'body2' }}
              value={sortingValues?.selected}
              placeholder={t('sort-by')}
              onChange={(_name, value) => onSortItemSelection(value)}
            >
              {sortingValues?.options?.map((sortingVal: any) => (
                <MenuItem sx={{ typography: 'body2' }} key={sortingVal?.id} value={sortingVal?.id}>
                  {sortingVal?.value}
                </MenuItem>
              ))}
            </KiboSelect>
          </Box>
          <Box>
            <Tooltip title="Filter list">
              <IconButton onClick={handleFilterButtonClick} data-testid="filter-button">
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
              {columns
                .filter((col) => {
                  return showActionButtons ? col : col.field !== 'actions'
                })
                .map((column) => (
                  <TableCell component={'th'} key={column.field} sx={{ fontWeight: 700 }}>
                    {t(column.headerName)}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          {quotes?.length === 0 ? (
            <caption>{t('no-quotes-found')}</caption>
          ) : (
            <TableBody data-testid="quotes-table-body">
              {quotes?.map((quote) => {
                const { quoteId, number, name, expirationDate, createdDate, total, status } =
                  quoteGetters.getQuoteDetails(quote)
                return (
                  <TableRow
                    key={quoteId}
                    sx={{
                      ...QuotesTableStyles.tableRow,
                      borderLeftColor: getStatusColorCode(status),
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/my-account/b2b/quote/${quoteId}`)}
                  >
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-number`}>
                        {number}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row" sx={{ whiteSpace: 'break-spaces' }}>
                      <Typography variant="body2" data-testid={`quote-name`}>
                        {name}
                      </Typography>
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <Typography variant="body2" data-testid={`quote-expirationDate`}>
                        {expirationDate}
                      </Typography>
                    </TableCell>
                    {tabAndDesktop ? (
                      <>
                        <TableCell component="td" scope="row">
                          <Typography variant="body2" data-testid={`quote-createdDate`}>
                            {createdDate}
                          </Typography>
                        </TableCell>
                        <TableCell component="td" scope="row" data-testid={`quote-total`}>
                          <Price variant="body2" price={t('currency', { val: total.toString() })} />
                        </TableCell>
                        <TableCell component="td" scope="row">
                          <Box display={'flex'} gap={1} data-testid={`quote-status`}>
                            <FiberManualRecord
                              fontSize="small"
                              color={getStatusColorCode(status)}
                            />
                            <Typography variant="body2">{QuoteStatus[status]}</Typography>
                          </Box>
                        </TableCell>
                        {showActionButtons && (
                          <TableCell component="td" scope="row" align="right">
                            <Box display={'flex'} justifyContent={'flex-end'}>
                              <IconButton
                                size="small"
                                data-testid="edit-quote"
                                onClick={(e) => handleEditQuote(e, quoteId)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                data-testid="email-quote"
                                disabled={
                                  !(
                                    QuoteStatus[status] === QuoteStatus.ReadyForCheckout ||
                                    QuoteStatus[status] === QuoteStatus.InReview ||
                                    QuoteStatus[status] === QuoteStatus.Expired
                                  )
                                }
                                onClick={(e) => handleEmailQuote(e, quoteId)}
                              >
                                <Mail fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                data-testid="delete-quote"
                                onClick={(e) => handleDeleteQuote(e, quoteId, false)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        )}
                      </>
                    ) : (
                      <>
                        {showActionButtons && (
                          <TableCell component="td" scope="row" align="right">
                            <IconButton size="small" onClick={(e) => handleClick(e, quote)}>
                              <MoreVert fontSize="small" />
                            </IconButton>
                          </TableCell>
                        )}
                      </>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl.element}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={(e) => handleEditQuote(e, anchorEl?.quote?.id as string)}>
            <Typography variant="body2">{t('edit-quote')}</Typography>
          </MenuItem>
          {(QuoteStatus[anchorEl?.quote?.status as string] === QuoteStatus.InReview ||
            QuoteStatus[anchorEl?.quote?.status as string] === QuoteStatus.ReadyForCheckout ||
            QuoteStatus[anchorEl?.quote?.status as string] === QuoteStatus.Expired) && (
            <MenuItem onClick={(e) => handleEmailQuote(e, anchorEl?.quote?.id as string)}>
              <Typography variant="body2">{t('email-quote')}</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={(e) => handleDeleteQuote(e, anchorEl?.quote?.id as string, false)}>
            <Typography variant="body2">{t('delete-quote')}</Typography>
          </MenuItem>
        </Menu>
      </TableContainer>
      <Box pt={2}>
        <KiboPagination {...quotesPaginationDetails} onPaginationChange={setQuotesSearchParam} />
      </Box>
    </>
  )
}

export default QuotesTable
