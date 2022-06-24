import React, { useEffect, useState } from 'react'

import { Add, Apps, List } from '@mui/icons-material'
import { Grid, MenuItem, Typography, Box, Button, SxProps, Skeleton, Link } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import FilterTiles from '@/components/common/FilterTiles/FilterTiles'
import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import FullWidthDivider from '@/components/FullWidthDivider'
import { CategoryFacet, CategoryFilterByMobile, FacetList } from '@/components/product-listing'
import { CategoryFacetData } from '@/components/product-listing/CategoryFacet/CategoryFacet'
import ProductCard from '@/components/product/ProductCard/ProductCard'
import { useUpdateRoutes } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { BreadCrumb as BreadCrumbType } from '@/lib/types'

import type { Facet as FacetType, FacetValue, Product } from '@/lib/gql/types'

interface SortingValues {
  value: string
  id: string
  selected: boolean
}

interface ProductListingTemplateProps {
  breadCrumbsList: BreadCrumbType[]
  facetList?: FacetType[]
  products?: Product[]
  sortingValues?: SortingValues[]
  categoryFacet: CategoryFacetData
  totalResults: number
  initialProductsToShow?: number
  isLoading?: boolean
  appliedFilters?: FacetValue[]
  onSortingSelection: (value: string) => void
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
    flexWwrap: 'wrap',
    postion: 'relative',
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
    color: 'grey.900',
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
    color: 'grey.900',
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
    marginLeft: { md: 0, xs: '1rem' },
    color: 'text.primary',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  totalResults: {
    marginTop: '1.5rem',
    marginRight: '1rem',
    typography: 'body2',
    color: 'grey.600',
    whiteSpace: 'nowrap',
  },
}

// Component
const ProductListingTemplate = (props: ProductListingTemplateProps) => {
  const {
    breadCrumbsList,
    facetList,
    products = [],
    sortingValues,
    categoryFacet,
    totalResults,
    isLoading,
    appliedFilters,
    onSortingSelection,
    initialProductsToShow = 16,
  } = props
  const { getProductLink } = uiHelpers()
  const { changeFilters } = useUpdateRoutes()
  const isShowMoreVisible = products?.length > initialProductsToShow
  const [showFilterBy, setFilterBy] = useState<boolean>(false)
  const [isShowMoreButtonVisible, setShowMoreButtonVisible] = useState<boolean>(isShowMoreVisible)
  const [productToShows, setProductsToShow] = useState<Product[]>([]) // Setting the initial product count to 16 for skeleton loading

  const { t } = useTranslation(['product', 'common'])

  const handleFilterBy = () => setFilterBy(!showFilterBy)
  const showMoreProducts = () => setShowMoreButtonVisible(!isShowMoreButtonVisible)

  const handleClearAllFilters = () => {
    changeFilters('')
  }

  useEffect(() => {
    const noOfItemsToShow = isShowMoreButtonVisible ? initialProductsToShow : products?.length
    if (products?.length) {
      const sliced = products.slice(0, noOfItemsToShow)
      setProductsToShow([...sliced])
    }
  }, [initialProductsToShow, isShowMoreButtonVisible, products])

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
              {!isLoading ? (
                <Typography variant="h1" sx={{ ...styles.categoryFacetHeader }}>
                  {categoryFacet.header}
                </Typography>
              ) : (
                <Skeleton variant="rectangular" sx={{ ...styles.categoryFacetHeaderLoading }} />
              )}
              <Box sx={{ ...styles.navBarSort }}>
                {!isLoading ? (
                  <Box sx={{ ...styles.navBarLabel }}>{t('common:sort-by')}</Box>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    height={18}
                    width={54}
                    sx={{ ...styles.navBarLabel }}
                  />
                )}
                <Box sx={{ ...styles.sorting }}>
                  {!isLoading ? (
                    <KiboSelect
                      sx={{ typography: 'body2' }}
                      placeholder={t('best-match')}
                      onChange={onSortingSelection}
                    >
                      {sortingValues?.map((sortingVal) => (
                        <MenuItem
                          sx={{ typography: 'body2' }}
                          key={sortingVal?.id}
                          value={sortingVal?.value}
                        >
                          {sortingVal?.value}
                        </MenuItem>
                      ))}
                    </KiboSelect>
                  ) : (
                    <Skeleton variant="rectangular" height={36} />
                  )}
                </Box>
                <Box sx={{ ...styles.filterBy }}>
                  {!isLoading ? (
                    <Button
                      variant="outlined"
                      endIcon={<Add fontSize="small" />}
                      sx={{ ...styles.filterByButton }}
                      onClick={handleFilterBy}
                    >
                      {t('common:filter-by')}
                    </Button>
                  ) : (
                    <Skeleton variant="rectangular" height={36} />
                  )}
                </Box>
              </Box>

              {!isLoading ? (
                <Box sx={{ ...styles.navBarView }}>
                  <Typography variant="body1" color="text.primary" sx={{ marginRight: '1rem' }}>
                    {t('view')}
                  </Typography>
                  <Apps sx={{ fontSize: '2rem', marginRight: '1rem' }} />
                  <List sx={{ fontSize: '2.4rem' }} />
                </Box>
              ) : (
                <Box sx={{ ...styles.navBarView }}>
                  <Skeleton sx={{ marginRight: '1rem' }} height={24} width={34} />
                  <Skeleton sx={{ marginRight: '1rem' }} height={40} width={32} />
                  <Skeleton height={40} width={32} />
                </Box>
              )}
            </Box>
          </Box>
          <FullWidthDivider />
          <Box sx={{ ...styles.mainSection }}>
            <Box sx={{ ...styles.sideBar }}>
              {(categoryFacet.header || categoryFacet?.childrenCategories?.length) && (
                <CategoryFacet categoryFacet={categoryFacet} breadcrumbs={breadCrumbsList} />
              )}
              <FacetList
                facetList={facetList}
                onFilterByClose={handleFilterBy}
                appliedFilters={appliedFilters}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              {!isLoading && appliedFilters && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex' }}>
                    <FilterTiles appliedFilters={appliedFilters}>
                      {appliedFilters.length > 0 && (
                        <Link sx={{ ...styles.clearAllButton }} onClick={handleClearAllFilters}>
                          {t('common:clear-all')}
                        </Link>
                      )}
                    </FilterTiles>
                  </Box>
                  <Box sx={{ ...styles.totalResults }}>{t('results', { totalResults })}</Box>
                </Box>
              )}
              {!isLoading ? (
                <Grid container sx={{ flexWrap: 'wrap' }}>
                  {productToShows.map((product) => {
                    return (
                      <Grid
                        key={productGetters.getProductId(product)}
                        item
                        lg={3}
                        md={4}
                        sm={4}
                        xs={6}
                      >
                        <ProductCard
                          imageUrl={productGetters.handleProtocolRelativeUrl(
                            productGetters.getCoverImage(product)
                          )}
                          link={getProductLink(product?.productCode as string)}
                          price={t<string>('common:currency', {
                            val: productGetters.getPrice(product).regular,
                          })}
                          {...(productGetters.getPrice(product).special && {
                            salePrice: t<string>('common:currency', {
                              val: productGetters.getPrice(product).special,
                            }),
                          })}
                          title={productGetters.getName(product) || ''}
                          rating={productGetters.getRating(product)}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              ) : (
                <Grid container sx={{ flexWrap: 'wrap' }}>
                  {Array.from(Array(16)).map((_, ind) => {
                    return (
                      <Grid key={ind} item lg={3} md={4} sm={4} xs={6}>
                        <ProductCard isLoading={isLoading} link="/" />
                      </Grid>
                    )
                  })}
                </Grid>
              )}

              {!isLoading && isShowMoreButtonVisible && (
                <Box>
                  <Box sx={{ ...styles.productResults, color: 'grey.600', typography: 'body2' }}>
                    {t('products-to-show', {
                      m: `${initialProductsToShow}`,
                      n: `${products?.length}`,
                    })}
                  </Box>
                  <Box sx={{ ...styles.productResults }}>
                    <Button
                      sx={{ ...styles.showMoreButton }}
                      variant="contained"
                      onClick={() => showMoreProducts()}
                      color="inherit"
                    >
                      {t('show-more')}
                    </Button>
                  </Box>
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
            header={categoryFacet.header}
            totalResults={totalResults}
            isLoading={isLoading}
            appliedFilters={appliedFilters}
            onClearAllFilters={handleClearAllFilters}
            onFilterByClose={handleFilterBy}
          />
        </Box>
      )}
    </>
  )
}

export default ProductListingTemplate
