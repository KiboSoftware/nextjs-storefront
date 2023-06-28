import React, { useEffect, useState } from 'react'

import { Search } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useAuthContext } from '@/context'
import { useGetAllWishlists } from '@/hooks'

const Lists = (props: any) => {
  // declaring states
  const [startIndex, setStartIndex] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('createDate desc')
  const [filter, setFilter] = useState<string>('createDate desc')
  const [page, setPage] = useState<number>(0)

  // screen size declared
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))

  // on changing page number
  useEffect(() => {
    setStartIndex(pageSize * (page - 1))
  }, [page, pageSize])

  // fetching wishlist data
  const { data, isPending } = useGetAllWishlists({
    pageSize,
    startIndex,
    sortBy,
    filter,
  })

  const { user } = useAuthContext()
  const userId = user?.userId

  function filterChange() {
    console.log(
      'WIP: Change filter for list create by me only if true ==> "createBy eq " + userId, else ==> ""'
    )
  }
  return (
    <Box style={{ padding: '10px 10px 10px 0' }}>
      <FormControlLabel
        label="Show only lists created by me"
        control={<Checkbox onChange={filterChange} sx={{ fontSize: '16px' }} />}
      />
      {mdScreen ? (
        <></>
      ) : (
        <>
          <FormControl
            sx={{
              width: '100%',
              borderBottom: 'none',
            }}
          >
            <Input
              placeholder="Search by name"
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
      {/* <WishlistTable
    isLoading={isLoading}
    rows={rows || []}
    handleEditWishlist={handleEditToWishlist}
    handleCopyWishlist={handleCopyWishlist}
    handleDeleteWishlist={deleteWishlistEvent}
    pageCount={pageCount}
    setPage={(value) => setPage(value)}
  /> */}
    </Box>
  )
}

export default Lists
