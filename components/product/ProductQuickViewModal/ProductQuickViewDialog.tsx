import React from 'react'

import { Button, Stack, Theme, useMediaQuery } from '@mui/material'

import { productQuickViewDialogStyle } from './ProductQuickViewDialog.style'
import KiboDialog from '@/components/common/KiboDialog/KiboDialog'
import { ProductDetailTemplate } from '@/components/page-templates'
import { useModalContext } from '@/context/ModalContext'
import { useProductCardActions } from '@/hooks'
import type { ProductCustom } from '@/lib/types'

import { CrWishlist, Product } from '@/lib/gql/types'

interface ProductQuickViewDialogProps {
  product: ProductCustom
  isQuickViewModal?: boolean
  dialogProps?: any
  quoteDetails?: any
  listData?: any
  shouldFetchShippingMethods?: boolean
  onUpdateListData: (param: CrWishlist, addToCartPayload: any) => void
}

const ProductQuickViewDialogFooter = (props: any) => {
  const {
    cancel,
    addItemToCart,
    addItemToList,
    addItemToQuote,
    onClose,
    isValidateAddToCart,
    isValidateAddToWishlist,
    addToCartPayload,
    quoteDetails,
    listData,
    onUpdateListData,
    currentProduct,
    listMode,
    shouldFetchShippingMethods,
  } = props
  const { handleAddToCart, handleAddToList, handleAddToQuote } = useProductCardActions(
    shouldFetchShippingMethods
  )
  const mdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleAddProductToCart = () => {
    handleAddToCart(addToCartPayload, false)
    onClose()
  }

  const handleAddProductToList = async () => {
    listMode === 'create'
      ? onUpdateListData(currentProduct, addToCartPayload)
      : handleAddToList({
          listData,
          product: currentProduct as Product,
          onUpdateListData,
        })
    onClose()
  }

  const handleAddProductToQuote = () => {
    const { quoteId, updateMode } = quoteDetails
    handleAddToQuote(
      quoteId,
      updateMode,
      {
        ...currentProduct,
        fulfillmentMethod: addToCartPayload?.product?.fulfillmentMethod,
        purchaseLocationCode: addToCartPayload?.product?.purchaseLocationCode,
      },
      addToCartPayload?.quantity
    )
    onClose()
  }

  return (
    <Stack {...(!mdScreen && { spacing: 2 })} sx={{ ...productQuickViewDialogStyle.footer }}>
      <Button
        variant="contained"
        color="secondary"
        {...(!mdScreen && { fullWidth: true })}
        onClick={onClose}
      >
        {cancel}
      </Button>
      {addItemToCart && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProductToCart}
          {...(!mdScreen && { fullWidth: true })}
          {...(!isValidateAddToCart && { disabled: true })}
        >
          {addItemToCart}
        </Button>
      )}
      {addItemToList && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProductToList}
          {...(!mdScreen && { fullWidth: true })}
          {...(!isValidateAddToWishlist && { disabled: true })}
        >
          {addItemToList}
        </Button>
      )}
      {addItemToQuote && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProductToQuote}
          {...(!mdScreen && { fullWidth: true })}
          {...(!isValidateAddToCart && { disabled: true })}
        >
          {addItemToQuote}
        </Button>
      )}
    </Stack>
  )
}

const ProductQuickViewDialog = (props: ProductQuickViewDialogProps) => {
  const {
    product,
    isQuickViewModal,
    dialogProps,
    quoteDetails,
    listData,
    shouldFetchShippingMethods = false,
    onUpdateListData,
  } = props
  const {
    title,
    cancel,
    addItemToCart,
    addItemToList,
    addItemToQuote,
    isB2B = false,
    listMode,
  } = dialogProps || {} //isB2B to showDialog
  const { closeModal } = useModalContext()
  const [currentProduct, setCurrentProduct] = React.useState<any>(null)
  const [addToCartPayload, setAddToCartPayload] = React.useState<any>(null)
  const [isValidateAddToCart, setIsValidateAddToCart] = React.useState<boolean>(false)
  const [isValidateAddToWishlist, setIsValidateAddToWishlist] = React.useState<boolean>(false)

  const handleCurrentProduct = (
    addToCartPayload: any,
    currentProduct: ProductCustom,
    isValidateAddToCart: boolean,
    isValidateAddToWishlist: boolean
  ) => {
    setCurrentProduct(currentProduct)
    setAddToCartPayload(addToCartPayload)
    setIsValidateAddToCart(isValidateAddToCart)
    setIsValidateAddToWishlist(isValidateAddToWishlist)
  }

  return (
    <KiboDialog
      showCloseButton
      showContentTopDivider={isB2B}
      showContentBottomDivider={isB2B}
      Title={title}
      Actions={
        cancel &&
        (addItemToCart || addItemToList || addItemToQuote) && (
          <ProductQuickViewDialogFooter
            cancel={cancel}
            addItemToCart={addItemToCart}
            addItemToList={addItemToList}
            addItemToQuote={addItemToQuote}
            onClose={closeModal}
            isValidateAddToCart={isValidateAddToCart}
            isValidateAddToWishlist={isValidateAddToWishlist}
            addToCartPayload={addToCartPayload}
            currentProduct={currentProduct}
            quoteDetails={quoteDetails}
            listData={listData}
            onUpdateListData={onUpdateListData}
            listMode={listMode}
            shouldFetchShippingMethods={shouldFetchShippingMethods}
          />
        )
      }
      Content={
        <ProductDetailTemplate
          product={product}
          isQuickViewModal={isQuickViewModal}
          isB2B={isB2B}
          addItemToList={addItemToList}
          addItemToQuote={addItemToQuote}
          addItemToCart={addItemToCart}
          quoteDetails={quoteDetails}
          title={title}
          cancel={cancel}
          getCurrentProduct={handleCurrentProduct}
          shouldFetchShippingMethods={shouldFetchShippingMethods}
        />
      }
      customMaxWidth="80rem"
      onClose={closeModal}
    />
  )
}

export default ProductQuickViewDialog
