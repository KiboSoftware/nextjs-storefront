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
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Maybe } from 'yup/lib/types'

import { B2BProductSearch } from '@/components/b2b'
import styles from '@/components/my-account/Lists/EditList/EditList.style'
import ListItem from '@/components/my-account/Lists/ListItem/ListItem'
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
                <form>
                  <input
                    onChange={(e) => setEditListState({ ...editListState, name: e.target.value })}
                    value={editListState.name as string}
                    style={styles.listNameForm}
                    data-testid="editNameInput"
                  />
                  <Button
                    variant="contained"
                    onClick={() => setEditListState({ ...editListState, openNameForm: false })}
                    sx={{ marginLeft: '5px' }}
                    data-testid="saveNameBtn"
                  >
                    {t('save')}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h3" fontWeight={'bold'}>
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
              <Grid item xs={3} justifyContent="flex-end" flexDirection="column" display="flex">
                <Container sx={{ justifyContent: 'end', display: 'flex' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={() => onEditFormToggle()}
                    sx={{ marginRight: '10px' }}
                  >
                    {t('cancel')}
                  </Button>
                  <Button variant="contained" size="medium" onClick={handleSaveWishlist}>
                    {t('save-and-close')}
                  </Button>
                </Container>
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
          <Grid item xs={12} sx={styles.mobileSaveWindow}>
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
              sx={{ width: '100%', marginTop: '8px' }}
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
