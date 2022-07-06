import { Facet, Maybe, PrCategory, Product, Scalars } from '../gql/types'

export type FacetResultsData = {
  items?: Maybe<Array<Maybe<Product>>>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  facets?: Maybe<Array<Maybe<Facet>>>
  totalCount?: Scalars['Int']
  itemsPerPage?: Scalars['Int']
  startIndex?: Scalars['Int']
  pageCount?: Scalars['Int']
  pageSize?: Scalars['Int']
  input?: {
    sort?: Maybe<Scalars['String']>
  }
}
