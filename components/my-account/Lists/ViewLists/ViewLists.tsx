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
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { ListTable } from '@/components/my-account'
import { styles } from '@/components/my-account/Lists/ViewLists/ViewLists.style'
import { useAuthContext } from '@/context'
import { PageProps, useGetWishlist } from '@/hooks'

import { CrWishlist, Maybe } from '@/lib/gql/types'

interface ListsProps {
  onEditFormToggle: (param: boolean) => void
  isEditFormOpen: boolean
}

const Lists = (props: ListsProps) => {
  const { onEditFormToggle, isEditFormOpen } = props
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

  // edit list function
  const onEditList = (id: Maybe<string>) => {
    console.log(id, ' edit clicked')
  }

  // copy list function
  const onCopyList = (id: Maybe<string>) => {
    console.log(id, ' copy clicked')
  }

  // delete list function
  const onDeleteList = (id: Maybe<string>) => {
    console.log(id, ' delete clicked')
  }

  // handle filter for current user list
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

  if (rows.length === 0) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
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
    </Box>
  )
}

export default Lists
