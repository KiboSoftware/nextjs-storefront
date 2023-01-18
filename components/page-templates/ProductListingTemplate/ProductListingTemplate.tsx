import React, { Suspense, useState } from 'react'

import { Add, Apps, List } from '@mui/icons-material'
import { Grid, MenuItem, Typography, Box, Button, SxProps, Skeleton, Link } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { FilterTiles, KiboSelect, FullWidthDivider } from '@/components/common'
import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import { ProductCard, ProductQuickViewDialog } from '@/components/product'
import { CategoryFacet, CategoryFilterByMobile, FacetList } from '@/components/product-listing'
import { CategoryFacetData } from '@/components/product-listing/CategoryFacet/CategoryFacet'
import { useModalContext } from '@/context'
import { usePriceRangeFormatter, useUpdateRoutes, useWishlist } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { BreadCrumb as BreadCrumbType, ProductCustom } from '@/lib/types'

import type { Facet as FacetType, FacetValue, Product } from '@/lib/gql/types'

interface SortingValues {
  value: string
  id: string
  selected: boolean
}

export interface ProductListingTemplateProps {
  breadCrumbsList: BreadCrumbType[]
  productListingHeader: string
  facetList?: FacetType[]
  products?: Product[]
  sortingValues?: { options: SortingValues[]; selected: string }
  categoryFacet: CategoryFacetData
  totalResults: number
  isLoading?: boolean
  appliedFilters: FacetValue[]
  pageSize: number
  onSortItemSelection: (value: string) => void
  onPaginationChange: () => void
  showQuickViewButton?: boolean
  isQuickViewModal?: boolean
}

const styles = {
  breadcrumbsClass: {
    margin: '1.5rem 0',
    padding: {
      md: '0',
      xs: '0 1rem',
    },
  },
  navBar: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  navBarMain: {
    display: 'flex',
    flex: 1,
    flexDirection: {
      md: 'row',
      xs: 'column',
    },
    alignItems: {
      md: 'center',
      xs: 'flex-start',
    },
    padding: {
      md: '0.5rem 0',
      xs: '2% 1rem',
    },
  },
  navBarSort: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 0 0 auto',
    alignItems: 'center',
    width: { md: 'auto', xs: '100%' },
    padding: '0.5rem 0',
  } as SxProps<Theme> | undefined,
  navBarLabel: {
    whiteSpace: 'noWrap',
    marginRight: '1.5rem',
    typography: 'body1',
    color: 'text.primary',
    display: { md: 'block', xs: 'none' },
  } as SxProps<Theme> | undefined,
  navBarView: {
    margin: '0 0 0 5rem',
    order: 0,
    alignItems: 'center',
    display: {
      md: 'flex',
      xs: 'none',
    },
  },
  mainSection: {
    display: 'flex',
  },
  sideBar: {
    display: {
      md: 'block',
      xs: 'none',
    },
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'grey.500',
    padding: '0 1.5625rem 0 0',
    maxWidth: {
      md: '17%',
      xs: 'auto',
    },
  } as SxProps<Theme> | undefined,
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterByButton: {
    textTransform: 'capitalize',
    border: '1px solid #2b2b2b',
    color: '#2b2b2b',
    justifyContent: 'space-between',
    width: '100%',
    height: '2.188rem',
    fontWeight: '400',
  },
  showMoreButton: {
    width: { md: '23.5rem', xs: '12.5rem' },
  },
  productResults: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
  },
  categoryFacetHeader: {
    fontWeight: 'bold',
    color: 'text.primary',
  },
  categoryFacetHeaderLoading: {
    height: { md: '2.25rem', xs: '1.5rem' },
    width: { md: '15.625rem', xs: '10.75rem' },
  },
  sorting: {
    minWidth: { md: '11.875rem', xs: '9.313rem' },
    marginTop: { xs: '0.5rem', md: '0' },
  },
  filterBy: {
    minWidth: { md: '11.875rem', xs: '9.313rem' },
    display: { md: 'none' },
    marginTop: { xs: '0.5rem', md: '0' },
  },
  filterByMobile: {
    display: {
      md: 'none',
      xs: 'block',
    },
  },
  clearAllButton: {
    typography: 'body2',
    textDecoration: 'underline',
    marginTop: { md: '1.5rem', xs: 0 },
    marginLeft: 0,
    color: 'text.primary',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  totalResults: {
    marginTop: '1.5rem',
    marginRight: { md: 0, xs: '1rem' },
    typography: 'body2',
    color: 'grey.600',
    whiteSpace: 'nowrap',
  },
}

// Component
const ProductListingTemplate = (props: ProductListingTemplateProps) => {
  const {
    breadCrumbsList,
    productListingHeader,
    facetList,
    products = [],
    sortingValues,
    categoryFacet,
    totalResults,
    isLoading,
    appliedFilters,
    pageSize,
    onSortItemSelection,
    onPaginationChange,
    showQuickViewButton = true,
  } = props
  const { getProductLink } = uiHelpers()
  const { updateRoute } = useUpdateRoutes()
  const { addOrRemoveWishlistItem, checkProductInWishlist } = useWishlist()

  const [showFilterBy, setFilterBy] = useState<boolean>(false)

  const { t } = useTranslation('common')
  const { showModal } = useModalContext()

  const handleFilterBy = () => setFilterBy(!showFilterBy)

  const handleClearAllFilters = () => {
    updateRoute('')
  }

  const handleSelectedTileRemoval = (selectedTile: string) => {
    updateRoute(selectedTile)
  }

  const handleWishList = async (product: ProductCustom) => {
    try {
      await addOrRemoveWishlistItem({ product })
    } catch (error) {
      console.log('Error: add or remove wishlist item from PLP', error)
    }
  }
  const openProductQuickViewModal = (product: ProductCustom) => {
    showModal({
      Component: ProductQuickViewDialog,
      props: {
        product,
        isQuickViewModal: true,
      },
    })
  }
  return (
    <>
      <Box sx={{ ...styles.breadcrumbsClass }}>
        <KiboBreadcrumbs breadcrumbs={breadCrumbsList} />
      </Box>

      {!showFilterBy && (
        <Box>
          <FullWidthDivider />
          <Box sx={{ ...styles.navBar }}>
            <Box sx={{ ...styles.navBarMain }}>
              <Suspense
                fallback={
                  <Skeleton variant="rectangular" sx={{ ...styles.categoryFacetHeaderLoading }} />
                }
              >
                <Typography variant="h1" sx={{ ...styles.categoryFacetHeader }}>
                  {productListingHeader}
                </Typography>
              </Suspense>
              <Box sx={{ ...styles.navBarSort }}>
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      height={18}
                      width={54}
                      sx={{ ...styles.navBarLabel }}
                    />
                  }
                >
                  <Box sx={{ ...styles.navBarLabel }}>{t('sort-by')}</Box>
                </Suspense>
                <Box sx={{ ...styles.sorting }}>
                  <Suspense fallback={<Skeleton variant="rectangular" height={36} />}>
                    <KiboSelect
                      sx={{ typography: 'body2' }}
                      value={sortingValues?.selected}
                      onChange={(_name, value) => onSortItemSelection(value)}
                    >
                      {sortingValues?.options?.map((sortingVal) => (
                        <MenuItem
                          sx={{ typography: 'body2' }}
                          key={sortingVal?.id}
                          value={sortingVal?.id}
                        >
                          {sortingVal?.value}
                        </MenuItem>
                      ))}
                    </KiboSelect>
                  </Suspense>
                </Box>
                <Box sx={{ ...styles.filterBy }}>
                  <Suspense fallback={<Skeleton variant="rectangular" height={36} />}>
                    <Button
                      variant="outlined"
                      endIcon={<Add fontSize="small" />}
                      sx={{ ...styles.filterByButton }}
                      onClick={handleFilterBy}
                    >
                      {t('filter-by')}
                    </Button>
                  </Suspense>
                </Box>
              </Box>
              <Suspense
                fallback={
                  <Box sx={{ ...styles.navBarView }}>
                    <Skeleton sx={{ marginRight: '1rem' }} height={24} width={34} />
                    <Skeleton sx={{ marginRight: '1rem' }} height={40} width={32} />
                    <Skeleton height={40} width={32} />
                  </Box>
                }
              >
                <Box sx={{ ...styles.navBarView }}>
                  <Typography variant="body1" color="text.primary" sx={{ marginRight: '1rem' }}>
                    {t('view')}
                  </Typography>
                  <Apps sx={{ fontSize: '2rem', marginRight: '1rem' }} />
                  <List sx={{ fontSize: '2.4rem' }} />
                </Box>
              </Suspense>
            </Box>
          </Box>
          <FullWidthDivider />
          <Box sx={{ ...styles.mainSection }}>
            <Box sx={{ ...styles.sideBar }}>
              {(categoryFacet.header ||
                (categoryFacet?.childrenCategories &&
                  categoryFacet?.childrenCategories?.length > 0)) && (
                <CategoryFacet categoryFacet={categoryFacet} breadcrumbs={breadCrumbsList} />
              )}
              <FacetList
                facetList={facetList}
                onFilterByClose={handleFilterBy}
                appliedFilters={appliedFilters}
                onSelectedTileRemoval={handleSelectedTileRemoval}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              {!isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', margin: '1rem 0 0 1rem' }}>
                    {appliedFilters?.length > 0 && (
                      <FilterTiles
                        appliedFilters={appliedFilters}
                        onSelectedTileRemoval={handleSelectedTileRemoval}
                      >
                        <Link sx={{ ...styles.clearAllButton }} onClick={handleClearAllFilters}>
                          {t('clear-all')}
                        </Link>
                      </FilterTiles>
                    )}
                  </Box>
                  <Box sx={{ ...styles.totalResults }}>{t('results', { count: totalResults })}</Box>
                </Box>
              )}
              <Suspense
                fallback={
                  <Grid container sx={{ flexWrap: 'wrap' }}>
                    {Array.from(Array(16)).map((_, ind) => {
                      return (
                        <Grid
                          key={ind}
                          display={'flex'}
                          justifyContent="center"
                          item
                          lg={3}
                          md={4}
                          sm={4}
                          xs={6}
                        >
                          <ProductCard isLoading={isLoading} link="/" />
                        </Grid>
                      )
                    })}
                  </Grid>
                }
              >
                <Grid container sx={{ flexWrap: 'wrap' }}>
                  {products?.map((product, index) => {
                    return (
                      <Grid
                        key={`${productGetters.getProductId(product)}-${index}`}
                        item
                        display={'flex'}
                        justifyContent="center"
                        lg={3}
                        md={4}
                        sm={4}
                        xs={6}
                      >
                        <ProductCard
                          product={product}
                          showQuickViewButton={showQuickViewButton}
                          imageUrl={
                            productGetters.getCoverImage(product) &&
                            productGetters.handleProtocolRelativeUrl(
                              productGetters.getCoverImage(product)
                            )
                          }
                          link={getProductLink(product?.productCode as string)}
                          price={t<string>('currency', {
                            val: productGetters.getPrice(product).regular,
                          })}
                          {...(productGetters.getPrice(product).special && {
                            salePrice: t<string>('currency', {
                              val: productGetters.getPrice(product).special,
                            }),
                          })}
                          priceRange={productGetters.getPriceRange(product)}
                          title={productGetters.getName(product) as string}
                          rating={productGetters.getRating(product)}
                          isInWishlist={checkProductInWishlist({
                            productCode: product?.productCode as string,
                            variationProductCode: product?.variationProductCode as string,
                          })}
                          isShowWishlistIcon={!productGetters.isVariationProduct(product)}
                          onAddOrRemoveWishlistItem={() => handleWishList(product as ProductCustom)}
                          onClickQuickViewModal={() =>
                            openProductQuickViewModal(product as ProductCustom)
                          }
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              </Suspense>

              {!isLoading && (
                <Box>
                  <Box sx={{ ...styles.productResults, color: 'grey.600', typography: 'body2' }}>
                    {t('products-to-show', {
                      m: `${pageSize < totalResults ? pageSize : totalResults}`,
                      n: `${totalResults}`,
                    })}
                  </Box>
                  {pageSize < totalResults && (
                    <Box sx={{ ...styles.productResults }}>
                      <Button
                        id="show-more-button"
                        sx={{ ...styles.showMoreButton }}
                        variant="contained"
                        onClick={onPaginationChange}
                        color="inherit"
                      >
                        {t('show-more')}
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {showFilterBy && (
        <Box sx={{ ...styles.filterByMobile }}>
          <CategoryFilterByMobile
            facetList={facetList}
            header={productListingHeader}
            totalResults={totalResults}
            isLoading={isLoading}
            appliedFilters={appliedFilters}
            onClearAllFilters={handleClearAllFilters}
            onFilterByClose={handleFilterBy}
            breadCrumbsList={breadCrumbsList}
            onSelectedTileRemoval={handleSelectedTileRemoval}
          />
        </Box>
      )}
    </>
  )
}

export default ProductListingTemplate
