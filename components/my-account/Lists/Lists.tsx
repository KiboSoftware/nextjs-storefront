import React, { ChangeEvent, useEffect, useState } from 'react'

import { Search } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { ListTable } from '@/components/common'
import { useAuthContext } from '@/context'
import { useGetWishlist } from '@/hooks'

import { CrWishlist } from '@/lib/gql/types'

function getDate(date: number) {
  const d = new Date(date)
  const dateString = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
  return dateString
}

interface ListsState {
  startIndex: number
  pageSize: number
  filter: string
  sortBy: string
}

interface ListsProps {
  handleEditForm: (param: boolean) => void
}

const Lists = (props: ListsProps) => {
  const { handleEditForm } = props
  const { publicRuntimeConfig } = getConfig()

  // declaring states
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<ListsState>({
    startIndex: publicRuntimeConfig.b2bList.startIndex,
    pageSize: publicRuntimeConfig.b2bList.pageSize,
    sortBy: publicRuntimeConfig.b2bList.sortBy,
    filter: publicRuntimeConfig.b2bList.filter,
  })

  // screen size declared
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))

  const { t } = useTranslation('common')

  // on changing page number
  useEffect(() => {
    const newStartIndex = state.pageSize * (page - 1)
    setState({ ...state, startIndex: newStartIndex })
  }, [page])

  // fetching wishlist data
  const { data, isPending } = useGetWishlist(state)

  // this will be used for creating new list
  const { user } = useAuthContext()
  const userId = user?.userId

  function filterChange() {
    console.log(
      'WIP: Change filter for list create by me only if true ==> "createBy eq " + userId, else ==> ""'
    )
  }
  if (!isPending) {
    const rows = data.items.map((item: CrWishlist) => {
      return {
        ...item,
        createDate: item.auditInfo && getDate(item.auditInfo.createDate),
        createBy: item.auditInfo && item.auditInfo.createBy,
      }
    })

    const totalCount = data.totalCount
    const pageCount = parseInt(
      (totalCount % state.pageSize === 0
        ? totalCount / state.pageSize
        : totalCount / state.pageSize + 1
      ).toString()
    )
    return (
      <Box style={{ padding: '10px 10px 10px 0' }}>
        <FormControlLabel
          label={t('show-only-my-lists')}
          control={<Checkbox onChange={filterChange} sx={{ fontSize: '16px' }} />}
        />
        {!mdScreen && (
          <>
            <FormControl
              sx={{
                width: '100%',
                borderBottom: 'none',
              }}
            >
              <Input
                placeholder={t('search-by-name')}
                sx={{
                  height: '32px',
                  fontSize: '14px',
                  padding: '8px 12px',
                  border: '1px solid #cdcdcd',
                  borderRadius: '4px',
                  width: '100%',
                  margin: '16px 0',
                  borderBottom: 'none',
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
          </>
        )}
        <ListTable rows={rows} />
        <Pagination
          count={pageCount}
          shape={`rounded`}
          size="small"
          sx={{ marginTop: '15px' }}
          onChange={(event: ChangeEvent<any>, page: number) => {
            setPage(page)
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </Box>
    )
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    )
  }
}

export default Lists
