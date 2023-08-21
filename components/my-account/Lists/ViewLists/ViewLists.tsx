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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { ConfirmationDialog } from '@/components/dialogs'
import { ListTable } from '@/components/my-account'
import EditList from '@/components/my-account/Lists/EditList/EditList'
import { styles } from '@/components/my-account/Lists/ViewLists/ViewLists.style'
import { useAuthContext, useModalContext, useSnackbarContext } from '@/context'
import {
  PageProps,
  useCreateWishlist,
  useGetWishlist,
  useDeleteWishlist,
  useAddCartItem,
} from '@/hooks'

import { CrWishlist, Maybe, ProductOption, WishlistCollection } from '@/lib/gql/types'

export interface ViewListsProps {
  onEditFormToggle: () => void
  isEditFormOpen: boolean
}

const ViewLists = (props: ViewListsProps) => {
  const { onEditFormToggle, isEditFormOpen } = props
  const { publicRuntimeConfig } = getConfig()
  const { createWishlist } = useCreateWishlist()
  const { deleteWishlist } = useDeleteWishlist()
  const { addToCart } = useAddCartItem()
  const { showSnackbar } = useSnackbarContext()
  const { showModal } = useModalContext()

  // declaring states
  const [paginationState, setPaginationState] = useState<PageProps>({
    startIndex: publicRuntimeConfig.b2bList.startIndex,
    pageSize: publicRuntimeConfig.b2bList.pageSize,
    sortBy: publicRuntimeConfig.b2bList.sortBy,
    filter: publicRuntimeConfig.b2bList.filter,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [listData, setListData] = useState<CrWishlist>()

  // screen size declared
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const { t } = useTranslation('common')
  const { user } = useAuthContext()

  // fetching wishlist data
  const response = useGetWishlist(paginationState)
  const wishlistsResponse = response.data as WishlistCollection
  const { isPending } = response

  // copy list function
  const createListName = (name: string) => {
    let listName = name + ' - copy'
    while (
      wishlistsResponse.items &&
      wishlistsResponse?.items.find((item: Maybe<CrWishlist>) => item?.name == listName)
    ) {
      listName += ' - copy'
    }
    return listName
  }

  const handleCopyList = (id: string) => {
    const newWishlist =
      wishlistsResponse.items &&
      wishlistsResponse?.items.find((item: Maybe<CrWishlist>) => item?.id === id)
    const newListName = createListName(newWishlist?.name as string)
    setIsLoading(true)
    try {
      createWishlist.mutate({
        customerAccountId: user?.id,
        name: newListName,
        items: newWishlist?.items,
      })
    } catch (e: any) {
      alert(e?.message)
    }
    setIsLoading(false)
  }

  // delete list function
  const handleDeleteList = (id: string) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('delete-list-message'),
        primaryButtonText: t('delete'),
        onConfirm: async () => {
          deleteWishlist.mutate(id)
        },
      },
    })
  }

  // edit list function
  const handleEditList = async (id: string) => {
    console.log(id)
    const wishlist = wishlistsResponse?.items?.find(
      (item: Maybe<CrWishlist>) => item?.id === id
    ) as CrWishlist
    setListData(wishlist)
    onEditFormToggle()
  }

  // add list to cart
  const handleAddListToCart = async (id: string) => {
    const list = wishlistsResponse?.items?.find((item) => item?.id === id)
    setIsLoading(true)
    const promises: any[] = []
    try {
      list?.items?.forEach((item) => {
        promises.push(
          addToCart.mutateAsync({
            product: {
              productCode: item?.product?.productCode as string,
              options: item?.product?.options as ProductOption[],
            },
            quantity: item?.quantity as number,
          })
        )
      })
      await Promise.all(promises)
      showSnackbar(t('list-added-to-cart'), 'success')
      setIsLoading(false)
    } catch (e: any) {
      setIsLoading(false)
    }

    setIsLoading(false)
  }

  const handleInitiateQuote = (id: string) => {
    console.log('Work In Progress', id)
  }

  // handle filter for current user list
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaginationState({
      startIndex: publicRuntimeConfig.b2bList.startIndex,
      pageSize: publicRuntimeConfig.b2bList.pageSize,
      sortBy: publicRuntimeConfig.b2bList.sortBy,
      filter: e.currentTarget.checked ? `createBy eq ${user?.userId}` : '',
    })
  }

  // on changing page number
  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    const newStartIndex = paginationState.pageSize * (page - 1)
    setPaginationState((currentState) => ({ ...currentState, startIndex: newStartIndex }))
  }

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isEditFormOpen) {
    return (
      <EditList
        onEditFormToggle={onEditFormToggle}
        listData={listData}
        onUpdateListData={(res: CrWishlist) => {
          setListData(res)
        }}
      />
    )
  }

  return (
    <>
      <Box sx={{ padding: '10px 10px 10px 0' }}>
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
        {wishlistsResponse.items?.length === 0 ? (
          <Typography>{t('no-list-found')}</Typography>
        ) : (
          <>
            <ListTable
              rows={wishlistsResponse.items as Array<CrWishlist>}
              isLoading={isPending || isLoading}
              onCopyList={handleCopyList}
              onDeleteList={handleDeleteList}
              onEditList={handleEditList}
              onAddListToCart={handleAddListToCart}
              onInitiateQuote={handleInitiateQuote}
            />
            <Pagination
              count={wishlistsResponse ? wishlistsResponse.pageCount : 1}
              shape={`rounded`}
              size="small"
              sx={{ marginTop: '15px' }}
              onChange={handlePageChange}
              data-testid="pagination"
            />
          </>
        )}
      </Box>
    </>
  )
}

export default ViewLists
