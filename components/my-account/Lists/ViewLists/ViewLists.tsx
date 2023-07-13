import React, { ChangeEvent, useEffect, useState } from 'react'

import { Search } from '@mui/icons-material'
import {
  Box,
  Checkbox,
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
import { PageProps, useGetWishlist } from '@/hooks'
import formatDate from '@/lib/helpers/formatDate'

import { CrWishlist } from '@/lib/gql/types'

const styles = {
  customInput: {
    height: '32px',
    fontSize: '14px',
    padding: '8px 12px',
    border: '1px solid #cdcdcd',
    borderRadius: '4px',
    width: '100%',
    margin: '16px 0',
    borderBottom: 'none',
  },
}

interface ListsProps {
  handleEditForm: (param: boolean) => void
}

const Lists = (props: ListsProps) => {
  const { handleEditForm } = props
  const { publicRuntimeConfig } = getConfig()

  // declaring states
  const [paginationState, setPaginationState] = useState<PageProps>({
    startIndex: publicRuntimeConfig.b2bList.startIndex,
    pageSize: publicRuntimeConfig.b2bList.pageSize,
    sortBy: publicRuntimeConfig.b2bList.sortBy,
    filter: publicRuntimeConfig.b2bList.filter,
  })
  const [rows, setRows] = useState<CrWishlist[]>([])

  // screen size declared
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const { t } = useTranslation('common')
  // this will be used for creating new list
  const { user } = useAuthContext()
  const userId = user?.userId

  // fetching wishlist data
  const { data, isPending } = useGetWishlist(paginationState)
  useEffect(() => {
    if (data) {
      setRows(data.items)
    }
  }, [data])

  const onEditList = (id: any) => {
    console.log(id, ' edit clicked')
  }

  const onCopyList = (id: any) => {
    console.log(id, ' edit clicked')
  }

  const onDeleteList = (id: any) => {
    console.log(id, ' edit clicked')
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaginationState({
      startIndex: publicRuntimeConfig.b2bList.startIndex,
      pageSize: publicRuntimeConfig.b2bList.pageSize,
      sortBy: publicRuntimeConfig.b2bList.sortBy,
      filter: e.currentTarget.checked ? `createBy eq ${userId}` : '',
    })
  }

  // on changing page number
  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    const newStartIndex = paginationState.pageSize * (page - 1)
    setPaginationState({ ...paginationState, startIndex: newStartIndex })
  }

  return (
    <Box style={{ padding: '10px 10px 10px 0', opacity: isPending ? '0.5' : '1' }}>
      <FormControlLabel
        label={t('show-only-my-lists')}
        control={<Checkbox onChange={handleFilterChange} sx={{ fontSize: '16px' }} />}
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
              sx={styles.customInput}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      )}
      <ListTable
        rows={rows}
        isLoading={isPending}
        onCopyList={onCopyList}
        onDeleteList={onDeleteList}
        onEditList={onEditList}
      />
      <Pagination
        count={data ? data.pageCount : 1}
        shape={`rounded`}
        size="small"
        sx={{ marginTop: '15px' }}
        onChange={handlePageChange}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </Box>
  )
}

export default Lists
