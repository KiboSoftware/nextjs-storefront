import React, { FormEvent, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button, useMediaQuery, useTheme, IconButton, Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import ProductSearch from '@/components/b2b/B2BProductSearch/B2BProductSearch'
import { KiboTextBox } from '@/components/common'
import styles from '@/components/my-account/Lists/CreateList/CreateList.style'
import ListItem from '@/components/my-account/Lists/ListItem/ListItem'
import { useAuthContext } from '@/context'
import { useCreateWishlist, useGetWishlist } from '@/hooks'

import { Product } from '@/lib/gql/types'

export interface CreateListProps {
  onCreateFormToggle: (param: boolean) => void
}

interface CreateListState {
  name: string
  items: [
    {
      product: {
        productCode: string
      }
      quantity: number
    }
  ]
}

const CreateList = (props: CreateListProps) => {
  const { onCreateFormToggle } = props
  const [listState, setListState] = useState<CreateListState>({
    name: '',
    items: [{ product: { productCode: '' }, quantity: 0 }],
  })
  const [productList, setProductList] = useState<Product[]>([])

  const theme = useTheme()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const router = useRouter()
  const { t } = useTranslation('common')
  const { user } = useAuthContext()
  const { createWishlist } = useCreateWishlist()
  const { refetch } = useGetWishlist()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const finalList = listState.items
    finalList.shift()
    debugger
    await createWishlist
      .mutateAsync({
        customerAccountId: user?.id,
        name: listState.name,
        items: finalList,
      })
      .catch((e) => {
        console.log(e)
        alert('error occured')
      })
    await refetch()
    setListState({ name: '', items: [{ product: { productCode: '' }, quantity: 0 }] })
    onCreateFormToggle(false)
  }

  const handleAddProduct = (product?: Product) => {
    // setting state for creation of list in backend
    const { items } = listState
    const item = {
      product: {
        productCode: product?.productCode as string,
      },
      quantity: 1,
    }
    items.push(item)
    setListState((currentState) => ({ ...currentState, items: items }))
    // setting state to show the products below
    setProductList((currentVal) => [...currentVal, product as Product])
  }

  const handleListNameChange = (e: string, userEnteredValue: string) => {
    setListState((currentVal) => ({ ...currentVal, name: userEnteredValue }))
  }

  const handleDeleteItem = (id: string) => {
    const items: any = listState.items.filter((item) => {
      return item.product.productCode !== id
    })
    setListState((currentState) => ({ ...currentState, items: items }))
    setProductList((currentState) =>
      currentState.filter((item: Product) => item.productCode !== id)
    )
  }

  const handleChangeQuantity = (id: string, quantity: number) => {
    const item = listState.items.find((item) => item.product.productCode === id)
    if (item?.quantity) item.quantity = quantity
  }

  return (
    <>
      <Box style={{ width: '100%' }}>
        {mdScreen ? (
          <IconButton
            data-testid="my-account-button"
            style={{ paddingLeft: 0, fontSize: '14px', color: '#000' }}
            onClick={() => {
              router.push('/my-account')
            }}
          >
            <ArrowBackIosIcon style={{ width: '14px', color: '#000' }} />
            {t('my-account')}
          </IconButton>
        ) : null}
        <Typography
          variant="h1"
          style={{
            textAlign: 'center',
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {mdScreen ? (
            <>
              <Box sx={{ fontSize: '28px', marginRight: 'auto', display: 'inline' }}>
                {t('create-new-list')}
              </Box>
              <Box sx={{ display: 'inline' }}>
                <Button
                  variant="outlined"
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
                  style={{ boxShadow: 'none', marginLeft: '9px' }}
                  disabled={listState.name.length === 0}
                >
                  {t('save-and-close')}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <IconButton
                style={{ paddingLeft: 0, marginLeft: 0 }}
                data-testid="my-account-button"
                onClick={() => {
                  router.push('/my-account')
                }}
              >
                <ArrowBackIosIcon style={{ width: '14px', color: '#000' }} />
              </IconButton>
              <Box sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'inline' }}>
                {t('create-new-list')}
              </Box>
            </>
          )}
        </Typography>
      </Box>
      <Box>
        <form
          onSubmit={handleSubmit}
          style={{ margin: '10px auto', maxWidth: '360px', marginLeft: 0 }}
          id="wishlist-form"
        >
          <Box sx={{ ...styles.listSection, flexDirection: 'column' }}>
            <KiboTextBox
              placeholder={t('name-this-list')}
              name="listName"
              value={listState.name}
              onChange={handleListNameChange}
              label={t('list-name')}
              sx={{ maxWidth: '360px' }}
            />
          </Box>
          <Box sx={{ maxWidth: '360px' }}>
            <ProductSearch onAddProduct={handleAddProduct} />
          </Box>
        </form>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {t('list-items')}
        </Typography>
        {productList.map((product: Product) => (
          <ListItem
            key={product.productCode}
            item={{
              product: {
                productName: product?.content?.productName,
                productCode: product.productCode,
                price: product.price,
                productImage:
                  (product?.content?.productImages?.length as number) > 0 &&
                  product?.content?.productImages?.[0]?.imageUrl,
                productImageAltText:
                  (product?.content?.productImages?.length as number) > 0 &&
                  product?.content?.productImages?.[0]?.altText,
                productDescription: product.content?.productShortDescription,
              },
              quantity: 1,
            }}
            onDeleteItem={handleDeleteItem}
            onChangeQuantity={handleChangeQuantity}
          />
        ))}
        {!mdScreen && (
          <>
            <Box
              sx={{
                width: '100%',
                position: 'fixed',
                left: '50%',
                bottom: '0px',
                transform: 'translateX(-50%)',
                padding: '15px',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  onCreateFormToggle(false)
                }}
                style={{ width: '100%' }}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="wishlist-form"
                style={{ width: '100%', marginTop: '8px', boxShadow: 'none' }}
                disabled={listState.name.length === 0}
              >
                {t('save-and-close')}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default CreateList
