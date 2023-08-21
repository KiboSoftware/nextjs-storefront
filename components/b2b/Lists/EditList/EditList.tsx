import { useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import {
  Container,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Maybe } from 'yup/lib/types'

import { B2BProductSearch, ListItem } from '@/components/b2b'
import styles from '@/components/b2b/Lists/EditList/EditList.style'
import { KiboTextBox } from '@/components/common'
import { useUpdateWishlistMutation } from '@/hooks'

import { CrWishlist, CrWishlistInput, CrWishlistItem, Product } from '@/lib/gql/types'

export interface EditListProps {
  onEditFormToggle: () => void
  listData: CrWishlist | undefined
  onUpdateListData: (param: CrWishlist) => void
}

interface EditListState {
  productCode: Maybe<string>
  quantity: Maybe<string>
  showSuggestions: boolean
  name: Maybe<string>
  openNameForm: boolean
}

const EditList = (props: EditListProps) => {
  const { onEditFormToggle, listData, onUpdateListData } = props

  const [editListState, setEditListState] = useState<EditListState>({
    productCode: '',
    quantity: '1',
    showSuggestions: false,
    name: listData?.name,
    openNameForm: false,
  })
  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const { t } = useTranslation('common')
  const { updateWishlist } = useUpdateWishlistMutation()

  const handleSaveWishlist = async () => {
    if (listData) listData.name = editListState.name
    const payload = {
      wishlistId: listData?.id as string,
      wishlistInput: listData as CrWishlistInput,
    }
    const response = await updateWishlist.mutateAsync(payload)
    onUpdateListData(response.updateWishlist)
    onEditFormToggle()
  }

  const handleDeleteItem = async (id: string) => {
    try {
      let items = listData?.items
      items = items?.filter((item: Maybe<CrWishlistItem>) => item?.id !== id)
      if (listData) listData.items = items
      const payload = {
        wishlistId: listData?.id as string,
        wishlistInput: listData as CrWishlistInput,
      }
      const response = await updateWishlist.mutateAsync(payload)
      onUpdateListData(response.updateWishlist)
    } catch (e) {
      console.log('error', e)
    }
  }

  const handleChangeQuantity = (id: string, quantity: number) => {
    const items = listData?.items
    const currentItem = items?.find((item: Maybe<CrWishlistItem>) => item?.id === id)
    if (currentItem) currentItem.quantity = quantity
  }

  const handleAddProduct = async (product?: Product) => {
    const items = listData?.items
    const item = items?.find(
      (i: Maybe<CrWishlistItem>) => i?.product?.productCode === product?.productCode
    )
    if (item) {
      item.quantity += 1
    } else {
      items?.push({ product: { productCode: product?.productCode }, quantity: 1 })
    }
    if (listData) listData.items = items
    const payload = {
      wishlistId: listData?.id as string,
      wishlistInput: listData as CrWishlistInput,
    }
    const response = await updateWishlist.mutateAsync(payload)
    onUpdateListData(response.updateWishlist)
  }

  return (
    <>
      <Box>
        <Grid
          container
          spacing={0.5}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
          alignItems="center"
          sx={{ marginBottom: '20px' }}
        >
          <Grid item xs={mdScreen ? 9 : 12}>
            {editListState.openNameForm ? (
              <>
                <FormControl fullWidth sx={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Box maxWidth="360px">
                    <KiboTextBox
                      onChange={(e, value) => setEditListState({ ...editListState, name: value })}
                      value={editListState.name as string}
                      sx={{ ...styles.listNameForm }}
                    />
                  </Box>
                  <Box component="span" sx={{ marginLeft: '5px' }}>
                    <Button
                      variant="contained"
                      onClick={() => setEditListState({ ...editListState, openNameForm: false })}
                      data-testid="saveNameBtn"
                    >
                      {t('save')}
                    </Button>
                  </Box>
                </FormControl>
              </>
            ) : (
              <>
                <Typography variant="h1" fontWeight={'bold'}>
                  {editListState.name}
                  <IconButton
                    onClick={() => setEditListState({ ...editListState, openNameForm: true })}
                    data-testid="editNameBtn"
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
              </>
            )}
          </Grid>
          {mdScreen ? (
            <>
              <Grid item xs={3} display="flex" justifyContent="end">
                <Box component="span" display="inline-flex" gap={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={() => onEditFormToggle()}
                  >
                    {t('cancel')}
                  </Button>
                  <Button variant="contained" size="medium" onClick={handleSaveWishlist}>
                    {t('save-and-close')}
                  </Button>
                </Box>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ maxWidth: '360px' }}>
            <B2BProductSearch onAddProduct={handleAddProduct} />
          </Box>
          <Grid
            container
            spacing={0.5}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="top"
          >
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h3" fontWeight={'bold'}>
        {t('list-items')}
      </Typography>
      {listData?.items?.map((item: Maybe<CrWishlistItem>) => {
        return (
          <ListItem
            key={item?.product?.productCode}
            item={item as CrWishlistItem}
            onDeleteItem={handleDeleteItem}
            onChangeQuantity={handleChangeQuantity}
            listId={listData.id as string}
          />
        )
      })}
      {!mdScreen ? (
        <>
          <Grid item xs={12} sx={styles.mobileSaveWindow} gap={2}>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={() => onEditFormToggle()}
              sx={{ width: '100%' }}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={handleSaveWishlist}
              sx={{ width: '100%' }}
            >
              {t('save-and-close')}
            </Button>
          </Grid>
        </>
      ) : null}
    </>
  )
}
export default EditList
