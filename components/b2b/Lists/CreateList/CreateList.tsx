import React, { FormEvent, useEffect, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Box,
  Typography,
  Stack,
  Link,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { B2BProductSearch, ListItem } from '@/components/b2b'
import styles from '@/components/b2b/Lists/CreateList/CreateList.style'
import { KiboTextBox } from '@/components/common'
import { useAuthContext, useSnackbarContext } from '@/context'
import {
  useAddToWishlistItem,
  useCreateWishlist,
  useDeleteWishlistItemById,
  useProductCardActions,
  useUpdateWishlistItemMutation,
  useGetCustomerWishlist,
} from '@/hooks'
import { productGetters } from '@/lib/getters'
import { ProductCustom } from '@/lib/types'

import { CrWishlistItem, Product } from '@/lib/gql/types'

export interface CreateListProps {
  onCreateFormToggle: (param: boolean) => void
  onAddListToCart: (items: any) => any
}

const CreateList = (props: CreateListProps) => {
  const { onCreateFormToggle, onAddListToCart } = props

  const [newListState, setNewListState] = useState<any>({})
  const [listName, setListName] = useState('')
  const { openProductQuickViewModal, handleDeleteCurrentCart } = useProductCardActions()

  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const router = useRouter()
  const { t } = useTranslation('common')
  const { user } = useAuthContext()
  const { createWishlist } = useCreateWishlist()
  const { updateWishlist, updateWishlistItemQuantity } = useUpdateWishlistItemMutation({
    isCreateList: true,
  })
  const { addToWishlist } = useAddToWishlistItem()
  const { showSnackbar } = useSnackbarContext()
  const { deleteWishlistItemById } = useDeleteWishlistItemById({ isCreateList: true })
  const response = useGetCustomerWishlist({
    customerAccountId: user?.id as number,
    wishlistName: newListState?.name,
  })

  const handleAddListToCart = async () => {
    const response = await onAddListToCart(newListState?.items)
    if (response) {
      showSnackbar(t('list-added-to-cart'), 'success')
      onCreateFormToggle(false)
    }
  }

  const onUpdateListData = async (product: any, payload: any) => {
    await addToWishlist.mutateAsync({
      customerAccountId: user?.id as number,
      product,
      currentWishlist: newListState,
      quantity: payload.quantity,
    })
  }
  const handleEmptyCartAndAddListToCart = () => {
    handleDeleteCurrentCart()
    handleAddListToCart()
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    onCreateFormToggle(false)
  }

  const handleAddProduct = async (product?: any) => {
    // setting state for creation of list in backend
    if (productGetters.isVariationProduct(product as Product)) {
      const dialogProps = {
        title: t('product-configuration-options'),
        cancel: t('cancel'),
        addItemToList: t('add-item-to-list'),
        isB2B: true,
        listMode: 'create',
      }
      openProductQuickViewModal({
        product: product as ProductCustom,
        dialogProps,
        onUpdateListData,
      })
    } else {
      await addToWishlist.mutateAsync({
        product,
        customerAccountId: user?.id as number,
        currentWishlist: newListState,
      })
    }
  }

  const handleCreateListAndUpdateWishlistName = async () => {
    setListName(listName || newListState?.name)
    if (!newListState?.name && listName) {
      try {
        const listData = await createWishlist.mutateAsync({
          customerAccountId: user?.id,
          name: listName,
        })
        if (listData) {
          setNewListState(listData)
        }
      } catch (e) {
        console.error(e)
      }
    } else if (listName) {
      try {
        const listData = await updateWishlist.mutateAsync({
          wishlistId: newListState?.id,
          wishlistInput: { name: listName },
        })
        if (listData) {
          setNewListState(listData?.updateWishlist)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleDeleteItem = async (id: string) => {
    await deleteWishlistItemById.mutateAsync({
      wishlistId: newListState?.id,
      wishlistItemId: id,
    })
  }

  const handleChangeQuantity = async (id: string, quantity: number) => {
    await updateWishlistItemQuantity.mutateAsync({
      quantity,
      wishlistId: newListState?.id,
      wishlistItemId: id,
    })
  }

  useEffect(() => {
    setNewListState(response?.data)
  }, [JSON.stringify(response?.data)])

  return (
    <>
      <Box>
        {mdScreen && (
          <Button
            data-testid="my-account-button"
            sx={{ paddingLeft: 0, fontSize: '14px', color: '#000' }}
            onClick={() => {
              router.push('/my-account')
            }}
            startIcon={<ArrowBackIosIcon sx={{ width: '14px' }} />}
          >
            {t('my-account')}
          </Button>
        )}
        <Typography
          variant="h3"
          sx={{ ...styles.heading, margin: mdScreen ? '20px 0' : '0px 10px 0px 0px' }}
          fontWeight={'bold'}
        >
          {mdScreen ? (
            <>
              <Box sx={{ fontSize: '28px', marginRight: 'auto', display: 'inline' }}>
                {t('create-new-list')}
              </Box>
              <Box component="span" gap={2} display="inline-flex">
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => {
                    onCreateFormToggle(false)
                  }}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  form="wishlist-form"
                  disabled={!newListState?.name}
                >
                  {t('save-and-close')}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <IconButton
                sx={{ paddingLeft: 0, marginLeft: 0 }}
                data-testid="my-account-button"
                onClick={() => {
                  router.push('/my-account')
                }}
              >
                <ArrowBackIosIcon sx={{ width: '14px', color: '#000' }} />
              </IconButton>
              <Box sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'inline' }}>
                {t('create-new-list')}
              </Box>
            </>
          )}
        </Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit} style={styles.nameForm} id="wishlist-form">
          <Box sx={{ ...styles.listSection, flexDirection: 'column' }}>
            <KiboTextBox
              placeholder={t('name-this-list')}
              name="listName"
              value={listName}
              onChange={(_, value) => setListName(value)}
              onBlur={handleCreateListAndUpdateWishlistName}
              label={t('list-name')}
              sx={{ maxWidth: '360px' }}
            />
          </Box>
          {listName && (
            <Box sx={{ maxWidth: '360px' }}>
              <B2BProductSearch onAddProduct={handleAddProduct} />
            </Box>
          )}
        </form>
        <Box>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography variant="h3" fontWeight={'bold'}>
              {t('list-items')}
            </Typography>
            {newListState?.items?.length > 0 && (
              <Stack direction="row">
                <Button
                  onClick={handleEmptyCartAndAddListToCart}
                  sx={{ ...styles.addAllItemsToCartButton }}
                >
                  <Link sx={{ ...styles.addAllItemsToCartLink }}>
                    {t('empty-cart-add-list-to-cart')}
                  </Link>
                </Button>
                <Button onClick={handleAddListToCart} sx={{ ...styles.addAllItemsToCartButton }}>
                  <Link sx={{ ...styles.addAllItemsToCartLink }}>{t('add-all-items-to-cart')}</Link>
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
        {!newListState?.name && (
          <Typography variant="body2" color="GrayText" marginTop="20px">
            {t('add-list-name-to-search-products')}
          </Typography>
        )}
        {newListState?.items?.length === 0 ? (
          <Typography variant="body2" color="GrayText" marginTop="20px">
            {t('no-item-in-list-text')}
          </Typography>
        ) : (
          newListState?.items?.map((item: CrWishlistItem, index: any) => (
            <ListItem
              key={(item.product?.productCode as string) + index}
              item={item}
              onDeleteItem={handleDeleteItem}
              onChangeQuantity={handleChangeQuantity}
            />
          ))
        )}
        {!mdScreen && (
          <Box display={'flex'} flexDirection={'column'} gap={2} marginTop={'20px'}>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => {
                onCreateFormToggle(false)
              }}
              sx={{ width: '100%' }}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              type="submit"
              form="wishlist-form"
              sx={{ width: '100%' }}
              disabled={!newListState?.name}
            >
              {t('save-and-close')}
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}

export default CreateList
