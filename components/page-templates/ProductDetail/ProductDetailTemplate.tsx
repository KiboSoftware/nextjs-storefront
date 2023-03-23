import React, { useState } from 'react'

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Grid,
  Rating,
  Button,
  Typography,
  Divider,
  Link as MuiLink,
  styled,
  Theme,
  MenuItem,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import {
  FulfillmentOptions,
  KiboRadio,
  KiboSelect,
  Price,
  QuantitySelector,
} from '@/components/common'
import { KiboBreadcrumbs, ImageGallery } from '@/components/core'
import { AddToCartDialog, StoreLocatorDialog } from '@/components/dialogs'
import {
  ColorSelector,
  ProductInformation,
  ProductOptionCheckbox,
  ProductOptionSelect,
  ProductOptionTextBox,
  ProductQuickViewDialog,
  ProductVariantSizeSelector,
} from '@/components/product'
import { useModalContext } from '@/context'
import {
  useProductDetailTemplate,
  usePurchaseLocationQueries,
  useAddToCartMutation,
  useWishlist,
  useProductLocationInventoryQueries,
  usePriceRangeFormatter,
  useProductPriceQueries,
} from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant, PurchaseTypes } from '@/lib/constants'
import { productGetters, subscriptionGetters, wishlistGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { ProductCustom, BreadCrumb, LocationCustom } from '@/lib/types'

import type {
  AttributeDetail,
  ProductImage,
  ProductOption,
  ProductOptionValue,
  CrProduct,
  ProductPrice,
} from '@/lib/gql/types'

interface ProductDetailTemplateProps {
  product: ProductCustom
  breadcrumbs?: BreadCrumb[]
  isQuickViewModal?: boolean
  children?: any
}

const styles = {
  moreDetails: {
    typography: 'body2',
    textDecoration: 'underline',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'right',
    padding: '0.5rem 0',
    cursor: 'pointer',
    paddingLeft: '30rem',
  },
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  ...styles.moreDetails,
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body2.fontSize,
}))

const ProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const { getProductLink } = uiHelpers()
  const { product, breadcrumbs = [], isQuickViewModal = false, children } = props
  const { t } = useTranslation('common')

  const [purchaseType, setPurchaseType] = useState<string>(PurchaseTypes.ONETIMEPURCHASE)
  const [selectedFrequency, setSelectedFrequency] = useState<string>('')
  const [isSubscriptionPricingSelected, setIsSubscriptionPricingSelected] = useState<boolean>(false)

  const isSubscriptionModeAvailable = subscriptionGetters.isSubscriptionModeAvailable(product)
  const { data: productPriceResponse } = useProductPriceQueries(
    product?.productCode as string,
    isSubscriptionPricingSelected
  )

  const { showModal, closeModal } = useModalContext()
  const { addToCart } = useAddToCartMutation()
  const { data: purchaseLocation } = usePurchaseLocationQueries()

  const { addOrRemoveWishlistItem, checkProductInWishlist, isWishlistLoading } = useWishlist()

  const {
    currentProduct,
    quantity,
    updatedShopperEnteredValues,
    selectedFulfillmentOption,
    setQuantity,
    selectProductOption,
    setSelectedFulfillmentOption,
  } = useProductDetailTemplate({
    product,
    purchaseLocation,
  })

  // Getters
  const {
    productName,
    productCode,
    variationProductCode,
    fulfillmentMethod,
    productPrice,
    productPriceRange,
    productRating,
    description,
    shortDescription,
    productGallery,
    productOptions,
    optionsVisibility,
    properties,
    isValidForOneTime,
  } = productGetters.getProductDetails(
    {
      ...currentProduct,
      fulfillmentMethod: selectedFulfillmentOption?.method,
      purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
    },
    productPriceResponse?.price as ProductPrice
  )
  const { data: locationInventory } = useProductLocationInventoryQueries(
    (variationProductCode || productCode) as string,
    selectedFulfillmentOption?.location?.code as string
  )

  const quantityLeft = productGetters.getAvailableItemCount(
    currentProduct,
    locationInventory,
    selectedFulfillmentOption?.method
  )
  const fulfillmentOptions = productGetters.getProductFulfillmentOptions(
    currentProduct,
    {
      name: selectedFulfillmentOption?.location?.name,
    },
    locationInventory
  )

  const isValidForAddToCart = () => {
    if (quantityLeft < 1) {
      return false
    }
    if (purchaseType === PurchaseTypes.SUBSCRIPTION) {
      return !!selectedFrequency
    } else {
      return isValidForOneTime
    }
  }

  const isProductInWishlist = checkProductInWishlist({
    productCode,
    variationProductCode,
  })

  const subscriptionFrequency = subscriptionGetters.getFrequencyValues(product as ProductCustom)

  const purchaseTypeRadioOptions = [
    {
      value: PurchaseTypes.SUBSCRIPTION,
      name: PurchaseTypes.SUBSCRIPTION,
      label: <Typography variant="body2">{PurchaseTypes.SUBSCRIPTION}</Typography>,
    },
    {
      value: PurchaseTypes.ONETIMEPURCHASE,
      name: PurchaseTypes.ONETIMEPURCHASE,
      label: <Typography variant="body2">{PurchaseTypes.ONETIMEPURCHASE}</Typography>,
    },
  ]

  // methods
  const handleAddToCart = async () => {
    try {
      const cartResponse = await addToCart.mutateAsync({
        product: {
          productCode,
          variationProductCode,
          fulfillmentMethod,
          options: updatedShopperEnteredValues,
          purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
        },
        quantity,
        ...(purchaseType === PurchaseTypes.SUBSCRIPTION && {
          subscription: {
            required: true,
            frequency: subscriptionGetters.getFrequencyUnitAndValue(selectedFrequency),
          },
        }),
      })

      if (cartResponse.id) {
        showModal({
          Component: AddToCartDialog,
          props: {
            cartItem: cartResponse,
          },
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFulfillmentOptionChange = (value: string) => {
    if (
      value === FulfillmentOptionsConstant.SHIP ||
      selectedFulfillmentOption?.location?.name ||
      purchaseLocation.code
    ) {
      setSelectedFulfillmentOption({
        ...selectedFulfillmentOption,
        method: value,
      })
    } else {
      handleProductPickupLocation()
    }
  }

  const handleProductPickupLocation = (title?: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        title: title,
        showProductAndInventory: true,
        product: currentProduct as CrProduct,
        quantity: quantity,
        isQuickViewModal: isQuickViewModal,
        isNested: isQuickViewModal,
        NestedDialog: isQuickViewModal ? ProductQuickViewDialog : null,
        nestedDialogProps: { product: currentProduct, isQuickViewModal: true },
        onNestedDialogClose: () => {
          showModal({
            Component: ProductQuickViewDialog,
            props: {
              product: currentProduct,
              isQuickViewModal: true,
            },
          })
        },
        handleSetStore: async (selectedStore: LocationCustom) => {
          setSelectedFulfillmentOption({
            method: FulfillmentOptionsConstant.PICKUP,
            location: selectedStore,
          })
        },
      },
    })
  }

  const handleWishList = async () => {
    try {
      if (!wishlistGetters.isAvailableToAddToWishlist(currentProduct)) return
      await addOrRemoveWishlistItem({ product: currentProduct })
    } catch (error) {
      console.log('Error: add or remove wishlist item from PDP', error)
    }
  }

  const handlePurchaseTypeSelection = (option: string) => {
    setPurchaseType(option)
    if (option === PurchaseTypes.SUBSCRIPTION) {
      setIsSubscriptionPricingSelected(true)
      setSelectedFulfillmentOption({
        ...selectedFulfillmentOption,
        method: FulfillmentOptionsConstant.SHIP,
      })
    } else {
      setIsSubscriptionPricingSelected(false)
    }
  }

  const handleFrequencyChange = async (_name: string, value: string) => setSelectedFrequency(value)

  return (
    <Grid container>
      {!isQuickViewModal && (
        <Grid item xs={12} alignItems="center" sx={{ paddingBlock: 4 }}>
          <KiboBreadcrumbs breadcrumbs={breadcrumbs} />
        </Grid>
      )}
      <Grid item xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
        <ImageGallery images={productGallery as ProductImage[]} title={''} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '100%', pl: { xs: 0, md: 5 } }}>
        <Typography variant="h1" gutterBottom>
          {productName}
        </Typography>
        <Price
          price={t<string>('currency', { val: productPrice.regular })}
          {...(productPrice.special && {
            salePrice: t<string>('currency', { val: productPrice.special }),
          })}
          priceRange={usePriceRangeFormatter(productPriceRange)}
        />
        <Box paddingY={1} display={shortDescription ? 'block' : 'none'}>
          <Box
            data-testid="short-description"
            dangerouslySetInnerHTML={{
              __html: shortDescription,
            }}
          />
          {isQuickViewModal && (
            <StyledLink
              href={getProductLink(product?.productCode as string)}
              passHref
              onClick={() => closeModal()}
              aria-label={t('more-details')}
            >
              {t('more-details')}
            </StyledLink>
          )}
        </Box>

        <Box data-testid="product-rating">
          <Rating
            name="read-only"
            value={productRating}
            precision={0.5}
            readOnly
            size="small"
            icon={<StarRounded color="primary" />}
            emptyIcon={<StarRounded />}
          />
        </Box>

        <Box paddingX={1} paddingY={3} display={optionsVisibility.color ? 'block' : 'none'}>
          <ColorSelector
            attributeFQN={productOptions?.colourOptions?.attributeFQN as string}
            values={productOptions?.colourOptions?.values as ProductOptionValue[]}
            onColorChange={selectProductOption}
          />
        </Box>

        <Box paddingY={1} display={optionsVisibility.size ? 'block' : 'none'}>
          <ProductVariantSizeSelector
            values={productOptions?.sizeOptions?.values as ProductOptionValue[]}
            attributeFQN={productOptions?.sizeOptions?.attributeFQN as string}
            onSizeChange={selectProductOption}
          />
        </Box>

        <Box paddingY={1} display={optionsVisibility.select ? 'block' : 'none'}>
          {productOptions?.selectOptions?.map((option) => {
            return (
              <Box key={option?.attributeDetail?.name} paddingY={1}>
                <ProductOptionSelect
                  name={option?.attributeDetail?.name}
                  optionValues={option?.values as ProductOptionValue[]}
                  value={productGetters.getOptionSelectedValue(option as ProductOption)}
                  label={productGetters.getOptionName(option as ProductOption)}
                  attributeFQN={option?.attributeFQN as string}
                  onDropdownChange={selectProductOption}
                />
              </Box>
            )
          })}
        </Box>

        <Box paddingY={1} display={optionsVisibility.checkbox ? 'block' : 'none'}>
          {productOptions?.yesNoOptions.map((option: ProductOption | null) => {
            const attributeDetail = option?.attributeDetail as AttributeDetail
            return (
              <ProductOptionCheckbox
                key={attributeDetail.name}
                label={attributeDetail.name as string}
                attributeFQN={option?.attributeFQN as string}
                checked={
                  productGetters.getOptionSelectedValue(option as ProductOption) ? true : false
                }
                onCheckboxChange={selectProductOption}
              />
            )
          })}
        </Box>

        <Box paddingY={1} display={optionsVisibility.textbox ? 'block' : 'none'}>
          {productOptions?.textBoxOptions.map((option) => {
            return (
              <ProductOptionTextBox
                key={option?.attributeDetail?.name}
                option={option as ProductOption}
                onBlur={selectProductOption}
              />
            )
          })}
        </Box>

        <Box paddingY={1}>
          <QuantitySelector
            label="Qty"
            quantity={quantity}
            onIncrease={() => setQuantity((prevQuantity: number) => Number(prevQuantity) + 1)}
            onDecrease={() => setQuantity((prevQuantity: number) => Number(prevQuantity) - 1)}
          />
        </Box>
        {isSubscriptionModeAvailable && (
          <Box paddingY={1}>
            <KiboRadio
              radioOptions={purchaseTypeRadioOptions}
              selected={purchaseType}
              onChange={handlePurchaseTypeSelection}
            />
          </Box>
        )}
        <Box paddingY={1}>
          {purchaseType === PurchaseTypes.SUBSCRIPTION && (
            <KiboSelect
              name={t('subscription-frequency')}
              onChange={handleFrequencyChange}
              placeholder={t('select-subscription-frequency')}
              value={selectedFrequency}
              label={t('subscription-frequency')}
            >
              {subscriptionFrequency?.map((property) => {
                return (
                  <MenuItem key={property?.stringValue} value={`${property?.stringValue}`}>
                    {`${property?.stringValue}`}
                  </MenuItem>
                )
              })}
            </KiboSelect>
          )}
          {purchaseType === PurchaseTypes.ONETIMEPURCHASE && (
            <FulfillmentOptions
              fulfillmentOptions={fulfillmentOptions}
              selected={selectedFulfillmentOption?.method}
              onFulfillmentOptionChange={(value: string) => handleFulfillmentOptionChange(value)}
              onStoreSetOrUpdate={() => handleProductPickupLocation()}
            />
          )}
        </Box>

        <Box pt={2} display="flex" sx={{ justifyContent: 'space-between' }}>
          <Typography fontWeight="600" variant="body2">
            {selectedFulfillmentOption?.method && `${quantityLeft} ${t('item-left')}`}
          </Typography>
          <MuiLink
            color="inherit"
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={() => handleProductPickupLocation(t('check-nearby-store'))}
          >
            {t('nearby-stores')}
          </MuiLink>
        </Box>
        <Box paddingY={1} display="flex" flexDirection={'column'} gap={2}>
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleAddToCart()}
            loading={addToCart.isLoading}
            {...(!isValidForAddToCart() && { disabled: true })}
          >
            {t('add-to-cart')}
          </LoadingButton>
          <Box display="flex" gap={3}>
            <LoadingButton
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleWishList}
              loading={isWishlistLoading}
              sx={{ padding: '0.375rem 0.5rem' }}
              {...(!wishlistGetters.isAvailableToAddToWishlist(currentProduct) && {
                disabled: true,
              })}
            >
              {isProductInWishlist ? (
                <FavoriteRoundedIcon sx={{ color: 'red.900', marginRight: '14px' }} />
              ) : (
                <FavoriteBorderRoundedIcon sx={{ color: 'grey.600', marginRight: '14px' }} />
              )}
              {t('add-to-wishlist')}
            </LoadingButton>
            <Button variant="contained" color="inherit" fullWidth>
              {t('one-click-checkout')}
            </Button>
          </Box>
        </Box>
      </Grid>
      {!isQuickViewModal && (
        <>
          <Grid item xs={12} paddingY={3}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            {properties?.length > 0 && (
              <Box paddingY={3}>
                <ProductInformation productFullDescription={description} options={properties} />
              </Box>
            )}
          </Grid>
          {children}
        </>
      )}
    </Grid>
  )
}

export default ProductDetailTemplate
