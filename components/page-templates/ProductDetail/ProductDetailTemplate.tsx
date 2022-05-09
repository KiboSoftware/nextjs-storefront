import React from 'react'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/StarRounded'
import {
  Box,
  Grid,
  Rating,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import FulfillmentOptions from '@/components/common/FulfillmentOptions/FulfillmentOptions'
import Price from '@/components/common/Price/Price'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'
import Breadcrumbs from '@/components/core/Breadcrumbs/Breadcrumbs'
import ImageGallery from '@/components/core/ImageGallery/ImageGallery'
import ColorSelector from '@/components/product/ColorSelector/ColorSelector'
import ProductCard from '@/components/product/ProductCard/ProductCard'
import ProductOptionCheckbox from '@/components/product/ProductOptionCheckbox/ProductOptionCheckbox'
import ProductOptionSelect from '@/components/product/ProductOptionSelect/ProductOptionSelect'
import ProductOptionTextBox from '@/components/product/ProductOptionTextbox/ProductOptionTextBox'
import ProductVariantSizeSelector from '@/components/product/ProductVariantSizeSelector/ProductVariantSizeSelector'
import { productGetters } from '@/lib/getters'
import type { ProductCustom } from '@/lib/types'

import type {
  AttributeDetail,
  Maybe,
  ProductImage,
  ProductOption,
  ProductOptionValue,
} from '@/lib/gql/types'

interface ProductDetailTemplateProps {
  product: ProductCustom
}

interface ProductProperties {
  name: Maybe<string> | undefined
  value: string | undefined
}

const ProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const { product } = props
  const { t } = useTranslation(['product-page', 'common'])

  const breadcrumbList = productGetters.getBreadcrumbs(product)
  const productName = productGetters.getName(product)
  const productPrice = productGetters.getPrice(product)
  const productRating = productGetters.getRating(product)
  const description = productGetters.getDescription(product)
  const shortDescription = productGetters.getShortDescription(product)
  const productGallery = productGetters.getSFProductGallery(product)

  const productOptions = productGetters.getSegregatedOptions(product)
  const optionsVisibility = {
    color: productOptions && productOptions.colourOptions && productOptions.colourOptions.values,
    size: productOptions && productOptions.sizeOptions && productOptions.sizeOptions.values,
    select: productOptions && productOptions.selectOptions.length,
    checkbox: productOptions && productOptions.yesNoOptions.length,
    textbox: productOptions && productOptions.textBoxOptions.length,
  }

  const properties = productGetters.getProperties(product) as ProductProperties[]
  const isValidForAddToCart = productGetters.validateAddToCart(product)

  return (
    <>
      <Grid container>
        <Grid item xs={12} alignItems="center" sx={{ paddingBlock: 4 }}>
          <Breadcrumbs breadcrumbs={breadcrumbList} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
          <ImageGallery images={productGallery as ProductImage[]} title={''} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ width: '100%', pl: { xs: 0, md: 5 } }}>
          <Typography variant="h1" gutterBottom>
            {productName}
          </Typography>
          <Price
            price={t<string>('common:currency', { val: productPrice.regular })}
            {...(productPrice.special && {
              salePrice: t<string>('common:currency', { val: productPrice.special }),
            })}
          />

          <Box paddingY={1} display={shortDescription ? 'block' : 'none'}>
            <Typography
              variant="body2"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: shortDescription,
              }}
            ></Typography>
          </Box>

          <Rating
            name="read-only"
            value={productRating}
            precision={0.5}
            readOnly
            size="small"
            icon={<StarIcon color="primary" data-testid="filled-rating" />}
            emptyIcon={<StarIcon data-testid="empty-rating" />}
            data-testid="product-rating"
          />

          <Box paddingX={1} paddingY={3} display={optionsVisibility.color ? 'block' : 'none'}>
            <ColorSelector
              attributeFQN="tenant~color"
              values={productOptions?.colourOptions?.values as ProductOptionValue[]}
              onChange={() => null}
            />
          </Box>

          <Box paddingY={1} display={optionsVisibility.size ? 'block' : 'none'}>
            <ProductVariantSizeSelector
              values={productOptions?.sizeOptions?.values as ProductOptionValue[]}
              attributeFQN="tenant~size"
              selectOption={() => null}
            />
          </Box>

          <Box paddingY={1} display={optionsVisibility.select ? 'block' : 'none'}>
            {productOptions?.selectOptions.map((option) => {
              return (
                <ProductOptionSelect
                  key={option?.attributeDetail?.name}
                  optionValues={option?.values as ProductOptionValue[]}
                  value={productGetters.getOptionSelectedValue(option as ProductOption)}
                  label={productGetters.getOptionName(option as ProductOption)}
                  onChange={() => null}
                />
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
                  checked={
                    productGetters.getOptionSelectedValue(option as ProductOption) ? true : false
                  }
                  onChange={() => null}
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
                  onChange={() => null}
                />
              )
            })}
          </Box>

          <Box paddingY={1}>
            <QuantitySelector label="Qty" />
          </Box>

          <Box paddingY={1}>
            <FulfillmentOptions />
          </Box>

          <Box paddingY={1} display="flex" flexDirection={'column'} gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              {...(!isValidForAddToCart && { disabled: true })}
            >
              {t('common:add-to-cart')}
            </Button>
            <Box display="flex" gap={3}>
              <Button variant="contained" color="secondary" fullWidth>
                {t('common:add-to-wishlist')}
              </Button>
              <Button variant="contained" color="inherit" fullWidth>
                {t('common:one-click-checkout')}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} paddingY={3}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box paddingY={1} width="100%" display={description ? 'block' : 'none'}>
            <Typography variant="h2" gutterBottom>
              {t('product-information')}
            </Typography>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></Typography>
          </Box>
          <Box paddingY={3}>
            <ProductSpec properties={properties} />
          </Box>
        </Grid>

        {/* This section is hardcoded for now */}
        <Grid item xs={12} sx={{ backgroundColor: 'grey.100', p: { xs: 1, md: 5 }, marginY: 2 }}>
          <Typography variant="h2" gutterBottom>
            {t('product-recommendations')}
          </Typography>
          <Box
            display="flex"
            sx={{ gap: { xs: 0, md: 4 }, maxWidth: { xs: '100vh', md: '100%' }, overflowX: 'auto' }}
          >
            {Array.from(new Array(5)).map((each, i) => {
              return (
                <Grid item xs={6} md={2} key={i}>
                  <ProductCard
                    key={i}
                    link="/product"
                    title={'Nike Runner'}
                    price={'$60.00'}
                    rating={4}
                    imageUrl={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU'
                    }
                  />
                </Grid>
              )
            })}
          </Box>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{
            backgroundColor: 'grey.100',
            p: { xs: 1, md: 5 },
            marginY: 2,
          }}
        >
          <Typography variant="h2" gutterBottom>
            {t('customers-also-bought')}
          </Typography>
          <Box
            display="flex"
            sx={{ gap: { xs: 0, md: 4 }, maxWidth: { xs: '100vh', md: '100%' }, overflowX: 'auto' }}
          >
            {Array.from(new Array(5)).map((each, i) => {
              return (
                <Grid item xs={6} md={2} key={i}>
                  <ProductCard
                    link="/product"
                    title={'Nike Runner'}
                    price={'$60.00'}
                    rating={4}
                    imageUrl={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU'
                    }
                  />
                </Grid>
              )
            })}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductDetailTemplate

const ProductSpec = (props: { properties: ProductProperties[] }) => {
  const [expanded, setExpanded] = React.useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      sx={{
        maxWidth: 370,
        backgroundColor: 'grey.100',
        borderColor: 'grey.500',
        borderStyle: 'solid',
        borderWidth: 1,
      }}
    >
      <CardHeader
        action={
          <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
        title={
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Product Specs
          </Typography>
        }
      />
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props?.properties.map((option: ProductProperties, index: number) => {
            return (
              <Box data-testid="productOption" key={index}>
                <Typography variant="body2" fontWeight="bold" sx={{ pr: 1 }} component="span">
                  {option.name}:
                </Typography>
                <Typography variant="body2" component="span">
                  {option.value}
                </Typography>
              </Box>
            )
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}
