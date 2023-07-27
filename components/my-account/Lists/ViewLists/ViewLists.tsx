import React, { ChangeEvent, useState } from 'react'

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
import { PageProps, useCreateWishlist, useGetWishlist, useDeleteWishlist } from '@/hooks'


import { CrWishlist, Maybe, WishlistCollection } from '@/lib/gql/types'

interface ListsProps {
  onEditFormToggle: (param: boolean) => void
  isEditFormOpen: boolean
}

const ViewLists = (props: ListsProps) => {
  const { onEditFormToggle, isEditFormOpen } = props
  const { publicRuntimeConfig } = getConfig()
  const { createWishlist } = useCreateWishlist()
  const { deleteWishlist } = useDeleteWishlist()
  
  // declaring states
  const [paginationState, setPaginationState] = useState<PageProps>({
    startIndex: publicRuntimeConfig.b2bList.startIndex,
    pageSize: publicRuntimeConfig.b2bList.pageSize,
    sortBy: publicRuntimeConfig.b2bList.sortBy,
    filter: publicRuntimeConfig.b2bList.filter,
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // screen size declared
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const { t } = useTranslation('common')
  // this will be used for creating new list
  const { user } = useAuthContext()
  const userId = user?.id

  // fetching wishlist data
  const response = useGetWishlist(paginationState)
  const wishlistsResponse = response.data as WishlistCollection
  const isPending = response.isPending
  const refetch = response.refetch

  // edit list function
  const handleEditList = (id: string) => {
    console.log(id, ' edit clicked')
  }

  // copy list function
  const handleCopyList = async (id: string) => {
    const newWishlist =
      wishlistsResponse.items &&
      wishlistsResponse?.items.find((item: Maybe<CrWishlist>) => item?.id === id)
    let listName = newWishlist?.name + ' - copy'
    while (
      wishlistsResponse.items &&
      wishlistsResponse?.items.find((item: Maybe<CrWishlist>) => item?.name == listName)
    ) {
      listName += ' - copy'
    }
    setIsLoading(true)
    try {
      await createWishlist.mutateAsync({
        customerAccountId: userId,
        name: listName,
        items: newWishlist?.items,
      })
      await refetch()
    } catch (e: any) {
      alert(e?.message)
    }
    setIsLoading(false)
  }

  // delete list function
  const handleDeleteList = async (id: string) => {
    setIsLoading(true)
    await deleteWishlist.mutateAsync(id)
    setIsLoading(false)
    alert('wislist deleted')
    refetch()
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
    setPaginationState((currentState) => ({ ...currentState, startIndex: newStartIndex }))
  }

  if (!wishlistsResponse || wishlistsResponse?.items?.length === 0) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box style={{ padding: '10px 10px 10px 0' }}>
      <FormControlLabel
        label={t('show-only-my-lists')}
        control={<Checkbox onChange={handleFilterChange} sx={{ fontSize: '16px' }} />}
        data-testid="currentUserFilterCheckbox"
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
        rows={wishlistsResponse.items as Array<CrWishlist>}
        isLoading={isPending || isLoading}
        onCopyList={handleCopyList}
        onDeleteList={handleDeleteList}
        onEditList={handleEditList}
      />
      <Pagination
        count={wishlistsResponse ? wishlistsResponse.pageCount : 1}
        shape={`rounded`}
        size="small"
        sx={{ marginTop: '15px' }}
        onChange={handlePageChange}
        data-testid="pagination"
      />
    </Box>
  )
}

export default ViewLists
