export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  AnyScalar: any
  DateTime: any
  Object: any
}

export type AccountPasswordInfoCollectionInput = {
  items?: InputMaybe<Array<InputMaybe<AccountPasswordInfoInput>>>
  totalCount: Scalars['Int']
}

export type AccountPasswordInfoInput = {
  accountId: Scalars['Int']
  passwordInfo?: InputMaybe<PasswordInfoInput>
  unlockAccount?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export type AccountSalesRep = {
  __typename?: 'AccountSalesRep'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AccountSalesRep>
  accountId: Scalars['Int']
  adminUserId?: Maybe<Scalars['String']>
}

export type AccountSalesRep_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AccountSalesRepInput = {
  accountId: Scalars['Int']
  adminUserId?: InputMaybe<Scalars['String']>
}

export type ActiveDateRange = {
  __typename?: 'ActiveDateRange'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ActiveDateRange>
  endDate?: Maybe<Scalars['DateTime']>
  startDate?: Maybe<Scalars['DateTime']>
}

export type ActiveDateRange_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ActiveDateRangeInput = {
  endDate?: InputMaybe<Scalars['DateTime']>
  startDate?: InputMaybe<Scalars['DateTime']>
}

export enum AddressTypeEnum {
  Commercial = 'COMMERCIAL',
  Residential = 'RESIDENTIAL',
}

export type AddressValidationRequestInput = {
  address?: InputMaybe<CuAddressInput>
}

export type AddressValidationResponse = {
  __typename?: 'AddressValidationResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AddressValidationResponse>
  addressCandidates?: Maybe<Array<Maybe<CuAddress>>>
}

export type AddressValidationResponse_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AttributeDetail = {
  __typename?: 'AttributeDetail'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AttributeDetail>
  allowFilteringAndSortingInStorefront?: Maybe<Scalars['Boolean']>
  customWeightInStorefrontSearch?: Maybe<Scalars['Boolean']>
  dataType?: Maybe<Scalars['String']>
  dataTypeSequence: Scalars['Int']
  description?: Maybe<Scalars['String']>
  displayIntention?: Maybe<Scalars['String']>
  indexValueWithCase?: Maybe<Scalars['Boolean']>
  inputType?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  searchDisplayValue?: Maybe<Scalars['Boolean']>
  searchableInStorefront?: Maybe<Scalars['Boolean']>
  usageType?: Maybe<Scalars['String']>
  validation?: Maybe<PrAttributeValidation>
  valueType?: Maybe<Scalars['String']>
}

export type AttributeDetail_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AttributeVocabularyValueDisplayInfo = {
  __typename?: 'AttributeVocabularyValueDisplayInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AttributeVocabularyValueDisplayInfo>
  cmsId?: Maybe<Scalars['String']>
  colorValue?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
}

export type AttributeVocabularyValueDisplayInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AuditRecord = {
  __typename?: 'AuditRecord'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AuditRecord>
  auditInfo?: Maybe<CrAuditInfo>
  changes?: Maybe<Array<Maybe<AuditRecordChange>>>
  id?: Maybe<Scalars['String']>
}

export type AuditRecord_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AuditRecordChange = {
  __typename?: 'AuditRecordChange'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AuditRecordChange>
  fields?: Maybe<Array<Maybe<AuditRecordChangeField>>>
  path?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type AuditRecordChange_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AuditRecordChangeField = {
  __typename?: 'AuditRecordChangeField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AuditRecordChangeField>
  name?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
}

export type AuditRecordChangeField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type AuditRecordChangeFieldInput = {
  name?: InputMaybe<Scalars['String']>
  newValue?: InputMaybe<Scalars['String']>
  oldValue?: InputMaybe<Scalars['String']>
}

export type AuditRecordChangeInput = {
  fields?: InputMaybe<Array<InputMaybe<AuditRecordChangeFieldInput>>>
  path?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type AuditRecordInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  changes?: InputMaybe<Array<InputMaybe<AuditRecordChangeInput>>>
  id?: InputMaybe<Scalars['String']>
}

export type B2BAccount = {
  __typename?: 'B2BAccount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BAccount>
  accountType?: Maybe<Scalars['String']>
  approvalStatus?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<Maybe<CustomerAttribute>>>
  auditInfo?: Maybe<CuAuditInfo>
  commerceSummary?: Maybe<CommerceSummary>
  companyOrOrganization?: Maybe<Scalars['String']>
  contacts?: Maybe<Array<Maybe<CustomerContact>>>
  customerSet?: Maybe<Scalars['String']>
  customerSinceDate?: Maybe<Scalars['DateTime']>
  externalId?: Maybe<Scalars['String']>
  id: Scalars['Int']
  isActive?: Maybe<Scalars['Boolean']>
  notes?: Maybe<Array<Maybe<CustomerNote>>>
  parentAccountId?: Maybe<Scalars['Int']>
  priceList?: Maybe<Scalars['String']>
  rootAccountId?: Maybe<Scalars['Int']>
  salesReps?: Maybe<Array<Maybe<AccountSalesRep>>>
  segments?: Maybe<Array<Maybe<CustomerSegment>>>
  taxExempt?: Maybe<Scalars['Boolean']>
  taxId?: Maybe<Scalars['String']>
  users?: Maybe<Array<Maybe<B2BUser>>>
}

export type B2BAccount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type B2BAccountCollection = {
  __typename?: 'B2BAccountCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BAccountCollection>
  items?: Maybe<Array<Maybe<B2BAccount>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type B2BAccountCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type B2BAccountInput = {
  accountType?: InputMaybe<Scalars['String']>
  approvalStatus?: InputMaybe<Scalars['String']>
  attributes?: InputMaybe<Array<InputMaybe<CustomerAttributeInput>>>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  commerceSummary?: InputMaybe<CommerceSummaryInput>
  companyOrOrganization?: InputMaybe<Scalars['String']>
  contacts?: InputMaybe<Array<InputMaybe<CustomerContactInput>>>
  customerSet?: InputMaybe<Scalars['String']>
  customerSinceDate?: InputMaybe<Scalars['DateTime']>
  externalId?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  isActive?: InputMaybe<Scalars['Boolean']>
  notes?: InputMaybe<Array<InputMaybe<CustomerNoteInput>>>
  parentAccountId?: InputMaybe<Scalars['Int']>
  priceList?: InputMaybe<Scalars['String']>
  rootAccountId?: InputMaybe<Scalars['Int']>
  salesReps?: InputMaybe<Array<InputMaybe<AccountSalesRepInput>>>
  segments?: InputMaybe<Array<InputMaybe<CustomerSegmentInput>>>
  taxExempt?: InputMaybe<Scalars['Boolean']>
  taxId?: InputMaybe<Scalars['String']>
  users?: InputMaybe<Array<InputMaybe<B2BUserInput>>>
}

export type B2BUser = {
  __typename?: 'B2BUser'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BUser>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  emailAddress?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  hasExternalPassword?: Maybe<Scalars['Boolean']>
  isActive?: Maybe<Scalars['Boolean']>
  isLocked?: Maybe<Scalars['Boolean']>
  isRemoved?: Maybe<Scalars['Boolean']>
  lastName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<UserRole>>>
  userId?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
}

export type B2BUser_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type B2BUserAndAuthInfoInput = {
  b2BUser?: InputMaybe<B2BUserInput>
  externalPassword?: InputMaybe<Scalars['String']>
  isImport?: InputMaybe<Scalars['Boolean']>
}

export type B2BUserCollection = {
  __typename?: 'B2BUserCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BUserCollection>
  items?: Maybe<Array<Maybe<B2BUser>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type B2BUserCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type B2BUserInput = {
  acceptsMarketing?: InputMaybe<Scalars['Boolean']>
  emailAddress?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  hasExternalPassword?: InputMaybe<Scalars['Boolean']>
  isActive?: InputMaybe<Scalars['Boolean']>
  isLocked?: InputMaybe<Scalars['Boolean']>
  isRemoved?: InputMaybe<Scalars['Boolean']>
  lastName?: InputMaybe<Scalars['String']>
  localeCode?: InputMaybe<Scalars['String']>
  roles?: InputMaybe<Array<InputMaybe<UserRoleInput>>>
  userId?: InputMaybe<Scalars['String']>
  userName?: InputMaybe<Scalars['String']>
}

export type BoxType = {
  __typename?: 'BoxType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BoxType>
  height?: Maybe<Scalars['Float']>
  length?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Float']>
}

export type BoxType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type BpmConfiguration = {
  __typename?: 'BpmConfiguration'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BpmConfiguration>
  shipmentType?: Maybe<Scalars['String']>
  workflowContainerId?: Maybe<Scalars['String']>
  workflowProcessId?: Maybe<Scalars['String']>
}

export type BpmConfiguration_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type BundledProductSummary = {
  __typename?: 'BundledProductSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BundledProductSummary>
  creditValue?: Maybe<Scalars['Float']>
  goodsType?: Maybe<Scalars['String']>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<PrPackageMeasurements>
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  productCode?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  productShortDescription?: Maybe<Scalars['String']>
  productType?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type BundledProductSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CancelReasonCollection = {
  __typename?: 'CancelReasonCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CancelReasonCollection>
  items?: Maybe<Array<Maybe<CancelReasonItem>>>
  totalCount: Scalars['Int']
}

export type CancelReasonCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CancelReasonItem = {
  __typename?: 'CancelReasonItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CancelReasonItem>
  name?: Maybe<Scalars['String']>
  needsMoreInfo?: Maybe<Scalars['Boolean']>
  reasonCode?: Maybe<Scalars['String']>
}

export type CancelReasonItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CandidateCorrection = {
  __typename?: 'CandidateCorrection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CandidateCorrection>
  query?: Maybe<Scalars['String']>
}

export type CandidateCorrection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Card = {
  __typename?: 'Card'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Card>
  cardNumberPart?: Maybe<Scalars['String']>
  cardType?: Maybe<Scalars['String']>
  contactId: Scalars['Int']
  expireMonth?: Maybe<Scalars['Int']>
  expireYear?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  isDefaultPayMethod?: Maybe<Scalars['Boolean']>
  nameOnCard?: Maybe<Scalars['String']>
}

export type Card_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CardCollection = {
  __typename?: 'CardCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CardCollection>
  items?: Maybe<Array<Maybe<Card>>>
  totalCount: Scalars['Int']
}

export type CardCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CardInput = {
  cardNumberPart?: InputMaybe<Scalars['String']>
  cardType?: InputMaybe<Scalars['String']>
  contactId: Scalars['Int']
  expireMonth?: InputMaybe<Scalars['Int']>
  expireYear?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['String']>
  isDefaultPayMethod?: InputMaybe<Scalars['Boolean']>
  nameOnCard?: InputMaybe<Scalars['String']>
}

export type Carrier = {
  __typename?: 'Carrier'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Carrier>
  carrierType?: Maybe<Scalars['String']>
  isEnabled?: Maybe<Scalars['Boolean']>
  shippingMethodMappings?: Maybe<ShippingMethodMappings>
}

export type Carrier_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CarrierRatesResponse = {
  __typename?: 'CarrierRatesResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CarrierRatesResponse>
  carrierId?: Maybe<Scalars['String']>
  customAttributes?: Maybe<Array<Maybe<CustomAttribute>>>
  shippingRates?: Maybe<Array<Maybe<SrShippingRate>>>
}

export type CarrierRatesResponse_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CarrierServiceGenerateLabelResponse = {
  __typename?: 'CarrierServiceGenerateLabelResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CarrierServiceGenerateLabelResponse>
  imageURL?: Maybe<Scalars['String']>
  integratorId?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Float']>
  trackingNumber?: Maybe<Scalars['String']>
}

export type CarrierServiceGenerateLabelResponse_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Cart_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CartChangeMessageCollection = {
  __typename?: 'CartChangeMessageCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartChangeMessageCollection>
  items?: Maybe<Array<Maybe<CrChangeMessage>>>
  totalCount: Scalars['Int']
}

export type CartChangeMessageCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CartItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CartItemCollection = {
  __typename?: 'CartItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartItemCollection>
  items?: Maybe<Array<Maybe<CrCartItem>>>
  totalCount: Scalars['Int']
}

export type CartItemCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CartMessage = {
  __typename?: 'CartMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartMessage>
  message?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  productsRemoved?: Maybe<Array<Maybe<CrProduct>>>
}

export type CartMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CartMessageInput = {
  message?: InputMaybe<Scalars['String']>
  messageType?: InputMaybe<Scalars['String']>
  productsRemoved?: InputMaybe<Array<InputMaybe<CrProductInput>>>
}

export type CartSummary = {
  __typename?: 'CartSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartSummary>
  hasActiveCart?: Maybe<Scalars['Boolean']>
  isExpired?: Maybe<Scalars['Boolean']>
  itemCount?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Float']>
  totalQuantity?: Maybe<Scalars['Int']>
}

export type CartSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CategoryAttribute = {
  __typename?: 'CategoryAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryAttribute>
  dataType: Scalars['Int']
  fullyQualifiedName?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type CategoryAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CategoryCollection = {
  __typename?: 'CategoryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryCollection>
  items?: Maybe<Array<Maybe<PrCategory>>>
  totalCount: Scalars['Int']
}

export type CategoryCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CategoryContent = {
  __typename?: 'CategoryContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryContent>
  categoryImages?: Maybe<Array<Maybe<CategoryImage>>>
  description?: Maybe<Scalars['String']>
  metaTagDescription?: Maybe<Scalars['String']>
  metaTagKeywords?: Maybe<Scalars['String']>
  metaTagTitle?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  pageTitle?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

export type CategoryContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CategoryImage = {
  __typename?: 'CategoryImage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryImage>
  altText?: Maybe<Scalars['String']>
  cmsId?: Maybe<Scalars['String']>
  imageLabel?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  mediaType?: Maybe<Scalars['String']>
  sequence?: Maybe<Scalars['Int']>
  videoUrl?: Maybe<Scalars['String']>
}

export type CategoryImage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CategoryPagedCollection = {
  __typename?: 'CategoryPagedCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryPagedCollection>
  items?: Maybe<Array<Maybe<PrCategory>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CategoryPagedCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ChangePasswordResult = {
  __typename?: 'ChangePasswordResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChangePasswordResult>
  accountId: Scalars['Int']
  errorMessage?: Maybe<Scalars['String']>
  succeeded?: Maybe<Scalars['Boolean']>
}

export type ChangePasswordResult_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ChangePasswordResultCollection = {
  __typename?: 'ChangePasswordResultCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChangePasswordResultCollection>
  items?: Maybe<Array<Maybe<ChangePasswordResult>>>
  totalCount: Scalars['Int']
}

export type ChangePasswordResultCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Channel = {
  __typename?: 'Channel'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Channel>
  auditInfo?: Maybe<CrAuditInfo>
  code?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  groupCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  siteIds?: Maybe<Array<Scalars['Int']>>
  tenantId: Scalars['Int']
}

export type Channel_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ChannelCollection = {
  __typename?: 'ChannelCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChannelCollection>
  items?: Maybe<Array<Maybe<Channel>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type ChannelCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ChannelGroup = {
  __typename?: 'ChannelGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChannelGroup>
  auditInfo?: Maybe<CrAuditInfo>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  tenantId: Scalars['Int']
}

export type ChannelGroup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ChannelGroupCollection = {
  __typename?: 'ChannelGroupCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChannelGroupCollection>
  items?: Maybe<Array<Maybe<ChannelGroup>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type ChannelGroupCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ChannelGroupInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  tenantId: Scalars['Int']
}

export type ChannelInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  countryCode?: InputMaybe<Scalars['String']>
  groupCode?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  region?: InputMaybe<Scalars['String']>
  siteIds?: InputMaybe<Array<Scalars['Int']>>
  tenantId: Scalars['Int']
}

export type Checkout = {
  __typename?: 'Checkout'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Checkout>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  alternateContact?: Maybe<CrAlternateContact>
  amountRemainingForPayment: Scalars['Float']
  attributes?: Maybe<Array<Maybe<CrOrderAttribute>>>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  channelCode?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  destinations?: Maybe<Array<Maybe<CrDestination>>>
  discountThresholdMessages?: Maybe<Array<Maybe<CrThresholdMessage>>>
  dutyTotal?: Maybe<Scalars['Float']>
  email?: Maybe<Scalars['String']>
  feeTotal: Scalars['Float']
  groupings?: Maybe<Array<Maybe<CheckoutGrouping>>>
  handlingSubTotal: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: Maybe<Scalars['String']>
  invalidCoupons?: Maybe<Array<Maybe<CrInvalidCoupon>>>
  ipAddress?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  locationCode?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['Int']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  originalCartId?: Maybe<Scalars['String']>
  payments?: Maybe<Array<Maybe<CrPayment>>>
  priceListCode?: Maybe<Scalars['String']>
  shippingSubTotal: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  shopperNotes?: Maybe<CrShopperNotes>
  siteId: Scalars['Int']
  sourceDevice?: Maybe<Scalars['String']>
  subTotal: Scalars['Float']
  submittedDate?: Maybe<Scalars['DateTime']>
  suggestedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  taxData?: Maybe<Scalars['Object']>
  tenantId: Scalars['Int']
  total: Scalars['Float']
  type?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type Checkout_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CheckoutActionInput = {
  actionName?: InputMaybe<Scalars['String']>
}

export type CheckoutCollection = {
  __typename?: 'CheckoutCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckoutCollection>
  items?: Maybe<Array<Maybe<Checkout>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CheckoutCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CheckoutGroupRates = {
  __typename?: 'CheckoutGroupRates'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckoutGroupRates>
  groupingId?: Maybe<Scalars['String']>
  shippingRates?: Maybe<Array<Maybe<CrShippingRate>>>
}

export type CheckoutGroupRates_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CheckoutGroupShippingMethodInput = {
  groupingId?: InputMaybe<Scalars['String']>
  shippingRate?: InputMaybe<CrShippingRateInput>
}

export type CheckoutGrouping = {
  __typename?: 'CheckoutGrouping'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckoutGrouping>
  destinationId?: Maybe<Scalars['String']>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  fulfillmentMethod?: Maybe<Scalars['String']>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingSubTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: Maybe<Scalars['String']>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderItemIds?: Maybe<Array<Scalars['String']>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingAmount?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<CrShippingDiscount>>>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingSubTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  standaloneGroup?: Maybe<Scalars['Boolean']>
  taxData?: Maybe<Scalars['Object']>
}

export type CheckoutGrouping_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CheckoutGroupingInput = {
  destinationId?: InputMaybe<Scalars['String']>
  dutyAmount?: InputMaybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  fulfillmentMethod?: InputMaybe<Scalars['String']>
  handlingAmount?: InputMaybe<Scalars['Float']>
  handlingDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  handlingSubTotal: Scalars['Float']
  handlingTax?: InputMaybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: InputMaybe<Scalars['String']>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderItemIds?: InputMaybe<Array<Scalars['String']>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingAmount?: InputMaybe<Scalars['Float']>
  shippingDiscounts?: InputMaybe<Array<InputMaybe<CrShippingDiscountInput>>>
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
  shippingSubTotal: Scalars['Float']
  shippingTax?: InputMaybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  standaloneGroup?: InputMaybe<Scalars['Boolean']>
  taxData?: InputMaybe<Scalars['Object']>
}

export type CheckoutInput = {
  acceptsMarketing?: InputMaybe<Scalars['Boolean']>
  alternateContact?: InputMaybe<CrAlternateContactInput>
  amountRemainingForPayment: Scalars['Float']
  attributes?: InputMaybe<Array<InputMaybe<CrOrderAttributeInput>>>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  channelCode?: InputMaybe<Scalars['String']>
  couponCodes?: InputMaybe<Array<Scalars['String']>>
  currencyCode?: InputMaybe<Scalars['String']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  customerTaxId?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  destinations?: InputMaybe<Array<InputMaybe<CrDestinationInput>>>
  discountThresholdMessages?: InputMaybe<Array<InputMaybe<CrThresholdMessageInput>>>
  dutyTotal?: InputMaybe<Scalars['Float']>
  email?: InputMaybe<Scalars['String']>
  feeTotal: Scalars['Float']
  groupings?: InputMaybe<Array<InputMaybe<CheckoutGroupingInput>>>
  handlingSubTotal: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: InputMaybe<Scalars['String']>
  invalidCoupons?: InputMaybe<Array<InputMaybe<CrInvalidCouponInput>>>
  ipAddress?: InputMaybe<Scalars['String']>
  isTaxExempt?: InputMaybe<Scalars['Boolean']>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  items?: InputMaybe<Array<InputMaybe<CrOrderItemInput>>>
  locationCode?: InputMaybe<Scalars['String']>
  number?: InputMaybe<Scalars['Int']>
  orderDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  originalCartId?: InputMaybe<Scalars['String']>
  payments?: InputMaybe<Array<InputMaybe<CrPaymentInput>>>
  priceListCode?: InputMaybe<Scalars['String']>
  shippingSubTotal: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  shopperNotes?: InputMaybe<CrShopperNotesInput>
  siteId: Scalars['Int']
  sourceDevice?: InputMaybe<Scalars['String']>
  subTotal: Scalars['Float']
  submittedDate?: InputMaybe<Scalars['DateTime']>
  suggestedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  taxData?: InputMaybe<Scalars['Object']>
  tenantId: Scalars['Int']
  total: Scalars['Float']
  type?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
}

export type CoHttpContentInput = {
  headers?: InputMaybe<Array<InputMaybe<KeyValuePair2Input>>>
}

export type CoHttpMethodInput = {
  method?: InputMaybe<Scalars['String']>
}

export type CoHttpRequestMessageInput = {
  content?: InputMaybe<CoHttpContentInput>
  headers?: InputMaybe<Array<InputMaybe<KeyValuePair2Input>>>
  method?: InputMaybe<CoHttpMethodInput>
  options?: InputMaybe<Scalars['Object']>
  properties?: InputMaybe<Scalars['Object']>
  requestUri?: InputMaybe<Scalars['DateTime']>
  version?: InputMaybe<Scalars['String']>
  versionPolicy?: InputMaybe<HttpVersionPolicyEnum>
}

export type CommerceSummary = {
  __typename?: 'CommerceSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CommerceSummary>
  lastOrderDate?: Maybe<Scalars['DateTime']>
  orderCount: Scalars['Int']
  totalOrderAmount?: Maybe<CurrencyAmount>
  visitsCount: Scalars['Int']
  wishlistCount: Scalars['Int']
}

export type CommerceSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CommerceSummaryInput = {
  lastOrderDate?: InputMaybe<Scalars['DateTime']>
  orderCount: Scalars['Int']
  totalOrderAmount?: InputMaybe<CurrencyAmountInput>
  visitsCount: Scalars['Int']
  wishlistCount: Scalars['Int']
}

export type ConfiguredProduct = {
  __typename?: 'ConfiguredProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ConfiguredProduct>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<ProductOption>>>
  price?: Maybe<ProductPrice>
  priceListEntryTypeProperty?: Maybe<ProductProperty>
  priceRange?: Maybe<ProductPriceRange>
  productCode?: Maybe<Scalars['String']>
  productImages?: Maybe<Array<Maybe<ProductImage>>>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars['String']>
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
}

export type ConfiguredProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ConfirmationInfoInput = {
  confirmationCode?: InputMaybe<Scalars['String']>
  newPassword?: InputMaybe<Scalars['String']>
  userName?: InputMaybe<Scalars['String']>
}

export type ContactType = {
  __typename?: 'ContactType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ContactType>
  isPrimary?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
}

export type ContactType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ContactTypeInput = {
  isPrimary?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

export type Coordinates = {
  __typename?: 'Coordinates'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Coordinates>
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type Coordinates_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CoordinatesInput = {
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type CrAddress = {
  __typename?: 'CrAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
  postalOrZipCode?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
}

export type CrAddress_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAddressInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  address3?: InputMaybe<Scalars['String']>
  address4?: InputMaybe<Scalars['String']>
  addressType?: InputMaybe<Scalars['String']>
  cityOrTown?: InputMaybe<Scalars['String']>
  countryCode?: InputMaybe<Scalars['String']>
  isValidated?: InputMaybe<Scalars['Boolean']>
  postalOrZipCode?: InputMaybe<Scalars['String']>
  stateOrProvince?: InputMaybe<Scalars['String']>
}

export type CrAdjustment = {
  __typename?: 'CrAdjustment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAdjustment>
  amount?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  internalComment?: Maybe<Scalars['String']>
}

export type CrAdjustment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAdjustmentInput = {
  amount?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  internalComment?: InputMaybe<Scalars['String']>
}

export type CrAlternateContact = {
  __typename?: 'CrAlternateContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAlternateContact>
  emailAddress?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type CrAlternateContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAlternateContactInput = {
  emailAddress?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastNameOrSurname?: InputMaybe<Scalars['String']>
  phoneNumber?: InputMaybe<Scalars['String']>
}

export type CrAppeasementReasonInput = {
  description?: InputMaybe<Scalars['String']>
  moreInfo?: InputMaybe<Scalars['String']>
  reasonCode?: InputMaybe<Scalars['String']>
}

export type CrAppliedDiscount = {
  __typename?: 'CrAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAppliedDiscount>
  couponCode?: Maybe<Scalars['String']>
  discount?: Maybe<CrDiscount>
  excluded?: Maybe<Scalars['Boolean']>
  impact?: Maybe<Scalars['Float']>
}

export type CrAppliedDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAppliedDiscountInput = {
  couponCode?: InputMaybe<Scalars['String']>
  discount?: InputMaybe<CrDiscountInput>
  excluded?: InputMaybe<Scalars['Boolean']>
  impact?: InputMaybe<Scalars['Float']>
}

export type CrAppliedLineItemProductDiscount = {
  __typename?: 'CrAppliedLineItemProductDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars['Boolean']>
  couponCode?: Maybe<Scalars['String']>
  discount?: Maybe<CrDiscount>
  discountQuantity: Scalars['Int']
  excluded?: Maybe<Scalars['Boolean']>
  impact?: Maybe<Scalars['Float']>
  impactPerUnit?: Maybe<Scalars['Float']>
  productQuantity?: Maybe<Scalars['Int']>
}

export type CrAppliedLineItemProductDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAppliedLineItemProductDiscountInput = {
  appliesToSalePrice?: InputMaybe<Scalars['Boolean']>
  couponCode?: InputMaybe<Scalars['String']>
  discount?: InputMaybe<CrDiscountInput>
  discountQuantity: Scalars['Int']
  excluded?: InputMaybe<Scalars['Boolean']>
  impact?: InputMaybe<Scalars['Float']>
  impactPerUnit?: InputMaybe<Scalars['Float']>
  productQuantity?: InputMaybe<Scalars['Int']>
}

export type CrAppliedLineItemShippingDiscount = {
  __typename?: 'CrAppliedLineItemShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAppliedLineItemShippingDiscount>
  discount?: Maybe<CrAppliedDiscount>
  discountQuantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
  methodCode?: Maybe<Scalars['String']>
}

export type CrAppliedLineItemShippingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAppliedLineItemShippingDiscountInput = {
  discount?: InputMaybe<CrAppliedDiscountInput>
  discountQuantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
  methodCode?: InputMaybe<Scalars['String']>
}

export type CrAuditInfo = {
  __typename?: 'CrAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAuditInfo>
  createBy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  updateDate?: Maybe<Scalars['DateTime']>
}

export type CrAuditInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrAuditInfoInput = {
  createBy?: InputMaybe<Scalars['String']>
  createDate?: InputMaybe<Scalars['DateTime']>
  updateBy?: InputMaybe<Scalars['String']>
  updateDate?: InputMaybe<Scalars['DateTime']>
}

export type CrBillingInfo = {
  __typename?: 'CrBillingInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrBillingInfo>
  auditInfo?: Maybe<CrAuditInfo>
  billingContact?: Maybe<CrContact>
  card?: Maybe<CrPaymentCard>
  check?: Maybe<CrCheckPayment>
  customCreditType?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  externalTransactionId?: Maybe<Scalars['String']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isSameBillingShippingAddress?: Maybe<Scalars['Boolean']>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  purchaseOrder?: Maybe<CrPurchaseOrderPayment>
  recurringTransactionId?: Maybe<Scalars['String']>
  storeCreditCode?: Maybe<Scalars['String']>
  storeCreditType?: Maybe<Scalars['String']>
  token?: Maybe<CrPaymentToken>
}

export type CrBillingInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrBillingInfoInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  billingContact?: InputMaybe<CrContactInput>
  card?: InputMaybe<CrPaymentCardInput>
  check?: InputMaybe<CrCheckPaymentInput>
  customCreditType?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  externalTransactionId?: InputMaybe<Scalars['String']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isSameBillingShippingAddress?: InputMaybe<Scalars['Boolean']>
  paymentType?: InputMaybe<Scalars['String']>
  paymentWorkflow?: InputMaybe<Scalars['String']>
  purchaseOrder?: InputMaybe<CrPurchaseOrderPaymentInput>
  recurringTransactionId?: InputMaybe<Scalars['String']>
  storeCreditCode?: InputMaybe<Scalars['String']>
  storeCreditType?: InputMaybe<Scalars['String']>
  token?: InputMaybe<CrPaymentTokenInput>
}

export type CrBundledProduct = {
  __typename?: 'CrBundledProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrBundledProduct>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  allocationId?: Maybe<Scalars['Int']>
  creditValue?: Maybe<Scalars['Float']>
  deltaPrice?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<CrPackageMeasurements>
  name?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  productCode?: Maybe<Scalars['String']>
  productReservationId?: Maybe<Scalars['Int']>
  quantity: Scalars['Int']
  stock?: Maybe<CrProductStock>
}

export type CrBundledProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrBundledProductInput = {
  allocationExpiration?: InputMaybe<Scalars['DateTime']>
  allocationId?: InputMaybe<Scalars['Int']>
  creditValue?: InputMaybe<Scalars['Float']>
  deltaPrice?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  fulfillmentStatus?: InputMaybe<Scalars['String']>
  goodsType?: InputMaybe<Scalars['String']>
  imageUrl?: InputMaybe<Scalars['String']>
  isPackagedStandAlone?: InputMaybe<Scalars['Boolean']>
  measurements?: InputMaybe<CrPackageMeasurementsInput>
  name?: InputMaybe<Scalars['String']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  optionValue?: InputMaybe<Scalars['Object']>
  productCode?: InputMaybe<Scalars['String']>
  productReservationId?: InputMaybe<Scalars['Int']>
  quantity: Scalars['Int']
  stock?: InputMaybe<CrProductStockInput>
}

export type CrCanceledItem = {
  __typename?: 'CrCanceledItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCanceledItem>
  actualPrice: Scalars['Float']
  auditInfo?: Maybe<CrAuditInfo>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  canceledReason?: Maybe<CrCanceledReason>
  cartItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  duty: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<CrFulfillmentField>>>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  giftCards?: Maybe<Array<Maybe<CrGiftCard>>>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<CrInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment?: Maybe<Scalars['Float']>
  lineItemCost: Scalars['Float']
  locatorName?: Maybe<Scalars['String']>
  measurements?: Maybe<CrPackageMeasurements>
  name?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  originalOrderItemId?: Maybe<Scalars['String']>
  originalQuantity?: Maybe<Scalars['Int']>
  overridePrice?: Maybe<Scalars['Float']>
  parentId?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  partNumber?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku?: Maybe<Scalars['String']>
  taxData?: Maybe<Scalars['Object']>
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  unitPrice: Scalars['Float']
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type CrCanceledItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCanceledItemInput = {
  actualPrice: Scalars['Float']
  auditInfo?: InputMaybe<CrAuditInfoInput>
  backorderReleaseDate?: InputMaybe<Scalars['DateTime']>
  canceledReason?: InputMaybe<CrCanceledReasonInput>
  cartItemId?: InputMaybe<Scalars['String']>
  childItemIds?: InputMaybe<Array<Scalars['String']>>
  data?: InputMaybe<Scalars['Object']>
  duty: Scalars['Float']
  fulfillmentFields?: InputMaybe<Array<InputMaybe<CrFulfillmentFieldInput>>>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  giftCards?: InputMaybe<Array<InputMaybe<CrGiftCardInput>>>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<CrInventoryTagsInput>>>
  isAssemblyRequired?: InputMaybe<Scalars['Boolean']>
  isPackagedStandAlone?: InputMaybe<Scalars['Boolean']>
  isReservedInventory?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment?: InputMaybe<Scalars['Float']>
  lineItemCost: Scalars['Float']
  locatorName?: InputMaybe<Scalars['String']>
  measurements?: InputMaybe<CrPackageMeasurementsInput>
  name?: InputMaybe<Scalars['String']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<InputMaybe<CrProductOptionInput>>>
  originalOrderItemId?: InputMaybe<Scalars['String']>
  originalQuantity?: InputMaybe<Scalars['Int']>
  overridePrice?: InputMaybe<Scalars['Float']>
  parentId?: InputMaybe<Scalars['String']>
  parentItemId?: InputMaybe<Scalars['String']>
  partNumber?: InputMaybe<Scalars['String']>
  productCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  readyForPickupQuantity?: InputMaybe<Scalars['Int']>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku?: InputMaybe<Scalars['String']>
  taxData?: InputMaybe<Scalars['Object']>
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  unitPrice: Scalars['Float']
  upc?: InputMaybe<Scalars['String']>
  variationProductCode?: InputMaybe<Scalars['String']>
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type CrCanceledReason = {
  __typename?: 'CrCanceledReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCanceledReason>
  description?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
}

export type CrCanceledReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCanceledReasonInput = {
  description?: InputMaybe<Scalars['String']>
  moreInfo?: InputMaybe<Scalars['String']>
  reasonCode?: InputMaybe<Scalars['String']>
}

export type CrCapturableShipmentSummary = {
  __typename?: 'CrCapturableShipmentSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCapturableShipmentSummary>
  amountApplied: Scalars['Float']
  shipmentNumber: Scalars['Int']
  shipmentTotal: Scalars['Float']
}

export type CrCapturableShipmentSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCapturableShipmentSummaryInput = {
  amountApplied: Scalars['Float']
  shipmentNumber: Scalars['Int']
  shipmentTotal: Scalars['Float']
}

export type CrCart = {
  __typename?: 'CrCart'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCart>
  auditInfo?: Maybe<CrAuditInfo>
  cartMessage?: Maybe<CrCartMessage>
  cartMessages?: Maybe<Array<Maybe<CrCartMessage>>>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  channelCode?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  currencyCode?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  discountThresholdMessages?: Maybe<Array<Maybe<CrThresholdMessage>>>
  discountTotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  expirationDate?: Maybe<Scalars['DateTime']>
  extendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentInfo?: Maybe<CrFulfillmentInfo>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  invalidCoupons?: Maybe<Array<Maybe<CrInvalidCoupon>>>
  itemTaxTotal?: Maybe<Scalars['Float']>
  items?: Maybe<Array<Maybe<CrCartItem>>>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  priceListCode?: Maybe<Scalars['String']>
  rejectedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  reservationId?: Maybe<Scalars['String']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  siteId?: Maybe<Scalars['Int']>
  subtotal?: Maybe<Scalars['Float']>
  suggestedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  taxData?: Maybe<Scalars['Object']>
  taxTotal?: Maybe<Scalars['Float']>
  tenantId?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Float']>
  userId?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
}

export type CrCart_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCartInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  cartMessage?: InputMaybe<CrCartMessageInput>
  cartMessages?: InputMaybe<Array<InputMaybe<CrCartMessageInput>>>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  channelCode?: InputMaybe<Scalars['String']>
  couponCodes?: InputMaybe<Array<Scalars['String']>>
  currencyCode?: InputMaybe<Scalars['String']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  discountThresholdMessages?: InputMaybe<Array<InputMaybe<CrThresholdMessageInput>>>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedSubtotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  expirationDate?: InputMaybe<Scalars['DateTime']>
  extendedProperties?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
  feeTotal?: InputMaybe<Scalars['Float']>
  fulfillmentInfo?: InputMaybe<CrFulfillmentInfoInput>
  handlingAmount?: InputMaybe<Scalars['Float']>
  handlingSubTotal?: InputMaybe<Scalars['Float']>
  handlingTaxTotal?: InputMaybe<Scalars['Float']>
  handlingTotal?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  invalidCoupons?: InputMaybe<Array<InputMaybe<CrInvalidCouponInput>>>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  items?: InputMaybe<Array<InputMaybe<CrCartItemInput>>>
  lastValidationDate?: InputMaybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: InputMaybe<Scalars['Float']>
  orderDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  priceListCode?: InputMaybe<Scalars['String']>
  rejectedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  reservationId?: InputMaybe<Scalars['String']>
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingSubTotal?: InputMaybe<Scalars['Float']>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  siteId?: InputMaybe<Scalars['Int']>
  subtotal?: InputMaybe<Scalars['Float']>
  suggestedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  taxData?: InputMaybe<Scalars['Object']>
  taxTotal?: InputMaybe<Scalars['Float']>
  tenantId?: InputMaybe<Scalars['Int']>
  total?: InputMaybe<Scalars['Float']>
  userId?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
  zipCode?: InputMaybe<Scalars['String']>
}

export type CrCartItem = {
  __typename?: 'CrCartItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCartItem>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CrAuditInfo>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  handlingAmount?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<CrInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  lineId?: Maybe<Scalars['Int']>
  lineItemAdjustment?: Maybe<Scalars['Float']>
  localeCode?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  product?: Maybe<CrProduct>
  productDiscount?: Maybe<CrAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<CrAppliedLineItemProductDiscount>>>
  purchaseLocation?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<CrAppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  subscription?: Maybe<CrSubscriptionInfo>
  subtotal?: Maybe<Scalars['Float']>
  taxData?: Maybe<Scalars['Object']>
  taxableTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CrCommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
}

export type CrCartItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCartItemInput = {
  adjustedLineItemSubtotal?: InputMaybe<Scalars['Float']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  autoAddDiscountId?: InputMaybe<Scalars['Int']>
  childItemIds?: InputMaybe<Array<Scalars['String']>>
  data?: InputMaybe<Scalars['Object']>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  extendedTotal?: InputMaybe<Scalars['Float']>
  feeTotal?: InputMaybe<Scalars['Float']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  fulfillmentMethod?: InputMaybe<Scalars['String']>
  handlingAmount?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<CrInventoryTagsInput>>>
  isAssemblyRequired?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  lineId?: InputMaybe<Scalars['Int']>
  lineItemAdjustment?: InputMaybe<Scalars['Float']>
  localeCode?: InputMaybe<Scalars['String']>
  parentItemId?: InputMaybe<Scalars['String']>
  product?: InputMaybe<CrProductInput>
  productDiscount?: InputMaybe<CrAppliedLineItemProductDiscountInput>
  productDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedLineItemProductDiscountInput>>>
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  subscription?: InputMaybe<CrSubscriptionInfoInput>
  subtotal?: InputMaybe<Scalars['Float']>
  taxData?: InputMaybe<Scalars['Object']>
  taxableTotal?: InputMaybe<Scalars['Float']>
  total?: InputMaybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  unitPrice?: InputMaybe<CrCommerceUnitPriceInput>
  weightedOrderAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderDuty?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFee?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: InputMaybe<Scalars['Float']>
  weightedOrderShipping?: InputMaybe<Scalars['Float']>
  weightedOrderShippingDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderShippingTax?: InputMaybe<Scalars['Float']>
  weightedOrderTax?: InputMaybe<Scalars['Float']>
}

export type CrCartMessage = {
  __typename?: 'CrCartMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCartMessage>
  message?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  productsRemoved?: Maybe<Array<Maybe<CrProduct>>>
}

export type CrCartMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCartMessageInput = {
  message?: InputMaybe<Scalars['String']>
  messageType?: InputMaybe<Scalars['String']>
  productsRemoved?: InputMaybe<Array<InputMaybe<CrProductInput>>>
}

export type CrCategory = {
  __typename?: 'CrCategory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCategory>
  id?: Maybe<Scalars['Int']>
  parent?: Maybe<CrCategory>
}

export type CrCategory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCategoryInput = {
  id?: InputMaybe<Scalars['Int']>
  parent?: InputMaybe<CrCategoryInput>
}

export type CrChangeMessage = {
  __typename?: 'CrChangeMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrChangeMessage>
  amount?: Maybe<Scalars['Float']>
  appId?: Maybe<Scalars['String']>
  appKey?: Maybe<Scalars['String']>
  appName?: Maybe<Scalars['String']>
  attributes?: Maybe<Scalars['Object']>
  correlationId?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  identifier?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  newValue?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
  subjectType?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  userFirstName?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  userLastName?: Maybe<Scalars['String']>
  userScopeType?: Maybe<Scalars['String']>
  verb?: Maybe<Scalars['String']>
}

export type CrChangeMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrChangeMessageInput = {
  amount?: InputMaybe<Scalars['Float']>
  appId?: InputMaybe<Scalars['String']>
  appKey?: InputMaybe<Scalars['String']>
  appName?: InputMaybe<Scalars['String']>
  attributes?: InputMaybe<Scalars['Object']>
  correlationId?: InputMaybe<Scalars['String']>
  createDate?: InputMaybe<Scalars['DateTime']>
  id?: InputMaybe<Scalars['String']>
  identifier?: InputMaybe<Scalars['String']>
  message?: InputMaybe<Scalars['String']>
  metadata?: InputMaybe<Scalars['Object']>
  newValue?: InputMaybe<Scalars['String']>
  oldValue?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  subjectType?: InputMaybe<Scalars['String']>
  success?: InputMaybe<Scalars['Boolean']>
  userFirstName?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
  userLastName?: InputMaybe<Scalars['String']>
  userScopeType?: InputMaybe<Scalars['String']>
  verb?: InputMaybe<Scalars['String']>
}

export type CrCheckPayment = {
  __typename?: 'CrCheckPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCheckPayment>
  checkNumber?: Maybe<Scalars['String']>
}

export type CrCheckPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCheckPaymentInput = {
  checkNumber?: InputMaybe<Scalars['String']>
}

export type CrCommerceUnitPrice = {
  __typename?: 'CrCommerceUnitPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCommerceUnitPrice>
  extendedAmount?: Maybe<Scalars['Float']>
  listAmount?: Maybe<Scalars['Float']>
  overrideAmount?: Maybe<Scalars['Float']>
  saleAmount?: Maybe<Scalars['Float']>
}

export type CrCommerceUnitPrice_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCommerceUnitPriceInput = {
  extendedAmount?: InputMaybe<Scalars['Float']>
  listAmount?: InputMaybe<Scalars['Float']>
  overrideAmount?: InputMaybe<Scalars['Float']>
  saleAmount?: InputMaybe<Scalars['Float']>
}

export type CrContact = {
  __typename?: 'CrContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrContact>
  address?: Maybe<CrAddress>
  companyOrOrganization?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<CrPhone>
}

export type CrContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrContactInput = {
  address?: InputMaybe<CrAddressInput>
  companyOrOrganization?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  lastNameOrSurname?: InputMaybe<Scalars['String']>
  middleNameOrInitial?: InputMaybe<Scalars['String']>
  phoneNumbers?: InputMaybe<CrPhoneInput>
}

export type CrCustomer = {
  __typename?: 'CrCustomer'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCustomer>
  customerContact?: Maybe<CrContact>
  data?: Maybe<Scalars['Object']>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type CrCustomer_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrCustomerInput = {
  customerContact?: InputMaybe<CrContactInput>
  data?: InputMaybe<Scalars['Object']>
  isDestinationCommercial?: InputMaybe<Scalars['Boolean']>
}

export type CrDestination = {
  __typename?: 'CrDestination'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrDestination>
  data?: Maybe<Scalars['Object']>
  destinationContact?: Maybe<CrContact>
  id?: Maybe<Scalars['String']>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type CrDestination_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrDestinationInput = {
  data?: InputMaybe<Scalars['Object']>
  destinationContact?: InputMaybe<CrContactInput>
  id?: InputMaybe<Scalars['String']>
  isDestinationCommercial?: InputMaybe<Scalars['Boolean']>
}

export type CrDigitalPackage = {
  __typename?: 'CrDigitalPackage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrDigitalPackage>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  code?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<CrDigitalPackageItem>>>
  status?: Maybe<Scalars['String']>
}

export type CrDigitalPackage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrDigitalPackageInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  code?: InputMaybe<Scalars['String']>
  fulfillmentDate?: InputMaybe<Scalars['DateTime']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  items?: InputMaybe<Array<InputMaybe<CrDigitalPackageItemInput>>>
  status?: InputMaybe<Scalars['String']>
}

export type CrDigitalPackageItem = {
  __typename?: 'CrDigitalPackageItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrDigitalPackageItem>
  fulfillmentItemType?: Maybe<Scalars['String']>
  giftCardCode?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type CrDigitalPackageItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrDigitalPackageItemInput = {
  fulfillmentItemType?: InputMaybe<Scalars['String']>
  giftCardCode?: InputMaybe<Scalars['String']>
  lineId?: InputMaybe<Scalars['Int']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  productCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type CrDiscount = {
  __typename?: 'CrDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrDiscount>
  expirationDate?: Maybe<Scalars['DateTime']>
  hasMultipleTargetProducts?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  itemIds?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
}

export type CrDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrDiscountInput = {
  expirationDate?: InputMaybe<Scalars['DateTime']>
  hasMultipleTargetProducts?: InputMaybe<Scalars['Boolean']>
  id: Scalars['Int']
  itemIds?: InputMaybe<Array<Scalars['String']>>
  name?: InputMaybe<Scalars['String']>
}

export type CrExtendedProperty = {
  __typename?: 'CrExtendedProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrExtendedProperty>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CrExtendedProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrExtendedPropertyInput = {
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type CrFrequency = {
  __typename?: 'CrFrequency'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFrequency>
  unit?: Maybe<Scalars['String']>
  value: Scalars['Int']
}

export type CrFrequency_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFrequencyInput = {
  unit?: InputMaybe<Scalars['String']>
  value: Scalars['Int']
}

export type CrFulfillmentAlternateContact = {
  __typename?: 'CrFulfillmentAlternateContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFulfillmentAlternateContact>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type CrFulfillmentAlternateContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFulfillmentAlternateContactInput = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastNameOrSurname?: InputMaybe<Scalars['String']>
  phoneNumber?: InputMaybe<Scalars['String']>
}

export type CrFulfillmentField = {
  __typename?: 'CrFulfillmentField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFulfillmentField>
  name?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  userEnteredValue?: Maybe<Scalars['Object']>
}

export type CrFulfillmentField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFulfillmentFieldInput = {
  name?: InputMaybe<Scalars['String']>
  required?: InputMaybe<Scalars['Boolean']>
  userEnteredValue?: InputMaybe<Scalars['Object']>
}

export type CrFulfillmentInfo = {
  __typename?: 'CrFulfillmentInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFulfillmentInfo>
  auditInfo?: Maybe<CrAuditInfo>
  data?: Maybe<Scalars['Object']>
  fulfillmentContact?: Maybe<CrContact>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
}

export type CrFulfillmentInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFulfillmentInfoInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  data?: InputMaybe<Scalars['Object']>
  fulfillmentContact?: InputMaybe<CrContactInput>
  isDestinationCommercial?: InputMaybe<Scalars['Boolean']>
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
}

export type CrFulfillmentShopperNotes = {
  __typename?: 'CrFulfillmentShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFulfillmentShopperNotes>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
  giftMessage?: Maybe<Scalars['String']>
}

export type CrFulfillmentShopperNotes_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFulfillmentShopperNotesInput = {
  comments?: InputMaybe<Scalars['String']>
  deliveryInstructions?: InputMaybe<Scalars['String']>
  giftMessage?: InputMaybe<Scalars['String']>
}

export type CrFulfillmentTask = {
  __typename?: 'CrFulfillmentTask'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFulfillmentTask>
  active?: Maybe<Scalars['Boolean']>
  attributes?: Maybe<Scalars['Object']>
  completed?: Maybe<Scalars['Boolean']>
  completedDate?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  inputs?: Maybe<Array<Maybe<TaskInput>>>
  links?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  skippable?: Maybe<Scalars['Boolean']>
  subject?: Maybe<Scalars['String']>
  taskId?: Maybe<Scalars['String']>
}

export type CrFulfillmentTask_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFulfillmentTaskInput = {
  active?: InputMaybe<Scalars['Boolean']>
  attributes?: InputMaybe<Scalars['Object']>
  completed?: InputMaybe<Scalars['Boolean']>
  completedDate?: InputMaybe<Scalars['DateTime']>
  description?: InputMaybe<Scalars['String']>
  inputs?: InputMaybe<Array<InputMaybe<TaskInputInput>>>
  links?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  skippable?: InputMaybe<Scalars['Boolean']>
  subject?: InputMaybe<Scalars['String']>
  taskId?: InputMaybe<Scalars['String']>
}

export type CrFutureInventory = {
  __typename?: 'CrFutureInventory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrFutureInventory>
  allocated?: Maybe<Scalars['Int']>
  available?: Maybe<Scalars['Int']>
  createDate?: Maybe<Scalars['DateTime']>
  deliveryDate?: Maybe<Scalars['DateTime']>
  futureInventoryID?: Maybe<Scalars['Int']>
  onhand?: Maybe<Scalars['Int']>
  pending?: Maybe<Scalars['Int']>
}

export type CrFutureInventory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrFutureInventoryInput = {
  allocated?: InputMaybe<Scalars['Int']>
  available?: InputMaybe<Scalars['Int']>
  createDate?: InputMaybe<Scalars['DateTime']>
  deliveryDate?: InputMaybe<Scalars['DateTime']>
  futureInventoryID?: InputMaybe<Scalars['Int']>
  onhand?: InputMaybe<Scalars['Int']>
  pending?: InputMaybe<Scalars['Int']>
}

export type CrGatewayGiftCard = {
  __typename?: 'CrGatewayGiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrGatewayGiftCard>
  amount: Scalars['Float']
  cardNumber?: Maybe<Scalars['String']>
  cardPin?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type CrGatewayGiftCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrGatewayGiftCardInput = {
  amount: Scalars['Float']
  cardNumber?: InputMaybe<Scalars['String']>
  cardPin?: InputMaybe<Scalars['String']>
  currencyCode?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
}

export type CrGiftCard = {
  __typename?: 'CrGiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrGiftCard>
  activationDate?: Maybe<Scalars['DateTime']>
  cardNumber?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  creditType?: Maybe<Scalars['String']>
  creditValue?: Maybe<Scalars['Float']>
  currencyCode?: Maybe<Scalars['String']>
  currentBalance?: Maybe<Scalars['Float']>
  customerId?: Maybe<Scalars['Int']>
  expirationDate?: Maybe<Scalars['DateTime']>
  initialBalance?: Maybe<Scalars['Float']>
}

export type CrGiftCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrGiftCardInput = {
  activationDate?: InputMaybe<Scalars['DateTime']>
  cardNumber?: InputMaybe<Scalars['String']>
  code?: InputMaybe<Scalars['String']>
  creditType?: InputMaybe<Scalars['String']>
  creditValue?: InputMaybe<Scalars['Float']>
  currencyCode?: InputMaybe<Scalars['String']>
  currentBalance?: InputMaybe<Scalars['Float']>
  customerId?: InputMaybe<Scalars['Int']>
  expirationDate?: InputMaybe<Scalars['DateTime']>
  initialBalance?: InputMaybe<Scalars['Float']>
}

export type CrInvalidCoupon = {
  __typename?: 'CrInvalidCoupon'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrInvalidCoupon>
  couponCode?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  discountId: Scalars['Int']
  reason?: Maybe<Scalars['String']>
  reasonCode: Scalars['Int']
}

export type CrInvalidCoupon_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrInvalidCouponInput = {
  couponCode?: InputMaybe<Scalars['String']>
  createDate: Scalars['DateTime']
  discountId: Scalars['Int']
  reason?: InputMaybe<Scalars['String']>
  reasonCode: Scalars['Int']
}

export type CrInventoryTags = {
  __typename?: 'CrInventoryTags'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrInventoryTags>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CrInventoryTags_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrInventoryTagsInput = {
  name?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type CrMeasurement = {
  __typename?: 'CrMeasurement'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrMeasurement>
  unit?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Float']>
}

export type CrMeasurement_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrMeasurementInput = {
  unit?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Float']>
}

export type CrOrder = {
  __typename?: 'CrOrder'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrder>
  acceptedDate?: Maybe<Scalars['DateTime']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  adjustment?: Maybe<CrAdjustment>
  alternateContact?: Maybe<CrAlternateContact>
  amountAvailableForRefund: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRemainingForPayment: Scalars['Float']
  attributes?: Maybe<Array<Maybe<CrOrderAttribute>>>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  billingInfo?: Maybe<CrBillingInfo>
  cancelledDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  channelCode?: Maybe<Scalars['String']>
  closedDate?: Maybe<Scalars['DateTime']>
  continuityOrderOrdinal: Scalars['Int']
  couponCodes?: Maybe<Array<Scalars['String']>>
  credits?: Maybe<Array<Maybe<Credit>>>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  digitalPackages?: Maybe<Array<Maybe<CrDigitalPackage>>>
  discountThresholdMessages?: Maybe<Array<Maybe<CrThresholdMessage>>>
  discountTotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal?: Maybe<Scalars['Float']>
  email?: Maybe<Scalars['String']>
  expirationDate?: Maybe<Scalars['DateTime']>
  extendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  externalId?: Maybe<Scalars['String']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentInfo?: Maybe<CrFulfillmentInfo>
  fulfillmentStatus?: Maybe<Scalars['String']>
  handlingAdjustment?: Maybe<CrAdjustment>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  hasDraft?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  importDate?: Maybe<Scalars['DateTime']>
  invalidCoupons?: Maybe<Array<Maybe<CrInvalidCoupon>>>
  ipAddress?: Maybe<Scalars['String']>
  isDraft?: Maybe<Scalars['Boolean']>
  isEligibleForReturns?: Maybe<Scalars['Boolean']>
  isFulfillable?: Maybe<Scalars['Boolean']>
  isHistoricalImport?: Maybe<Scalars['Boolean']>
  isImport?: Maybe<Scalars['Boolean']>
  isOptInForSms?: Maybe<Scalars['Boolean']>
  isPartialOrder?: Maybe<Scalars['Boolean']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  isUnified?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  locationCode?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<CrOrderNote>>>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  orderNumber?: Maybe<Scalars['Int']>
  originalCartId?: Maybe<Scalars['String']>
  originalQuoteId?: Maybe<Scalars['String']>
  originalQuoteNumber?: Maybe<Scalars['Int']>
  packages?: Maybe<Array<Maybe<CrPackageObj>>>
  parentCheckoutId?: Maybe<Scalars['String']>
  parentCheckoutNumber?: Maybe<Scalars['Int']>
  parentOrderId?: Maybe<Scalars['String']>
  parentOrderNumber?: Maybe<Scalars['Int']>
  parentReturnId?: Maybe<Scalars['String']>
  parentReturnNumber?: Maybe<Scalars['Int']>
  partialOrderCount?: Maybe<Scalars['Int']>
  partialOrderNumber?: Maybe<Scalars['Int']>
  paymentStatus?: Maybe<Scalars['String']>
  payments?: Maybe<Array<Maybe<CrPayment>>>
  pickups?: Maybe<Array<Maybe<CrPickup>>>
  priceListCode?: Maybe<Scalars['String']>
  readyToCapture?: Maybe<Scalars['Boolean']>
  refunds?: Maybe<Array<Maybe<CrRefund>>>
  rejectedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  reservationId?: Maybe<Scalars['String']>
  returnStatus?: Maybe<Scalars['String']>
  shipments?: Maybe<Array<Maybe<CrShipment>>>
  shippingAdjustment?: Maybe<CrAdjustment>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<CrShippingDiscount>>>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shopperNotes?: Maybe<CrShopperNotes>
  siteId?: Maybe<Scalars['Int']>
  sourceDevice?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  submittedDate?: Maybe<Scalars['DateTime']>
  subscriptionIds?: Maybe<Array<Scalars['String']>>
  subtotal?: Maybe<Scalars['Float']>
  suggestedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  taxData?: Maybe<Scalars['Object']>
  taxTotal?: Maybe<Scalars['Float']>
  tenantId?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Float']>
  totalCollected: Scalars['Float']
  type?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  validationResults?: Maybe<Array<Maybe<CrOrderValidationResult>>>
  version?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type CrOrder_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrOrderAttribute = {
  __typename?: 'CrOrderAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrderAttribute>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  auditInfo?: Maybe<CrAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type CrOrderAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrOrderAttributeInput = {
  attributeDefinitionId?: InputMaybe<Scalars['Int']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  fullyQualifiedName?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<Scalars['Object']>>
}

export type CrOrderInput = {
  acceptedDate?: InputMaybe<Scalars['DateTime']>
  acceptsMarketing?: InputMaybe<Scalars['Boolean']>
  adjustment?: InputMaybe<CrAdjustmentInput>
  alternateContact?: InputMaybe<CrAlternateContactInput>
  amountAvailableForRefund: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRemainingForPayment: Scalars['Float']
  attributes?: InputMaybe<Array<InputMaybe<CrOrderAttributeInput>>>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  billingInfo?: InputMaybe<CrBillingInfoInput>
  cancelledDate?: InputMaybe<Scalars['DateTime']>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  channelCode?: InputMaybe<Scalars['String']>
  closedDate?: InputMaybe<Scalars['DateTime']>
  continuityOrderOrdinal: Scalars['Int']
  couponCodes?: InputMaybe<Array<Scalars['String']>>
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>
  currencyCode?: InputMaybe<Scalars['String']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  customerTaxId?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  digitalPackages?: InputMaybe<Array<InputMaybe<CrDigitalPackageInput>>>
  discountThresholdMessages?: InputMaybe<Array<InputMaybe<CrThresholdMessageInput>>>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedSubtotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  dutyAmount?: InputMaybe<Scalars['Float']>
  dutyTotal?: InputMaybe<Scalars['Float']>
  email?: InputMaybe<Scalars['String']>
  expirationDate?: InputMaybe<Scalars['DateTime']>
  extendedProperties?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
  externalId?: InputMaybe<Scalars['String']>
  feeTotal?: InputMaybe<Scalars['Float']>
  fulfillmentInfo?: InputMaybe<CrFulfillmentInfoInput>
  fulfillmentStatus?: InputMaybe<Scalars['String']>
  handlingAdjustment?: InputMaybe<CrAdjustmentInput>
  handlingAmount?: InputMaybe<Scalars['Float']>
  handlingDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  handlingSubTotal?: InputMaybe<Scalars['Float']>
  handlingTaxTotal?: InputMaybe<Scalars['Float']>
  handlingTotal?: InputMaybe<Scalars['Float']>
  hasDraft?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['String']>
  importDate?: InputMaybe<Scalars['DateTime']>
  invalidCoupons?: InputMaybe<Array<InputMaybe<CrInvalidCouponInput>>>
  ipAddress?: InputMaybe<Scalars['String']>
  isDraft?: InputMaybe<Scalars['Boolean']>
  isEligibleForReturns?: InputMaybe<Scalars['Boolean']>
  isFulfillable?: InputMaybe<Scalars['Boolean']>
  isHistoricalImport?: InputMaybe<Scalars['Boolean']>
  isImport?: InputMaybe<Scalars['Boolean']>
  isOptInForSms?: InputMaybe<Scalars['Boolean']>
  isPartialOrder?: InputMaybe<Scalars['Boolean']>
  isTaxExempt?: InputMaybe<Scalars['Boolean']>
  isUnified?: InputMaybe<Scalars['Boolean']>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  items?: InputMaybe<Array<InputMaybe<CrOrderItemInput>>>
  lastValidationDate?: InputMaybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: InputMaybe<Scalars['Float']>
  locationCode?: InputMaybe<Scalars['String']>
  notes?: InputMaybe<Array<InputMaybe<CrOrderNoteInput>>>
  orderDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  orderNumber?: InputMaybe<Scalars['Int']>
  originalCartId?: InputMaybe<Scalars['String']>
  originalQuoteId?: InputMaybe<Scalars['String']>
  originalQuoteNumber?: InputMaybe<Scalars['Int']>
  packages?: InputMaybe<Array<InputMaybe<CrPackageObjInput>>>
  parentCheckoutId?: InputMaybe<Scalars['String']>
  parentCheckoutNumber?: InputMaybe<Scalars['Int']>
  parentOrderId?: InputMaybe<Scalars['String']>
  parentOrderNumber?: InputMaybe<Scalars['Int']>
  parentReturnId?: InputMaybe<Scalars['String']>
  parentReturnNumber?: InputMaybe<Scalars['Int']>
  partialOrderCount?: InputMaybe<Scalars['Int']>
  partialOrderNumber?: InputMaybe<Scalars['Int']>
  paymentStatus?: InputMaybe<Scalars['String']>
  payments?: InputMaybe<Array<InputMaybe<CrPaymentInput>>>
  pickups?: InputMaybe<Array<InputMaybe<CrPickupInput>>>
  priceListCode?: InputMaybe<Scalars['String']>
  readyToCapture?: InputMaybe<Scalars['Boolean']>
  refunds?: InputMaybe<Array<InputMaybe<CrRefundInput>>>
  rejectedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  reservationId?: InputMaybe<Scalars['String']>
  returnStatus?: InputMaybe<Scalars['String']>
  shipments?: InputMaybe<Array<InputMaybe<CrShipmentInput>>>
  shippingAdjustment?: InputMaybe<CrAdjustmentInput>
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingDiscounts?: InputMaybe<Array<InputMaybe<CrShippingDiscountInput>>>
  shippingSubTotal?: InputMaybe<Scalars['Float']>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  shopperNotes?: InputMaybe<CrShopperNotesInput>
  siteId?: InputMaybe<Scalars['Int']>
  sourceDevice?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  submittedDate?: InputMaybe<Scalars['DateTime']>
  subscriptionIds?: InputMaybe<Array<Scalars['String']>>
  subtotal?: InputMaybe<Scalars['Float']>
  suggestedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  taxData?: InputMaybe<Scalars['Object']>
  taxTotal?: InputMaybe<Scalars['Float']>
  tenantId?: InputMaybe<Scalars['Int']>
  total?: InputMaybe<Scalars['Float']>
  totalCollected: Scalars['Float']
  type?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
  validationResults?: InputMaybe<Array<InputMaybe<CrOrderValidationResultInput>>>
  version?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
}

export type CrOrderItem = {
  __typename?: 'CrOrderItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrderItem>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CrAuditInfo>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  destinationId?: Maybe<Scalars['String']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  dutyAmount?: Maybe<Scalars['Float']>
  expectedDeliveryDate?: Maybe<Scalars['DateTime']>
  extendedTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  handlingAmount?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<CrInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isReservationEnabled?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  lineId?: Maybe<Scalars['Int']>
  lineItemAdjustment?: Maybe<Scalars['Float']>
  localeCode?: Maybe<Scalars['String']>
  originalCartItemId?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  product?: Maybe<CrProduct>
  productDiscount?: Maybe<CrAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<CrAppliedLineItemProductDiscount>>>
  purchaseLocation?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<CrAppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  subscription?: Maybe<CrSubscriptionInfo>
  subtotal?: Maybe<Scalars['Float']>
  taxData?: Maybe<Scalars['Object']>
  taxableTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CrCommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
}

export type CrOrderItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrOrderItemInput = {
  adjustedLineItemSubtotal?: InputMaybe<Scalars['Float']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  autoAddDiscountId?: InputMaybe<Scalars['Int']>
  childItemIds?: InputMaybe<Array<Scalars['String']>>
  data?: InputMaybe<Scalars['Object']>
  destinationId?: InputMaybe<Scalars['String']>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  dutyAmount?: InputMaybe<Scalars['Float']>
  expectedDeliveryDate?: InputMaybe<Scalars['DateTime']>
  extendedTotal?: InputMaybe<Scalars['Float']>
  feeTotal?: InputMaybe<Scalars['Float']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  fulfillmentMethod?: InputMaybe<Scalars['String']>
  handlingAmount?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<CrInventoryTagsInput>>>
  isAssemblyRequired?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isReservationEnabled?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  lineId?: InputMaybe<Scalars['Int']>
  lineItemAdjustment?: InputMaybe<Scalars['Float']>
  localeCode?: InputMaybe<Scalars['String']>
  originalCartItemId?: InputMaybe<Scalars['String']>
  parentItemId?: InputMaybe<Scalars['String']>
  product?: InputMaybe<CrProductInput>
  productDiscount?: InputMaybe<CrAppliedLineItemProductDiscountInput>
  productDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedLineItemProductDiscountInput>>>
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  subscription?: InputMaybe<CrSubscriptionInfoInput>
  subtotal?: InputMaybe<Scalars['Float']>
  taxData?: InputMaybe<Scalars['Object']>
  taxableTotal?: InputMaybe<Scalars['Float']>
  total?: InputMaybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  unitPrice?: InputMaybe<CrCommerceUnitPriceInput>
  weightedOrderAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderDuty?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFee?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: InputMaybe<Scalars['Float']>
  weightedOrderShipping?: InputMaybe<Scalars['Float']>
  weightedOrderShippingDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderShippingTax?: InputMaybe<Scalars['Float']>
  weightedOrderTax?: InputMaybe<Scalars['Float']>
}

export type CrOrderNote = {
  __typename?: 'CrOrderNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrderNote>
  auditInfo?: Maybe<CrAuditInfo>
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type CrOrderNote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrOrderNoteInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  id?: InputMaybe<Scalars['String']>
  text?: InputMaybe<Scalars['String']>
}

export type CrOrderValidationMessage = {
  __typename?: 'CrOrderValidationMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrderValidationMessage>
  message?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  orderItemId?: Maybe<Scalars['String']>
}

export type CrOrderValidationMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrOrderValidationMessageInput = {
  message?: InputMaybe<Scalars['String']>
  messageType?: InputMaybe<Scalars['String']>
  orderItemId?: InputMaybe<Scalars['String']>
}

export type CrOrderValidationResult = {
  __typename?: 'CrOrderValidationResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrderValidationResult>
  createdDate?: Maybe<Scalars['DateTime']>
  messages?: Maybe<Array<Maybe<CrOrderValidationMessage>>>
  status?: Maybe<Scalars['String']>
  validationId?: Maybe<Scalars['String']>
  validatorName?: Maybe<Scalars['String']>
  validatorType?: Maybe<Scalars['String']>
}

export type CrOrderValidationResult_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrOrderValidationResultInput = {
  createdDate?: InputMaybe<Scalars['DateTime']>
  messages?: InputMaybe<Array<InputMaybe<CrOrderValidationMessageInput>>>
  status?: InputMaybe<Scalars['String']>
  validationId?: InputMaybe<Scalars['String']>
  validatorName?: InputMaybe<Scalars['String']>
  validatorType?: InputMaybe<Scalars['String']>
}

export type CrPackageItem = {
  __typename?: 'CrPackageItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPackageItem>
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type CrPackageItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPackageItemInput = {
  fulfillmentItemType?: InputMaybe<Scalars['String']>
  lineId?: InputMaybe<Scalars['Int']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  productCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type CrPackageMeasurements = {
  __typename?: 'CrPackageMeasurements'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPackageMeasurements>
  height?: Maybe<CrMeasurement>
  length?: Maybe<CrMeasurement>
  weight?: Maybe<CrMeasurement>
  width?: Maybe<CrMeasurement>
}

export type CrPackageMeasurements_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPackageMeasurementsInput = {
  height?: InputMaybe<CrMeasurementInput>
  length?: InputMaybe<CrMeasurementInput>
  weight?: InputMaybe<CrMeasurementInput>
  width?: InputMaybe<CrMeasurementInput>
}

export type CrPackageObj = {
  __typename?: 'CrPackageObj'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPackageObj>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  carrier?: Maybe<Scalars['String']>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  code?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fxcbDocumentsUrl?: Maybe<Scalars['String']>
  fxcbPackNotificationId?: Maybe<Scalars['String']>
  hasLabel?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  integratorId?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<CrPackageItem>>>
  labelFormat?: Maybe<Scalars['String']>
  manifestId?: Maybe<Scalars['String']>
  measurements?: Maybe<CrPackageMeasurements>
  packageId?: Maybe<Scalars['String']>
  packagingType?: Maybe<Scalars['String']>
  packingSlipItemDetails?: Maybe<Array<Maybe<CrPackingSlipItemDetail>>>
  packingSlipNumber?: Maybe<Scalars['Int']>
  returnCarrier?: Maybe<Scalars['String']>
  returnTrackingNumbers?: Maybe<Array<Scalars['String']>>
  returnTrackings?: Maybe<Array<Maybe<CrTracking>>>
  shipmentId?: Maybe<Scalars['String']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  signatureRequired?: Maybe<Scalars['Boolean']>
  status?: Maybe<Scalars['String']>
  trackingNumber?: Maybe<Scalars['String']>
  trackingNumbers?: Maybe<Array<Scalars['String']>>
  trackings?: Maybe<Array<Maybe<CrTracking>>>
}

export type CrPackageObj_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPackageObjInput = {
  attributes?: InputMaybe<Scalars['Object']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  carrier?: InputMaybe<Scalars['String']>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  code?: InputMaybe<Scalars['String']>
  fulfillmentDate?: InputMaybe<Scalars['DateTime']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  fxcbDocumentsUrl?: InputMaybe<Scalars['String']>
  fxcbPackNotificationId?: InputMaybe<Scalars['String']>
  hasLabel?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['String']>
  integratorId?: InputMaybe<Scalars['String']>
  items?: InputMaybe<Array<InputMaybe<CrPackageItemInput>>>
  labelFormat?: InputMaybe<Scalars['String']>
  manifestId?: InputMaybe<Scalars['String']>
  measurements?: InputMaybe<CrPackageMeasurementsInput>
  packageId?: InputMaybe<Scalars['String']>
  packagingType?: InputMaybe<Scalars['String']>
  packingSlipItemDetails?: InputMaybe<Array<InputMaybe<CrPackingSlipItemDetailInput>>>
  packingSlipNumber?: InputMaybe<Scalars['Int']>
  returnCarrier?: InputMaybe<Scalars['String']>
  returnTrackingNumbers?: InputMaybe<Array<Scalars['String']>>
  returnTrackings?: InputMaybe<Array<InputMaybe<CrTrackingInput>>>
  shipmentId?: InputMaybe<Scalars['String']>
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
  signatureRequired?: InputMaybe<Scalars['Boolean']>
  status?: InputMaybe<Scalars['String']>
  trackingNumber?: InputMaybe<Scalars['String']>
  trackingNumbers?: InputMaybe<Array<Scalars['String']>>
  trackings?: InputMaybe<Array<InputMaybe<CrTrackingInput>>>
}

export type CrPackingSlipItemDetail = {
  __typename?: 'CrPackingSlipItemDetail'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPackingSlipItemDetail>
  attributes?: Maybe<Scalars['Object']>
  lineId?: Maybe<Scalars['Int']>
  originalOrderItemId?: Maybe<Scalars['String']>
  quantity?: Maybe<Scalars['Int']>
}

export type CrPackingSlipItemDetail_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPackingSlipItemDetailInput = {
  attributes?: InputMaybe<Scalars['Object']>
  lineId?: InputMaybe<Scalars['Int']>
  originalOrderItemId?: InputMaybe<Scalars['String']>
  quantity?: InputMaybe<Scalars['Int']>
}

export type CrPayment = {
  __typename?: 'CrPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPayment>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  billingInfo?: Maybe<CrBillingInfo>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  data?: Maybe<Scalars['Object']>
  externalTransactionId?: Maybe<Scalars['String']>
  gatewayGiftCard?: Maybe<CrGatewayGiftCard>
  groupId?: Maybe<CrPaymentActionTarget>
  id?: Maybe<Scalars['String']>
  interactions?: Maybe<Array<Maybe<CrPaymentInteraction>>>
  isRecurring?: Maybe<Scalars['Boolean']>
  orderId?: Maybe<Scalars['String']>
  paymentServiceTransactionId?: Maybe<Scalars['String']>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  subPayments?: Maybe<Array<Maybe<CrSubPayment>>>
}

export type CrPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPaymentActionTarget = {
  __typename?: 'CrPaymentActionTarget'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPaymentActionTarget>
  targetId?: Maybe<Scalars['String']>
  targetNumber?: Maybe<Scalars['Int']>
  targetType?: Maybe<Scalars['String']>
}

export type CrPaymentActionTarget_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPaymentActionTargetInput = {
  targetId?: InputMaybe<Scalars['String']>
  targetNumber?: InputMaybe<Scalars['Int']>
  targetType?: InputMaybe<Scalars['String']>
}

export type CrPaymentCard = {
  __typename?: 'CrPaymentCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPaymentCard>
  bin?: Maybe<Scalars['String']>
  cardNumberPartOrMask?: Maybe<Scalars['String']>
  ccLastFour?: Maybe<Scalars['String']>
  expireMonth: Scalars['Int']
  expireYear: Scalars['Int']
  isCardInfoSaved?: Maybe<Scalars['Boolean']>
  isTokenized?: Maybe<Scalars['Boolean']>
  isUsedRecurring?: Maybe<Scalars['Boolean']>
  nameOnCard?: Maybe<Scalars['String']>
  paymentOrCardType?: Maybe<Scalars['String']>
  paymentServiceCardId?: Maybe<Scalars['String']>
}

export type CrPaymentCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPaymentCardInput = {
  bin?: InputMaybe<Scalars['String']>
  cardNumberPartOrMask?: InputMaybe<Scalars['String']>
  ccLastFour?: InputMaybe<Scalars['String']>
  expireMonth: Scalars['Int']
  expireYear: Scalars['Int']
  isCardInfoSaved?: InputMaybe<Scalars['Boolean']>
  isTokenized?: InputMaybe<Scalars['Boolean']>
  isUsedRecurring?: InputMaybe<Scalars['Boolean']>
  nameOnCard?: InputMaybe<Scalars['String']>
  paymentOrCardType?: InputMaybe<Scalars['String']>
  paymentServiceCardId?: InputMaybe<Scalars['String']>
}

export type CrPaymentGatewayResponseData = {
  __typename?: 'CrPaymentGatewayResponseData'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPaymentGatewayResponseData>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CrPaymentGatewayResponseData_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPaymentGatewayResponseDataInput = {
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type CrPaymentInput = {
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  billingInfo?: InputMaybe<CrBillingInfoInput>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  data?: InputMaybe<Scalars['Object']>
  externalTransactionId?: InputMaybe<Scalars['String']>
  gatewayGiftCard?: InputMaybe<CrGatewayGiftCardInput>
  groupId?: InputMaybe<CrPaymentActionTargetInput>
  id?: InputMaybe<Scalars['String']>
  interactions?: InputMaybe<Array<InputMaybe<CrPaymentInteractionInput>>>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  orderId?: InputMaybe<Scalars['String']>
  paymentServiceTransactionId?: InputMaybe<Scalars['String']>
  paymentType?: InputMaybe<Scalars['String']>
  paymentWorkflow?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  subPayments?: InputMaybe<Array<InputMaybe<CrSubPaymentInput>>>
}

export type CrPaymentInteraction = {
  __typename?: 'CrPaymentInteraction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPaymentInteraction>
  amount?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CrAuditInfo>
  capturableShipmentsSummary?: Maybe<Array<Maybe<CrCapturableShipmentSummary>>>
  checkNumber?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  gatewayAVSCodes?: Maybe<Scalars['String']>
  gatewayAuthCode?: Maybe<Scalars['String']>
  gatewayCVV2Codes?: Maybe<Scalars['String']>
  gatewayInteractionId?: Maybe<Scalars['Int']>
  gatewayResponseCode?: Maybe<Scalars['String']>
  gatewayResponseData?: Maybe<Array<Maybe<CrPaymentGatewayResponseData>>>
  gatewayResponseText?: Maybe<Scalars['String']>
  gatewayTransactionId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  interactionDate?: Maybe<Scalars['DateTime']>
  interactionType?: Maybe<Scalars['String']>
  isManual?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  note?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  paymentEntryStatus?: Maybe<Scalars['String']>
  paymentId?: Maybe<Scalars['String']>
  paymentTransactionInteractionIdReference?: Maybe<Scalars['Int']>
  refundId?: Maybe<Scalars['String']>
  returnId?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  target?: Maybe<CrPaymentActionTarget>
}

export type CrPaymentInteraction_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPaymentInteractionInput = {
  amount?: InputMaybe<Scalars['Float']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  capturableShipmentsSummary?: InputMaybe<Array<InputMaybe<CrCapturableShipmentSummaryInput>>>
  checkNumber?: InputMaybe<Scalars['String']>
  currencyCode?: InputMaybe<Scalars['String']>
  gatewayAVSCodes?: InputMaybe<Scalars['String']>
  gatewayAuthCode?: InputMaybe<Scalars['String']>
  gatewayCVV2Codes?: InputMaybe<Scalars['String']>
  gatewayInteractionId?: InputMaybe<Scalars['Int']>
  gatewayResponseCode?: InputMaybe<Scalars['String']>
  gatewayResponseData?: InputMaybe<Array<InputMaybe<CrPaymentGatewayResponseDataInput>>>
  gatewayResponseText?: InputMaybe<Scalars['String']>
  gatewayTransactionId?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  interactionDate?: InputMaybe<Scalars['DateTime']>
  interactionType?: InputMaybe<Scalars['String']>
  isManual?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  note?: InputMaybe<Scalars['String']>
  orderId?: InputMaybe<Scalars['String']>
  paymentEntryStatus?: InputMaybe<Scalars['String']>
  paymentId?: InputMaybe<Scalars['String']>
  paymentTransactionInteractionIdReference?: InputMaybe<Scalars['Int']>
  refundId?: InputMaybe<Scalars['String']>
  returnId?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  target?: InputMaybe<CrPaymentActionTargetInput>
}

export type CrPaymentToken = {
  __typename?: 'CrPaymentToken'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPaymentToken>
  paymentServiceTokenId?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type CrPaymentToken_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPaymentTokenInput = {
  paymentServiceTokenId?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type CrPhone = {
  __typename?: 'CrPhone'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPhone>
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type CrPhone_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPhoneInput = {
  home?: InputMaybe<Scalars['String']>
  mobile?: InputMaybe<Scalars['String']>
  work?: InputMaybe<Scalars['String']>
}

export type CrPickup = {
  __typename?: 'CrPickup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPickup>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  code?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<CrPickupItem>>>
  status?: Maybe<Scalars['String']>
}

export type CrPickup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPickupInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  code?: InputMaybe<Scalars['String']>
  fulfillmentDate?: InputMaybe<Scalars['DateTime']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  items?: InputMaybe<Array<InputMaybe<CrPickupItemInput>>>
  status?: InputMaybe<Scalars['String']>
}

export type CrPickupItem = {
  __typename?: 'CrPickupItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPickupItem>
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type CrPickupItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPickupItemInput = {
  fulfillmentItemType?: InputMaybe<Scalars['String']>
  lineId?: InputMaybe<Scalars['Int']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  productCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type CrProduct = {
  __typename?: 'CrProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProduct>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  allocationId?: Maybe<Scalars['Int']>
  bundledProducts?: Maybe<Array<Maybe<CrBundledProduct>>>
  categories?: Maybe<Array<Maybe<CrCategory>>>
  description?: Maybe<Scalars['String']>
  discountsRestricted?: Maybe<Scalars['Boolean']>
  discountsRestrictedEndDate?: Maybe<Scalars['DateTime']>
  discountsRestrictedStartDate?: Maybe<Scalars['DateTime']>
  fulfillmentFields?: Maybe<Array<Maybe<CrFulfillmentField>>>
  fulfillmentStatus?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  imageAlternateText?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<CrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  price?: Maybe<CrProductPrice>
  productCode?: Maybe<Scalars['String']>
  productReservationId?: Maybe<Scalars['Int']>
  productType?: Maybe<Scalars['String']>
  productUsage?: Maybe<Scalars['String']>
  properties?: Maybe<Array<Maybe<CrProductProperty>>>
  sku?: Maybe<Scalars['String']>
  stock?: Maybe<CrProductStock>
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
}

export type CrProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrProductInput = {
  allocationExpiration?: InputMaybe<Scalars['DateTime']>
  allocationId?: InputMaybe<Scalars['Int']>
  bundledProducts?: InputMaybe<Array<InputMaybe<CrBundledProductInput>>>
  categories?: InputMaybe<Array<InputMaybe<CrCategoryInput>>>
  description?: InputMaybe<Scalars['String']>
  discountsRestricted?: InputMaybe<Scalars['Boolean']>
  discountsRestrictedEndDate?: InputMaybe<Scalars['DateTime']>
  discountsRestrictedStartDate?: InputMaybe<Scalars['DateTime']>
  fulfillmentFields?: InputMaybe<Array<InputMaybe<CrFulfillmentFieldInput>>>
  fulfillmentStatus?: InputMaybe<Scalars['String']>
  fulfillmentTypesSupported?: InputMaybe<Array<Scalars['String']>>
  goodsType?: InputMaybe<Scalars['String']>
  imageAlternateText?: InputMaybe<Scalars['String']>
  imageUrl?: InputMaybe<Scalars['String']>
  isPackagedStandAlone?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  measurements?: InputMaybe<CrPackageMeasurementsInput>
  mfgPartNumber?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<InputMaybe<CrProductOptionInput>>>
  price?: InputMaybe<CrProductPriceInput>
  productCode?: InputMaybe<Scalars['String']>
  productReservationId?: InputMaybe<Scalars['Int']>
  productType?: InputMaybe<Scalars['String']>
  productUsage?: InputMaybe<Scalars['String']>
  properties?: InputMaybe<Array<InputMaybe<CrProductPropertyInput>>>
  sku?: InputMaybe<Scalars['String']>
  stock?: InputMaybe<CrProductStockInput>
  upc?: InputMaybe<Scalars['String']>
  variationProductCode?: InputMaybe<Scalars['String']>
}

export type CrProductOption = {
  __typename?: 'CrProductOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductOption>
  attributeFQN?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type CrProductOption_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrProductOptionInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  shopperEnteredValue?: InputMaybe<Scalars['Object']>
  stringValue?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Object']>
}

export type CrProductPrice = {
  __typename?: 'CrProductPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductPrice>
  creditValue?: Maybe<Scalars['Float']>
  msrp?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  priceListCode?: Maybe<Scalars['String']>
  priceListEntryMode?: Maybe<Scalars['String']>
  salePrice?: Maybe<Scalars['Float']>
  tenantOverridePrice?: Maybe<Scalars['Float']>
}

export type CrProductPrice_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrProductPriceInput = {
  creditValue?: InputMaybe<Scalars['Float']>
  msrp?: InputMaybe<Scalars['Float']>
  price?: InputMaybe<Scalars['Float']>
  priceListCode?: InputMaybe<Scalars['String']>
  priceListEntryMode?: InputMaybe<Scalars['String']>
  salePrice?: InputMaybe<Scalars['Float']>
  tenantOverridePrice?: InputMaybe<Scalars['Float']>
}

export type CrProductProperty = {
  __typename?: 'CrProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductProperty>
  attributeFQN?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<CrProductPropertyValue>>>
}

export type CrProductProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrProductPropertyInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  isMultiValue?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<InputMaybe<CrProductPropertyValueInput>>>
}

export type CrProductPropertyValue = {
  __typename?: 'CrProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductPropertyValue>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type CrProductPropertyValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrProductPropertyValueInput = {
  stringValue?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Object']>
}

export type CrProductStock = {
  __typename?: 'CrProductStock'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductStock>
  aggregateInventory?: Maybe<Scalars['Int']>
  availableDate?: Maybe<Scalars['DateTime']>
  futureInventories?: Maybe<Array<Maybe<CrFutureInventory>>>
  isOnBackOrder?: Maybe<Scalars['Boolean']>
  manageStock?: Maybe<Scalars['Boolean']>
  stockAvailable?: Maybe<Scalars['Int']>
}

export type CrProductStock_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrProductStockInput = {
  aggregateInventory?: InputMaybe<Scalars['Int']>
  availableDate?: InputMaybe<Scalars['DateTime']>
  futureInventories?: InputMaybe<Array<InputMaybe<CrFutureInventoryInput>>>
  isOnBackOrder?: InputMaybe<Scalars['Boolean']>
  manageStock?: InputMaybe<Scalars['Boolean']>
  stockAvailable?: InputMaybe<Scalars['Int']>
}

export type CrPurchaseOrderCustomField = {
  __typename?: 'CrPurchaseOrderCustomField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPurchaseOrderCustomField>
  code?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CrPurchaseOrderCustomField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPurchaseOrderCustomFieldInput = {
  code?: InputMaybe<Scalars['String']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type CrPurchaseOrderPayment = {
  __typename?: 'CrPurchaseOrderPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPurchaseOrderPayment>
  customFields?: Maybe<Array<Maybe<CrPurchaseOrderCustomField>>>
  paymentTerm?: Maybe<CrPurchaseOrderPaymentTerm>
  purchaseOrderNumber?: Maybe<Scalars['String']>
}

export type CrPurchaseOrderPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPurchaseOrderPaymentInput = {
  customFields?: InputMaybe<Array<InputMaybe<CrPurchaseOrderCustomFieldInput>>>
  paymentTerm?: InputMaybe<CrPurchaseOrderPaymentTermInput>
  purchaseOrderNumber?: InputMaybe<Scalars['String']>
}

export type CrPurchaseOrderPaymentTerm = {
  __typename?: 'CrPurchaseOrderPaymentTerm'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPurchaseOrderPaymentTerm>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type CrPurchaseOrderPaymentTerm_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrPurchaseOrderPaymentTermInput = {
  code?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export type CrRefund = {
  __typename?: 'CrRefund'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrRefund>
  amount: Scalars['Float']
  auditInfo?: Maybe<CrAuditInfo>
  id?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  payment?: Maybe<CrPayment>
  reason?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
  refundMethod?: Maybe<Scalars['String']>
}

export type CrRefund_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrRefundInput = {
  amount: Scalars['Float']
  auditInfo?: InputMaybe<CrAuditInfoInput>
  id?: InputMaybe<Scalars['String']>
  orderId?: InputMaybe<Scalars['String']>
  payment?: InputMaybe<CrPaymentInput>
  reason?: InputMaybe<Scalars['String']>
  reasonCode?: InputMaybe<Scalars['String']>
  refundMethod?: InputMaybe<Scalars['String']>
}

export type CrShipment = {
  __typename?: 'CrShipment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShipment>
  alternateContact?: Maybe<CrFulfillmentAlternateContact>
  auditInfo?: Maybe<CrAuditInfo>
  backorderCreatedDate?: Maybe<Scalars['Int']>
  canceledItems?: Maybe<Array<Maybe<CrCanceledItem>>>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  cost?: Maybe<Scalars['Float']>
  currencyCode?: Maybe<Scalars['String']>
  customer?: Maybe<CrCustomer>
  customerAccountId?: Maybe<Scalars['Int']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  destination?: Maybe<CrDestination>
  dutyAdjustment: Scalars['Float']
  dutyTotal: Scalars['Float']
  email?: Maybe<Scalars['String']>
  externalOrderId?: Maybe<Scalars['String']>
  externalShipmentId?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  futureDate?: Maybe<Scalars['DateTime']>
  handlingAdjustment: Scalars['Float']
  handlingSubtotal: Scalars['Float']
  handlingTaxAdjustment: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: Maybe<Scalars['String']>
  isExpress?: Maybe<Scalars['Boolean']>
  isTransfer?: Maybe<Scalars['Boolean']>
  items?: Maybe<Array<Maybe<CrShipmentItem>>>
  lineItemSubtotal: Scalars['Float']
  lineItemTaxAdjustment: Scalars['Float']
  lineItemTaxTotal: Scalars['Float']
  lineItemTotal: Scalars['Float']
  number?: Maybe<Scalars['Int']>
  orderId?: Maybe<Scalars['String']>
  orderNumber: Scalars['Int']
  orderSubmitDate?: Maybe<Scalars['DateTime']>
  origin?: Maybe<CrContact>
  originalShipmentNumber?: Maybe<Scalars['Int']>
  packages?: Maybe<Array<Maybe<CrPackageObj>>>
  parentCheckoutNumber?: Maybe<Scalars['Int']>
  parentShipmentNumber?: Maybe<Scalars['Int']>
  pickStatus?: Maybe<Scalars['String']>
  pickType?: Maybe<Scalars['String']>
  pickupInfo?: Maybe<Scalars['Object']>
  readyToCapture?: Maybe<Scalars['Boolean']>
  shipmentAdjustment: Scalars['Float']
  shipmentNotes?: Maybe<Array<Maybe<CrShipmentNote>>>
  shipmentStatus?: Maybe<Scalars['String']>
  shipmentStatusReason?: Maybe<CrShipmentStatusReason>
  shipmentType?: Maybe<Scalars['String']>
  shippingAdjustment: Scalars['Float']
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingSubtotal: Scalars['Float']
  shippingTaxAdjustment: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  shopperNotes?: Maybe<CrFulfillmentShopperNotes>
  taxData?: Maybe<Scalars['Object']>
  total: Scalars['Float']
  transferShipmentNumbers?: Maybe<Array<Scalars['Int']>>
  workflowProcessContainerId?: Maybe<Scalars['String']>
  workflowProcessId?: Maybe<Scalars['String']>
  workflowState?: Maybe<CrWorkflowState>
}

export type CrShipment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShipmentInput = {
  alternateContact?: InputMaybe<CrFulfillmentAlternateContactInput>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  backorderCreatedDate?: InputMaybe<Scalars['Int']>
  canceledItems?: InputMaybe<Array<InputMaybe<CrCanceledItemInput>>>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  cost?: InputMaybe<Scalars['Float']>
  currencyCode?: InputMaybe<Scalars['String']>
  customer?: InputMaybe<CrCustomerInput>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerTaxId?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  destination?: InputMaybe<CrDestinationInput>
  dutyAdjustment: Scalars['Float']
  dutyTotal: Scalars['Float']
  email?: InputMaybe<Scalars['String']>
  externalOrderId?: InputMaybe<Scalars['String']>
  externalShipmentId?: InputMaybe<Scalars['String']>
  fulfillmentDate?: InputMaybe<Scalars['DateTime']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  fulfillmentStatus?: InputMaybe<Scalars['String']>
  futureDate?: InputMaybe<Scalars['DateTime']>
  handlingAdjustment: Scalars['Float']
  handlingSubtotal: Scalars['Float']
  handlingTaxAdjustment: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: InputMaybe<Scalars['String']>
  isExpress?: InputMaybe<Scalars['Boolean']>
  isTransfer?: InputMaybe<Scalars['Boolean']>
  items?: InputMaybe<Array<InputMaybe<CrShipmentItemInput>>>
  lineItemSubtotal: Scalars['Float']
  lineItemTaxAdjustment: Scalars['Float']
  lineItemTaxTotal: Scalars['Float']
  lineItemTotal: Scalars['Float']
  number?: InputMaybe<Scalars['Int']>
  orderId?: InputMaybe<Scalars['String']>
  orderNumber: Scalars['Int']
  orderSubmitDate?: InputMaybe<Scalars['DateTime']>
  origin?: InputMaybe<CrContactInput>
  originalShipmentNumber?: InputMaybe<Scalars['Int']>
  packages?: InputMaybe<Array<InputMaybe<CrPackageObjInput>>>
  parentCheckoutNumber?: InputMaybe<Scalars['Int']>
  parentShipmentNumber?: InputMaybe<Scalars['Int']>
  pickStatus?: InputMaybe<Scalars['String']>
  pickType?: InputMaybe<Scalars['String']>
  pickupInfo?: InputMaybe<Scalars['Object']>
  readyToCapture?: InputMaybe<Scalars['Boolean']>
  shipmentAdjustment: Scalars['Float']
  shipmentNotes?: InputMaybe<Array<InputMaybe<CrShipmentNoteInput>>>
  shipmentStatus?: InputMaybe<Scalars['String']>
  shipmentStatusReason?: InputMaybe<CrShipmentStatusReasonInput>
  shipmentType?: InputMaybe<Scalars['String']>
  shippingAdjustment: Scalars['Float']
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
  shippingSubtotal: Scalars['Float']
  shippingTaxAdjustment: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  shopperNotes?: InputMaybe<CrFulfillmentShopperNotesInput>
  taxData?: InputMaybe<Scalars['Object']>
  total: Scalars['Float']
  transferShipmentNumbers?: InputMaybe<Array<Scalars['Int']>>
  workflowProcessContainerId?: InputMaybe<Scalars['String']>
  workflowProcessId?: InputMaybe<Scalars['String']>
  workflowState?: InputMaybe<CrWorkflowStateInput>
}

export type CrShipmentItem = {
  __typename?: 'CrShipmentItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShipmentItem>
  actualPrice: Scalars['Float']
  auditInfo?: Maybe<CrAuditInfo>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  cartItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  duty: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<CrFulfillmentField>>>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  giftCards?: Maybe<Array<Maybe<CrGiftCard>>>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<CrInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment?: Maybe<Scalars['Float']>
  lineItemCost: Scalars['Float']
  locatorName?: Maybe<Scalars['String']>
  measurements?: Maybe<CrPackageMeasurements>
  name?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  originalOrderItemId?: Maybe<Scalars['String']>
  overridePrice?: Maybe<Scalars['Float']>
  parentId?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  partNumber?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku?: Maybe<Scalars['String']>
  taxData?: Maybe<Scalars['Object']>
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  unitPrice: Scalars['Float']
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type CrShipmentItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShipmentItemInput = {
  actualPrice: Scalars['Float']
  auditInfo?: InputMaybe<CrAuditInfoInput>
  backorderReleaseDate?: InputMaybe<Scalars['DateTime']>
  cartItemId?: InputMaybe<Scalars['String']>
  childItemIds?: InputMaybe<Array<Scalars['String']>>
  data?: InputMaybe<Scalars['Object']>
  duty: Scalars['Float']
  fulfillmentFields?: InputMaybe<Array<InputMaybe<CrFulfillmentFieldInput>>>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  giftCards?: InputMaybe<Array<InputMaybe<CrGiftCardInput>>>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<CrInventoryTagsInput>>>
  isAssemblyRequired?: InputMaybe<Scalars['Boolean']>
  isPackagedStandAlone?: InputMaybe<Scalars['Boolean']>
  isReservedInventory?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment?: InputMaybe<Scalars['Float']>
  lineItemCost: Scalars['Float']
  locatorName?: InputMaybe<Scalars['String']>
  measurements?: InputMaybe<CrPackageMeasurementsInput>
  name?: InputMaybe<Scalars['String']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<InputMaybe<CrProductOptionInput>>>
  originalOrderItemId?: InputMaybe<Scalars['String']>
  overridePrice?: InputMaybe<Scalars['Float']>
  parentId?: InputMaybe<Scalars['String']>
  parentItemId?: InputMaybe<Scalars['String']>
  partNumber?: InputMaybe<Scalars['String']>
  productCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  readyForPickupQuantity?: InputMaybe<Scalars['Int']>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku?: InputMaybe<Scalars['String']>
  taxData?: InputMaybe<Scalars['Object']>
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  unitPrice: Scalars['Float']
  upc?: InputMaybe<Scalars['String']>
  variationProductCode?: InputMaybe<Scalars['String']>
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type CrShipmentNote = {
  __typename?: 'CrShipmentNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShipmentNote>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  noteId?: Maybe<Scalars['String']>
  noteText?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type CrShipmentNote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShipmentNoteInput = {
  attributes?: InputMaybe<Scalars['Object']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  noteId?: InputMaybe<Scalars['String']>
  noteText?: InputMaybe<Scalars['String']>
  role?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type CrShipmentStatusReason = {
  __typename?: 'CrShipmentStatusReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShipmentStatusReason>
  moreInfo?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
}

export type CrShipmentStatusReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShipmentStatusReasonInput = {
  moreInfo?: InputMaybe<Scalars['String']>
  reasonCode?: InputMaybe<Scalars['String']>
}

export type CrShippingDiscount = {
  __typename?: 'CrShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShippingDiscount>
  discount?: Maybe<CrAppliedDiscount>
  methodCode?: Maybe<Scalars['String']>
}

export type CrShippingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShippingDiscountInput = {
  discount?: InputMaybe<CrAppliedDiscountInput>
  methodCode?: InputMaybe<Scalars['String']>
}

export type CrShippingRate = {
  __typename?: 'CrShippingRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShippingRate>
  currencyCode?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  isValid?: Maybe<Scalars['Boolean']>
  messages?: Maybe<Array<Scalars['String']>>
  price?: Maybe<Scalars['Float']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingZoneCode?: Maybe<Scalars['String']>
}

export type CrShippingRate_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShippingRateInput = {
  currencyCode?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  isValid?: InputMaybe<Scalars['Boolean']>
  messages?: InputMaybe<Array<Scalars['String']>>
  price?: InputMaybe<Scalars['Float']>
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
  shippingZoneCode?: InputMaybe<Scalars['String']>
}

export type CrShopperNotes = {
  __typename?: 'CrShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrShopperNotes>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
  giftMessage?: Maybe<Scalars['String']>
}

export type CrShopperNotes_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrShopperNotesInput = {
  comments?: InputMaybe<Scalars['String']>
  deliveryInstructions?: InputMaybe<Scalars['String']>
  giftMessage?: InputMaybe<Scalars['String']>
}

export type CrSubPayment = {
  __typename?: 'CrSubPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrSubPayment>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRequested: Scalars['Float']
  status?: Maybe<Scalars['String']>
  target?: Maybe<CrPaymentActionTarget>
}

export type CrSubPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrSubPaymentInput = {
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRequested: Scalars['Float']
  status?: InputMaybe<Scalars['String']>
  target?: InputMaybe<CrPaymentActionTargetInput>
}

export type CrSubscriptionInfo = {
  __typename?: 'CrSubscriptionInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrSubscriptionInfo>
  frequency?: Maybe<CrFrequency>
  required?: Maybe<Scalars['Boolean']>
  trial?: Maybe<CrTrial>
}

export type CrSubscriptionInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrSubscriptionInfoInput = {
  frequency?: InputMaybe<CrFrequencyInput>
  required?: InputMaybe<Scalars['Boolean']>
  trial?: InputMaybe<CrTrialInput>
}

export type CrSuggestedDiscount = {
  __typename?: 'CrSuggestedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrSuggestedDiscount>
  autoAdd?: Maybe<Scalars['Boolean']>
  discountId: Scalars['Int']
  hasMultipleProducts?: Maybe<Scalars['Boolean']>
  hasOptions?: Maybe<Scalars['Boolean']>
  productCode?: Maybe<Scalars['String']>
}

export type CrSuggestedDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrSuggestedDiscountInput = {
  autoAdd?: InputMaybe<Scalars['Boolean']>
  discountId: Scalars['Int']
  hasMultipleProducts?: InputMaybe<Scalars['Boolean']>
  hasOptions?: InputMaybe<Scalars['Boolean']>
  productCode?: InputMaybe<Scalars['String']>
}

export type CrThresholdMessage = {
  __typename?: 'CrThresholdMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrThresholdMessage>
  discountId: Scalars['Int']
  message?: Maybe<Scalars['String']>
  requiresCouponCode?: Maybe<Scalars['Boolean']>
  showInCart?: Maybe<Scalars['Boolean']>
  showOnCheckout?: Maybe<Scalars['Boolean']>
  thresholdValue: Scalars['Float']
}

export type CrThresholdMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrThresholdMessageInput = {
  discountId: Scalars['Int']
  message?: InputMaybe<Scalars['String']>
  requiresCouponCode?: InputMaybe<Scalars['Boolean']>
  showInCart?: InputMaybe<Scalars['Boolean']>
  showOnCheckout?: InputMaybe<Scalars['Boolean']>
  thresholdValue: Scalars['Float']
}

export type CrTracking = {
  __typename?: 'CrTracking'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrTracking>
  attributes?: Maybe<Scalars['Object']>
  number?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type CrTracking_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrTrackingInput = {
  attributes?: InputMaybe<Scalars['Object']>
  number?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type CrTrial = {
  __typename?: 'CrTrial'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrTrial>
  duration: Scalars['Int']
  enabled?: Maybe<Scalars['Boolean']>
  substituteProductCode?: Maybe<Scalars['String']>
  substituteProductOptions?: Maybe<Array<Maybe<CrProductOption>>>
  substituteProductQuantity: Scalars['Int']
  substituteVariationProductCode?: Maybe<Scalars['String']>
}

export type CrTrial_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrTrialInput = {
  duration: Scalars['Int']
  enabled?: InputMaybe<Scalars['Boolean']>
  substituteProductCode?: InputMaybe<Scalars['String']>
  substituteProductOptions?: InputMaybe<Array<InputMaybe<CrProductOptionInput>>>
  substituteProductQuantity: Scalars['Int']
  substituteVariationProductCode?: InputMaybe<Scalars['String']>
}

export type CrWishlist = {
  __typename?: 'CrWishlist'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrWishlist>
  auditInfo?: Maybe<CrAuditInfo>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  discountThresholdMessages?: Maybe<Array<Maybe<CrThresholdMessage>>>
  discountTotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  expirationDate?: Maybe<Scalars['DateTime']>
  extendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  externalId?: Maybe<Scalars['String']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentInfo?: Maybe<CrFulfillmentInfo>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  importDate?: Maybe<Scalars['DateTime']>
  isImport?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  items?: Maybe<Array<Maybe<CrWishlistItem>>>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  privacyType?: Maybe<Scalars['String']>
  rejectedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  siteId?: Maybe<Scalars['Int']>
  sortOrder?: Maybe<Scalars['Int']>
  subtotal?: Maybe<Scalars['Float']>
  suggestedDiscounts?: Maybe<Array<Maybe<CrSuggestedDiscount>>>
  taxData?: Maybe<Scalars['Object']>
  taxTotal?: Maybe<Scalars['Float']>
  tenantId?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Float']>
  typeTag?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type CrWishlist_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrWishlistInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  channelCode?: InputMaybe<Scalars['String']>
  currencyCode?: InputMaybe<Scalars['String']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  discountThresholdMessages?: InputMaybe<Array<InputMaybe<CrThresholdMessageInput>>>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedSubtotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  expirationDate?: InputMaybe<Scalars['DateTime']>
  extendedProperties?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
  externalId?: InputMaybe<Scalars['String']>
  feeTotal?: InputMaybe<Scalars['Float']>
  fulfillmentInfo?: InputMaybe<CrFulfillmentInfoInput>
  handlingTaxTotal?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  importDate?: InputMaybe<Scalars['DateTime']>
  isImport?: InputMaybe<Scalars['Boolean']>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  items?: InputMaybe<Array<InputMaybe<CrWishlistItemInput>>>
  lastValidationDate?: InputMaybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: InputMaybe<Scalars['Float']>
  name?: InputMaybe<Scalars['String']>
  orderDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  privacyType?: InputMaybe<Scalars['String']>
  rejectedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingSubTotal?: InputMaybe<Scalars['Float']>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  siteId?: InputMaybe<Scalars['Int']>
  sortOrder?: InputMaybe<Scalars['Int']>
  subtotal?: InputMaybe<Scalars['Float']>
  suggestedDiscounts?: InputMaybe<Array<InputMaybe<CrSuggestedDiscountInput>>>
  taxData?: InputMaybe<Scalars['Object']>
  taxTotal?: InputMaybe<Scalars['Float']>
  tenantId?: InputMaybe<Scalars['Int']>
  total?: InputMaybe<Scalars['Float']>
  typeTag?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
}

export type CrWishlistItem = {
  __typename?: 'CrWishlistItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrWishlistItem>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CrAuditInfo>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  comments?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<CrInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  lineId?: Maybe<Scalars['Int']>
  lineItemAdjustment?: Maybe<Scalars['Float']>
  localeCode?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  priorityType?: Maybe<Scalars['String']>
  product?: Maybe<CrProduct>
  productDiscount?: Maybe<CrAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<CrAppliedLineItemProductDiscount>>>
  purchasableStatusType?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<CrAppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  subtotal?: Maybe<Scalars['Float']>
  taxData?: Maybe<Scalars['Object']>
  taxableTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CrCommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
}

export type CrWishlistItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrWishlistItemInput = {
  adjustedLineItemSubtotal?: InputMaybe<Scalars['Float']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  autoAddDiscountId?: InputMaybe<Scalars['Int']>
  childItemIds?: InputMaybe<Array<Scalars['String']>>
  comments?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  extendedTotal?: InputMaybe<Scalars['Float']>
  feeTotal?: InputMaybe<Scalars['Float']>
  handlingAmount?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<CrInventoryTagsInput>>>
  isAssemblyRequired?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  lineId?: InputMaybe<Scalars['Int']>
  lineItemAdjustment?: InputMaybe<Scalars['Float']>
  localeCode?: InputMaybe<Scalars['String']>
  parentItemId?: InputMaybe<Scalars['String']>
  priorityType?: InputMaybe<Scalars['String']>
  product?: InputMaybe<CrProductInput>
  productDiscount?: InputMaybe<CrAppliedLineItemProductDiscountInput>
  productDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedLineItemProductDiscountInput>>>
  purchasableStatusType?: InputMaybe<Scalars['String']>
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  subtotal?: InputMaybe<Scalars['Float']>
  taxData?: InputMaybe<Scalars['Object']>
  taxableTotal?: InputMaybe<Scalars['Float']>
  total?: InputMaybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  unitPrice?: InputMaybe<CrCommerceUnitPriceInput>
  weightedOrderAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderDuty?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFee?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: InputMaybe<Scalars['Float']>
  weightedOrderShipping?: InputMaybe<Scalars['Float']>
  weightedOrderShippingDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderShippingTax?: InputMaybe<Scalars['Float']>
  weightedOrderTax?: InputMaybe<Scalars['Float']>
}

export type CrWorkflowState = {
  __typename?: 'CrWorkflowState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrWorkflowState>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  completedDate?: Maybe<Scalars['DateTime']>
  processInstanceId?: Maybe<Scalars['String']>
  shipmentState?: Maybe<Scalars['String']>
  taskList?: Maybe<Array<Maybe<CrFulfillmentTask>>>
}

export type CrWorkflowState_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CrWorkflowStateInput = {
  attributes?: InputMaybe<Scalars['Object']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  completedDate?: InputMaybe<Scalars['DateTime']>
  processInstanceId?: InputMaybe<Scalars['String']>
  shipmentState?: InputMaybe<Scalars['String']>
  taskList?: InputMaybe<Array<InputMaybe<CrFulfillmentTaskInput>>>
}

export type Credit = {
  __typename?: 'Credit'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Credit>
  amount: Scalars['Float']
  auditInfo?: Maybe<CrAuditInfo>
  giftCard?: Maybe<CrGatewayGiftCard>
  id?: Maybe<Scalars['String']>
  parentPaymentId?: Maybe<Scalars['String']>
  parentPaymentInteractionId?: Maybe<Scalars['String']>
}

export type Credit_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CreditAuditEntry = {
  __typename?: 'CreditAuditEntry'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditAuditEntry>
  activityType?: Maybe<Scalars['String']>
  activityTypeId: Scalars['Int']
  auditInfo?: Maybe<CuAuditInfo>
  details?: Maybe<Scalars['String']>
}

export type CreditAuditEntry_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CreditAuditEntryCollection = {
  __typename?: 'CreditAuditEntryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditAuditEntryCollection>
  items?: Maybe<Array<Maybe<CreditAuditEntry>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CreditAuditEntryCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CreditCollection = {
  __typename?: 'CreditCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditCollection>
  items?: Maybe<Array<Maybe<CuCredit>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CreditCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CreditInput = {
  amount: Scalars['Float']
  auditInfo?: InputMaybe<CrAuditInfoInput>
  giftCard?: InputMaybe<CrGatewayGiftCardInput>
  id?: InputMaybe<Scalars['String']>
  parentPaymentId?: InputMaybe<Scalars['String']>
  parentPaymentInteractionId?: InputMaybe<Scalars['String']>
}

export type CreditTransaction = {
  __typename?: 'CreditTransaction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditTransaction>
  auditInfo?: Maybe<CuAuditInfo>
  comments?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  id?: Maybe<Scalars['Int']>
  impactAmount?: Maybe<Scalars['Float']>
  orderId?: Maybe<Scalars['String']>
  transactionType?: Maybe<Scalars['String']>
}

export type CreditTransaction_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CreditTransactionCollection = {
  __typename?: 'CreditTransactionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditTransactionCollection>
  items?: Maybe<Array<Maybe<CreditTransaction>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CreditTransactionCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CreditTransactionInput = {
  auditInfo?: InputMaybe<CuAuditInfoInput>
  comments?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  id?: InputMaybe<Scalars['Int']>
  impactAmount?: InputMaybe<Scalars['Float']>
  orderId?: InputMaybe<Scalars['String']>
  transactionType?: InputMaybe<Scalars['String']>
}

export type CuAddress = {
  __typename?: 'CuAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
  postalOrZipCode?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
}

export type CuAddress_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAddressInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  address3?: InputMaybe<Scalars['String']>
  address4?: InputMaybe<Scalars['String']>
  addressType?: InputMaybe<Scalars['String']>
  cityOrTown?: InputMaybe<Scalars['String']>
  countryCode?: InputMaybe<Scalars['String']>
  isValidated?: InputMaybe<Scalars['Boolean']>
  postalOrZipCode?: InputMaybe<Scalars['String']>
  stateOrProvince?: InputMaybe<Scalars['String']>
}

export type CuAttribute = {
  __typename?: 'CuAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttribute>
  adminName?: Maybe<Scalars['String']>
  attributeCode: Scalars['String']
  attributeFQN?: Maybe<Scalars['String']>
  attributeMetadata?: Maybe<Array<Maybe<CuAttributeMetadataItem>>>
  auditInfo?: Maybe<CuAuditInfo>
  content?: Maybe<CuAttributeLocalizedContent>
  dataType?: Maybe<Scalars['String']>
  displayGroup: Scalars['String']
  id?: Maybe<Scalars['Int']>
  inputType?: Maybe<Scalars['String']>
  isActive?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isReadOnly?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  isVisible?: Maybe<Scalars['Boolean']>
  namespace?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  validation?: Maybe<CuAttributeValidation>
  valueType: Scalars['String']
  vocabularyValues?: Maybe<Array<Maybe<CuAttributeVocabularyValue>>>
}

export type CuAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeCollection = {
  __typename?: 'CuAttributeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeCollection>
  items?: Maybe<Array<Maybe<CuAttribute>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CuAttributeCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeInput = {
  adminName?: InputMaybe<Scalars['String']>
  attributeCode: Scalars['String']
  attributeFQN?: InputMaybe<Scalars['String']>
  attributeMetadata?: InputMaybe<Array<InputMaybe<CuAttributeMetadataItemInput>>>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  content?: InputMaybe<CuAttributeLocalizedContentInput>
  dataType?: InputMaybe<Scalars['String']>
  displayGroup: Scalars['String']
  id?: InputMaybe<Scalars['Int']>
  inputType?: InputMaybe<Scalars['String']>
  isActive?: InputMaybe<Scalars['Boolean']>
  isMultiValued?: InputMaybe<Scalars['Boolean']>
  isReadOnly?: InputMaybe<Scalars['Boolean']>
  isRequired?: InputMaybe<Scalars['Boolean']>
  isVisible?: InputMaybe<Scalars['Boolean']>
  namespace?: InputMaybe<Scalars['String']>
  order?: InputMaybe<Scalars['Int']>
  validation?: InputMaybe<CuAttributeValidationInput>
  valueType: Scalars['String']
  vocabularyValues?: InputMaybe<Array<InputMaybe<CuAttributeVocabularyValueInput>>>
}

export type CuAttributeLocalizedContent = {
  __typename?: 'CuAttributeLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CuAttributeLocalizedContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeLocalizedContentInput = {
  localeCode?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type CuAttributeMetadataItem = {
  __typename?: 'CuAttributeMetadataItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeMetadataItem>
  key: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeMetadataItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeMetadataItemInput = {
  key: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeValidation = {
  __typename?: 'CuAttributeValidation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeValidation>
  maxDateTime?: Maybe<Scalars['DateTime']>
  maxNumericValue?: Maybe<Scalars['Float']>
  maxStringLength?: Maybe<Scalars['Int']>
  minDateTime?: Maybe<Scalars['DateTime']>
  minNumericValue?: Maybe<Scalars['Float']>
  minStringLength?: Maybe<Scalars['Int']>
  regularExpression?: Maybe<Scalars['String']>
}

export type CuAttributeValidation_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeValidationInput = {
  maxDateTime?: InputMaybe<Scalars['DateTime']>
  maxNumericValue?: InputMaybe<Scalars['Float']>
  maxStringLength?: InputMaybe<Scalars['Int']>
  minDateTime?: InputMaybe<Scalars['DateTime']>
  minNumericValue?: InputMaybe<Scalars['Float']>
  minStringLength?: InputMaybe<Scalars['Int']>
  regularExpression?: InputMaybe<Scalars['String']>
}

export type CuAttributeValueLocalizedContent = {
  __typename?: 'CuAttributeValueLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeValueLocalizedContent>
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeValueLocalizedContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeValueLocalizedContentInput = {
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeVocabularyValue = {
  __typename?: 'CuAttributeVocabularyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeVocabularyValue>
  content?: Maybe<CuAttributeValueLocalizedContent>
  isHidden?: Maybe<Scalars['Boolean']>
  sequence?: Maybe<Scalars['Int']>
  value: Scalars['String']
}

export type CuAttributeVocabularyValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAttributeVocabularyValueInput = {
  content?: InputMaybe<CuAttributeValueLocalizedContentInput>
  isHidden?: InputMaybe<Scalars['Boolean']>
  sequence?: InputMaybe<Scalars['Int']>
  value: Scalars['String']
}

export type CuAuditInfo = {
  __typename?: 'CuAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAuditInfo>
  createBy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  updateDate?: Maybe<Scalars['DateTime']>
}

export type CuAuditInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuAuditInfoInput = {
  createBy?: InputMaybe<Scalars['String']>
  createDate?: InputMaybe<Scalars['DateTime']>
  updateBy?: InputMaybe<Scalars['String']>
  updateDate?: InputMaybe<Scalars['DateTime']>
}

export type CuCredit = {
  __typename?: 'CuCredit'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuCredit>
  activationDate?: Maybe<Scalars['DateTime']>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars['String']>
  creditType?: Maybe<Scalars['String']>
  creditTypeId: Scalars['Int']
  currencyCode?: Maybe<Scalars['String']>
  currentBalance?: Maybe<Scalars['Float']>
  customCreditType?: Maybe<Scalars['String']>
  customerId?: Maybe<Scalars['Int']>
  expirationDate?: Maybe<Scalars['DateTime']>
  initialBalance?: Maybe<Scalars['Float']>
}

export type CuCredit_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuCreditInput = {
  activationDate?: InputMaybe<Scalars['DateTime']>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  creditType?: InputMaybe<Scalars['String']>
  creditTypeId: Scalars['Int']
  currencyCode?: InputMaybe<Scalars['String']>
  currentBalance?: InputMaybe<Scalars['Float']>
  customCreditType?: InputMaybe<Scalars['String']>
  customerId?: InputMaybe<Scalars['Int']>
  expirationDate?: InputMaybe<Scalars['DateTime']>
  initialBalance?: InputMaybe<Scalars['Float']>
}

export type CuPhone = {
  __typename?: 'CuPhone'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuPhone>
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type CuPhone_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CuPhoneInput = {
  home?: InputMaybe<Scalars['String']>
  mobile?: InputMaybe<Scalars['String']>
  work?: InputMaybe<Scalars['String']>
}

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CurrencyAmount>
  amount: Scalars['Float']
  currencyCode?: Maybe<Scalars['String']>
}

export type CurrencyAmount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CurrencyAmountInput = {
  amount: Scalars['Float']
  currencyCode?: InputMaybe<Scalars['String']>
}

export type CurrencyExchangeRate = {
  __typename?: 'CurrencyExchangeRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CurrencyExchangeRate>
  decimalPlaces?: Maybe<Scalars['Int']>
  fromCurrencyCode?: Maybe<Scalars['String']>
  multiplier?: Maybe<Scalars['Float']>
  rate?: Maybe<Scalars['Float']>
  referenceData?: Maybe<Scalars['String']>
  roundingStrategy?: Maybe<Scalars['Int']>
  toCurrencyCode?: Maybe<Scalars['String']>
}

export type CurrencyExchangeRate_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomAttribute = {
  __typename?: 'CustomAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomAttribute>
  childAttributes?: Maybe<Array<Maybe<CustomAttribute>>>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CustomAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomAttributeInput = {
  childAttributes?: InputMaybe<Array<InputMaybe<CustomAttributeInput>>>
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type CustomerAccount = {
  __typename?: 'CustomerAccount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAccount>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  accountType?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<Maybe<CustomerAttribute>>>
  auditInfo?: Maybe<CuAuditInfo>
  commerceSummary?: Maybe<CommerceSummary>
  companyOrOrganization?: Maybe<Scalars['String']>
  contacts?: Maybe<Array<Maybe<CustomerContact>>>
  customerSet?: Maybe<Scalars['String']>
  customerSinceDate?: Maybe<Scalars['DateTime']>
  emailAddress?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  hasExternalPassword?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  isActive?: Maybe<Scalars['Boolean']>
  isAnonymous?: Maybe<Scalars['Boolean']>
  isLocked?: Maybe<Scalars['Boolean']>
  lastName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<CustomerNote>>>
  segments?: Maybe<Array<Maybe<CustomerSegment>>>
  taxExempt?: Maybe<Scalars['Boolean']>
  taxId?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
}

export type CustomerAccount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerAccountAndAuthInfoInput = {
  account?: InputMaybe<CustomerAccountInput>
  externalPassword?: InputMaybe<Scalars['String']>
  isImport?: InputMaybe<Scalars['Boolean']>
  password?: InputMaybe<Scalars['String']>
}

export type CustomerAccountCollection = {
  __typename?: 'CustomerAccountCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAccountCollection>
  items?: Maybe<Array<Maybe<CustomerAccount>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerAccountCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerAccountInput = {
  acceptsMarketing?: InputMaybe<Scalars['Boolean']>
  accountType?: InputMaybe<Scalars['String']>
  attributes?: InputMaybe<Array<InputMaybe<CustomerAttributeInput>>>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  commerceSummary?: InputMaybe<CommerceSummaryInput>
  companyOrOrganization?: InputMaybe<Scalars['String']>
  contacts?: InputMaybe<Array<InputMaybe<CustomerContactInput>>>
  customerSet?: InputMaybe<Scalars['String']>
  customerSinceDate?: InputMaybe<Scalars['DateTime']>
  emailAddress?: InputMaybe<Scalars['String']>
  externalId?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  hasExternalPassword?: InputMaybe<Scalars['Boolean']>
  id: Scalars['Int']
  isActive?: InputMaybe<Scalars['Boolean']>
  isAnonymous?: InputMaybe<Scalars['Boolean']>
  isLocked?: InputMaybe<Scalars['Boolean']>
  lastName?: InputMaybe<Scalars['String']>
  localeCode?: InputMaybe<Scalars['String']>
  notes?: InputMaybe<Array<InputMaybe<CustomerNoteInput>>>
  segments?: InputMaybe<Array<InputMaybe<CustomerSegmentInput>>>
  taxExempt?: InputMaybe<Scalars['Boolean']>
  taxId?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
  userName?: InputMaybe<Scalars['String']>
}

export type CustomerAttribute = {
  __typename?: 'CustomerAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAttribute>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  auditInfo?: Maybe<CuAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type CustomerAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerAttributeCollection = {
  __typename?: 'CustomerAttributeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAttributeCollection>
  items?: Maybe<Array<Maybe<CustomerAttribute>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerAttributeCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerAttributeInput = {
  attributeDefinitionId?: InputMaybe<Scalars['Int']>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  fullyQualifiedName?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<Scalars['Object']>>
}

export type CustomerAuditEntry = {
  __typename?: 'CustomerAuditEntry'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAuditEntry>
  application?: Maybe<Scalars['String']>
  customerAccountId: Scalars['Int']
  customerAuditEntryId: Scalars['Int']
  description?: Maybe<Scalars['String']>
  entryDate: Scalars['DateTime']
  entryUser?: Maybe<Scalars['String']>
  fieldPath?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
}

export type CustomerAuditEntry_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerAuditEntryCollection = {
  __typename?: 'CustomerAuditEntryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAuditEntryCollection>
  items?: Maybe<Array<Maybe<CustomerAuditEntry>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerAuditEntryCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerAuthTicket = {
  __typename?: 'CustomerAuthTicket'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAuthTicket>
  accessToken?: Maybe<Scalars['String']>
  accessTokenExpiration: Scalars['DateTime']
  customerAccount?: Maybe<CustomerAccount>
  jwtAccessToken?: Maybe<Scalars['String']>
  refreshToken?: Maybe<Scalars['String']>
  refreshTokenExpiration: Scalars['DateTime']
  userId?: Maybe<Scalars['String']>
}

export type CustomerAuthTicket_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerContact = {
  __typename?: 'CustomerContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerContact>
  accountId: Scalars['Int']
  address?: Maybe<CuAddress>
  auditInfo?: Maybe<CuAuditInfo>
  companyOrOrganization?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  faxNumber?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  label?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<CuPhone>
  types?: Maybe<Array<Maybe<ContactType>>>
}

export type CustomerContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerContactCollection = {
  __typename?: 'CustomerContactCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerContactCollection>
  items?: Maybe<Array<Maybe<CustomerContact>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerContactCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerContactInput = {
  accountId: Scalars['Int']
  address?: InputMaybe<CuAddressInput>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  companyOrOrganization?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  faxNumber?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  label?: InputMaybe<Scalars['String']>
  lastNameOrSurname?: InputMaybe<Scalars['String']>
  middleNameOrInitial?: InputMaybe<Scalars['String']>
  phoneNumbers?: InputMaybe<CuPhoneInput>
  types?: InputMaybe<Array<InputMaybe<ContactTypeInput>>>
}

export type CustomerLoginInfoInput = {
  emailAddress?: InputMaybe<Scalars['String']>
  externalPassword?: InputMaybe<Scalars['String']>
  isImport?: InputMaybe<Scalars['Boolean']>
  password?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type CustomerNote = {
  __typename?: 'CustomerNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerNote>
  auditInfo?: Maybe<CuAuditInfo>
  content?: Maybe<Scalars['String']>
  id: Scalars['Int']
}

export type CustomerNote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerNoteCollection = {
  __typename?: 'CustomerNoteCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerNoteCollection>
  items?: Maybe<Array<Maybe<CustomerNote>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerNoteCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerNoteInput = {
  auditInfo?: InputMaybe<CuAuditInfoInput>
  content?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
}

export type CustomerPurchaseOrderAccount = {
  __typename?: 'CustomerPurchaseOrderAccount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerPurchaseOrderAccount>
  accountId: Scalars['Int']
  auditInfo?: Maybe<CuAuditInfo>
  availableBalance: Scalars['Float']
  creditLimit: Scalars['Float']
  customerPurchaseOrderPaymentTerms?: Maybe<Array<Maybe<CustomerPurchaseOrderPaymentTerm>>>
  id: Scalars['Int']
  isEnabled?: Maybe<Scalars['Boolean']>
  overdraftAllowance?: Maybe<Scalars['Float']>
  overdraftAllowanceType?: Maybe<Scalars['String']>
  totalAvailableBalance: Scalars['Float']
}

export type CustomerPurchaseOrderAccount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerPurchaseOrderAccountCollection = {
  __typename?: 'CustomerPurchaseOrderAccountCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerPurchaseOrderAccountCollection>
  items?: Maybe<Array<Maybe<CustomerPurchaseOrderAccount>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerPurchaseOrderAccountCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerPurchaseOrderAccountInput = {
  accountId: Scalars['Int']
  auditInfo?: InputMaybe<CuAuditInfoInput>
  availableBalance: Scalars['Float']
  creditLimit: Scalars['Float']
  customerPurchaseOrderPaymentTerms?: InputMaybe<
    Array<InputMaybe<CustomerPurchaseOrderPaymentTermInput>>
  >
  id: Scalars['Int']
  isEnabled?: InputMaybe<Scalars['Boolean']>
  overdraftAllowance?: InputMaybe<Scalars['Float']>
  overdraftAllowanceType?: InputMaybe<Scalars['String']>
  totalAvailableBalance: Scalars['Float']
}

export type CustomerPurchaseOrderPaymentTerm = {
  __typename?: 'CustomerPurchaseOrderPaymentTerm'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerPurchaseOrderPaymentTerm>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
}

export type CustomerPurchaseOrderPaymentTerm_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerPurchaseOrderPaymentTermInput = {
  auditInfo?: InputMaybe<CuAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  siteId: Scalars['Int']
}

export type CustomerSegment = {
  __typename?: 'CustomerSegment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSegment>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
}

export type CustomerSegment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerSegmentCollection = {
  __typename?: 'CustomerSegmentCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSegmentCollection>
  items?: Maybe<Array<Maybe<CustomerSegment>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerSegmentCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerSegmentInput = {
  auditInfo?: InputMaybe<CuAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  name?: InputMaybe<Scalars['String']>
}

export type CustomerSet = {
  __typename?: 'CustomerSet'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSet>
  aggregateInfo?: Maybe<CustomerSetAggregateInfo>
  auditInfo?: Maybe<CuAuditInfo>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  isDefault?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  sites?: Maybe<Array<Maybe<CustomerSetSite>>>
}

export type CustomerSet_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerSetAggregateInfo = {
  __typename?: 'CustomerSetAggregateInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSetAggregateInfo>
  customerCount: Scalars['Int']
}

export type CustomerSetAggregateInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerSetCollection = {
  __typename?: 'CustomerSetCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSetCollection>
  items?: Maybe<Array<Maybe<CustomerSet>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type CustomerSetCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerSetSite = {
  __typename?: 'CustomerSetSite'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSetSite>
  customerSetCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
}

export type CustomerSetSite_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type CustomerUserAuthInfoInput = {
  password?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type DigitalWalletInput = {
  cartId?: InputMaybe<Scalars['String']>
  digitalWalletData?: InputMaybe<Scalars['String']>
}

export type DiscountSelectionsInput = {
  discountIds?: InputMaybe<Array<Scalars['Int']>>
}

export type DiscountValidationSummary = {
  __typename?: 'DiscountValidationSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DiscountValidationSummary>
  applicableDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
}

export type DiscountValidationSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Document = {
  __typename?: 'Document'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Document>
  activeDateRange?: Maybe<ActiveDateRange>
  contentLength?: Maybe<Scalars['Int']>
  contentMimeType?: Maybe<Scalars['String']>
  contentUpdateDate?: Maybe<Scalars['DateTime']>
  documentTypeFQN?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  insertDate?: Maybe<Scalars['DateTime']>
  listFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  properties?: Maybe<Scalars['Object']>
  publishSetCode?: Maybe<Scalars['String']>
  publishState?: Maybe<Scalars['String']>
  updateDate?: Maybe<Scalars['DateTime']>
}

export type Document_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentCollection = {
  __typename?: 'DocumentCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentCollection>
  items?: Maybe<Array<Maybe<Document>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  subPaths?: Maybe<Array<Scalars['String']>>
  totalCount: Scalars['Int']
}

export type DocumentCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentDraftSummary = {
  __typename?: 'DocumentDraftSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentDraftSummary>
  activeUpdateDate?: Maybe<Scalars['DateTime']>
  activeUpdatedBy?: Maybe<Scalars['String']>
  catalogId?: Maybe<Scalars['Int']>
  documentTypeFQN?: Maybe<Scalars['String']>
  draftUpdateDate: Scalars['DateTime']
  id?: Maybe<Scalars['String']>
  listFQN?: Maybe<Scalars['String']>
  masterCatalogId?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  publishSetCode?: Maybe<Scalars['String']>
  publishType?: Maybe<Scalars['String']>
  siteId?: Maybe<Scalars['Int']>
  updatedBy?: Maybe<Scalars['String']>
}

export type DocumentDraftSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentDraftSummaryPagedCollection = {
  __typename?: 'DocumentDraftSummaryPagedCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentDraftSummaryPagedCollection>
  items?: Maybe<Array<Maybe<DocumentDraftSummary>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type DocumentDraftSummaryPagedCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentInput = {
  activeDateRange?: InputMaybe<ActiveDateRangeInput>
  contentLength?: InputMaybe<Scalars['Int']>
  contentMimeType?: InputMaybe<Scalars['String']>
  contentUpdateDate?: InputMaybe<Scalars['DateTime']>
  documentTypeFQN?: InputMaybe<Scalars['String']>
  extension?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  insertDate?: InputMaybe<Scalars['DateTime']>
  listFQN?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  path?: InputMaybe<Scalars['String']>
  properties?: InputMaybe<Scalars['Object']>
  publishSetCode?: InputMaybe<Scalars['String']>
  publishState?: InputMaybe<Scalars['String']>
  updateDate?: InputMaybe<Scalars['DateTime']>
}

export type DocumentInstallation = {
  __typename?: 'DocumentInstallation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentInstallation>
  documentTypeFQN?: Maybe<Scalars['String']>
  locale?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  properties?: Maybe<Scalars['Object']>
}

export type DocumentInstallation_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentInstallationInput = {
  documentTypeFQN?: InputMaybe<Scalars['String']>
  locale?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  properties?: InputMaybe<Scalars['Object']>
}

export type DocumentList = {
  __typename?: 'DocumentList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentList>
  documentListType?: Maybe<Scalars['String']>
  documentTypes?: Maybe<Array<Scalars['String']>>
  enableActiveDateRanges?: Maybe<Scalars['Boolean']>
  enablePublishing?: Maybe<Scalars['Boolean']>
  listFQN?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  scopeId?: Maybe<Scalars['Int']>
  scopeType?: Maybe<Scalars['String']>
  security?: Maybe<Scalars['String']>
  supportsActiveDateRanges?: Maybe<Scalars['Boolean']>
  supportsPublishing?: Maybe<Scalars['Boolean']>
  usages?: Maybe<Array<Scalars['String']>>
  views?: Maybe<Array<Maybe<View>>>
}

export type DocumentList_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentListCollection = {
  __typename?: 'DocumentListCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentListCollection>
  items?: Maybe<Array<Maybe<DocumentList>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type DocumentListCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentListInput = {
  documentListType?: InputMaybe<Scalars['String']>
  documentTypes?: InputMaybe<Array<Scalars['String']>>
  enableActiveDateRanges?: InputMaybe<Scalars['Boolean']>
  enablePublishing?: InputMaybe<Scalars['Boolean']>
  listFQN?: InputMaybe<Scalars['String']>
  metadata?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  namespace?: InputMaybe<Scalars['String']>
  scopeId?: InputMaybe<Scalars['Int']>
  scopeType?: InputMaybe<Scalars['String']>
  security?: InputMaybe<Scalars['String']>
  supportsActiveDateRanges?: InputMaybe<Scalars['Boolean']>
  supportsPublishing?: InputMaybe<Scalars['Boolean']>
  usages?: InputMaybe<Array<Scalars['String']>>
  views?: InputMaybe<Array<InputMaybe<ViewInput>>>
}

export type DocumentListType = {
  __typename?: 'DocumentListType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentListType>
  defaultDocuments?: Maybe<Array<Maybe<DocumentInstallation>>>
  documentListTypeFQN?: Maybe<Scalars['String']>
  documentTypeFQNs?: Maybe<Array<Scalars['String']>>
  enableActiveDateRanges?: Maybe<Scalars['Boolean']>
  enablePublishing?: Maybe<Scalars['Boolean']>
  installationPackage?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  scopeType?: Maybe<Scalars['String']>
  supportsActiveDateRanges?: Maybe<Scalars['Boolean']>
  supportsPublishing?: Maybe<Scalars['Boolean']>
  usages?: Maybe<Array<Scalars['String']>>
  version?: Maybe<Scalars['String']>
  views?: Maybe<Array<Maybe<View>>>
}

export type DocumentListType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentListTypeCollection = {
  __typename?: 'DocumentListTypeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentListTypeCollection>
  items?: Maybe<Array<Maybe<DocumentListType>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type DocumentListTypeCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentListTypeInput = {
  defaultDocuments?: InputMaybe<Array<InputMaybe<DocumentInstallationInput>>>
  documentListTypeFQN?: InputMaybe<Scalars['String']>
  documentTypeFQNs?: InputMaybe<Array<Scalars['String']>>
  enableActiveDateRanges?: InputMaybe<Scalars['Boolean']>
  enablePublishing?: InputMaybe<Scalars['Boolean']>
  installationPackage?: InputMaybe<Scalars['String']>
  metadata?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  namespace?: InputMaybe<Scalars['String']>
  scopeType?: InputMaybe<Scalars['String']>
  supportsActiveDateRanges?: InputMaybe<Scalars['Boolean']>
  supportsPublishing?: InputMaybe<Scalars['Boolean']>
  usages?: InputMaybe<Array<Scalars['String']>>
  version?: InputMaybe<Scalars['String']>
  views?: InputMaybe<Array<InputMaybe<ViewInput>>>
}

export type DocumentType = {
  __typename?: 'DocumentType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentType>
  adminName?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  properties?: Maybe<Array<Maybe<Property>>>
  version?: Maybe<Scalars['String']>
}

export type DocumentType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentTypeCollection = {
  __typename?: 'DocumentTypeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentTypeCollection>
  items?: Maybe<Array<Maybe<DocumentType>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type DocumentTypeCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type DocumentTypeInput = {
  adminName?: InputMaybe<Scalars['String']>
  documentTypeFQN?: InputMaybe<Scalars['String']>
  installationPackage?: InputMaybe<Scalars['String']>
  metadata?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  namespace?: InputMaybe<Scalars['String']>
  properties?: InputMaybe<Array<InputMaybe<PropertyInput>>>
  version?: InputMaybe<Scalars['String']>
}

export type EntityCollection = {
  __typename?: 'EntityCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityCollection>
  items?: Maybe<Array<Scalars['Object']>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type EntityCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type EntityContainer = {
  __typename?: 'EntityContainer'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityContainer>
  catalogId?: Maybe<Scalars['Int']>
  createBy?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  id?: Maybe<Scalars['String']>
  item?: Maybe<Scalars['Object']>
  listFullName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  masterCatalogId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  tenantId: Scalars['Int']
  updateBy?: Maybe<Scalars['String']>
  updateDate: Scalars['DateTime']
  userId?: Maybe<Scalars['String']>
}

export type EntityContainer_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type EntityContainerCollection = {
  __typename?: 'EntityContainerCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityContainerCollection>
  items?: Maybe<Array<Maybe<EntityContainer>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type EntityContainerCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type EntityList = {
  __typename?: 'EntityList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityList>
  contextLevel?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  idProperty?: Maybe<IndexedProperty>
  indexA?: Maybe<IndexedProperty>
  indexB?: Maybe<IndexedProperty>
  indexC?: Maybe<IndexedProperty>
  indexD?: Maybe<IndexedProperty>
  isLocaleSpecific?: Maybe<Scalars['Boolean']>
  isSandboxDataCloningSupported?: Maybe<Scalars['Boolean']>
  isShopperSpecific?: Maybe<Scalars['Boolean']>
  isVisibleInStorefront?: Maybe<Scalars['Boolean']>
  metadata?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  nameSpace?: Maybe<Scalars['String']>
  tenantId: Scalars['Int']
  updateDate: Scalars['DateTime']
  usages?: Maybe<Array<Scalars['String']>>
  useSystemAssignedId?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<ListView>>>
}

export type EntityList_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type EntityListCollection = {
  __typename?: 'EntityListCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityListCollection>
  items?: Maybe<Array<Maybe<EntityList>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type EntityListCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type EntityListInput = {
  contextLevel?: InputMaybe<Scalars['String']>
  createDate: Scalars['DateTime']
  idProperty?: InputMaybe<IndexedPropertyInput>
  indexA?: InputMaybe<IndexedPropertyInput>
  indexB?: InputMaybe<IndexedPropertyInput>
  indexC?: InputMaybe<IndexedPropertyInput>
  indexD?: InputMaybe<IndexedPropertyInput>
  isLocaleSpecific?: InputMaybe<Scalars['Boolean']>
  isSandboxDataCloningSupported?: InputMaybe<Scalars['Boolean']>
  isShopperSpecific?: InputMaybe<Scalars['Boolean']>
  isVisibleInStorefront?: InputMaybe<Scalars['Boolean']>
  metadata?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  nameSpace?: InputMaybe<Scalars['String']>
  tenantId: Scalars['Int']
  updateDate: Scalars['DateTime']
  usages?: InputMaybe<Array<Scalars['String']>>
  useSystemAssignedId?: InputMaybe<Scalars['Boolean']>
  views?: InputMaybe<Array<InputMaybe<ListViewInput>>>
}

export type EntityModelOfShipment = {
  __typename?: 'EntityModelOfShipment'
  _get?: Maybe<Scalars['AnyScalar']>
  _links?: Maybe<Links>
  _root?: Maybe<EntityModelOfShipment>
  acceptedDate: Scalars['DateTime']
  alternateContact?: Maybe<FuContact>
  appeasementReason?: Maybe<FuAppeasementReason>
  assignedLocationCode: Scalars['String']
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  canceledItems: Array<Maybe<FuCanceledItem>>
  cartId: Scalars['String']
  changeMessages: Array<Maybe<FuChangeMessage>>
  childShipmentNumbers: Array<Scalars['Int']>
  currencyCode: Scalars['String']
  customer?: Maybe<FuCustomer>
  customerAccountId: Scalars['Int']
  customerAddressId: Scalars['Int']
  customerTaxId: Scalars['String']
  data: Scalars['Object']
  destination?: Maybe<FuDestination>
  dutyAdjustment: Scalars['Float']
  dutyTotal: Scalars['Float']
  email: Scalars['String']
  externalOrderId: Scalars['String']
  fulfillmentDate: Scalars['DateTime']
  fulfillmentLocationCode: Scalars['String']
  fulfillmentStatus?: Maybe<FulfillmentStatusEnum>
  futureDate: Scalars['DateTime']
  handlingAdjustment: Scalars['Float']
  handlingSubtotal: Scalars['Float']
  handlingTaxAdjustment: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  isAutoAssigned?: Maybe<Scalars['Boolean']>
  isExpress?: Maybe<Scalars['Boolean']>
  isHistoricalImport?: Maybe<Scalars['Boolean']>
  isOptInForSms?: Maybe<Scalars['Boolean']>
  items: Array<Maybe<Item>>
  lineItemSubtotal: Scalars['Float']
  lineItemTaxAdjustment: Scalars['Float']
  lineItemTaxTotal: Scalars['Float']
  lineItemTotal: Scalars['Float']
  orderId: Scalars['String']
  orderNumber: Scalars['Int']
  orderSubmitDate: Scalars['DateTime']
  originalShipmentNumber: Scalars['Int']
  packages: Array<Maybe<FuPackageObj>>
  parentCheckoutNumber: Scalars['Int']
  parentShipmentNumber: Scalars['Int']
  pickStatus?: Maybe<PickStatusEnum>
  pickType?: Maybe<PickTypeEnum>
  pickWaveNumber: Scalars['Int']
  pickupInfo: Scalars['Object']
  readyForPickup?: Maybe<Scalars['Boolean']>
  readyForPickupDate: Scalars['DateTime']
  readyToCapture?: Maybe<Scalars['Boolean']>
  reassignedItems: Array<Maybe<ReassignedItem>>
  receivedDate: Scalars['DateTime']
  rejectedItems: Array<Maybe<RejectedItem>>
  sentCustomerAtStoreNotification?: Maybe<Scalars['Boolean']>
  sentCustomerInTransitNotification?: Maybe<Scalars['Boolean']>
  shipmentAdjustment: Scalars['Float']
  shipmentNotes: Array<Maybe<FuShipmentNote>>
  shipmentNumber: Scalars['Int']
  shipmentStatus?: Maybe<ShipmentStatusEnum>
  shipmentStatusReason?: Maybe<FuShipmentStatusReason>
  shipmentType: Scalars['String']
  shippingAdjustment: Scalars['Float']
  shippingMethodCode: Scalars['String']
  shippingMethodName: Scalars['String']
  shippingSubtotal: Scalars['Float']
  shippingTaxAdjustment: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  shopperNotes?: Maybe<FuShopperNotes>
  siteId: Scalars['Int']
  taxData: Scalars['Object']
  tenantId: Scalars['Int']
  total: Scalars['Float']
  transferShipmentNumbers: Array<Scalars['Int']>
  transferredItems: Array<Maybe<TransferredItem>>
  transitTime: Scalars['String']
  userId: Scalars['String']
  workflowProcessContainerId: Scalars['String']
  workflowProcessId: Scalars['String']
  workflowState?: Maybe<FuWorkflowState>
}

export type EntityModelOfShipment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Facet = {
  __typename?: 'Facet'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Facet>
  facetType?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<FacetValue>>>
}

export type Facet_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FacetValue = {
  __typename?: 'FacetValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FacetValue>
  childrenFacetValues?: Maybe<Array<Maybe<FacetValue>>>
  count: Scalars['Int']
  filterValue?: Maybe<Scalars['String']>
  isApplied?: Maybe<Scalars['Boolean']>
  isDisplayed?: Maybe<Scalars['Boolean']>
  label?: Maybe<Scalars['String']>
  parentFacetValue?: Maybe<Scalars['String']>
  rangeQueryValueEnd?: Maybe<Scalars['String']>
  rangeQueryValueStart?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type FacetValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuAddress = {
  __typename?: 'FuAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuAddress>
  address1: Scalars['String']
  address2: Scalars['String']
  address3: Scalars['String']
  address4: Scalars['String']
  addressType?: Maybe<AddressTypeEnum>
  attributes: Scalars['Object']
  cityOrTown: Scalars['String']
  countryCode: Scalars['String']
  isValidated?: Maybe<Scalars['Boolean']>
  latitude: Scalars['String']
  longitude: Scalars['String']
  postalOrZipCode: Scalars['String']
  stateOrProvince: Scalars['String']
}

export type FuAddress_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuAppeasementReason = {
  __typename?: 'FuAppeasementReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuAppeasementReason>
  moreInfo: Scalars['String']
  reasonCode: Scalars['String']
}

export type FuAppeasementReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuAuditInfo = {
  __typename?: 'FuAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuAuditInfo>
  createBy: Scalars['String']
  createDate: Scalars['DateTime']
  updateBy: Scalars['String']
  updateDate: Scalars['DateTime']
}

export type FuAuditInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuCanceledItem = {
  __typename?: 'FuCanceledItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuCanceledItem>
  actualPrice: Scalars['Float']
  allocatedQuantity: Scalars['Int']
  allowsBackOrder?: Maybe<Scalars['Boolean']>
  allowsFutureAllocate?: Maybe<Scalars['Boolean']>
  appeasementReason?: Maybe<FuAppeasementReason>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  backorderReleaseDate: Scalars['DateTime']
  blockAssignment?: Maybe<Scalars['Boolean']>
  canceledReason?: Maybe<FuCanceledReason>
  cartItemId: Scalars['String']
  childItemIds: Array<Scalars['String']>
  creditCurrencyCode: Scalars['String']
  creditValue: Scalars['Float']
  data: Scalars['Object']
  duty: Scalars['Float']
  expectedDeliveryDate: Scalars['DateTime']
  fulfillmentFields: Array<Maybe<FulfillmentField>>
  giftCards: Array<Maybe<FuGiftCard>>
  goodsType?: Maybe<GoodsTypeEnum>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl: Scalars['String']
  inventoryTags: Array<Maybe<FuInventoryTag>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment: Scalars['Float']
  lineItemCost: Scalars['Float']
  locatorName: Scalars['String']
  manageStock?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  optionAttributeFQN: Scalars['String']
  options: Array<Maybe<FuProductOption>>
  originalOrderItemId: Scalars['String']
  originalQuantity: Scalars['Int']
  overridePrice: Scalars['Float']
  parentItemId: Scalars['String']
  partNumber: Scalars['String']
  productCode: Scalars['String']
  quantity: Scalars['Int']
  readyForPickupQuantity: Scalars['Int']
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku: Scalars['String']
  taxData: Scalars['Object']
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  transferQuantity: Scalars['Int']
  trueTransferQuantity: Scalars['Int']
  unitPrice: Scalars['Float']
  upc: Scalars['String']
  variationProductCode: Scalars['String']
  weight: Scalars['Float']
  weightUnit: Scalars['String']
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type FuCanceledItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuCanceledReason = {
  __typename?: 'FuCanceledReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuCanceledReason>
  moreInfo: Scalars['String']
  reasonCode: Scalars['String']
}

export type FuCanceledReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuChangeMessage = {
  __typename?: 'FuChangeMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuChangeMessage>
  amount: Scalars['Float']
  appId: Scalars['String']
  appKey: Scalars['String']
  appName: Scalars['String']
  appeasementReason?: Maybe<FuAppeasementReason>
  attributes: Scalars['Object']
  changeMessageId: Scalars['String']
  correlationId: Scalars['String']
  createdDate: Scalars['DateTime']
  identifier: Scalars['String']
  message: Scalars['String']
  metadata: Scalars['String']
  newValue: Scalars['String']
  oldValue: Scalars['String']
  subject: Scalars['String']
  subjectType: Scalars['String']
  success?: Maybe<Scalars['Boolean']>
  userDisplayName: Scalars['String']
  userFirstName: Scalars['String']
  userId: Scalars['String']
  userLastName: Scalars['String']
  verb: Scalars['String']
}

export type FuChangeMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuContact = {
  __typename?: 'FuContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuContact>
  address?: Maybe<FuAddress>
  attributes: Scalars['Object']
  companyOrOrganization: Scalars['String']
  email: Scalars['String']
  firstName: Scalars['String']
  fullName: Scalars['String']
  id: Scalars['Int']
  lastNameOrSurname: Scalars['String']
  middleNameOrInitial: Scalars['String']
  phoneNumbers?: Maybe<FuPhone>
  shortFullName: Scalars['String']
}

export type FuContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuCustomer = {
  __typename?: 'FuCustomer'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuCustomer>
  customerContact?: Maybe<FuContact>
  data: Scalars['Object']
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type FuCustomer_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuDestination = {
  __typename?: 'FuDestination'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuDestination>
  data: Scalars['Object']
  destinationContact?: Maybe<FuContact>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  locationCode: Scalars['String']
}

export type FuDestination_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuGiftCard = {
  __typename?: 'FuGiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuGiftCard>
  activationDate: Scalars['DateTime']
  cardNumber: Scalars['String']
  code: Scalars['String']
  creditType: Scalars['String']
  creditValue: Scalars['Float']
  currencyCode: Scalars['String']
  currentBalance: Scalars['Float']
  customerId: Scalars['Int']
  expirationDate: Scalars['DateTime']
  initialBalance: Scalars['Float']
}

export type FuGiftCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuInventoryTag = {
  __typename?: 'FuInventoryTag'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuInventoryTag>
  name: Scalars['String']
  value: Scalars['String']
}

export type FuInventoryTag_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuMeasurement = {
  __typename?: 'FuMeasurement'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuMeasurement>
  attributes: Scalars['Object']
  unit: Scalars['String']
  value: Scalars['Float']
}

export type FuMeasurement_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuPackageMeasurements = {
  __typename?: 'FuPackageMeasurements'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuPackageMeasurements>
  attributes: Scalars['Object']
  height?: Maybe<FuMeasurement>
  length?: Maybe<FuMeasurement>
  weight?: Maybe<FuMeasurement>
  width?: Maybe<FuMeasurement>
}

export type FuPackageMeasurements_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuPackageObj = {
  __typename?: 'FuPackageObj'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuPackageObj>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  carrier: Scalars['String']
  fxcbDocumentsUrl: Scalars['String']
  fxcbPackNotificationId: Scalars['String']
  hasLabel?: Maybe<Scalars['Boolean']>
  integratorId: Scalars['String']
  labelFormat: Scalars['String']
  manifestId: Scalars['String']
  measurements?: Maybe<FuPackageMeasurements>
  packageId: Scalars['String']
  packagingType: Scalars['String']
  packingSlipItemDetails: Array<Maybe<PackingSlipItemDetailDto>>
  packingSlipNumber: Scalars['Int']
  returnCarrier: Scalars['String']
  returnTrackingNumbers: Array<Scalars['String']>
  returnTrackings: Array<Maybe<FuTracking>>
  shippingMethodCode: Scalars['String']
  shippingMethodName: Scalars['String']
  signatureRequired?: Maybe<Scalars['Boolean']>
  stringBarcode: Scalars['String']
  trackingNumbers: Array<Scalars['String']>
  trackings: Array<Maybe<FuTracking>>
}

export type FuPackageObj_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuPhone = {
  __typename?: 'FuPhone'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuPhone>
  attributes: Scalars['Object']
  home: Scalars['String']
  mobile: Scalars['String']
  work: Scalars['String']
}

export type FuPhone_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuProductOption = {
  __typename?: 'FuProductOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuProductOption>
  attributeFQN: Scalars['String']
  attributes: Scalars['Object']
  dataType: Scalars['String']
  name: Scalars['String']
  shopperEnteredValue: Scalars['Object']
  stringValue: Scalars['String']
  value: Scalars['Object']
}

export type FuProductOption_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuShipmentNote = {
  __typename?: 'FuShipmentNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuShipmentNote>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  noteId: Scalars['String']
  noteText: Scalars['String']
  role: Scalars['String']
  username: Scalars['String']
}

export type FuShipmentNote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuShipmentStatusReason = {
  __typename?: 'FuShipmentStatusReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuShipmentStatusReason>
  moreInfo: Scalars['String']
  reasonCode: Scalars['String']
}

export type FuShipmentStatusReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuShopperNotes = {
  __typename?: 'FuShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuShopperNotes>
  comments: Scalars['String']
  deliveryInstructions: Scalars['String']
  giftMessage: Scalars['String']
}

export type FuShopperNotes_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuTracking = {
  __typename?: 'FuTracking'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuTracking>
  attributes: Scalars['Object']
  number: Scalars['String']
  url: Scalars['String']
}

export type FuTracking_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FuWorkflowState = {
  __typename?: 'FuWorkflowState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FuWorkflowState>
  activeTaskName: Scalars['String']
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  completedDate: Scalars['DateTime']
  processInstanceId: Scalars['String']
  shipmentState: Scalars['String']
  taskList: Array<Maybe<Task>>
  variables: Scalars['Object']
}

export type FuWorkflowState_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FulfillmentActionInput = {
  actionName?: InputMaybe<Scalars['String']>
  digitalPackageIds?: InputMaybe<Array<Scalars['String']>>
  packageIds?: InputMaybe<Array<Scalars['String']>>
  pickupIds?: InputMaybe<Array<Scalars['String']>>
}

export type FulfillmentField = {
  __typename?: 'FulfillmentField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FulfillmentField>
  name: Scalars['String']
  required?: Maybe<Scalars['Boolean']>
  userEnteredValue: Scalars['Object']
}

export type FulfillmentField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export enum FulfillmentStatusEnum {
  Fulfilled = 'FULFILLED',
  Notfulfilled = 'NOTFULFILLED',
}

export type FulfillmentType = {
  __typename?: 'FulfillmentType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FulfillmentType>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type FulfillmentType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type FulfillmentTypeInput = {
  code?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export enum GoodsTypeEnum {
  Digital = 'DIGITAL',
  Digitalcredit = 'DIGITALCREDIT',
  Digitalgiftcard = 'DIGITALGIFTCARD',
  Physical = 'PHYSICAL',
  Service = 'SERVICE',
}

export type Hours = {
  __typename?: 'Hours'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Hours>
  closeTime?: Maybe<Scalars['String']>
  isClosed?: Maybe<Scalars['Boolean']>
  label?: Maybe<Scalars['String']>
  openTime?: Maybe<Scalars['String']>
}

export type Hours_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type HoursInput = {
  closeTime?: InputMaybe<Scalars['String']>
  isClosed?: InputMaybe<Scalars['Boolean']>
  label?: InputMaybe<Scalars['String']>
  openTime?: InputMaybe<Scalars['String']>
}

export enum HttpVersionPolicyEnum {
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO',
}

export type InStockNotificationSubscription = {
  __typename?: 'InStockNotificationSubscription'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<InStockNotificationSubscription>
  auditInfo?: Maybe<CuAuditInfo>
  customerId?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  locationCode?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

export type InStockNotificationSubscription_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type InStockNotificationSubscriptionCollection = {
  __typename?: 'InStockNotificationSubscriptionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<InStockNotificationSubscriptionCollection>
  items?: Maybe<Array<Maybe<InStockNotificationSubscription>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type InStockNotificationSubscriptionCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type InStockNotificationSubscriptionInput = {
  auditInfo?: InputMaybe<CuAuditInfoInput>
  customerId?: InputMaybe<Scalars['Int']>
  email?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  locationCode?: InputMaybe<Scalars['String']>
  productCode?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
}

export type IndexedProperty = {
  __typename?: 'IndexedProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<IndexedProperty>
  dataType?: Maybe<Scalars['String']>
  propertyName?: Maybe<Scalars['String']>
}

export type IndexedProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type IndexedPropertyInput = {
  dataType?: InputMaybe<Scalars['String']>
  propertyName?: InputMaybe<Scalars['String']>
}

export type Item = {
  __typename?: 'Item'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Item>
  actualPrice: Scalars['Float']
  allocatedQuantity: Scalars['Int']
  allowsBackOrder?: Maybe<Scalars['Boolean']>
  allowsFutureAllocate?: Maybe<Scalars['Boolean']>
  appeasementReason?: Maybe<FuAppeasementReason>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  backorderReleaseDate: Scalars['DateTime']
  cartItemId: Scalars['String']
  childItemIds: Array<Scalars['String']>
  creditCurrencyCode: Scalars['String']
  creditValue: Scalars['Float']
  data: Scalars['Object']
  duty: Scalars['Float']
  expectedDeliveryDate: Scalars['DateTime']
  fulfillmentFields: Array<Maybe<FulfillmentField>>
  giftCards: Array<Maybe<FuGiftCard>>
  goodsType?: Maybe<GoodsTypeEnum>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl: Scalars['String']
  inventoryTags: Array<Maybe<FuInventoryTag>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment: Scalars['Float']
  lineItemCost: Scalars['Float']
  locatorName: Scalars['String']
  manageStock?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  optionAttributeFQN: Scalars['String']
  options: Array<Maybe<FuProductOption>>
  originalOrderItemId: Scalars['String']
  overridePrice: Scalars['Float']
  parentItemId: Scalars['String']
  partNumber: Scalars['String']
  productCode: Scalars['String']
  quantity: Scalars['Int']
  readyForPickupQuantity: Scalars['Int']
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku: Scalars['String']
  taxData: Scalars['Object']
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  transferQuantity: Scalars['Int']
  trueTransferQuantity: Scalars['Int']
  unitPrice: Scalars['Float']
  upc: Scalars['String']
  variationProductCode: Scalars['String']
  weight: Scalars['Float']
  weightUnit: Scalars['String']
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type Item_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ItemMeasurementsInput = {
  girth?: InputMaybe<Scalars['Float']>
  height?: InputMaybe<SrMeasurementInput>
  length?: InputMaybe<SrMeasurementInput>
  weight?: InputMaybe<SrMeasurementInput>
  width?: InputMaybe<SrMeasurementInput>
}

export type ItemsForDestinationInput = {
  destinationId?: InputMaybe<Scalars['String']>
  itemIds?: InputMaybe<Array<Scalars['String']>>
}

export type KeyValuePair2Input = {
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Array<Scalars['String']>>
}

export type Links = {
  __typename?: 'Links'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Links>
  empty?: Maybe<Scalars['Boolean']>
}

export type Links_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ListView = {
  __typename?: 'ListView'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ListView>
  defaultSort?: Maybe<Scalars['String']>
  fields?: Maybe<Array<Maybe<ListViewField>>>
  filter?: Maybe<Scalars['String']>
  metaData?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  security?: Maybe<Scalars['String']>
  usages?: Maybe<Array<Scalars['String']>>
}

export type ListView_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ListViewCollection = {
  __typename?: 'ListViewCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ListViewCollection>
  items?: Maybe<Array<Maybe<ListView>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type ListViewCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ListViewField = {
  __typename?: 'ListViewField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ListViewField>
  name?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type ListViewField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ListViewFieldInput = {
  name?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type ListViewInput = {
  defaultSort?: InputMaybe<Scalars['String']>
  fields?: InputMaybe<Array<InputMaybe<ListViewFieldInput>>>
  filter?: InputMaybe<Scalars['String']>
  metaData?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  security?: InputMaybe<Scalars['String']>
  usages?: InputMaybe<Array<Scalars['String']>>
}

export type LoAddress = {
  __typename?: 'LoAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
  postalOrZipCode?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
}

export type LoAddress_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAddressInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  address3?: InputMaybe<Scalars['String']>
  address4?: InputMaybe<Scalars['String']>
  addressType?: InputMaybe<Scalars['String']>
  cityOrTown?: InputMaybe<Scalars['String']>
  countryCode?: InputMaybe<Scalars['String']>
  isValidated?: InputMaybe<Scalars['Boolean']>
  postalOrZipCode?: InputMaybe<Scalars['String']>
  stateOrProvince?: InputMaybe<Scalars['String']>
}

export type LoAttribute = {
  __typename?: 'LoAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttribute>
  adminName?: Maybe<Scalars['String']>
  attributeCode: Scalars['String']
  attributeFQN?: Maybe<Scalars['String']>
  attributeMetadata?: Maybe<Array<Maybe<LoAttributeMetadataItem>>>
  auditInfo?: Maybe<LoAuditInfo>
  content?: Maybe<LoAttributeLocalizedContent>
  dataType?: Maybe<Scalars['String']>
  displayGroup: Scalars['String']
  id?: Maybe<Scalars['Int']>
  inputType?: Maybe<Scalars['String']>
  isActive?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isReadOnly?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  isVisible?: Maybe<Scalars['Boolean']>
  namespace?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  validation?: Maybe<LoAttributeValidation>
  valueType: Scalars['String']
  vocabularyValues?: Maybe<Array<Maybe<LoAttributeVocabularyValue>>>
}

export type LoAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeCollection = {
  __typename?: 'LoAttributeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeCollection>
  items?: Maybe<Array<Maybe<LoAttribute>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type LoAttributeCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeInput = {
  adminName?: InputMaybe<Scalars['String']>
  attributeCode: Scalars['String']
  attributeFQN?: InputMaybe<Scalars['String']>
  attributeMetadata?: InputMaybe<Array<InputMaybe<LoAttributeMetadataItemInput>>>
  auditInfo?: InputMaybe<LoAuditInfoInput>
  content?: InputMaybe<LoAttributeLocalizedContentInput>
  dataType?: InputMaybe<Scalars['String']>
  displayGroup: Scalars['String']
  id?: InputMaybe<Scalars['Int']>
  inputType?: InputMaybe<Scalars['String']>
  isActive?: InputMaybe<Scalars['Boolean']>
  isMultiValued?: InputMaybe<Scalars['Boolean']>
  isReadOnly?: InputMaybe<Scalars['Boolean']>
  isRequired?: InputMaybe<Scalars['Boolean']>
  isVisible?: InputMaybe<Scalars['Boolean']>
  namespace?: InputMaybe<Scalars['String']>
  order?: InputMaybe<Scalars['Int']>
  validation?: InputMaybe<LoAttributeValidationInput>
  valueType: Scalars['String']
  vocabularyValues?: InputMaybe<Array<InputMaybe<LoAttributeVocabularyValueInput>>>
}

export type LoAttributeLocalizedContent = {
  __typename?: 'LoAttributeLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type LoAttributeLocalizedContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeLocalizedContentInput = {
  localeCode?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type LoAttributeMetadataItem = {
  __typename?: 'LoAttributeMetadataItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeMetadataItem>
  key: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeMetadataItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeMetadataItemInput = {
  key: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeValidation = {
  __typename?: 'LoAttributeValidation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeValidation>
  maxDateTime?: Maybe<Scalars['DateTime']>
  maxNumericValue?: Maybe<Scalars['Float']>
  maxStringLength?: Maybe<Scalars['Int']>
  minDateTime?: Maybe<Scalars['DateTime']>
  minNumericValue?: Maybe<Scalars['Float']>
  minStringLength?: Maybe<Scalars['Int']>
  regularExpression?: Maybe<Scalars['String']>
}

export type LoAttributeValidation_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeValidationInput = {
  maxDateTime?: InputMaybe<Scalars['DateTime']>
  maxNumericValue?: InputMaybe<Scalars['Float']>
  maxStringLength?: InputMaybe<Scalars['Int']>
  minDateTime?: InputMaybe<Scalars['DateTime']>
  minNumericValue?: InputMaybe<Scalars['Float']>
  minStringLength?: InputMaybe<Scalars['Int']>
  regularExpression?: InputMaybe<Scalars['String']>
}

export type LoAttributeValueLocalizedContent = {
  __typename?: 'LoAttributeValueLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeValueLocalizedContent>
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeValueLocalizedContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeValueLocalizedContentInput = {
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeVocabularyValue = {
  __typename?: 'LoAttributeVocabularyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeVocabularyValue>
  content?: Maybe<LoAttributeValueLocalizedContent>
  isHidden?: Maybe<Scalars['Boolean']>
  sequence?: Maybe<Scalars['Int']>
  value: Scalars['String']
}

export type LoAttributeVocabularyValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAttributeVocabularyValueInput = {
  content?: InputMaybe<LoAttributeValueLocalizedContentInput>
  isHidden?: InputMaybe<Scalars['Boolean']>
  sequence?: InputMaybe<Scalars['Int']>
  value: Scalars['String']
}

export type LoAuditInfo = {
  __typename?: 'LoAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAuditInfo>
  createBy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  updateDate?: Maybe<Scalars['DateTime']>
}

export type LoAuditInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LoAuditInfoInput = {
  createBy?: InputMaybe<Scalars['String']>
  createDate?: InputMaybe<Scalars['DateTime']>
  updateBy?: InputMaybe<Scalars['String']>
  updateDate?: InputMaybe<Scalars['DateTime']>
}

export type Location = {
  __typename?: 'Location'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Location>
  address?: Maybe<LoAddress>
  allowFulfillmentWithNoStock?: Maybe<Scalars['Boolean']>
  attributes?: Maybe<Array<Maybe<LocationAttribute>>>
  auditInfo?: Maybe<LoAuditInfo>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  express?: Maybe<Scalars['Boolean']>
  fax?: Maybe<Scalars['String']>
  fulfillmentTypes?: Maybe<Array<Maybe<FulfillmentType>>>
  geo?: Maybe<Coordinates>
  includeInInventoryAggregrate?: Maybe<Scalars['Boolean']>
  includeInLocationExport?: Maybe<Scalars['Boolean']>
  isDisabled?: Maybe<Scalars['Boolean']>
  locationTypes?: Maybe<Array<Maybe<LocationType>>>
  name?: Maybe<Scalars['String']>
  note?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  regularHours?: Maybe<RegularHours>
  requiresManifest?: Maybe<Scalars['Boolean']>
  shipToHomeConsolidation?: Maybe<Scalars['Boolean']>
  shippingOriginContact?: Maybe<ShippingOriginContact>
  supportsInventory?: Maybe<Scalars['Boolean']>
  tags?: Maybe<Array<Scalars['String']>>
  transferEnabled?: Maybe<Scalars['Boolean']>
  warehouseEnabled?: Maybe<Scalars['Boolean']>
}

export type Location_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationAttribute = {
  __typename?: 'LocationAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationAttribute>
  attributeDefinition?: Maybe<LoAttribute>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  auditInfo?: Maybe<LoAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type LocationAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationAttributeInput = {
  attributeDefinition?: InputMaybe<LoAttributeInput>
  attributeDefinitionId?: InputMaybe<Scalars['Int']>
  auditInfo?: InputMaybe<LoAuditInfoInput>
  fullyQualifiedName?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<Scalars['Object']>>
}

export type LocationCollection = {
  __typename?: 'LocationCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationCollection>
  items?: Maybe<Array<Maybe<Location>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type LocationCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationGroup = {
  __typename?: 'LocationGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationGroup>
  auditInfo?: Maybe<LoAuditInfo>
  locationCodes?: Maybe<Array<Scalars['String']>>
  locationGroupCode?: Maybe<Scalars['String']>
  locationGroupId: Scalars['Int']
  name?: Maybe<Scalars['String']>
  siteIds?: Maybe<Array<Scalars['Int']>>
}

export type LocationGroup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationGroupCollection = {
  __typename?: 'LocationGroupCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationGroupCollection>
  items?: Maybe<Array<Maybe<LocationGroup>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type LocationGroupCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationGroupConfiguration = {
  __typename?: 'LocationGroupConfiguration'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationGroupConfiguration>
  allowReturns?: Maybe<Scalars['Boolean']>
  attributes?: Maybe<Array<Maybe<LocationAttribute>>>
  auditInfo?: Maybe<LoAuditInfo>
  autoPackingListPopup?: Maybe<Scalars['Boolean']>
  blockPartialCancel?: Maybe<Scalars['Boolean']>
  blockPartialStock?: Maybe<Scalars['Boolean']>
  boxTypes?: Maybe<Array<Maybe<BoxType>>>
  bpmConfigurations?: Maybe<Array<Maybe<BpmConfiguration>>>
  carriers?: Maybe<Array<Maybe<Carrier>>>
  closePickWavePermissions?: Maybe<Array<Scalars['String']>>
  customerFailedToPickupAfterAction?: Maybe<Scalars['String']>
  customerFailedToPickupDeadline?: Maybe<Scalars['Int']>
  defaultCarrier?: Maybe<Scalars['String']>
  defaultMaxNumberOfShipmentsInPickWave?: Maybe<Scalars['Int']>
  defaultNumberOfOrdersInPickWave?: Maybe<Scalars['Int']>
  defaultPrinterType?: Maybe<Scalars['String']>
  defaultReturnRefundReductionAmount?: Maybe<Scalars['Int']>
  displayProductImagesInPickWaveDetails?: Maybe<Scalars['Boolean']>
  enableAdvancedOptionForPickWaveCreation?: Maybe<Scalars['Boolean']>
  enableForISPU?: Maybe<Scalars['Boolean']>
  enableForSTH?: Maybe<Scalars['Boolean']>
  enablePnpForBOPIS?: Maybe<Scalars['Boolean']>
  enablePnpForSTH?: Maybe<Scalars['Boolean']>
  enableScanningOfUpcForShipToHome?: Maybe<Scalars['Boolean']>
  locationGroupCode?: Maybe<Scalars['String']>
  locationGroupId: Scalars['Int']
  maxNumberOfPackingSlipsByGroup?: Maybe<Scalars['Int']>
  maximumNumberOfOrdersInPickWave?: Maybe<Scalars['Int']>
  maximumReturnRefundReductionAmount?: Maybe<Scalars['Int']>
  packageSettings?: Maybe<PackageSettings>
  pickWavePrintFormat?: Maybe<Scalars['String']>
  printReturnLabel?: Maybe<Scalars['Boolean']>
  returnRefundReduction?: Maybe<Scalars['Boolean']>
  sendCustomerPickupReminder?: Maybe<Scalars['Int']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  wmsEnabled?: Maybe<Scalars['Boolean']>
}

export type LocationGroupConfiguration_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationGroupInput = {
  auditInfo?: InputMaybe<LoAuditInfoInput>
  locationCodes?: InputMaybe<Array<Scalars['String']>>
  locationGroupCode?: InputMaybe<Scalars['String']>
  locationGroupId: Scalars['Int']
  name?: InputMaybe<Scalars['String']>
  siteIds?: InputMaybe<Array<Scalars['Int']>>
}

export type LocationInput = {
  address?: InputMaybe<LoAddressInput>
  allowFulfillmentWithNoStock?: InputMaybe<Scalars['Boolean']>
  attributes?: InputMaybe<Array<InputMaybe<LocationAttributeInput>>>
  auditInfo?: InputMaybe<LoAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  express?: InputMaybe<Scalars['Boolean']>
  fax?: InputMaybe<Scalars['String']>
  fulfillmentTypes?: InputMaybe<Array<InputMaybe<FulfillmentTypeInput>>>
  geo?: InputMaybe<CoordinatesInput>
  includeInInventoryAggregrate?: InputMaybe<Scalars['Boolean']>
  includeInLocationExport?: InputMaybe<Scalars['Boolean']>
  isDisabled?: InputMaybe<Scalars['Boolean']>
  locationTypes?: InputMaybe<Array<InputMaybe<LocationTypeInput>>>
  name?: InputMaybe<Scalars['String']>
  note?: InputMaybe<Scalars['String']>
  phone?: InputMaybe<Scalars['String']>
  regularHours?: InputMaybe<RegularHoursInput>
  requiresManifest?: InputMaybe<Scalars['Boolean']>
  shipToHomeConsolidation?: InputMaybe<Scalars['Boolean']>
  shippingOriginContact?: InputMaybe<ShippingOriginContactInput>
  supportsInventory?: InputMaybe<Scalars['Boolean']>
  tags?: InputMaybe<Array<Scalars['String']>>
  transferEnabled?: InputMaybe<Scalars['Boolean']>
  warehouseEnabled?: InputMaybe<Scalars['Boolean']>
}

export type LocationInventory = {
  __typename?: 'LocationInventory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationInventory>
  futureInventories?: Maybe<Array<Maybe<PrFutureInventory>>>
  locationCode?: Maybe<Scalars['String']>
  mfgPartNumber?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  sku?: Maybe<Scalars['String']>
  softStockAvailable?: Maybe<Scalars['Int']>
  stockAvailable?: Maybe<Scalars['Int']>
}

export type LocationInventory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationInventoryCollection = {
  __typename?: 'LocationInventoryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationInventoryCollection>
  items?: Maybe<Array<Maybe<LocationInventory>>>
  totalCount: Scalars['Int']
}

export type LocationInventoryCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationInventoryQueryInput = {
  includeFutureInventory?: InputMaybe<Scalars['Boolean']>
  inventoryTags?: InputMaybe<Array<InputMaybe<PrInventoryTagInput>>>
  locationCodes?: InputMaybe<Array<Scalars['String']>>
  productCodes?: InputMaybe<Array<Scalars['String']>>
}

export type LocationType = {
  __typename?: 'LocationType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationType>
  auditInfo?: Maybe<LoAuditInfo>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type LocationType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationTypeInput = {
  auditInfo?: InputMaybe<LoAuditInfoInput>
  code?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type LocationUsage = {
  __typename?: 'LocationUsage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationUsage>
  auditInfo?: Maybe<LoAuditInfo>
  locationCodes?: Maybe<Array<Scalars['String']>>
  locationTypeCodes?: Maybe<Array<Scalars['String']>>
  locationUsageTypeCode?: Maybe<Scalars['String']>
}

export type LocationUsage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationUsageCollection = {
  __typename?: 'LocationUsageCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationUsageCollection>
  items?: Maybe<Array<Maybe<LocationUsage>>>
  totalCount: Scalars['Int']
}

export type LocationUsageCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type LocationUsageInput = {
  auditInfo?: InputMaybe<LoAuditInfoInput>
  locationCodes?: InputMaybe<Array<Scalars['String']>>
  locationTypeCodes?: InputMaybe<Array<Scalars['String']>>
  locationUsageTypeCode?: InputMaybe<Scalars['String']>
}

export type LoginState = {
  __typename?: 'LoginState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoginState>
  createdOn?: Maybe<Scalars['DateTime']>
  failedLoginAttemptCount: Scalars['Int']
  firstFailedLoginAttemptOn?: Maybe<Scalars['DateTime']>
  isLocked?: Maybe<Scalars['Boolean']>
  isPasswordChangeRequired?: Maybe<Scalars['Boolean']>
  lastLockedOn?: Maybe<Scalars['DateTime']>
  lastLoginOn?: Maybe<Scalars['DateTime']>
  lastPasswordChangeOn?: Maybe<Scalars['DateTime']>
  remainingLoginAttempts: Scalars['Int']
  updatedOn?: Maybe<Scalars['DateTime']>
}

export type LoginState_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type MzdbHttpContentInput = {
  headers?: InputMaybe<Array<InputMaybe<MzdbStringStringIEnumerableKeyValuePairInput>>>
}

export type MzdbHttpMethodInput = {
  method?: InputMaybe<Scalars['String']>
}

export type MzdbHttpRequestMessageInput = {
  content?: InputMaybe<MzdbHttpContentInput>
  headers?: InputMaybe<Array<InputMaybe<MzdbStringStringIEnumerableKeyValuePairInput>>>
  method?: InputMaybe<MzdbHttpMethodInput>
  properties?: InputMaybe<Scalars['Object']>
  requestUri?: InputMaybe<Scalars['DateTime']>
  version?: InputMaybe<Scalars['String']>
}

export type MzdbStringStringIEnumerableKeyValuePairInput = {
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Array<Scalars['String']>>
}

export type Mutation = {
  __typename?: 'Mutation'
  addExtendedPropertyToCurrentCart?: Maybe<Array<Maybe<CrExtendedProperty>>>
  addItemToCart?: Maybe<CrCartItem>
  addItemToCurrentCart?: Maybe<CrCartItem>
  addItemsToCart?: Maybe<Scalars['Boolean']>
  addItemsToCurrentCart?: Maybe<Scalars['Boolean']>
  addRoleToCustomerB2bAccount?: Maybe<Scalars['Boolean']>
  addSubscriptionItem?: Maybe<Subscription>
  adminCreateLocation?: Maybe<Location>
  adminCreateLocationAttribute?: Maybe<LoAttribute>
  adminCreateLocationGroup?: Maybe<LocationGroup>
  adminCreateLocationType?: Maybe<LocationType>
  adminUpdateLocation?: Maybe<Location>
  adminUpdateLocationAttribute?: Maybe<LoAttribute>
  adminUpdateLocationType?: Maybe<LocationType>
  applySubscriptionCoupon?: Maybe<Subscription>
  cancelOrder?: Maybe<CrOrder>
  changeCustomerAccountPassword?: Maybe<Scalars['Boolean']>
  clearSubscriptionDraft?: Maybe<Subscription>
  configureProduct?: Maybe<ConfiguredProduct>
  convertSubscriptionToOrder?: Maybe<SbOrder>
  createCartForUser?: Maybe<CrCart>
  createCheckout?: Maybe<Checkout>
  createCheckoutAction?: Maybe<Checkout>
  createCheckoutAttribute?: Maybe<Array<Maybe<CrOrderAttribute>>>
  createCheckoutDestination?: Maybe<CrDestination>
  createCheckoutItem?: Maybe<Checkout>
  createCheckoutItemDestination?: Maybe<Checkout>
  createCheckoutPaymentAction?: Maybe<Checkout>
  createCheckoutShippingMethod?: Maybe<Checkout>
  createCommerceChannel?: Maybe<Channel>
  createCommerceChannelGroup?: Maybe<ChannelGroup>
  createCustomerAccount?: Maybe<CustomerAccount>
  createCustomerAccountAndLogin?: Maybe<CustomerAuthTicket>
  createCustomerAccountAttribute?: Maybe<CustomerAttribute>
  createCustomerAccountAttributeDefinition?: Maybe<CuAttribute>
  createCustomerAccountCard?: Maybe<Card>
  createCustomerAccountContact?: Maybe<CustomerContact>
  createCustomerAccountLogin?: Maybe<CustomerAuthTicket>
  createCustomerAccountNote?: Maybe<CustomerNote>
  createCustomerAccountPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  createCustomerAccountPurchaseOrderAccountTransaction?: Maybe<PurchaseOrderTransaction>
  createCustomerAccountTransaction?: Maybe<Transaction>
  createCustomerAccounts?: Maybe<CustomerAccountCollection>
  createCustomerAuthTicket?: Maybe<CustomerAuthTicket>
  createCustomerB2bAccount?: Maybe<B2BAccount>
  createCustomerB2bAccountAttribute?: Maybe<CustomerAttribute>
  createCustomerB2bAccountUser?: Maybe<B2BUser>
  createCustomerCredit?: Maybe<CuCredit>
  createCustomerCreditTransaction?: Maybe<CreditTransaction>
  createCustomerSegment?: Maybe<CustomerSegment>
  createCustomerSegmentAccount?: Maybe<Scalars['Boolean']>
  createDocumentDraft?: Maybe<Scalars['Boolean']>
  createDocumentList?: Maybe<DocumentList>
  createDocumentListDocument?: Maybe<Document>
  createDocumentListType?: Maybe<DocumentListType>
  createDocumentType?: Maybe<DocumentType>
  createEntityList?: Maybe<EntityList>
  createEntityListEntity?: Maybe<Scalars['Boolean']>
  createEntityListView?: Maybe<ListView>
  createInStockNotification?: Maybe<InStockNotificationSubscription>
  createOrder?: Maybe<CrOrder>
  createOrderAction?: Maybe<CrOrder>
  createOrderAttribute?: Maybe<Array<Maybe<CrOrderAttribute>>>
  createOrderAutoCapture?: Maybe<CrOrder>
  createOrderDigitalPackage?: Maybe<CrDigitalPackage>
  createOrderExtendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  createOrderFulfillmentAction?: Maybe<CrOrder>
  createOrderItem?: Maybe<CrOrder>
  createOrderNote?: Maybe<CrOrderNote>
  createOrderPackage?: Maybe<CrPackageObj>
  createOrderPaymentAction?: Maybe<CrOrder>
  createOrderPaymentPaymentAction?: Maybe<CrOrder>
  createOrderPickup?: Maybe<CrPickup>
  createOrderRefund?: Maybe<CrRefund>
  createOrderShipment?: Maybe<Array<Maybe<CrPackageObj>>>
  createOrderShipmentAdjustment?: Maybe<CrShipment>
  createOrderShipmentItemAdjustment?: Maybe<CrShipment>
  createProductCost?: Maybe<ProductCostCollection>
  createPropertyType?: Maybe<PropertyType>
  createPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccountCollection>
  createQuote?: Maybe<Quote>
  createQuoteItem?: Maybe<Quote>
  createResolvedPriceList?: Maybe<ResolvedPriceList>
  createReturn?: Maybe<ReturnObj>
  createReturnAction?: Maybe<ReturnCollection>
  createReturnItem?: Maybe<ReturnObj>
  createReturnNote?: Maybe<CrOrderNote>
  createReturnPackage?: Maybe<CrPackageObj>
  createReturnPaymentAction?: Maybe<ReturnObj>
  createReturnPaymentPaymentAction?: Maybe<ReturnObj>
  createReturnShipment?: Maybe<Array<Maybe<CrPackageObj>>>
  createSubscription?: Maybe<Subscription>
  createTargetRule?: Maybe<TargetRule>
  createWishlist?: Maybe<CrWishlist>
  createWishlistItem?: Maybe<CrWishlistItem>
  deleteAdminLocationType?: Maybe<Scalars['Boolean']>
  deleteB2bAccountAttribute?: Maybe<Scalars['Boolean']>
  deleteB2bAccountRole?: Maybe<Scalars['Boolean']>
  deleteCart?: Maybe<Scalars['Boolean']>
  deleteCartCoupon?: Maybe<CrCart>
  deleteCartCoupons?: Maybe<CrCart>
  deleteCartItem?: Maybe<Scalars['Boolean']>
  deleteCartItems?: Maybe<CrCart>
  deleteCheckoutCoupon?: Maybe<Checkout>
  deleteCheckoutCoupons?: Maybe<Checkout>
  deleteCheckoutDestination?: Maybe<Scalars['Boolean']>
  deleteCheckoutItem?: Maybe<Checkout>
  deleteCommerceChannel?: Maybe<Scalars['Boolean']>
  deleteCommerceChannelGroup?: Maybe<Scalars['Boolean']>
  deleteCommerceTargetRule?: Maybe<Scalars['Boolean']>
  deleteCurrentCart?: Maybe<Scalars['Boolean']>
  deleteCurrentCartExtendedProperties?: Maybe<Scalars['Boolean']>
  deleteCurrentCartExtendedProperty?: Maybe<Scalars['Boolean']>
  deleteCurrentCartItem?: Maybe<Scalars['Boolean']>
  deleteCurrentCartItems?: Maybe<CrCart>
  deleteCurrentCartMessage?: Maybe<Scalars['Boolean']>
  deleteCurrentCartMessages?: Maybe<Scalars['Boolean']>
  deleteCustomerAccount?: Maybe<Scalars['Boolean']>
  deleteCustomerAccountAttribute?: Maybe<Scalars['Boolean']>
  deleteCustomerAccountCard?: Maybe<Scalars['Boolean']>
  deleteCustomerAccountContact?: Maybe<Scalars['Boolean']>
  deleteCustomerAccountNote?: Maybe<Scalars['Boolean']>
  deleteCustomerAccountTransaction?: Maybe<Scalars['Boolean']>
  deleteCustomerCredit?: Maybe<Scalars['Boolean']>
  deleteCustomerSegment?: Maybe<Scalars['Boolean']>
  deleteCustomerSegmentAccount?: Maybe<Scalars['Boolean']>
  deleteDocumentList?: Maybe<Scalars['Boolean']>
  deleteDocumentListDocument?: Maybe<Scalars['Boolean']>
  deleteDocumentListDocumentContent?: Maybe<Scalars['Boolean']>
  deleteDocumentListDocumentTreeContent?: Maybe<Scalars['Boolean']>
  deleteEntityList?: Maybe<Scalars['Boolean']>
  deleteEntityListEntity?: Maybe<Scalars['Boolean']>
  deleteEntityListView?: Maybe<Scalars['Boolean']>
  deleteInStockNotification?: Maybe<Scalars['Boolean']>
  deleteOrderAdjustment?: Maybe<CrOrder>
  deleteOrderAdjustmentHandling?: Maybe<CrOrder>
  deleteOrderAdjustmentShipping?: Maybe<CrOrder>
  deleteOrderCoupon?: Maybe<CrOrder>
  deleteOrderCoupons?: Maybe<CrOrder>
  deleteOrderDigitalPackage?: Maybe<Scalars['Boolean']>
  deleteOrderExtendedProperties?: Maybe<Scalars['Boolean']>
  deleteOrderExtendedProperty?: Maybe<Scalars['Boolean']>
  deleteOrderItem?: Maybe<CrOrder>
  deleteOrderNote?: Maybe<Scalars['Boolean']>
  deleteOrderPackage?: Maybe<Scalars['Boolean']>
  deleteOrderPickup?: Maybe<Scalars['Boolean']>
  deleteOrderShipment?: Maybe<Scalars['Boolean']>
  deletePropertyType?: Maybe<Scalars['Boolean']>
  deleteQuote?: Maybe<Scalars['Boolean']>
  deleteQuoteItem?: Maybe<Scalars['Boolean']>
  deleteReturn?: Maybe<Scalars['Boolean']>
  deleteReturnItem?: Maybe<ReturnObj>
  deleteReturnNote?: Maybe<Scalars['Boolean']>
  deleteReturnPackage?: Maybe<Scalars['Boolean']>
  deleteReturnShipment?: Maybe<Scalars['Boolean']>
  deleteSubscriptionItem?: Maybe<Subscription>
  deleteUserCart?: Maybe<Scalars['Boolean']>
  deleteWishlist?: Maybe<Scalars['Boolean']>
  deleteWishlistItem?: Maybe<Scalars['Boolean']>
  deleteWishlistItems?: Maybe<CrWishlist>
  getMultiRates?: Maybe<Array<Maybe<RatesResponseGroup>>>
  getRates?: Maybe<RatesResponse>
  manageLocationProductInventory?: Maybe<LocationInventoryCollection>
  orderSubscriptionNow?: Maybe<Subscription>
  patchDocumentListDocument?: Maybe<Document>
  performSubscriptionAction?: Maybe<Subscription>
  recomputeCustomerAccountLifetimeValue?: Maybe<Scalars['Boolean']>
  refreshCustomerAuthTickets?: Maybe<CustomerAuthTicket>
  rejectCartDiscount?: Maybe<CrCart>
  removeCustomerB2bAccountUser?: Maybe<Scalars['Boolean']>
  removeOneTimeSubscriptionCoupon?: Maybe<Subscription>
  repriceOrderShipment?: Maybe<CrShipment>
  resendCheckoutEmail?: Maybe<Scalars['Boolean']>
  resendCustomerCreditEmail?: Maybe<Scalars['Boolean']>
  resendOrderEmail?: Maybe<Scalars['Boolean']>
  resendOrderFulfillmentEmail?: Maybe<CrOrder>
  resendReturnEmail?: Maybe<Scalars['Boolean']>
  resetCustomerAccountPassword?: Maybe<Scalars['Boolean']>
  setCustomerAccountLoginLocked?: Maybe<Scalars['Boolean']>
  setCustomerAccountPasswordChangeRequired?: Maybe<Scalars['Boolean']>
  setReturnRestock?: Maybe<ReturnObj>
  setReturnShip?: Maybe<CrOrder>
  skipNextSubscription?: Maybe<Subscription>
  splitOrderShipment?: Maybe<Array<Maybe<CrShipment>>>
  toggleDocumentPublishing?: Maybe<Scalars['Boolean']>
  updateCart?: Maybe<CrCart>
  updateCartCoupon?: Maybe<CrCart>
  updateCartItem?: Maybe<CrCartItem>
  updateCartItemQuantity?: Maybe<CrCartItem>
  updateChannel?: Maybe<Channel>
  updateChannelGroup?: Maybe<ChannelGroup>
  updateCheckout?: Maybe<Checkout>
  updateCheckoutAttributes?: Maybe<Array<Maybe<CrOrderAttribute>>>
  updateCheckoutCoupon?: Maybe<Checkout>
  updateCheckoutDestination?: Maybe<CrDestination>
  updateCheckoutDigitalWalletType?: Maybe<Checkout>
  updateCheckoutItemDestination?: Maybe<Checkout>
  updateCheckoutPaymentAction?: Maybe<Checkout>
  updateCheckoutPriceList?: Maybe<Checkout>
  updateCurrentCart?: Maybe<CrCart>
  updateCurrentCartExtendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  updateCurrentCartExtendedProperty?: Maybe<CrExtendedProperty>
  updateCurrentCartItem?: Maybe<CrCartItem>
  updateCurrentCartItemQuantity?: Maybe<CrCartItem>
  updateCustomerAccount?: Maybe<CustomerAccount>
  updateCustomerAccountAttribute?: Maybe<CustomerAttribute>
  updateCustomerAccountAttributeDefinition?: Maybe<CuAttribute>
  updateCustomerAccountCard?: Maybe<Card>
  updateCustomerAccountContact?: Maybe<CustomerContact>
  updateCustomerAccountContacts?: Maybe<CustomerContactCollection>
  updateCustomerAccountNote?: Maybe<CustomerNote>
  updateCustomerAccountPasswords?: Maybe<ChangePasswordResultCollection>
  updateCustomerB2bAccount?: Maybe<B2BAccount>
  updateCustomerB2bAccountAttribute?: Maybe<CustomerAttribute>
  updateCustomerB2bAccountUser?: Maybe<B2BUser>
  updateCustomerCredit?: Maybe<CuCredit>
  updateCustomerCreditAssociateToShopper?: Maybe<CuCredit>
  updateCustomerPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  updateCustomerSegment?: Maybe<CustomerSegment>
  updateDocumentList?: Maybe<DocumentList>
  updateDocumentListDocument?: Maybe<Document>
  updateDocumentListDocumentContent?: Maybe<Scalars['Boolean']>
  updateDocumentListDocumentTreeContent?: Maybe<Scalars['Boolean']>
  updateDocumentListType?: Maybe<DocumentListType>
  updateDocumentType?: Maybe<DocumentType>
  updateEntityList?: Maybe<EntityList>
  updateEntityListEntities?: Maybe<Scalars['Boolean']>
  updateEntityListView?: Maybe<ListView>
  updateForgottenCustomerAccountPassword?: Maybe<Scalars['Boolean']>
  updateLocationUsage?: Maybe<LocationUsage>
  updateOrder?: Maybe<CrOrder>
  updateOrderAdjustment?: Maybe<CrOrder>
  updateOrderAttributes?: Maybe<Array<Maybe<CrOrderAttribute>>>
  updateOrderBillingInfo?: Maybe<CrBillingInfo>
  updateOrderCoupon?: Maybe<CrOrder>
  updateOrderDigitalPackage?: Maybe<CrDigitalPackage>
  updateOrderDigitalWalletTpe?: Maybe<CrOrder>
  updateOrderDiscount?: Maybe<CrOrder>
  updateOrderDraft?: Maybe<Scalars['Boolean']>
  updateOrderExtendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  updateOrderExtendedProperty?: Maybe<CrExtendedProperty>
  updateOrderFulfillmentInfo?: Maybe<CrFulfillmentInfo>
  updateOrderHandlingAdjustment?: Maybe<CrOrder>
  updateOrderItemDiscount?: Maybe<CrOrder>
  updateOrderItemDutyAmount?: Maybe<CrOrder>
  updateOrderItemFulfillment?: Maybe<CrOrder>
  updateOrderItemPrice?: Maybe<CrOrder>
  updateOrderItemQuantity?: Maybe<CrOrder>
  updateOrderNotes?: Maybe<CrOrderNote>
  updateOrderPackage?: Maybe<CrPackageObj>
  updateOrderPickup?: Maybe<CrPickup>
  updateOrderPrice?: Maybe<CrOrder>
  updateOrderPriceList?: Maybe<CrOrder>
  updateOrderRefund?: Maybe<Scalars['Boolean']>
  updateOrderShippingAdjustment?: Maybe<CrOrder>
  updateOrderValidationResults?: Maybe<CrOrderValidationResult>
  updatePropertyType?: Maybe<PropertyType>
  updateQuote?: Maybe<Quote>
  updateReturn?: Maybe<ReturnObj>
  updateReturnNote?: Maybe<CrOrderNote>
  updateReturnPackage?: Maybe<CrPackageObj>
  updateSubscription?: Maybe<Subscription>
  updateSubscriptionAdjustments?: Maybe<Subscription>
  updateSubscriptionFrequency?: Maybe<Subscription>
  updateSubscriptionFulfillmentInfo?: Maybe<SbFulfillmentInfo>
  updateSubscriptionItemQuantity?: Maybe<Subscription>
  updateSubscriptionNextOrderDate?: Maybe<Subscription>
  updateSubscriptionPayment?: Maybe<Subscription>
  updateTargetRule?: Maybe<TargetRule>
  updateUserCart?: Maybe<CrCart>
  updateUserOrder?: Maybe<CrOrder>
  updateWishlist?: Maybe<CrWishlist>
  updateWishlistItem?: Maybe<CrWishlistItem>
  updateWishlistItemQuantity?: Maybe<CrWishlistItem>
  validateAddress?: Maybe<Array<Maybe<CuAddress>>>
  validateCustomerAddress?: Maybe<AddressValidationResponse>
  validateOrder?: Maybe<CrOrderValidationResult>
  validateProduct?: Maybe<ProductValidationSummary>
  validateProductDiscounts?: Maybe<DiscountValidationSummary>
  validateTargetRule?: Maybe<Scalars['Boolean']>
}

export type MutationAddExtendedPropertyToCurrentCartArgs = {
  extendedPropertyInput?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
}

export type MutationAddItemToCartArgs = {
  cartId: Scalars['String']
  cartItemInput?: InputMaybe<CrCartItemInput>
  zipCode?: InputMaybe<Scalars['String']>
}

export type MutationAddItemToCurrentCartArgs = {
  cartItemInput?: InputMaybe<CrCartItemInput>
  zipCode?: InputMaybe<Scalars['String']>
}

export type MutationAddItemsToCartArgs = {
  cartId: Scalars['String']
  cartItemInput?: InputMaybe<Array<InputMaybe<CrCartItemInput>>>
  throwErrorOnInvalidItems?: InputMaybe<Scalars['Boolean']>
  zipCode?: InputMaybe<Scalars['String']>
}

export type MutationAddItemsToCurrentCartArgs = {
  cartItemInput?: InputMaybe<Array<InputMaybe<CrCartItemInput>>>
  throwErrorOnInvalidItems?: InputMaybe<Scalars['Boolean']>
  zipCode?: InputMaybe<Scalars['String']>
}

export type MutationAddRoleToCustomerB2bAccountArgs = {
  accountId: Scalars['Int']
  roleId: Scalars['Int']
  userId: Scalars['String']
}

export type MutationAddSubscriptionItemArgs = {
  subscriptionId: Scalars['String']
  subscriptionItemInput?: InputMaybe<SbSubscriptionItemInput>
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationAdminCreateLocationArgs = {
  locationInput?: InputMaybe<LocationInput>
}

export type MutationAdminCreateLocationAttributeArgs = {
  attributeInput?: InputMaybe<LoAttributeInput>
}

export type MutationAdminCreateLocationGroupArgs = {
  locationGroupInput?: InputMaybe<LocationGroupInput>
}

export type MutationAdminCreateLocationTypeArgs = {
  locationTypeInput?: InputMaybe<LocationTypeInput>
}

export type MutationAdminUpdateLocationArgs = {
  locationCode: Scalars['String']
  locationInput?: InputMaybe<LocationInput>
}

export type MutationAdminUpdateLocationAttributeArgs = {
  attributeFQN: Scalars['String']
  attributeInput?: InputMaybe<LoAttributeInput>
}

export type MutationAdminUpdateLocationTypeArgs = {
  locationTypeCode: Scalars['String']
  locationTypeInput?: InputMaybe<LocationTypeInput>
}

export type MutationApplySubscriptionCouponArgs = {
  couponCode: Scalars['String']
  subscriptionId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationCancelOrderArgs = {
  canceledReasonInput?: InputMaybe<CrCanceledReasonInput>
  orderId: Scalars['String']
}

export type MutationChangeCustomerAccountPasswordArgs = {
  accountId: Scalars['Int']
  passwordInfoInput?: InputMaybe<PasswordInfoInput>
  unlockAccount?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationClearSubscriptionDraftArgs = {
  subscriptionId: Scalars['String']
}

export type MutationConfigureProductArgs = {
  includeOptionDetails?: InputMaybe<Scalars['Boolean']>
  productCode: Scalars['String']
  productOptionSelectionsInput?: InputMaybe<ProductOptionSelectionsInput>
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity?: InputMaybe<Scalars['Int']>
  skipInventoryCheck?: InputMaybe<Scalars['Boolean']>
  subscriptionFrequency?: InputMaybe<Scalars['String']>
  useSubscriptionPricing?: InputMaybe<Scalars['Boolean']>
  variationProductCodeFilter?: InputMaybe<Scalars['String']>
}

export type MutationConvertSubscriptionToOrderArgs = {
  subscriptionId: Scalars['String']
}

export type MutationCreateCartForUserArgs = {
  userId: Scalars['String']
}

export type MutationCreateCheckoutArgs = {
  cartId?: InputMaybe<Scalars['String']>
}

export type MutationCreateCheckoutActionArgs = {
  checkoutActionInput?: InputMaybe<CheckoutActionInput>
  checkoutId: Scalars['String']
}

export type MutationCreateCheckoutAttributeArgs = {
  checkoutId: Scalars['String']
  orderAttributeInput?: InputMaybe<Array<InputMaybe<CrOrderAttributeInput>>>
}

export type MutationCreateCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationInput?: InputMaybe<CrDestinationInput>
}

export type MutationCreateCheckoutItemArgs = {
  checkoutId: Scalars['String']
  orderItemInput?: InputMaybe<CrOrderItemInput>
}

export type MutationCreateCheckoutItemDestinationArgs = {
  checkoutId: Scalars['String']
  itemsForDestinationInput?: InputMaybe<Array<InputMaybe<ItemsForDestinationInput>>>
}

export type MutationCreateCheckoutPaymentActionArgs = {
  checkoutId: Scalars['String']
  paymentActionInput?: InputMaybe<PaymentActionInput>
}

export type MutationCreateCheckoutShippingMethodArgs = {
  checkoutGroupShippingMethodInput?: InputMaybe<Array<InputMaybe<CheckoutGroupShippingMethodInput>>>
  checkoutId: Scalars['String']
}

export type MutationCreateCommerceChannelArgs = {
  channelInput?: InputMaybe<ChannelInput>
}

export type MutationCreateCommerceChannelGroupArgs = {
  channelGroupInput?: InputMaybe<ChannelGroupInput>
}

export type MutationCreateCustomerAccountArgs = {
  customerAccountInput?: InputMaybe<CustomerAccountInput>
}

export type MutationCreateCustomerAccountAndLoginArgs = {
  customerAccountAndAuthInfoInput?: InputMaybe<CustomerAccountAndAuthInfoInput>
}

export type MutationCreateCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  customerAttributeInput?: InputMaybe<CustomerAttributeInput>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationCreateCustomerAccountAttributeDefinitionArgs = {
  attributeInput?: InputMaybe<CuAttributeInput>
}

export type MutationCreateCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardInput?: InputMaybe<CardInput>
}

export type MutationCreateCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  customerContactInput?: InputMaybe<CustomerContactInput>
}

export type MutationCreateCustomerAccountLoginArgs = {
  accountId: Scalars['Int']
  customerLoginInfoInput?: InputMaybe<CustomerLoginInfoInput>
}

export type MutationCreateCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  customerNoteInput?: InputMaybe<CustomerNoteInput>
}

export type MutationCreateCustomerAccountPurchaseOrderAccountArgs = {
  accountId: Scalars['Int']
  customerPurchaseOrderAccountInput?: InputMaybe<CustomerPurchaseOrderAccountInput>
}

export type MutationCreateCustomerAccountPurchaseOrderAccountTransactionArgs = {
  accountId: Scalars['Int']
  purchaseOrderTransactionInput?: InputMaybe<PurchaseOrderTransactionInput>
}

export type MutationCreateCustomerAccountTransactionArgs = {
  accountId: Scalars['Int']
  transactionInput?: InputMaybe<TransactionInput>
}

export type MutationCreateCustomerAccountsArgs = {
  customerAccountAndAuthInfoInput?: InputMaybe<Array<InputMaybe<CustomerAccountAndAuthInfoInput>>>
}

export type MutationCreateCustomerAuthTicketArgs = {
  customerUserAuthInfoInput?: InputMaybe<CustomerUserAuthInfoInput>
}

export type MutationCreateCustomerB2bAccountArgs = {
  b2BAccountInput?: InputMaybe<B2BAccountInput>
}

export type MutationCreateCustomerB2bAccountAttributeArgs = {
  accountId: Scalars['Int']
  customerAttributeInput?: InputMaybe<CustomerAttributeInput>
}

export type MutationCreateCustomerB2bAccountUserArgs = {
  accountId: Scalars['Int']
  b2BUserAndAuthInfoInput?: InputMaybe<B2BUserAndAuthInfoInput>
}

export type MutationCreateCustomerCreditArgs = {
  creditInput?: InputMaybe<CuCreditInput>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationCreateCustomerCreditTransactionArgs = {
  code: Scalars['String']
  creditTransactionInput?: InputMaybe<CreditTransactionInput>
}

export type MutationCreateCustomerSegmentArgs = {
  customerSegmentInput?: InputMaybe<CustomerSegmentInput>
}

export type MutationCreateCustomerSegmentAccountArgs = {
  graphQLInt?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  id: Scalars['Int']
}

export type MutationCreateDocumentDraftArgs = {
  documentLists?: InputMaybe<Scalars['String']>
  graphQLString?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type MutationCreateDocumentListArgs = {
  documentListInput?: InputMaybe<DocumentListInput>
}

export type MutationCreateDocumentListDocumentArgs = {
  documentInput?: InputMaybe<DocumentInput>
  documentListName: Scalars['String']
}

export type MutationCreateDocumentListTypeArgs = {
  documentListTypeInput?: InputMaybe<DocumentListTypeInput>
}

export type MutationCreateDocumentTypeArgs = {
  documentTypeInput?: InputMaybe<DocumentTypeInput>
}

export type MutationCreateEntityListArgs = {
  entityListInput?: InputMaybe<EntityListInput>
}

export type MutationCreateEntityListEntityArgs = {
  entityListFullName: Scalars['String']
  httpRequestMessageInput?: InputMaybe<MzdbHttpRequestMessageInput>
}

export type MutationCreateEntityListViewArgs = {
  entityListFullName: Scalars['String']
  listViewInput?: InputMaybe<ListViewInput>
}

export type MutationCreateInStockNotificationArgs = {
  inStockNotificationSubscriptionInput?: InputMaybe<InStockNotificationSubscriptionInput>
}

export type MutationCreateOrderArgs = {
  cartId?: InputMaybe<Scalars['String']>
  orderInput?: InputMaybe<CrOrderInput>
  quoteId?: InputMaybe<Scalars['String']>
}

export type MutationCreateOrderActionArgs = {
  orderActionInput?: InputMaybe<OrderActionInput>
  orderId: Scalars['String']
}

export type MutationCreateOrderAttributeArgs = {
  orderAttributeInput?: InputMaybe<Array<InputMaybe<CrOrderAttributeInput>>>
  orderId: Scalars['String']
}

export type MutationCreateOrderAutoCaptureArgs = {
  forceCapture?: InputMaybe<Scalars['Boolean']>
  orderId: Scalars['String']
}

export type MutationCreateOrderDigitalPackageArgs = {
  digitalPackageInput?: InputMaybe<CrDigitalPackageInput>
  orderId: Scalars['String']
}

export type MutationCreateOrderExtendedPropertiesArgs = {
  extendedPropertyInput?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationCreateOrderFulfillmentActionArgs = {
  fulfillmentActionInput?: InputMaybe<FulfillmentActionInput>
  orderId: Scalars['String']
}

export type MutationCreateOrderItemArgs = {
  orderId: Scalars['String']
  orderItemInput?: InputMaybe<CrOrderItemInput>
  skipInventoryCheck?: InputMaybe<Scalars['Boolean']>
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationCreateOrderNoteArgs = {
  orderId: Scalars['String']
  orderNoteInput?: InputMaybe<CrOrderNoteInput>
}

export type MutationCreateOrderPackageArgs = {
  orderId: Scalars['String']
  packageObjInput?: InputMaybe<CrPackageObjInput>
}

export type MutationCreateOrderPaymentActionArgs = {
  orderId: Scalars['String']
  paymentActionInput?: InputMaybe<PaymentActionInput>
}

export type MutationCreateOrderPaymentPaymentActionArgs = {
  orderId: Scalars['String']
  paymentActionInput?: InputMaybe<PaymentActionInput>
  paymentId: Scalars['String']
}

export type MutationCreateOrderPickupArgs = {
  orderId: Scalars['String']
  pickupInput?: InputMaybe<CrPickupInput>
}

export type MutationCreateOrderRefundArgs = {
  orderId: Scalars['String']
  refundInput?: InputMaybe<CrRefundInput>
}

export type MutationCreateOrderShipmentArgs = {
  graphQLString?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  orderId: Scalars['String']
}

export type MutationCreateOrderShipmentAdjustmentArgs = {
  orderId: Scalars['String']
  shipmentAdjustmentInput?: InputMaybe<ShipmentAdjustmentInput>
  shipmentNumber: Scalars['Int']
}

export type MutationCreateOrderShipmentItemAdjustmentArgs = {
  itemId: Scalars['Int']
  orderId: Scalars['String']
  shipmentItemAdjustmentInput?: InputMaybe<ShipmentItemAdjustmentInput>
  shipmentNumber: Scalars['Int']
}

export type MutationCreateProductCostArgs = {
  productCostQueryInput?: InputMaybe<ProductCostQueryInput>
}

export type MutationCreatePropertyTypeArgs = {
  propertyTypeInput?: InputMaybe<PropertyTypeInput>
}

export type MutationCreatePurchaseOrderAccountArgs = {
  accountType?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type MutationCreateQuoteArgs = {
  quoteInput?: InputMaybe<QuoteInput>
}

export type MutationCreateQuoteItemArgs = {
  orderItemInput?: InputMaybe<CrOrderItemInput>
  quoteId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationCreateResolvedPriceListArgs = {
  object?: InputMaybe<Scalars['Object']>
}

export type MutationCreateReturnArgs = {
  returnObjInput?: InputMaybe<ReturnObjInput>
}

export type MutationCreateReturnActionArgs = {
  returnActionInput?: InputMaybe<ReturnActionInput>
}

export type MutationCreateReturnItemArgs = {
  returnId: Scalars['String']
  returnItemInput?: InputMaybe<ReturnItemInput>
}

export type MutationCreateReturnNoteArgs = {
  orderNoteInput?: InputMaybe<CrOrderNoteInput>
  returnId: Scalars['String']
}

export type MutationCreateReturnPackageArgs = {
  packageObjInput?: InputMaybe<CrPackageObjInput>
  returnId: Scalars['String']
}

export type MutationCreateReturnPaymentActionArgs = {
  paymentActionInput?: InputMaybe<PaymentActionInput>
  returnId: Scalars['String']
}

export type MutationCreateReturnPaymentPaymentActionArgs = {
  paymentActionInput?: InputMaybe<PaymentActionInput>
  paymentId: Scalars['String']
  returnId: Scalars['String']
}

export type MutationCreateReturnShipmentArgs = {
  graphQLString?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  returnId: Scalars['String']
}

export type MutationCreateSubscriptionArgs = {
  subscriptionInput?: InputMaybe<SubscriptionInput>
}

export type MutationCreateTargetRuleArgs = {
  targetRuleInput?: InputMaybe<TargetRuleInput>
}

export type MutationCreateWishlistArgs = {
  wishlistInput?: InputMaybe<CrWishlistInput>
}

export type MutationCreateWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemInput?: InputMaybe<CrWishlistItemInput>
}

export type MutationDeleteAdminLocationTypeArgs = {
  locationTypeCode: Scalars['String']
}

export type MutationDeleteB2bAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
}

export type MutationDeleteB2bAccountRoleArgs = {
  accountId: Scalars['Int']
  roleId: Scalars['Int']
  userId: Scalars['String']
}

export type MutationDeleteCartArgs = {
  cartId: Scalars['String']
}

export type MutationDeleteCartCouponArgs = {
  cartId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationDeleteCartCouponsArgs = {
  cartId: Scalars['String']
}

export type MutationDeleteCartItemArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
}

export type MutationDeleteCartItemsArgs = {
  cartId: Scalars['String']
}

export type MutationDeleteCheckoutCouponArgs = {
  checkoutId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationDeleteCheckoutCouponsArgs = {
  checkoutId: Scalars['String']
}

export type MutationDeleteCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
}

export type MutationDeleteCheckoutItemArgs = {
  checkoutId: Scalars['String']
  itemId: Scalars['String']
}

export type MutationDeleteCommerceChannelArgs = {
  code: Scalars['String']
}

export type MutationDeleteCommerceChannelGroupArgs = {
  code: Scalars['String']
}

export type MutationDeleteCommerceTargetRuleArgs = {
  code: Scalars['String']
}

export type MutationDeleteCurrentCartExtendedPropertiesArgs = {
  graphQLString?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type MutationDeleteCurrentCartExtendedPropertyArgs = {
  key: Scalars['String']
}

export type MutationDeleteCurrentCartItemArgs = {
  cartItemId: Scalars['String']
}

export type MutationDeleteCurrentCartMessageArgs = {
  messageId: Scalars['String']
}

export type MutationDeleteCustomerAccountArgs = {
  accountId: Scalars['Int']
}

export type MutationDeleteCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  userId?: InputMaybe<Scalars['String']>
}

export type MutationDeleteCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardId: Scalars['String']
}

export type MutationDeleteCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  contactId: Scalars['Int']
}

export type MutationDeleteCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  noteId: Scalars['Int']
}

export type MutationDeleteCustomerAccountTransactionArgs = {
  accountId: Scalars['Int']
  transactionId: Scalars['String']
}

export type MutationDeleteCustomerCreditArgs = {
  code: Scalars['String']
}

export type MutationDeleteCustomerSegmentArgs = {
  id: Scalars['Int']
}

export type MutationDeleteCustomerSegmentAccountArgs = {
  accountId: Scalars['Int']
  id: Scalars['Int']
}

export type MutationDeleteDocumentListArgs = {
  documentListName: Scalars['String']
}

export type MutationDeleteDocumentListDocumentArgs = {
  documentId: Scalars['String']
  documentListName: Scalars['String']
}

export type MutationDeleteDocumentListDocumentContentArgs = {
  documentId: Scalars['String']
  documentListName: Scalars['String']
}

export type MutationDeleteDocumentListDocumentTreeContentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  httpRequestMessageInput?: InputMaybe<CoHttpRequestMessageInput>
}

export type MutationDeleteEntityListArgs = {
  entityListFullName: Scalars['String']
}

export type MutationDeleteEntityListEntityArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
}

export type MutationDeleteEntityListViewArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
}

export type MutationDeleteInStockNotificationArgs = {
  id: Scalars['Int']
}

export type MutationDeleteOrderAdjustmentArgs = {
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderAdjustmentHandlingArgs = {
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderAdjustmentShippingArgs = {
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderCouponArgs = {
  couponCode: Scalars['String']
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderCouponsArgs = {
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderDigitalPackageArgs = {
  digitalPackageId: Scalars['String']
  orderId: Scalars['String']
}

export type MutationDeleteOrderExtendedPropertiesArgs = {
  graphQLString?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderExtendedPropertyArgs = {
  key: Scalars['String']
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderItemArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationDeleteOrderNoteArgs = {
  noteId: Scalars['String']
  orderId: Scalars['String']
}

export type MutationDeleteOrderPackageArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type MutationDeleteOrderPickupArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
}

export type MutationDeleteOrderShipmentArgs = {
  orderId: Scalars['String']
  shipmentId: Scalars['String']
}

export type MutationDeletePropertyTypeArgs = {
  propertyTypeName: Scalars['String']
}

export type MutationDeleteQuoteArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  quoteId: Scalars['String']
}

export type MutationDeleteQuoteItemArgs = {
  quoteId: Scalars['String']
  quoteItemId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationDeleteReturnArgs = {
  returnId: Scalars['String']
}

export type MutationDeleteReturnItemArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  returnId?: InputMaybe<Scalars['String']>
  returnItemId?: InputMaybe<Scalars['String']>
}

export type MutationDeleteReturnNoteArgs = {
  noteId: Scalars['String']
  returnId: Scalars['String']
}

export type MutationDeleteReturnPackageArgs = {
  packageId: Scalars['String']
  returnId: Scalars['String']
}

export type MutationDeleteReturnShipmentArgs = {
  returnId: Scalars['String']
  shipmentId: Scalars['String']
}

export type MutationDeleteSubscriptionItemArgs = {
  subscriptionId: Scalars['String']
  subscriptionItemId: Scalars['String']
  subscriptionReasonInput?: InputMaybe<SubscriptionReasonInput>
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationDeleteUserCartArgs = {
  userId: Scalars['String']
}

export type MutationDeleteWishlistArgs = {
  wishlistId: Scalars['String']
}

export type MutationDeleteWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
}

export type MutationDeleteWishlistItemsArgs = {
  wishlistId: Scalars['String']
}

export type MutationGetMultiRatesArgs = {
  includeRawResponse?: InputMaybe<Scalars['Boolean']>
  rateRequestGroupInput?: InputMaybe<Array<InputMaybe<RateRequestGroupInput>>>
}

export type MutationGetRatesArgs = {
  includeRawResponse?: InputMaybe<Scalars['Boolean']>
  rateRequestInput?: InputMaybe<RateRequestInput>
}

export type MutationManageLocationProductInventoryArgs = {
  locationInventoryQueryInput?: InputMaybe<LocationInventoryQueryInput>
}

export type MutationOrderSubscriptionNowArgs = {
  subscriptionId: Scalars['String']
}

export type MutationPatchDocumentListDocumentArgs = {
  documentId: Scalars['String']
  documentInput?: InputMaybe<DocumentInput>
  documentListName: Scalars['String']
}

export type MutationPerformSubscriptionActionArgs = {
  subscriptionActionInput?: InputMaybe<SubscriptionActionInput>
  subscriptionId: Scalars['String']
}

export type MutationRecomputeCustomerAccountLifetimeValueArgs = {
  accountId: Scalars['Int']
}

export type MutationRefreshCustomerAuthTicketsArgs = {
  refreshToken?: InputMaybe<Scalars['String']>
}

export type MutationRejectCartDiscountArgs = {
  cartId: Scalars['String']
  discountId: Scalars['Int']
}

export type MutationRemoveCustomerB2bAccountUserArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
}

export type MutationRemoveOneTimeSubscriptionCouponArgs = {
  oneTimeCouponsInput?: InputMaybe<OneTimeCouponsInput>
  subscriptionId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationRepriceOrderShipmentArgs = {
  orderId: Scalars['String']
  repriceShipmentObjectInput?: InputMaybe<RepriceShipmentObjectInput>
  shipmentNumber: Scalars['Int']
}

export type MutationResendCheckoutEmailArgs = {
  checkoutId: Scalars['String']
}

export type MutationResendCustomerCreditEmailArgs = {
  code: Scalars['String']
  userId?: InputMaybe<Scalars['String']>
}

export type MutationResendOrderEmailArgs = {
  orderActionInput?: InputMaybe<OrderActionInput>
  orderId: Scalars['String']
}

export type MutationResendOrderFulfillmentEmailArgs = {
  fulfillmentActionInput?: InputMaybe<FulfillmentActionInput>
  orderId: Scalars['String']
}

export type MutationResendReturnEmailArgs = {
  returnActionInput?: InputMaybe<ReturnActionInput>
}

export type MutationResetCustomerAccountPasswordArgs = {
  resetPasswordInfoInput?: InputMaybe<ResetPasswordInfoInput>
}

export type MutationSetCustomerAccountLoginLockedArgs = {
  accountId: Scalars['Int']
  graphQLBoolean?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationSetCustomerAccountPasswordChangeRequiredArgs = {
  accountId: Scalars['Int']
  graphQLBoolean?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationSetReturnRestockArgs = {
  restockableReturnItemInput?: InputMaybe<Array<InputMaybe<RestockableReturnItemInput>>>
  returnId: Scalars['String']
}

export type MutationSetReturnShipArgs = {
  returnId: Scalars['String']
  returnItemSpecifierInput?: InputMaybe<Array<InputMaybe<ReturnItemSpecifierInput>>>
}

export type MutationSkipNextSubscriptionArgs = {
  subscriptionId: Scalars['String']
}

export type MutationSplitOrderShipmentArgs = {
  orderId: Scalars['String']
  shipmentNumber: Scalars['String']
  splitShipmentsObjectInput?: InputMaybe<SplitShipmentsObjectInput>
}

export type MutationToggleDocumentPublishingArgs = {
  documentLists?: InputMaybe<Scalars['String']>
  graphQLString?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type MutationUpdateCartArgs = {
  cartId: Scalars['String']
  cartInput?: InputMaybe<CrCartInput>
}

export type MutationUpdateCartCouponArgs = {
  cartId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationUpdateCartItemArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
  cartItemInput?: InputMaybe<CrCartItemInput>
  zipCode?: InputMaybe<Scalars['String']>
}

export type MutationUpdateCartItemQuantityArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
  quantity: Scalars['Int']
}

export type MutationUpdateChannelArgs = {
  channelInput?: InputMaybe<ChannelInput>
  code: Scalars['String']
}

export type MutationUpdateChannelGroupArgs = {
  channelGroupInput?: InputMaybe<ChannelGroupInput>
  code: Scalars['String']
}

export type MutationUpdateCheckoutArgs = {
  checkoutId: Scalars['String']
  checkoutInput?: InputMaybe<CheckoutInput>
}

export type MutationUpdateCheckoutAttributesArgs = {
  checkoutId: Scalars['String']
  orderAttributeInput?: InputMaybe<Array<InputMaybe<CrOrderAttributeInput>>>
  removeMissing?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateCheckoutCouponArgs = {
  checkoutId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationUpdateCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
  destinationInput?: InputMaybe<CrDestinationInput>
}

export type MutationUpdateCheckoutDigitalWalletTypeArgs = {
  checkoutId: Scalars['String']
  digitalWalletInput?: InputMaybe<DigitalWalletInput>
  digitalWalletType: Scalars['String']
}

export type MutationUpdateCheckoutItemDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
  itemId: Scalars['String']
}

export type MutationUpdateCheckoutPaymentActionArgs = {
  checkoutId: Scalars['String']
  paymentActionInput?: InputMaybe<PaymentActionInput>
  paymentId: Scalars['String']
}

export type MutationUpdateCheckoutPriceListArgs = {
  checkoutId: Scalars['String']
  graphQLString?: InputMaybe<Scalars['String']>
}

export type MutationUpdateCurrentCartArgs = {
  cartInput?: InputMaybe<CrCartInput>
}

export type MutationUpdateCurrentCartExtendedPropertiesArgs = {
  extendedPropertyInput?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
  upsert?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateCurrentCartExtendedPropertyArgs = {
  extendedPropertyInput?: InputMaybe<CrExtendedPropertyInput>
  key: Scalars['String']
  upsert?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateCurrentCartItemArgs = {
  cartItemId: Scalars['String']
  cartItemInput?: InputMaybe<CrCartItemInput>
  zipCode?: InputMaybe<Scalars['String']>
}

export type MutationUpdateCurrentCartItemQuantityArgs = {
  cartItemId: Scalars['String']
  quantity: Scalars['Int']
}

export type MutationUpdateCustomerAccountArgs = {
  accountId: Scalars['Int']
  customerAccountInput?: InputMaybe<CustomerAccountInput>
}

export type MutationUpdateCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  customerAttributeInput?: InputMaybe<CustomerAttributeInput>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationUpdateCustomerAccountAttributeDefinitionArgs = {
  attributeFQN: Scalars['String']
  attributeInput?: InputMaybe<CuAttributeInput>
}

export type MutationUpdateCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardId: Scalars['String']
  cardInput?: InputMaybe<CardInput>
}

export type MutationUpdateCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  contactId: Scalars['Int']
  customerContactInput?: InputMaybe<CustomerContactInput>
  userId?: InputMaybe<Scalars['String']>
}

export type MutationUpdateCustomerAccountContactsArgs = {
  accountId: Scalars['Int']
  customerContactInput?: InputMaybe<Array<InputMaybe<CustomerContactInput>>>
}

export type MutationUpdateCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  customerNoteInput?: InputMaybe<CustomerNoteInput>
  noteId: Scalars['Int']
}

export type MutationUpdateCustomerAccountPasswordsArgs = {
  accountPasswordInfoCollectionInput?: InputMaybe<AccountPasswordInfoCollectionInput>
}

export type MutationUpdateCustomerB2bAccountArgs = {
  accountId: Scalars['Int']
  b2BAccountInput?: InputMaybe<B2BAccountInput>
}

export type MutationUpdateCustomerB2bAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  customerAttributeInput?: InputMaybe<CustomerAttributeInput>
}

export type MutationUpdateCustomerB2bAccountUserArgs = {
  accountId: Scalars['Int']
  b2BUserInput?: InputMaybe<B2BUserInput>
  userId: Scalars['String']
}

export type MutationUpdateCustomerCreditArgs = {
  code: Scalars['String']
  creditInput?: InputMaybe<CuCreditInput>
}

export type MutationUpdateCustomerCreditAssociateToShopperArgs = {
  code: Scalars['String']
}

export type MutationUpdateCustomerPurchaseOrderAccountArgs = {
  accountId: Scalars['Int']
  customerPurchaseOrderAccountInput?: InputMaybe<CustomerPurchaseOrderAccountInput>
}

export type MutationUpdateCustomerSegmentArgs = {
  customerSegmentInput?: InputMaybe<CustomerSegmentInput>
  id: Scalars['Int']
}

export type MutationUpdateDocumentListArgs = {
  documentListInput?: InputMaybe<DocumentListInput>
  documentListName: Scalars['String']
}

export type MutationUpdateDocumentListDocumentArgs = {
  documentId: Scalars['String']
  documentInput?: InputMaybe<DocumentInput>
  documentListName: Scalars['String']
}

export type MutationUpdateDocumentListDocumentContentArgs = {
  documentId: Scalars['String']
  documentListName: Scalars['String']
  httpRequestMessageInput?: InputMaybe<CoHttpRequestMessageInput>
}

export type MutationUpdateDocumentListDocumentTreeContentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  httpRequestMessageInput?: InputMaybe<CoHttpRequestMessageInput>
}

export type MutationUpdateDocumentListTypeArgs = {
  documentListTypeFQN: Scalars['String']
  documentListTypeInput?: InputMaybe<DocumentListTypeInput>
}

export type MutationUpdateDocumentTypeArgs = {
  documentTypeInput?: InputMaybe<DocumentTypeInput>
  documentTypeName: Scalars['String']
}

export type MutationUpdateEntityListArgs = {
  entityListFullName: Scalars['String']
  entityListInput?: InputMaybe<EntityListInput>
}

export type MutationUpdateEntityListEntitiesArgs = {
  entityListFullName: Scalars['String']
  httpRequestMessageInput?: InputMaybe<MzdbHttpRequestMessageInput>
  id: Scalars['String']
}

export type MutationUpdateEntityListViewArgs = {
  entityListFullName: Scalars['String']
  listViewInput?: InputMaybe<ListViewInput>
  viewName: Scalars['String']
}

export type MutationUpdateForgottenCustomerAccountPasswordArgs = {
  confirmationInfoInput?: InputMaybe<ConfirmationInfoInput>
}

export type MutationUpdateLocationUsageArgs = {
  code: Scalars['String']
  locationUsageInput?: InputMaybe<LocationUsageInput>
}

export type MutationUpdateOrderArgs = {
  orderId: Scalars['String']
  orderInput?: InputMaybe<CrOrderInput>
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderAdjustmentArgs = {
  adjustmentInput?: InputMaybe<CrAdjustmentInput>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderAttributesArgs = {
  orderAttributeInput?: InputMaybe<Array<InputMaybe<CrOrderAttributeInput>>>
  orderId: Scalars['String']
  removeMissing?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateOrderBillingInfoArgs = {
  billingInfoInput?: InputMaybe<CrBillingInfoInput>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderCouponArgs = {
  couponCode: Scalars['String']
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderDigitalPackageArgs = {
  digitalPackageId: Scalars['String']
  digitalPackageInput?: InputMaybe<CrDigitalPackageInput>
  orderId: Scalars['String']
}

export type MutationUpdateOrderDigitalWalletTpeArgs = {
  digitalWalletInput?: InputMaybe<DigitalWalletInput>
  digitalWalletType: Scalars['String']
  orderId: Scalars['String']
}

export type MutationUpdateOrderDiscountArgs = {
  appliedDiscountInput?: InputMaybe<CrAppliedDiscountInput>
  discountId: Scalars['Int']
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderDraftArgs = {
  orderId: Scalars['String']
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderExtendedPropertiesArgs = {
  extendedPropertyInput?: InputMaybe<Array<InputMaybe<CrExtendedPropertyInput>>>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  upsert?: InputMaybe<Scalars['Boolean']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderExtendedPropertyArgs = {
  extendedPropertyInput?: InputMaybe<CrExtendedPropertyInput>
  key: Scalars['String']
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  upsert?: InputMaybe<Scalars['Boolean']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderFulfillmentInfoArgs = {
  fulfillmentInfoInput?: InputMaybe<CrFulfillmentInfoInput>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderHandlingAdjustmentArgs = {
  adjustmentInput?: InputMaybe<CrAdjustmentInput>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderItemDiscountArgs = {
  appliedDiscountInput?: InputMaybe<CrAppliedDiscountInput>
  discountId: Scalars['Int']
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderItemDutyAmountArgs = {
  dutyAmount: Scalars['Float']
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderItemFulfillmentArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  orderItemInput?: InputMaybe<CrOrderItemInput>
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderItemPriceArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  price: Scalars['Float']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderItemQuantityArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  quantity: Scalars['Int']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderNotesArgs = {
  noteId: Scalars['String']
  orderId: Scalars['String']
  orderNoteInput?: InputMaybe<CrOrderNoteInput>
}

export type MutationUpdateOrderPackageArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
  packageObjInput?: InputMaybe<CrPackageObjInput>
}

export type MutationUpdateOrderPickupArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
  pickupInput?: InputMaybe<CrPickupInput>
}

export type MutationUpdateOrderPriceArgs = {
  orderInput?: InputMaybe<CrOrderInput>
  refreshShipping?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateOrderPriceListArgs = {
  graphQLString?: InputMaybe<Scalars['String']>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderRefundArgs = {
  orderId: Scalars['String']
  refundId: Scalars['String']
}

export type MutationUpdateOrderShippingAdjustmentArgs = {
  adjustmentInput?: InputMaybe<CrAdjustmentInput>
  orderId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type MutationUpdateOrderValidationResultsArgs = {
  orderId: Scalars['String']
  orderValidationResultInput?: InputMaybe<CrOrderValidationResultInput>
}

export type MutationUpdatePropertyTypeArgs = {
  propertyTypeInput?: InputMaybe<PropertyTypeInput>
  propertyTypeName: Scalars['String']
}

export type MutationUpdateQuoteArgs = {
  quoteId: Scalars['String']
  quoteInput?: InputMaybe<QuoteInput>
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationUpdateReturnArgs = {
  returnId: Scalars['String']
  returnObjInput?: InputMaybe<ReturnObjInput>
}

export type MutationUpdateReturnNoteArgs = {
  noteId: Scalars['String']
  orderNoteInput?: InputMaybe<CrOrderNoteInput>
  returnId: Scalars['String']
}

export type MutationUpdateReturnPackageArgs = {
  packageId: Scalars['String']
  packageObjInput?: InputMaybe<CrPackageObjInput>
  returnId: Scalars['String']
}

export type MutationUpdateSubscriptionArgs = {
  subscriptionId: Scalars['String']
  subscriptionInput?: InputMaybe<SubscriptionInput>
}

export type MutationUpdateSubscriptionAdjustmentsArgs = {
  subscriptionAdjustmentInput?: InputMaybe<SubscriptionAdjustmentInput>
  subscriptionId: Scalars['String']
}

export type MutationUpdateSubscriptionFrequencyArgs = {
  frequencyInput?: InputMaybe<SbFrequencyInput>
  subscriptionId: Scalars['String']
}

export type MutationUpdateSubscriptionFulfillmentInfoArgs = {
  fulfillmentInfoInput?: InputMaybe<SbFulfillmentInfoInput>
  subscriptionId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationUpdateSubscriptionItemQuantityArgs = {
  quantity: Scalars['Int']
  subscriptionId: Scalars['String']
  subscriptionItemId: Scalars['String']
  subscriptionReasonInput?: InputMaybe<SubscriptionReasonInput>
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationUpdateSubscriptionNextOrderDateArgs = {
  subscriptionId: Scalars['String']
  subscriptionNextOrderDateInput?: InputMaybe<SubscriptionNextOrderDateInput>
}

export type MutationUpdateSubscriptionPaymentArgs = {
  paymentInput?: InputMaybe<SbPaymentInput>
  subscriptionId: Scalars['String']
  updateMode?: InputMaybe<Scalars['String']>
}

export type MutationUpdateTargetRuleArgs = {
  code: Scalars['String']
  targetRuleInput?: InputMaybe<TargetRuleInput>
}

export type MutationUpdateUserCartArgs = {
  cartInput?: InputMaybe<CrCartInput>
  userId: Scalars['String']
}

export type MutationUpdateUserOrderArgs = {
  orderId: Scalars['String']
}

export type MutationUpdateWishlistArgs = {
  wishlistId: Scalars['String']
  wishlistInput?: InputMaybe<CrWishlistInput>
}

export type MutationUpdateWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
  wishlistItemInput?: InputMaybe<CrWishlistItemInput>
}

export type MutationUpdateWishlistItemQuantityArgs = {
  quantity: Scalars['Int']
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
}

export type MutationValidateAddressArgs = {
  addressInput?: InputMaybe<CuAddressInput>
}

export type MutationValidateCustomerAddressArgs = {
  addressValidationRequestInput?: InputMaybe<AddressValidationRequestInput>
}

export type MutationValidateOrderArgs = {
  orderInput?: InputMaybe<CrOrderInput>
}

export type MutationValidateProductArgs = {
  productCode: Scalars['String']
  productOptionSelectionsInput?: InputMaybe<ProductOptionSelectionsInput>
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity?: InputMaybe<Scalars['Int']>
  recalculateDynamicCategories?: InputMaybe<Scalars['Boolean']>
  skipDefaults?: InputMaybe<Scalars['Boolean']>
  skipInventoryCheck?: InputMaybe<Scalars['Boolean']>
  useSubscriptionPricing?: InputMaybe<Scalars['Boolean']>
}

export type MutationValidateProductDiscountsArgs = {
  allowInactive?: InputMaybe<Scalars['Boolean']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  discountSelectionsInput?: InputMaybe<DiscountSelectionsInput>
  productCode: Scalars['String']
  skipInventoryCheck?: InputMaybe<Scalars['Boolean']>
  variationProductCode?: InputMaybe<Scalars['String']>
}

export type MutationValidateTargetRuleArgs = {
  targetRuleInput?: InputMaybe<TargetRuleInput>
}

export type OneTimeCouponsInput = {
  couponCodes?: InputMaybe<Array<Scalars['String']>>
}

export type OnetimeProduct = {
  __typename?: 'OnetimeProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OnetimeProduct>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentType?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<SbProductOption>>>
  productCode?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  variationProductCode?: Maybe<Scalars['String']>
}

export type OnetimeProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type OnetimeProductInput = {
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  fulfillmentType?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<InputMaybe<SbProductOptionInput>>>
  productCode?: InputMaybe<Scalars['String']>
  productName?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  variationProductCode?: InputMaybe<Scalars['String']>
}

export type OnetimeShippingMethod = {
  __typename?: 'OnetimeShippingMethod'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OnetimeShippingMethod>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
}

export type OnetimeShippingMethod_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type OnetimeShippingMethodInput = {
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
}

export enum NodeTypeEnum {
  Array = 'ARRAY',
  Binary = 'BINARY',
  Boolean = 'BOOLEAN',
  Missing = 'MISSING',
  Null = 'NULL',
  Number = 'NUMBER',
  Object = 'OBJECT',
  Pojo = 'POJO',
  String = 'STRING',
}

export type OrderActionInput = {
  actionName?: InputMaybe<Scalars['String']>
}

export type OrderCollection = {
  __typename?: 'OrderCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderCollection>
  items?: Maybe<Array<Maybe<CrOrder>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type OrderCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type OrderItemCollection = {
  __typename?: 'OrderItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderItemCollection>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  totalCount: Scalars['Int']
}

export type OrderItemCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type OrderReturnableItem = {
  __typename?: 'OrderReturnableItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderReturnableItem>
  fulfillmentFields?: Maybe<Array<Maybe<CrFulfillmentField>>>
  fulfillmentStatus?: Maybe<Scalars['String']>
  mfgPartNumber?: Maybe<Scalars['String']>
  orderItemId?: Maybe<Scalars['String']>
  orderItemOptionAttributeFQN?: Maybe<Scalars['String']>
  orderLineId: Scalars['Int']
  parentProductCode?: Maybe<Scalars['String']>
  parentProductName?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  quantityFulfilled: Scalars['Int']
  quantityOrdered: Scalars['Int']
  quantityRejected: Scalars['Int']
  quantityReturnable: Scalars['Int']
  quantityReturned: Scalars['Int']
  shipmentItemId?: Maybe<Scalars['Int']>
  shipmentNumber?: Maybe<Scalars['Int']>
  sku?: Maybe<Scalars['String']>
  unitQuantity: Scalars['Int']
}

export type OrderReturnableItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type OrderReturnableItemCollection = {
  __typename?: 'OrderReturnableItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderReturnableItemCollection>
  items?: Maybe<Array<Maybe<OrderReturnableItem>>>
  totalCount: Scalars['Int']
}

export type OrderReturnableItemCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PackageSettings = {
  __typename?: 'PackageSettings'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PackageSettings>
  unitType?: Maybe<Scalars['String']>
}

export type PackageSettings_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PackingSlipItemDetailDto = {
  __typename?: 'PackingSlipItemDetailDto'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PackingSlipItemDetailDto>
  attributes: Scalars['Object']
  lineId: Scalars['Int']
  originalOrderItemId: Scalars['String']
  quantity: Scalars['Int']
}

export type PackingSlipItemDetailDto_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PageMetadata = {
  __typename?: 'PageMetadata'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PageMetadata>
  number: Scalars['Int']
  size: Scalars['Int']
  totalElements: Scalars['Int']
  totalPages: Scalars['Int']
}

export type PageMetadata_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PagedModelOfEntityModelOfShipment = {
  __typename?: 'PagedModelOfEntityModelOfShipment'
  _embedded: Scalars['Object']
  _get?: Maybe<Scalars['AnyScalar']>
  _links?: Maybe<Links>
  _root?: Maybe<PagedModelOfEntityModelOfShipment>
  page?: Maybe<PageMetadata>
}

export type PagedModelOfEntityModelOfShipment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PasswordInfoInput = {
  externalPassword?: InputMaybe<Scalars['String']>
  newPassword?: InputMaybe<Scalars['String']>
  oldPassword?: InputMaybe<Scalars['String']>
}

export type PaymentActionInput = {
  actionName?: InputMaybe<Scalars['String']>
  amount?: InputMaybe<Scalars['Float']>
  cancelUrl?: InputMaybe<Scalars['String']>
  checkNumber?: InputMaybe<Scalars['String']>
  currencyCode?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  externalTransactionId?: InputMaybe<Scalars['String']>
  interactionDate?: InputMaybe<Scalars['DateTime']>
  manualGatewayInteraction?: InputMaybe<PaymentGatewayInteractionInput>
  newBillingInfo?: InputMaybe<CrBillingInfoInput>
  recaptcha?: InputMaybe<Scalars['String']>
  referenceSourcePaymentId?: InputMaybe<Scalars['String']>
  returnUrl?: InputMaybe<Scalars['String']>
}

export type PaymentCollection = {
  __typename?: 'PaymentCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentCollection>
  items?: Maybe<Array<Maybe<CrPayment>>>
  totalCount: Scalars['Int']
}

export type PaymentCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PaymentGatewayInteractionInput = {
  gatewayAVSCodes?: InputMaybe<Scalars['String']>
  gatewayAuthCode?: InputMaybe<Scalars['String']>
  gatewayCVV2Codes?: InputMaybe<Scalars['String']>
  gatewayInteractionId?: InputMaybe<Scalars['Int']>
  gatewayResponseCode?: InputMaybe<Scalars['String']>
  gatewayResponseText?: InputMaybe<Scalars['String']>
  gatewayTransactionId?: InputMaybe<Scalars['String']>
}

export enum PickStatusEnum {
  Available = 'AVAILABLE',
  Complete = 'COMPLETE',
  InWave = 'IN_WAVE',
  Picked = 'PICKED',
  Transfer = 'TRANSFER',
}

export enum PickTypeEnum {
  Multiple = 'MULTIPLE',
  Normal = 'NORMAL',
  Single = 'SINGLE',
}

export type PrAppliedDiscount = {
  __typename?: 'PrAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrAppliedDiscount>
  couponCode?: Maybe<Scalars['String']>
  discount?: Maybe<PrDiscount>
  discounts?: Maybe<Array<Maybe<PrDiscount>>>
  impact: Scalars['Float']
}

export type PrAppliedDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrAttributeValidation = {
  __typename?: 'PrAttributeValidation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrAttributeValidation>
  maxDateValue?: Maybe<Scalars['DateTime']>
  maxNumericValue?: Maybe<Scalars['Float']>
  maxStringLength?: Maybe<Scalars['Int']>
  minDateValue?: Maybe<Scalars['DateTime']>
  minNumericValue?: Maybe<Scalars['Float']>
  minStringLength?: Maybe<Scalars['Int']>
  regularExpression?: Maybe<Scalars['String']>
}

export type PrAttributeValidation_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrBundledProduct = {
  __typename?: 'PrBundledProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrBundledProduct>
  content?: Maybe<ProductContent>
  creditValue?: Maybe<Scalars['Float']>
  goodsType?: Maybe<Scalars['String']>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<PrPackageMeasurements>
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  productCode?: Maybe<Scalars['String']>
  productType?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type PrBundledProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrCategory = {
  __typename?: 'PrCategory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrCategory>
  attributes?: Maybe<Array<Maybe<CategoryAttribute>>>
  categoryCode?: Maybe<Scalars['String']>
  categoryId: Scalars['Int']
  childrenCategories?: Maybe<Array<Maybe<PrCategory>>>
  content?: Maybe<CategoryContent>
  count?: Maybe<Scalars['Int']>
  isDisplayed?: Maybe<Scalars['Boolean']>
  parentCategory?: Maybe<PrCategory>
  sequence?: Maybe<Scalars['Int']>
  shouldSlice?: Maybe<Scalars['Boolean']>
  updateDate: Scalars['DateTime']
}

export type PrCategory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrDiscount = {
  __typename?: 'PrDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrDiscount>
  discountId: Scalars['Int']
  expirationDate?: Maybe<Scalars['DateTime']>
  friendlyDescription?: Maybe<Scalars['String']>
  impact: Scalars['Float']
  name?: Maybe<Scalars['String']>
}

export type PrDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrFutureInventory = {
  __typename?: 'PrFutureInventory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrFutureInventory>
  allocated?: Maybe<Scalars['Int']>
  available?: Maybe<Scalars['Int']>
  createDate?: Maybe<Scalars['DateTime']>
  deliveryDate?: Maybe<Scalars['DateTime']>
  futureInventoryID?: Maybe<Scalars['Int']>
  onhand?: Maybe<Scalars['Int']>
  pending?: Maybe<Scalars['Int']>
}

export type PrFutureInventory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrInventoryTagInput = {
  name?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type PrMeasurement = {
  __typename?: 'PrMeasurement'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrMeasurement>
  unit?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Float']>
}

export type PrMeasurement_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PrPackageMeasurements = {
  __typename?: 'PrPackageMeasurements'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrPackageMeasurements>
  packageHeight?: Maybe<PrMeasurement>
  packageLength?: Maybe<PrMeasurement>
  packageWeight?: Maybe<PrMeasurement>
  packageWidth?: Maybe<PrMeasurement>
}

export type PrPackageMeasurements_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PriceList = {
  __typename?: 'PriceList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PriceList>
  ancestors?: Maybe<Array<Maybe<PriceListNode>>>
  descendants?: Maybe<Array<Maybe<PriceListNode>>>
  description?: Maybe<Scalars['String']>
  enabled?: Maybe<Scalars['Boolean']>
  filteredInStoreFront?: Maybe<Scalars['Boolean']>
  isIndexed?: Maybe<Scalars['Boolean']>
  isSiteDefault?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  priceListCode?: Maybe<Scalars['String']>
  priceListId: Scalars['Int']
  resolvable?: Maybe<Scalars['Boolean']>
  validSites?: Maybe<Array<Scalars['Int']>>
}

export type PriceList_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PriceListNode = {
  __typename?: 'PriceListNode'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PriceListNode>
  parentPriceListId?: Maybe<Scalars['Int']>
  priceListCode?: Maybe<Scalars['String']>
  priceListId: Scalars['Int']
  priceListLevel: Scalars['Int']
}

export type PriceListNode_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingAppliedDiscount = {
  __typename?: 'PricingAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
  discount?: Maybe<PricingDiscount>
  impact: Scalars['Float']
}

export type PricingAppliedDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingAppliedLineItemProductDiscount = {
  __typename?: 'PricingAppliedLineItemProductDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars['Boolean']>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
  discount?: Maybe<PricingDiscount>
  impact: Scalars['Float']
  impactPerUnit: Scalars['Float']
  isForced?: Maybe<Scalars['Boolean']>
  normalizedImpact: Scalars['Float']
  quantity: Scalars['Int']
}

export type PricingAppliedLineItemProductDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingAppliedLineItemShippingDiscount = {
  __typename?: 'PricingAppliedLineItemShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedLineItemShippingDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
  discount?: Maybe<PricingDiscount>
  impact: Scalars['Float']
  impactPerUnit: Scalars['Float']
  isForced?: Maybe<Scalars['Boolean']>
  normalizedImpact: Scalars['Float']
  quantity: Scalars['Int']
  shippingMethodCode?: Maybe<Scalars['String']>
}

export type PricingAppliedLineItemShippingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingAppliedOrderShippingDiscount = {
  __typename?: 'PricingAppliedOrderShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedOrderShippingDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
  discount?: Maybe<PricingDiscount>
  impact: Scalars['Float']
  shippingMethodCode?: Maybe<Scalars['String']>
}

export type PricingAppliedOrderShippingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingDiscount = {
  __typename?: 'PricingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingDiscount>
  amount: Scalars['Float']
  amountType?: Maybe<Scalars['String']>
  condition?: Maybe<PricingDiscountCondition>
  discountId: Scalars['Int']
  doesNotApplyToMultiShipToOrders?: Maybe<Scalars['Boolean']>
  doesNotApplyToProductsWithSalePrice?: Maybe<Scalars['Boolean']>
  expirationDate?: Maybe<Scalars['DateTime']>
  friendlyDescription?: Maybe<Scalars['String']>
  includedPriceLists?: Maybe<Array<Scalars['String']>>
  maxDiscountValuePerRedemption?: Maybe<Scalars['Float']>
  maxRedemptions?: Maybe<Scalars['Int']>
  maximumDiscountValuePerOrder?: Maybe<Scalars['Float']>
  maximumRedemptionsPerOrder?: Maybe<Scalars['Int']>
  maximumUsesPerUser?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  redemptions: Scalars['Int']
  requiresAuthenticatedUser?: Maybe<Scalars['Boolean']>
  scope?: Maybe<Scalars['String']>
  stackingLayer: Scalars['Int']
  target?: Maybe<PricingDiscountTarget>
  type?: Maybe<Scalars['String']>
}

export type PricingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingDiscountCondition = {
  __typename?: 'PricingDiscountCondition'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingDiscountCondition>
  couponCode?: Maybe<Scalars['String']>
  customerSegmentIds?: Maybe<Array<Scalars['Int']>>
  excludedCategoryIds?: Maybe<Array<Scalars['Int']>>
  excludedProductCodes?: Maybe<Array<Scalars['String']>>
  expirationDate?: Maybe<Scalars['DateTime']>
  includedCategoryIds?: Maybe<Array<Scalars['Int']>>
  includedProductCodes?: Maybe<Array<Scalars['String']>>
  maximumOrderAmount?: Maybe<Scalars['Float']>
  minDistinctProductsRequired?: Maybe<Scalars['Int']>
  minimumCategorySubtotalBeforeDiscounts?: Maybe<Scalars['Float']>
  minimumLifetimeValueAmount?: Maybe<Scalars['Float']>
  minimumOrderAmount?: Maybe<Scalars['Float']>
  minimumQuantityProductsRequiredInCategories?: Maybe<Scalars['Int']>
  minimumQuantityRequiredProducts?: Maybe<Scalars['Int']>
  paymentWorkflows?: Maybe<Array<Scalars['String']>>
  requiresCoupon?: Maybe<Scalars['Boolean']>
  startDate?: Maybe<Scalars['DateTime']>
}

export type PricingDiscountCondition_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingDiscountTarget = {
  __typename?: 'PricingDiscountTarget'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingDiscountTarget>
  excludedCategoriesOperator?: Maybe<Scalars['String']>
  excludedCategoryIds?: Maybe<Array<Scalars['Int']>>
  excludedProductCodes?: Maybe<Array<Scalars['String']>>
  includeAllProducts?: Maybe<Scalars['Boolean']>
  includedCategoriesOperator?: Maybe<Scalars['String']>
  includedCategoryIds?: Maybe<Array<Scalars['Int']>>
  includedProductCodes?: Maybe<Array<Scalars['String']>>
  shippingMethods?: Maybe<Array<Scalars['String']>>
  shippingZones?: Maybe<Array<Scalars['String']>>
  type?: Maybe<Scalars['String']>
}

export type PricingDiscountTarget_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingProductAttribute = {
  __typename?: 'PricingProductAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingProductAttribute>
  dataType?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  inputType?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  valueType?: Maybe<Scalars['String']>
}

export type PricingProductAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingProductProperty = {
  __typename?: 'PricingProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingProductProperty>
  attributeDetail?: Maybe<PricingProductAttribute>
  attributeFQN?: Maybe<Scalars['String']>
  isHidden?: Maybe<Scalars['Boolean']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  values?: Maybe<Array<Maybe<PricingProductPropertyValue>>>
}

export type PricingProductProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingProductPropertyValue = {
  __typename?: 'PricingProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingProductPropertyValue>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type PricingProductPropertyValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingTaxAttribute = {
  __typename?: 'PricingTaxAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxAttribute>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  fullyQualifiedName?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type PricingTaxAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingTaxContext = {
  __typename?: 'PricingTaxContext'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxContext>
  customerId?: Maybe<Scalars['String']>
  destinationAddress?: Maybe<CrAddress>
  originAddress?: Maybe<CrAddress>
  taxContextId?: Maybe<Scalars['String']>
  taxExemptId?: Maybe<Scalars['String']>
}

export type PricingTaxContext_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingTaxableLineItem = {
  __typename?: 'PricingTaxableLineItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxableLineItem>
  data?: Maybe<Scalars['Object']>
  destinationAddress?: Maybe<CrAddress>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  isTaxable?: Maybe<Scalars['Boolean']>
  lineItemPrice: Scalars['Float']
  originAddress?: Maybe<CrAddress>
  productCode?: Maybe<Scalars['String']>
  productDiscount?: Maybe<PricingAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<PricingAppliedLineItemProductDiscount>>>
  productName?: Maybe<Scalars['String']>
  productProperties?: Maybe<Array<Maybe<PricingProductProperty>>>
  quantity: Scalars['Int']
  reason?: Maybe<Scalars['String']>
  shippingAmount: Scalars['Float']
  shippingDiscount?: Maybe<PricingAppliedLineItemShippingDiscount>
  shippingDiscounts?: Maybe<Array<Maybe<PricingAppliedLineItemShippingDiscount>>>
  variantProductCode?: Maybe<Scalars['String']>
}

export type PricingTaxableLineItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PricingTaxableOrder = {
  __typename?: 'PricingTaxableOrder'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxableOrder>
  attributes?: Maybe<Array<Maybe<PricingTaxAttribute>>>
  currencyCode?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  handlingDiscount?: Maybe<PricingAppliedDiscount>
  handlingDiscounts?: Maybe<Array<Maybe<PricingAppliedDiscount>>>
  handlingFee: Scalars['Float']
  lineItems?: Maybe<Array<Maybe<PricingTaxableLineItem>>>
  orderDate: Scalars['DateTime']
  orderDiscount?: Maybe<PricingAppliedDiscount>
  orderDiscounts?: Maybe<Array<Maybe<PricingAppliedDiscount>>>
  orderId?: Maybe<Scalars['String']>
  orderNumber?: Maybe<Scalars['Int']>
  originalDocumentCode?: Maybe<Scalars['String']>
  originalOrderDate: Scalars['DateTime']
  shippingAmount: Scalars['Float']
  shippingDiscount?: Maybe<PricingAppliedOrderShippingDiscount>
  shippingDiscounts?: Maybe<Array<Maybe<PricingAppliedOrderShippingDiscount>>>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  taxContext?: Maybe<PricingTaxContext>
  taxRequestType?: Maybe<Scalars['String']>
}

export type PricingTaxableOrder_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Product = {
  __typename?: 'Product'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Product>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  bundledProducts?: Maybe<Array<Maybe<PrBundledProduct>>>
  catalogEndDate?: Maybe<Scalars['DateTime']>
  catalogStartDate?: Maybe<Scalars['DateTime']>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  collectionMembersProductContent?: Maybe<Array<Maybe<ProductContent>>>
  content?: Maybe<ProductContent>
  createDate: Scalars['DateTime']
  dateFirstAvailableInCatalog?: Maybe<Scalars['DateTime']>
  daysAvailableInCatalog?: Maybe<Scalars['Int']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isActive?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  locationsInStock?: Maybe<Array<Scalars['String']>>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars['String']>
  mfgPartNumbers?: Maybe<Array<Scalars['String']>>
  options?: Maybe<Array<Maybe<ProductOption>>>
  personalizationScore: Scalars['Float']
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  productCode?: Maybe<Scalars['String']>
  productCollectionMembers?: Maybe<Array<Maybe<ProductCollectionMember>>>
  productCollections?: Maybe<Array<Maybe<ProductCollectionInfo>>>
  productImageGroups?: Maybe<Array<Maybe<ProductImageGroup>>>
  productSequence?: Maybe<Scalars['Int']>
  productType?: Maybe<Scalars['String']>
  productTypeId?: Maybe<Scalars['Int']>
  productUsage?: Maybe<Scalars['String']>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  publishState?: Maybe<Scalars['String']>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars['String']>
  score: Scalars['Float']
  sliceValue?: Maybe<Scalars['String']>
  slicingAttributeFQN?: Maybe<Scalars['String']>
  upCs?: Maybe<Array<Scalars['String']>>
  upc?: Maybe<Scalars['String']>
  updateDate: Scalars['DateTime']
  validPriceLists?: Maybe<Array<Scalars['String']>>
  variationProductCode?: Maybe<Scalars['String']>
  variations?: Maybe<Array<Maybe<VariationSummary>>>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
}

export type Product_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductPropertiesArgs = {
  filterAttribute?: InputMaybe<Scalars['String']>
  filterOperator?: InputMaybe<Scalars['String']>
  filterValue?: InputMaybe<Scalars['Object']>
}

export type ProductCollection = {
  __typename?: 'ProductCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollection>
  items?: Maybe<Array<Maybe<Product>>>
  nextCursorMark?: Maybe<Scalars['String']>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type ProductCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductCollectionInfo = {
  __typename?: 'ProductCollectionInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollectionInfo>
  isPrimary?: Maybe<Scalars['Boolean']>
  productCode?: Maybe<Scalars['String']>
}

export type ProductCollectionInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductCollectionMember = {
  __typename?: 'ProductCollectionMember'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollectionMember>
  memberKey?: Maybe<ProductCollectionMemberKey>
}

export type ProductCollectionMember_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductCollectionMemberKey = {
  __typename?: 'ProductCollectionMemberKey'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollectionMemberKey>
  value?: Maybe<Scalars['String']>
}

export type ProductCollectionMemberKey_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductContent = {
  __typename?: 'ProductContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductContent>
  metaTagDescription?: Maybe<Scalars['String']>
  metaTagKeywords?: Maybe<Scalars['String']>
  metaTagTitle?: Maybe<Scalars['String']>
  productFullDescription?: Maybe<Scalars['String']>
  productImages?: Maybe<Array<Maybe<ProductImage>>>
  productName?: Maybe<Scalars['String']>
  productShortDescription?: Maybe<Scalars['String']>
  seoFriendlyUrl?: Maybe<Scalars['String']>
}

export type ProductContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductCost = {
  __typename?: 'ProductCost'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCost>
  cost: Scalars['Float']
  productCode?: Maybe<Scalars['String']>
}

export type ProductCost_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductCostCollection = {
  __typename?: 'ProductCostCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCostCollection>
  items?: Maybe<Array<Maybe<ProductCost>>>
  totalCount: Scalars['Int']
}

export type ProductCostCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductCostQueryInput = {
  productCodes?: InputMaybe<Array<Scalars['String']>>
}

export type ProductForIndexing = {
  __typename?: 'ProductForIndexing'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductForIndexing>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  bundledProducts?: Maybe<Array<Maybe<PrBundledProduct>>>
  catalogEndDate?: Maybe<Scalars['DateTime']>
  catalogStartDate?: Maybe<Scalars['DateTime']>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  collectionMembersProductContent?: Maybe<Array<Maybe<ProductContent>>>
  content?: Maybe<ProductContent>
  createDate: Scalars['DateTime']
  dateFirstAvailableInCatalog?: Maybe<Scalars['DateTime']>
  daysAvailableInCatalog?: Maybe<Scalars['Int']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isActive?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  locationsInStock?: Maybe<Array<Scalars['String']>>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars['String']>
  mfgPartNumbers?: Maybe<Array<Scalars['String']>>
  options?: Maybe<Array<Maybe<ProductOption>>>
  personalizationScore: Scalars['Float']
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  productCode?: Maybe<Scalars['String']>
  productCollectionMembers?: Maybe<Array<Maybe<ProductCollectionMember>>>
  productCollections?: Maybe<Array<Maybe<ProductCollectionInfo>>>
  productImageGroups?: Maybe<Array<Maybe<ProductImageGroup>>>
  productSequence?: Maybe<Scalars['Int']>
  productType?: Maybe<Scalars['String']>
  productTypeId?: Maybe<Scalars['Int']>
  productUsage?: Maybe<Scalars['String']>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  publishState?: Maybe<Scalars['String']>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars['String']>
  score: Scalars['Float']
  sliceValue?: Maybe<Scalars['String']>
  slices?: Maybe<Array<Maybe<Product>>>
  slicingAttributeFQN?: Maybe<Scalars['String']>
  upCs?: Maybe<Array<Scalars['String']>>
  upc?: Maybe<Scalars['String']>
  updateDate: Scalars['DateTime']
  validPriceLists?: Maybe<Array<Scalars['String']>>
  variationProductCode?: Maybe<Scalars['String']>
  variations?: Maybe<Array<Maybe<VariationSummary>>>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
}

export type ProductForIndexing_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductImage = {
  __typename?: 'ProductImage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductImage>
  altText?: Maybe<Scalars['String']>
  cmsId?: Maybe<Scalars['String']>
  imageLabel?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  mediaType?: Maybe<Scalars['String']>
  productImageGroupId?: Maybe<Scalars['String']>
  sequence?: Maybe<Scalars['Int']>
  videoUrl?: Maybe<Scalars['String']>
}

export type ProductImage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductImageGroup = {
  __typename?: 'ProductImageGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductImageGroup>
  productImageGroupId: Scalars['String']
  productImageGroupTags?: Maybe<Array<Maybe<ProductImageGroupTag>>>
}

export type ProductImageGroup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductImageGroupTag = {
  __typename?: 'ProductImageGroupTag'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductImageGroupTag>
  attributeFqn?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ProductImageGroupTag_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductInventoryInfo = {
  __typename?: 'ProductInventoryInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductInventoryInfo>
  availableDate?: Maybe<Scalars['DateTime']>
  manageStock?: Maybe<Scalars['Boolean']>
  onlineLocationCode?: Maybe<Scalars['String']>
  onlineSoftStockAvailable?: Maybe<Scalars['Int']>
  onlineStockAvailable?: Maybe<Scalars['Int']>
  outOfStockBehavior?: Maybe<Scalars['String']>
}

export type ProductInventoryInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductOption = {
  __typename?: 'ProductOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductOption>
  attributeDetail?: Maybe<AttributeDetail>
  attributeFQN?: Maybe<Scalars['String']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  isProductImageGroupSelector?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  values?: Maybe<Array<Maybe<ProductOptionValue>>>
}

export type ProductOption_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductOptionSelectionInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  attributeValueId?: InputMaybe<Scalars['Int']>
  shopperEnteredValue?: InputMaybe<Scalars['Object']>
  value?: InputMaybe<Scalars['Object']>
}

export type ProductOptionSelectionsInput = {
  options?: InputMaybe<Array<InputMaybe<ProductOptionSelectionInput>>>
  variationProductCode?: InputMaybe<Scalars['String']>
}

export type ProductOptionValue = {
  __typename?: 'ProductOptionValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductOptionValue>
  attributeValueId: Scalars['Int']
  bundledProduct?: Maybe<PrBundledProduct>
  deltaPrice?: Maybe<Scalars['Float']>
  deltaWeight?: Maybe<Scalars['Float']>
  displayInfo?: Maybe<AttributeVocabularyValueDisplayInfo>
  isDefault?: Maybe<Scalars['Boolean']>
  isEnabled?: Maybe<Scalars['Boolean']>
  isSelected?: Maybe<Scalars['Boolean']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type ProductOptionValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductPrice = {
  __typename?: 'ProductPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPrice>
  catalogListPrice?: Maybe<Scalars['Float']>
  catalogSalePrice?: Maybe<Scalars['Float']>
  creditValue?: Maybe<Scalars['Float']>
  discount?: Maybe<PrAppliedDiscount>
  effectivePricelistCode?: Maybe<Scalars['String']>
  msrp?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  priceListEntryCode?: Maybe<Scalars['String']>
  priceListEntryMode?: Maybe<Scalars['String']>
  priceType?: Maybe<Scalars['String']>
  salePrice?: Maybe<Scalars['Float']>
  salePriceType?: Maybe<Scalars['String']>
}

export type ProductPrice_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductPriceRange = {
  __typename?: 'ProductPriceRange'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPriceRange>
  lower?: Maybe<ProductPrice>
  upper?: Maybe<ProductPrice>
}

export type ProductPriceRange_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductPricingBehaviorInfo = {
  __typename?: 'ProductPricingBehaviorInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPricingBehaviorInfo>
  discountsRestricted?: Maybe<Scalars['Boolean']>
  discountsRestrictedEndDate?: Maybe<Scalars['DateTime']>
  discountsRestrictedStartDate?: Maybe<Scalars['DateTime']>
}

export type ProductPricingBehaviorInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductProperty = {
  __typename?: 'ProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductProperty>
  attributeDetail?: Maybe<AttributeDetail>
  attributeFQN?: Maybe<Scalars['String']>
  isHidden?: Maybe<Scalars['Boolean']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  propertyType?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<ProductPropertyValue>>>
}

export type ProductProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductPropertyValue = {
  __typename?: 'ProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPropertyValue>
  displayInfo?: Maybe<AttributeVocabularyValueDisplayInfo>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type ProductPropertyValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductPurchasableState = {
  __typename?: 'ProductPurchasableState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPurchasableState>
  isPurchasable?: Maybe<Scalars['Boolean']>
  messages?: Maybe<Array<Maybe<ValidationMessage>>>
}

export type ProductPurchasableState_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductSearchRandomAccessCursor = {
  __typename?: 'ProductSearchRandomAccessCursor'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductSearchRandomAccessCursor>
  cursorMarks?: Maybe<Array<Scalars['String']>>
}

export type ProductSearchRandomAccessCursor_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductSearchResult = {
  __typename?: 'ProductSearchResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductSearchResult>
  facets?: Maybe<Array<Maybe<Facet>>>
  items?: Maybe<Array<Maybe<Product>>>
  nextCursorMark?: Maybe<Scalars['String']>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  searchEngine?: Maybe<Scalars['String']>
  searchRedirect?: Maybe<Scalars['String']>
  solrDebugInfo?: Maybe<SolrDebugInfo>
  spellcheck?: Maybe<Spellcheck>
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type ProductSearchResult_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductSummaryInput = {
  categories?: InputMaybe<Array<InputMaybe<SrCategoryInput>>>
  options?: InputMaybe<Array<InputMaybe<SrProductOptionInput>>>
  price: Scalars['Float']
  productCode?: InputMaybe<Scalars['String']>
  productDescription?: InputMaybe<Scalars['String']>
  productType?: InputMaybe<Scalars['String']>
  properties?: InputMaybe<Array<InputMaybe<SrProductPropertyInput>>>
  quantity: Scalars['Int']
  unitMeasurements?: InputMaybe<ItemMeasurementsInput>
}

export type ProductValidationSummary = {
  __typename?: 'ProductValidationSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductValidationSummary>
  bundledProducts?: Maybe<Array<Maybe<BundledProductSummary>>>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  image?: Maybe<ProductImage>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<PrPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars['String']>
  price?: Maybe<ProductPrice>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  productCode?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  productShortDescription?: Maybe<Scalars['String']>
  productType?: Maybe<Scalars['String']>
  productUsage?: Maybe<Scalars['String']>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  purchasableState?: Maybe<ProductPurchasableState>
  purchaseLocation?: Maybe<Scalars['String']>
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
}

export type ProductValidationSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ProductVolumePrice = {
  __typename?: 'ProductVolumePrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductVolumePrice>
  isCurrent?: Maybe<Scalars['Boolean']>
  maxQty?: Maybe<Scalars['Int']>
  minQty: Scalars['Int']
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
}

export type ProductVolumePrice_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Property = {
  __typename?: 'Property'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Property>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  propertyType?: Maybe<PropertyType>
}

export type Property_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PropertyInput = {
  isMultiValued?: InputMaybe<Scalars['Boolean']>
  isRequired?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  propertyType?: InputMaybe<PropertyTypeInput>
}

export type PropertyType = {
  __typename?: 'PropertyType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PropertyType>
  adminName?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  isAggregatable?: Maybe<Scalars['Boolean']>
  isQueryable?: Maybe<Scalars['Boolean']>
  isSortable?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  propertyTypeFQN?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type PropertyType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PropertyTypeCollection = {
  __typename?: 'PropertyTypeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PropertyTypeCollection>
  items?: Maybe<Array<Maybe<PropertyType>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type PropertyTypeCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PropertyTypeInput = {
  adminName?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  installationPackage?: InputMaybe<Scalars['String']>
  isAggregatable?: InputMaybe<Scalars['Boolean']>
  isQueryable?: InputMaybe<Scalars['Boolean']>
  isSortable?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  namespace?: InputMaybe<Scalars['String']>
  propertyTypeFQN?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
}

export type PurchaseOrderTransaction = {
  __typename?: 'PurchaseOrderTransaction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderTransaction>
  additionalTransactionDetail?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
  author?: Maybe<Scalars['String']>
  availableBalance: Scalars['Float']
  creditLimit: Scalars['Float']
  customerPurchaseOrderAccountId: Scalars['Int']
  externalId?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  purchaseOrderNumber?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  transactionAmount: Scalars['Float']
  transactionDate: Scalars['DateTime']
  transactionDescription?: Maybe<Scalars['String']>
  transactionTypeId: Scalars['Int']
}

export type PurchaseOrderTransaction_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PurchaseOrderTransactionCollection = {
  __typename?: 'PurchaseOrderTransactionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderTransactionCollection>
  items?: Maybe<Array<Maybe<PurchaseOrderTransaction>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type PurchaseOrderTransactionCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type PurchaseOrderTransactionInput = {
  additionalTransactionDetail?: InputMaybe<Scalars['String']>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  author?: InputMaybe<Scalars['String']>
  availableBalance: Scalars['Float']
  creditLimit: Scalars['Float']
  customerPurchaseOrderAccountId: Scalars['Int']
  externalId?: InputMaybe<Scalars['String']>
  orderId?: InputMaybe<Scalars['String']>
  purchaseOrderNumber?: InputMaybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  transactionAmount: Scalars['Float']
  transactionDate: Scalars['DateTime']
  transactionDescription?: InputMaybe<Scalars['String']>
  transactionTypeId: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  adminLocation?: Maybe<Location>
  adminLocationAttribute?: Maybe<LoAttribute>
  adminLocationAttributeVocabularyValues?: Maybe<Array<Maybe<LoAttributeVocabularyValue>>>
  adminLocationAttributes?: Maybe<LoAttributeCollection>
  adminLocationGroups?: Maybe<LocationGroupCollection>
  adminLocationType?: Maybe<LocationType>
  adminLocationTypes?: Maybe<Array<Maybe<LocationType>>>
  adminLocations?: Maybe<LocationCollection>
  authTicket?: Maybe<CustomerAuthTicket>
  b2bAccount?: Maybe<B2BAccount>
  b2bAccountAttributeVocabularyValues?: Maybe<CustomerAttribute>
  b2bAccountAttributes?: Maybe<CustomerAttributeCollection>
  b2bAccountUserRoles?: Maybe<UserRoleCollection>
  b2bAccountUsers?: Maybe<B2BUserCollection>
  b2bAccounts?: Maybe<B2BAccountCollection>
  carrierLocaleServiceTypes?: Maybe<Array<Maybe<ServiceType>>>
  cart?: Maybe<CrCart>
  cartItem?: Maybe<CrCartItem>
  cartItems?: Maybe<CartItemCollection>
  cartSummary?: Maybe<CartSummary>
  cartsSummary?: Maybe<CartSummary>
  categories?: Maybe<CategoryPagedCollection>
  categoriesTree?: Maybe<CategoryCollection>
  category?: Maybe<PrCategory>
  channel?: Maybe<Channel>
  channelGroup?: Maybe<ChannelGroup>
  channelGroups?: Maybe<ChannelGroupCollection>
  channels?: Maybe<ChannelCollection>
  checkout?: Maybe<Checkout>
  checkoutActions?: Maybe<Array<Maybe<Scalars['String']>>>
  checkoutAttributes?: Maybe<Array<Maybe<CrOrderAttribute>>>
  checkoutDestination?: Maybe<CrDestination>
  checkoutDestinations?: Maybe<Array<Maybe<CrDestination>>>
  checkoutShippingMethods?: Maybe<Array<Maybe<CheckoutGroupRates>>>
  checkouts?: Maybe<CheckoutCollection>
  currentCart?: Maybe<CrCart>
  currentCartExtendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  currentCartItem?: Maybe<CrCartItem>
  currentCartItems?: Maybe<CartItemCollection>
  currentCartMessages?: Maybe<CartChangeMessageCollection>
  customerAccount?: Maybe<CustomerAccount>
  customerAccountAttribute?: Maybe<CustomerAttribute>
  customerAccountAttributeDefinition?: Maybe<CuAttribute>
  customerAccountAttributeDefinitions?: Maybe<CuAttributeCollection>
  customerAccountAttributeVocabularyValues?: Maybe<Array<Maybe<CuAttributeVocabularyValue>>>
  customerAccountAttributes?: Maybe<CustomerAttributeCollection>
  customerAccountAuditLog?: Maybe<CustomerAuditEntryCollection>
  customerAccountCard?: Maybe<Card>
  customerAccountCards?: Maybe<CardCollection>
  customerAccountContact?: Maybe<CustomerContact>
  customerAccountContacts?: Maybe<CustomerContactCollection>
  customerAccountLoginState?: Maybe<LoginState>
  customerAccountNote?: Maybe<CustomerNote>
  customerAccountNotes?: Maybe<CustomerNoteCollection>
  customerAccountQuote?: Maybe<Quote>
  customerAccountQuoteItems?: Maybe<Array<Maybe<CrOrderItem>>>
  customerAccountSegments?: Maybe<CustomerSegmentCollection>
  customerAccountTransactions?: Maybe<Array<Maybe<Transaction>>>
  customerAccounts?: Maybe<CustomerAccountCollection>
  customerCredit?: Maybe<CuCredit>
  customerCreditAuditTrail?: Maybe<CreditAuditEntryCollection>
  customerCreditTransactions?: Maybe<CreditTransactionCollection>
  customerCredits?: Maybe<CreditCollection>
  customerPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  customerPurchaseOrderAccountTransaction?: Maybe<PurchaseOrderTransactionCollection>
  customerSegment?: Maybe<CustomerSegment>
  customerSegments?: Maybe<CustomerSegmentCollection>
  customerSet?: Maybe<CustomerSet>
  customerSets?: Maybe<CustomerSetCollection>
  customerWishlist?: Maybe<CrWishlist>
  customerWishlistItems?: Maybe<WishlistItemCollection>
  debugProductSearch?: Maybe<Scalars['Boolean']>
  documentDrafts?: Maybe<DocumentDraftSummaryPagedCollection>
  documentList?: Maybe<DocumentList>
  documentListDocument?: Maybe<Document>
  documentListDocumentContent?: Maybe<Scalars['Boolean']>
  documentListDocumentTransform?: Maybe<Scalars['Boolean']>
  documentListDocuments?: Maybe<DocumentCollection>
  documentListTreeDocument?: Maybe<Document>
  documentListTreeDocumentContent?: Maybe<Scalars['Boolean']>
  documentListTreeDocumentTransform?: Maybe<Scalars['Boolean']>
  documentListType?: Maybe<DocumentListType>
  documentListTypes?: Maybe<DocumentListTypeCollection>
  documentListViewDocuments?: Maybe<DocumentCollection>
  documentLists?: Maybe<DocumentListCollection>
  documentType?: Maybe<DocumentType>
  documentTypes?: Maybe<DocumentTypeCollection>
  dslLocation?: Maybe<Location>
  entityList?: Maybe<EntityList>
  entityListEntities?: Maybe<EntityCollection>
  entityListEntity?: Maybe<Scalars['Boolean']>
  entityListEntityContainer?: Maybe<EntityContainer>
  entityListEntityContainers?: Maybe<EntityContainerCollection>
  entityListView?: Maybe<ListView>
  entityListViewEntities?: Maybe<EntityCollection>
  entityListViewEntity?: Maybe<Scalars['Boolean']>
  entityListViewEntityContainer?: Maybe<EntityContainer>
  entityListViewEntityContainers?: Maybe<EntityContainerCollection>
  entityListViews?: Maybe<ListViewCollection>
  entityLists?: Maybe<EntityListCollection>
  exchangeRates?: Maybe<Array<Maybe<CurrencyExchangeRate>>>
  getAnonymousShopperToken?: Maybe<CustomerAuthTicket>
  getCurrentAccount?: Maybe<CustomerAccount>
  getSubscriptionReasons?: Maybe<SubscriptionReasonCollection>
  getSubscriptionShipmentMethods?: Maybe<Array<Maybe<SbShippingRate>>>
  inStockNotification?: Maybe<InStockNotificationSubscription>
  inStockNotifications?: Maybe<InStockNotificationSubscriptionCollection>
  localeServiceTypes?: Maybe<Array<Maybe<ServiceType>>>
  location?: Maybe<Location>
  locationGroup?: Maybe<LocationGroup>
  locationGroupConfig?: Maybe<LocationGroupConfiguration>
  locationUsage?: Maybe<LocationUsage>
  locationUsages?: Maybe<LocationUsageCollection>
  order?: Maybe<CrOrder>
  orderActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderAttributes?: Maybe<Array<Maybe<CrOrderAttribute>>>
  orderBillingInfo?: Maybe<CrBillingInfo>
  orderCancelReasons?: Maybe<CancelReasonCollection>
  orderDigitalPackage?: Maybe<CrDigitalPackage>
  orderDigitalPackageActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderExtendedProperties?: Maybe<Array<Maybe<CrExtendedProperty>>>
  orderFulfillmentInfo?: Maybe<CrFulfillmentInfo>
  orderItem?: Maybe<CrOrderItem>
  orderItems?: Maybe<OrderItemCollection>
  orderNote?: Maybe<CrOrderNote>
  orderNotes?: Maybe<Array<Maybe<CrOrderNote>>>
  orderPackage?: Maybe<CrPackageObj>
  orderPackageActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderPackageLabel?: Maybe<Scalars['Boolean']>
  orderPayment?: Maybe<CrPayment>
  orderPaymentActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderPayments?: Maybe<PaymentCollection>
  orderPickup?: Maybe<CrPickup>
  orderPickupActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderReturnableItems?: Maybe<OrderReturnableItemCollection>
  orderShipment?: Maybe<CrShipment>
  orderShipmentMethods?: Maybe<Array<Maybe<CrShippingRate>>>
  orderTaxableOrders?: Maybe<Array<Maybe<PricingTaxableOrder>>>
  orderValidationResults?: Maybe<Array<Maybe<CrOrderValidationResult>>>
  orders?: Maybe<OrderCollection>
  priceList?: Maybe<PriceList>
  product?: Maybe<Product>
  productLocationInventory?: Maybe<LocationInventoryCollection>
  productSearch?: Maybe<ProductSearchResult>
  productSearchRandomAccessCursor?: Maybe<ProductSearchRandomAccessCursor>
  productVersion?: Maybe<ProductForIndexing>
  products?: Maybe<ProductCollection>
  propertyType?: Maybe<PropertyType>
  propertyTypes?: Maybe<PropertyTypeCollection>
  quote?: Maybe<Quote>
  quoteItem?: Maybe<CrOrderItem>
  quoteItems?: Maybe<Array<Maybe<CrOrderItem>>>
  quotes?: Maybe<QuoteCollection>
  resolvedPriceList?: Maybe<ResolvedPriceList>
  returnActions?: Maybe<Array<Maybe<Scalars['String']>>>
  returnItem?: Maybe<ReturnItem>
  returnItems?: Maybe<ReturnItemCollection>
  returnNote?: Maybe<CrOrderNote>
  returnNotes?: Maybe<Array<Maybe<CrOrderNote>>>
  returnPackage?: Maybe<CrPackageObj>
  returnPackageLabel?: Maybe<Scalars['Boolean']>
  returnPayment?: Maybe<CrPayment>
  returnPayments?: Maybe<PaymentCollection>
  returnReason?: Maybe<ReturnObj>
  returnReasons?: Maybe<ReasonCollection>
  returnShipment?: Maybe<CrShipment>
  returnShippingLabel?: Maybe<CarrierServiceGenerateLabelResponse>
  returns?: Maybe<ReturnCollection>
  shipment?: Maybe<EntityModelOfShipment>
  shipments?: Maybe<PagedModelOfEntityModelOfShipment>
  spLocation?: Maybe<Location>
  spLocations?: Maybe<LocationCollection>
  subscription?: Maybe<Subscription>
  subscriptions?: Maybe<SubscriptionCollection>
  suggestionSearch?: Maybe<SearchSuggestionResult>
  targetRule?: Maybe<TargetRule>
  targetRules?: Maybe<TargetRuleCollection>
  usageTypeLocations?: Maybe<LocationCollection>
  userCart?: Maybe<CrCart>
  userCartSummary?: Maybe<CartSummary>
  wishlist?: Maybe<CrWishlist>
  wishlistItem?: Maybe<CrWishlistItem>
  wishlistItems?: Maybe<WishlistItemCollection>
  wishlists?: Maybe<WishlistCollection>
}

export type QueryAdminLocationArgs = {
  locationCode: Scalars['String']
}

export type QueryAdminLocationAttributeArgs = {
  attributeFQN: Scalars['String']
}

export type QueryAdminLocationAttributeVocabularyValuesArgs = {
  attributeFQN: Scalars['String']
}

export type QueryAdminLocationAttributesArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryAdminLocationGroupsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryAdminLocationTypeArgs = {
  locationTypeCode: Scalars['String']
}

export type QueryAdminLocationsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryAuthTicketArgs = {
  accountId?: InputMaybe<Scalars['Int']>
}

export type QueryB2bAccountArgs = {
  accountId: Scalars['Int']
}

export type QueryB2bAccountAttributeVocabularyValuesArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
}

export type QueryB2bAccountAttributesArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryB2bAccountUserRolesArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
}

export type QueryB2bAccountUsersArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryB2bAccountsArgs = {
  fields?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCarrierLocaleServiceTypesArgs = {
  carrierId: Scalars['String']
  localeCode: Scalars['String']
}

export type QueryCartArgs = {
  cartId: Scalars['String']
}

export type QueryCartItemArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
}

export type QueryCartItemsArgs = {
  cartId: Scalars['String']
}

export type QueryCartSummaryArgs = {
  cartId: Scalars['String']
}

export type QueryCategoriesArgs = {
  filter?: InputMaybe<Scalars['String']>
  includeAttributes?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCategoriesTreeArgs = {
  includeAttributes?: InputMaybe<Scalars['Boolean']>
}

export type QueryCategoryArgs = {
  allowInactive?: InputMaybe<Scalars['Boolean']>
  categoryId: Scalars['Int']
  includeAttributes?: InputMaybe<Scalars['Boolean']>
}

export type QueryChannelArgs = {
  code: Scalars['String']
}

export type QueryChannelGroupArgs = {
  code: Scalars['String']
}

export type QueryChannelGroupsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryChannelsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCheckoutArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutActionsArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutAttributesArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
}

export type QueryCheckoutDestinationsArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutShippingMethodsArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCurrentCartItemArgs = {
  cartItemId: Scalars['String']
}

export type QueryCustomerAccountArgs = {
  accountId: Scalars['Int']
  userId?: InputMaybe<Scalars['String']>
}

export type QueryCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  userId?: InputMaybe<Scalars['String']>
}

export type QueryCustomerAccountAttributeDefinitionArgs = {
  attributeFQN: Scalars['String']
}

export type QueryCustomerAccountAttributeDefinitionsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerAccountAttributeVocabularyValuesArgs = {
  attributeFQN: Scalars['String']
}

export type QueryCustomerAccountAttributesArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  userId?: InputMaybe<Scalars['String']>
}

export type QueryCustomerAccountAuditLogArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardId: Scalars['String']
}

export type QueryCustomerAccountCardsArgs = {
  accountId: Scalars['Int']
}

export type QueryCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  contactId: Scalars['Int']
  userId?: InputMaybe<Scalars['String']>
}

export type QueryCustomerAccountContactsArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  userId?: InputMaybe<Scalars['String']>
}

export type QueryCustomerAccountLoginStateArgs = {
  accountId: Scalars['Int']
  userId?: InputMaybe<Scalars['String']>
}

export type QueryCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  noteId: Scalars['Int']
}

export type QueryCustomerAccountNotesArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerAccountQuoteArgs = {
  customerAccountId: Scalars['Int']
  draft?: InputMaybe<Scalars['Boolean']>
  quoteName: Scalars['String']
}

export type QueryCustomerAccountQuoteItemsArgs = {
  customerAccountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  quoteName: Scalars['String']
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerAccountSegmentsArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerAccountTransactionsArgs = {
  accountId: Scalars['Int']
}

export type QueryCustomerAccountsArgs = {
  fields?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<Scalars['String']>
  isAnonymous?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerCreditArgs = {
  code: Scalars['String']
}

export type QueryCustomerCreditAuditTrailArgs = {
  code: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerCreditTransactionsArgs = {
  code: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerCreditsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerPurchaseOrderAccountArgs = {
  accountId: Scalars['Int']
}

export type QueryCustomerPurchaseOrderAccountTransactionArgs = {
  accountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerSegmentArgs = {
  id: Scalars['Int']
}

export type QueryCustomerSegmentsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerSetArgs = {
  code: Scalars['String']
}

export type QueryCustomerSetsArgs = {
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryCustomerWishlistArgs = {
  customerAccountId: Scalars['Int']
  wishlistName: Scalars['String']
}

export type QueryCustomerWishlistItemsArgs = {
  customerAccountId: Scalars['Int']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  wishlistName: Scalars['String']
}

export type QueryDebugProductSearchArgs = {
  campaignId?: InputMaybe<Scalars['String']>
  cursorMark?: InputMaybe<Scalars['String']>
  enableSearchTuningRules?: InputMaybe<Scalars['Boolean']>
  facet?: InputMaybe<Scalars['String']>
  facetFieldRangeQuery?: InputMaybe<Scalars['String']>
  facetHierDepth?: InputMaybe<Scalars['String']>
  facetHierPrefix?: InputMaybe<Scalars['String']>
  facetHierValue?: InputMaybe<Scalars['String']>
  facetPageSize?: InputMaybe<Scalars['String']>
  facetPrefix?: InputMaybe<Scalars['String']>
  facetSettings?: InputMaybe<Scalars['String']>
  facetStartIndex?: InputMaybe<Scalars['String']>
  facetTemplate?: InputMaybe<Scalars['String']>
  facetTemplateExclude?: InputMaybe<Scalars['String']>
  facetTemplateSubset?: InputMaybe<Scalars['String']>
  facetValueFilter?: InputMaybe<Scalars['String']>
  facetValueSort?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<Scalars['String']>
  merchandizingRuleCode?: InputMaybe<Scalars['String']>
  mid?: InputMaybe<Scalars['String']>
  omitNamespace?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  query?: InputMaybe<Scalars['String']>
  responseFields?: InputMaybe<Scalars['String']>
  responseOptions?: InputMaybe<Scalars['String']>
  returnUrl?: InputMaybe<Scalars['Boolean']>
  searchSettings?: InputMaybe<Scalars['String']>
  searchTuningRuleCode?: InputMaybe<Scalars['String']>
  searchTuningRuleContext?: InputMaybe<Scalars['String']>
  sliceSearchResults?: InputMaybe<Scalars['Boolean']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentDraftsArgs = {
  documentLists?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentListArgs = {
  documentListName: Scalars['String']
}

export type QueryDocumentListDocumentArgs = {
  documentId: Scalars['String']
  documentListName: Scalars['String']
  includeInactive?: InputMaybe<Scalars['Boolean']>
}

export type QueryDocumentListDocumentContentArgs = {
  documentId: Scalars['String']
  documentListName: Scalars['String']
}

export type QueryDocumentListDocumentTransformArgs = {
  crop?: InputMaybe<Scalars['String']>
  documentId: Scalars['String']
  documentListName: Scalars['String']
  height?: InputMaybe<Scalars['Int']>
  max?: InputMaybe<Scalars['Int']>
  maxHeight?: InputMaybe<Scalars['Int']>
  maxWidth?: InputMaybe<Scalars['Int']>
  quality?: InputMaybe<Scalars['Int']>
  width?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentListDocumentsArgs = {
  documentListName: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  includeInactive?: InputMaybe<Scalars['Boolean']>
  includeSubPaths?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  path?: InputMaybe<Scalars['String']>
  queryScope?: InputMaybe<Scalars['String']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentListTreeDocumentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  includeInactive?: InputMaybe<Scalars['Boolean']>
}

export type QueryDocumentListTreeDocumentContentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
}

export type QueryDocumentListTreeDocumentTransformArgs = {
  crop?: InputMaybe<Scalars['String']>
  documentListName: Scalars['String']
  documentName: Scalars['String']
  height?: InputMaybe<Scalars['Int']>
  max?: InputMaybe<Scalars['Int']>
  maxHeight?: InputMaybe<Scalars['Int']>
  maxWidth?: InputMaybe<Scalars['Int']>
  quality?: InputMaybe<Scalars['Int']>
  width?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentListTypeArgs = {
  documentListTypeFQN: Scalars['String']
}

export type QueryDocumentListTypesArgs = {
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentListViewDocumentsArgs = {
  documentListName: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  includeInactive?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  viewName: Scalars['String']
}

export type QueryDocumentListsArgs = {
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryDocumentTypeArgs = {
  documentTypeName: Scalars['String']
}

export type QueryDocumentTypesArgs = {
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryDslLocationArgs = {
  includeAttributeDefinition?: InputMaybe<Scalars['Boolean']>
}

export type QueryEntityListArgs = {
  entityListFullName: Scalars['String']
}

export type QueryEntityListEntitiesArgs = {
  entityListFullName: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryEntityListEntityArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
}

export type QueryEntityListEntityContainerArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
}

export type QueryEntityListEntityContainersArgs = {
  entityListFullName: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryEntityListViewArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
}

export type QueryEntityListViewEntitiesArgs = {
  entityListFullName: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
  viewName: Scalars['String']
}

export type QueryEntityListViewEntityArgs = {
  entityId: Scalars['String']
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
}

export type QueryEntityListViewEntityContainerArgs = {
  entityId: Scalars['String']
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
}

export type QueryEntityListViewEntityContainersArgs = {
  entityListFullName: Scalars['String']
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
  viewName: Scalars['String']
}

export type QueryEntityListViewsArgs = {
  entityListFullName: Scalars['String']
}

export type QueryEntityListsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryGetSubscriptionReasonsArgs = {
  category?: InputMaybe<Scalars['String']>
}

export type QueryGetSubscriptionShipmentMethodsArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  subscriptionId: Scalars['String']
}

export type QueryInStockNotificationArgs = {
  id: Scalars['Int']
}

export type QueryInStockNotificationsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryLocaleServiceTypesArgs = {
  localeCode: Scalars['String']
}

export type QueryLocationArgs = {
  includeAttributeDefinition?: InputMaybe<Scalars['Boolean']>
  locationCode: Scalars['String']
}

export type QueryLocationGroupArgs = {
  groupId?: InputMaybe<Scalars['Int']>
  locationGroupCode?: InputMaybe<Scalars['String']>
}

export type QueryLocationGroupConfigArgs = {
  locationCode?: InputMaybe<Scalars['String']>
  locationGroupCode?: InputMaybe<Scalars['String']>
  locationGroupId?: InputMaybe<Scalars['Int']>
}

export type QueryLocationUsageArgs = {
  code: Scalars['String']
}

export type QueryOrderArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  includeBin?: InputMaybe<Scalars['Boolean']>
  mode?: InputMaybe<Scalars['String']>
  orderId: Scalars['String']
}

export type QueryOrderActionsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderAttributesArgs = {
  orderId: Scalars['String']
}

export type QueryOrderBillingInfoArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  orderId: Scalars['String']
}

export type QueryOrderCancelReasonsArgs = {
  category?: InputMaybe<Scalars['String']>
}

export type QueryOrderDigitalPackageArgs = {
  digitalPackageId: Scalars['String']
  orderId: Scalars['String']
}

export type QueryOrderDigitalPackageActionsArgs = {
  digitalPackageId: Scalars['String']
  orderId: Scalars['String']
}

export type QueryOrderExtendedPropertiesArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  orderId: Scalars['String']
}

export type QueryOrderFulfillmentInfoArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  orderId: Scalars['String']
}

export type QueryOrderItemArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  lineId?: InputMaybe<Scalars['Int']>
  orderId?: InputMaybe<Scalars['String']>
  orderItemId?: InputMaybe<Scalars['String']>
}

export type QueryOrderItemsArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  orderId: Scalars['String']
}

export type QueryOrderNoteArgs = {
  noteId: Scalars['String']
  orderId: Scalars['String']
}

export type QueryOrderNotesArgs = {
  orderId: Scalars['String']
}

export type QueryOrderPackageArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryOrderPackageActionsArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryOrderPackageLabelArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryOrderPaymentArgs = {
  orderId: Scalars['String']
  paymentId: Scalars['String']
}

export type QueryOrderPaymentActionsArgs = {
  orderId: Scalars['String']
  paymentId: Scalars['String']
}

export type QueryOrderPaymentsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderPickupArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
}

export type QueryOrderPickupActionsArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
}

export type QueryOrderReturnableItemsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderShipmentArgs = {
  orderId: Scalars['String']
  shipmentId: Scalars['String']
}

export type QueryOrderShipmentMethodsArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  orderId: Scalars['String']
}

export type QueryOrderTaxableOrdersArgs = {
  orderId: Scalars['String']
}

export type QueryOrderValidationResultsArgs = {
  orderId: Scalars['String']
}

export type QueryOrdersArgs = {
  filter?: InputMaybe<Scalars['String']>
  includeBin?: InputMaybe<Scalars['Boolean']>
  mode?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryPriceListArgs = {
  priceListCode?: InputMaybe<Scalars['String']>
}

export type QueryProductArgs = {
  acceptVariantProductCode?: InputMaybe<Scalars['Boolean']>
  allowInactive?: InputMaybe<Scalars['Boolean']>
  includeAllImages?: InputMaybe<Scalars['Boolean']>
  productCode: Scalars['String']
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity?: InputMaybe<Scalars['Int']>
  skipInventoryCheck?: InputMaybe<Scalars['Boolean']>
  sliceValue?: InputMaybe<Scalars['String']>
  supressOutOfStock404?: InputMaybe<Scalars['Boolean']>
  variationProductCode?: InputMaybe<Scalars['String']>
  variationProductCodeFilter?: InputMaybe<Scalars['String']>
}

export type QueryProductLocationInventoryArgs = {
  locationCodes?: InputMaybe<Scalars['String']>
  productCode: Scalars['String']
}

export type QueryProductSearchArgs = {
  cursorMark?: InputMaybe<Scalars['String']>
  defaultSort?: InputMaybe<Scalars['String']>
  enableSearchTuningRules?: InputMaybe<Scalars['Boolean']>
  facet?: InputMaybe<Scalars['String']>
  facetFieldRangeQuery?: InputMaybe<Scalars['String']>
  facetHierDepth?: InputMaybe<Scalars['String']>
  facetHierPrefix?: InputMaybe<Scalars['String']>
  facetHierValue?: InputMaybe<Scalars['String']>
  facetPageSize?: InputMaybe<Scalars['String']>
  facetPrefix?: InputMaybe<Scalars['String']>
  facetSettings?: InputMaybe<Scalars['String']>
  facetStartIndex?: InputMaybe<Scalars['String']>
  facetTemplate?: InputMaybe<Scalars['String']>
  facetTemplateExclude?: InputMaybe<Scalars['String']>
  facetTemplateSubset?: InputMaybe<Scalars['String']>
  facetValueFilter?: InputMaybe<Scalars['String']>
  facetValueSort?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<Scalars['String']>
  includeAllImages?: InputMaybe<Scalars['Boolean']>
  merchandizingRuleCode?: InputMaybe<Scalars['String']>
  mid?: InputMaybe<Scalars['String']>
  omitNamespace?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  query?: InputMaybe<Scalars['String']>
  responseOptions?: InputMaybe<Scalars['String']>
  searchSettings?: InputMaybe<Scalars['String']>
  searchTuningRuleCode?: InputMaybe<Scalars['String']>
  searchTuningRuleContext?: InputMaybe<Scalars['String']>
  shouldSlice?: InputMaybe<Scalars['Boolean']>
  sortBy?: InputMaybe<Scalars['String']>
  spellcorrectOverride?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  useSubscriptionPricing?: InputMaybe<Scalars['Boolean']>
}

export type QueryProductSearchRandomAccessCursorArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  query?: InputMaybe<Scalars['String']>
}

export type QueryProductVersionArgs = {
  lastModifiedDate?: InputMaybe<Scalars['DateTime']>
  productCode: Scalars['String']
  productVersion?: InputMaybe<Scalars['Int']>
}

export type QueryProductsArgs = {
  cursorMark?: InputMaybe<Scalars['String']>
  defaultSort?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<Scalars['String']>
  includeAllImages?: InputMaybe<Scalars['Boolean']>
  includeProductDetailsOnlyProperty?: InputMaybe<Scalars['Boolean']>
  mid?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  responseOptions?: InputMaybe<Scalars['String']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  useSubscriptionPricing?: InputMaybe<Scalars['Boolean']>
}

export type QueryPropertyTypeArgs = {
  propertyTypeName: Scalars['String']
}

export type QueryPropertyTypesArgs = {
  pageSize?: InputMaybe<Scalars['Int']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryQuoteArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  quoteId: Scalars['String']
}

export type QueryQuoteItemArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  quoteId: Scalars['String']
  quoteItemId: Scalars['String']
}

export type QueryQuoteItemsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  quoteId: Scalars['String']
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryQuotesArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryResolvedPriceListArgs = {
  customerAccountId?: InputMaybe<Scalars['Int']>
}

export type QueryReturnActionsArgs = {
  returnId: Scalars['String']
}

export type QueryReturnItemArgs = {
  returnId: Scalars['String']
  returnItemId: Scalars['String']
}

export type QueryReturnItemsArgs = {
  returnId: Scalars['String']
}

export type QueryReturnNoteArgs = {
  noteId: Scalars['String']
  returnId: Scalars['String']
}

export type QueryReturnNotesArgs = {
  returnId: Scalars['String']
}

export type QueryReturnPackageArgs = {
  packageId: Scalars['String']
  returnId: Scalars['String']
}

export type QueryReturnPackageLabelArgs = {
  packageId: Scalars['String']
  returnAsBase64Png?: InputMaybe<Scalars['Boolean']>
  returnId: Scalars['String']
}

export type QueryReturnPaymentArgs = {
  paymentId: Scalars['String']
  returnId: Scalars['String']
}

export type QueryReturnPaymentsArgs = {
  returnId: Scalars['String']
}

export type QueryReturnReasonArgs = {
  returnId: Scalars['String']
}

export type QueryReturnShipmentArgs = {
  returnId: Scalars['String']
  shipmentId: Scalars['String']
}

export type QueryReturnShippingLabelArgs = {
  returnId: Scalars['String']
}

export type QueryReturnsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryShipmentArgs = {
  shipmentNumber: Scalars['Int']
}

export type QueryShipmentsArgs = {
  bypassSearchIndex?: InputMaybe<Scalars['Boolean']>
  filter?: InputMaybe<Scalars['String']>
  isLate?: InputMaybe<Scalars['Boolean']>
  page?: InputMaybe<Scalars['Int']>
  pageSize?: InputMaybe<Scalars['Int']>
  quickSearch?: InputMaybe<Scalars['String']>
  sort?: InputMaybe<Scalars['String']>
  workflowTaskName?: InputMaybe<Scalars['String']>
}

export type QuerySpLocationArgs = {
  includeAttributeDefinition?: InputMaybe<Scalars['Boolean']>
  locationCode: Scalars['String']
}

export type QuerySpLocationsArgs = {
  filter?: InputMaybe<Scalars['String']>
  includeAttributeDefinition?: InputMaybe<Scalars['Boolean']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QuerySubscriptionArgs = {
  draft?: InputMaybe<Scalars['Boolean']>
  subscriptionId: Scalars['String']
}

export type QuerySubscriptionsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QuerySuggestionSearchArgs = {
  filter?: InputMaybe<Scalars['String']>
  groups?: InputMaybe<Scalars['String']>
  mid?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  query?: InputMaybe<Scalars['String']>
}

export type QueryTargetRuleArgs = {
  code: Scalars['String']
}

export type QueryTargetRulesArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryUsageTypeLocationsArgs = {
  filter?: InputMaybe<Scalars['String']>
  includeAttributeDefinition?: InputMaybe<Scalars['Boolean']>
  locationUsageType: Scalars['String']
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type QueryUserCartArgs = {
  userId: Scalars['String']
}

export type QueryUserCartSummaryArgs = {
  userId: Scalars['String']
}

export type QueryWishlistArgs = {
  wishlistId: Scalars['String']
}

export type QueryWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
}

export type QueryWishlistItemsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
  wishlistId: Scalars['String']
}

export type QueryWishlistsArgs = {
  filter?: InputMaybe<Scalars['String']>
  pageSize?: InputMaybe<Scalars['Int']>
  q?: InputMaybe<Scalars['String']>
  qLimit?: InputMaybe<Scalars['Int']>
  sortBy?: InputMaybe<Scalars['String']>
  startIndex?: InputMaybe<Scalars['Int']>
}

export type Quote = {
  __typename?: 'Quote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Quote>
  adjustment?: Maybe<CrAdjustment>
  auditHistory?: Maybe<Array<Maybe<AuditRecord>>>
  auditInfo?: Maybe<CrAuditInfo>
  channelCode?: Maybe<Scalars['String']>
  comments?: Maybe<Array<Maybe<QuoteComment>>>
  couponCodes?: Maybe<Array<Scalars['String']>>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  email?: Maybe<Scalars['String']>
  expirationDate?: Maybe<Scalars['DateTime']>
  feeTotal: Scalars['Float']
  fulfillmentInfo?: Maybe<CrFulfillmentInfo>
  handlingAdjustment?: Maybe<CrAdjustment>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingSubTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  hasDraft?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  invalidCoupons?: Maybe<Array<Maybe<CrInvalidCoupon>>>
  ipAddress?: Maybe<Scalars['String']>
  isDraft?: Maybe<Scalars['Boolean']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  locationCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['Int']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  priceListCode?: Maybe<Scalars['String']>
  shippingAdjustment?: Maybe<CrAdjustment>
  shippingAmount: Scalars['Float']
  shippingDiscounts?: Maybe<Array<Maybe<CrShippingDiscount>>>
  shippingSubTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  siteId: Scalars['Int']
  sourceDevice?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  subTotal: Scalars['Float']
  submittedDate?: Maybe<Scalars['DateTime']>
  taxData?: Maybe<Scalars['Object']>
  tenantId: Scalars['Int']
  total: Scalars['Float']
  userId?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type Quote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type QuoteCollection = {
  __typename?: 'QuoteCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<QuoteCollection>
  items?: Maybe<Array<Maybe<Quote>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type QuoteCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type QuoteComment = {
  __typename?: 'QuoteComment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<QuoteComment>
  auditInfo?: Maybe<CrAuditInfo>
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type QuoteComment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type QuoteCommentInput = {
  auditInfo?: InputMaybe<CrAuditInfoInput>
  id?: InputMaybe<Scalars['String']>
  text?: InputMaybe<Scalars['String']>
}

export type QuoteInput = {
  adjustment?: InputMaybe<CrAdjustmentInput>
  auditHistory?: InputMaybe<Array<InputMaybe<AuditRecordInput>>>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  channelCode?: InputMaybe<Scalars['String']>
  comments?: InputMaybe<Array<InputMaybe<QuoteCommentInput>>>
  couponCodes?: InputMaybe<Array<Scalars['String']>>
  currencyCode?: InputMaybe<Scalars['String']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  customerTaxId?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  dutyAmount?: InputMaybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  email?: InputMaybe<Scalars['String']>
  expirationDate?: InputMaybe<Scalars['DateTime']>
  feeTotal: Scalars['Float']
  fulfillmentInfo?: InputMaybe<CrFulfillmentInfoInput>
  handlingAdjustment?: InputMaybe<CrAdjustmentInput>
  handlingAmount?: InputMaybe<Scalars['Float']>
  handlingDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  handlingSubTotal: Scalars['Float']
  handlingTax?: InputMaybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  hasDraft?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['String']>
  invalidCoupons?: InputMaybe<Array<InputMaybe<CrInvalidCouponInput>>>
  ipAddress?: InputMaybe<Scalars['String']>
  isDraft?: InputMaybe<Scalars['Boolean']>
  isTaxExempt?: InputMaybe<Scalars['Boolean']>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  items?: InputMaybe<Array<InputMaybe<CrOrderItemInput>>>
  locationCode?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  number?: InputMaybe<Scalars['Int']>
  orderDiscounts?: InputMaybe<Array<InputMaybe<CrAppliedDiscountInput>>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  priceListCode?: InputMaybe<Scalars['String']>
  shippingAdjustment?: InputMaybe<CrAdjustmentInput>
  shippingAmount: Scalars['Float']
  shippingDiscounts?: InputMaybe<Array<InputMaybe<CrShippingDiscountInput>>>
  shippingSubTotal: Scalars['Float']
  shippingTax?: InputMaybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  siteId: Scalars['Int']
  sourceDevice?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  subTotal: Scalars['Float']
  submittedDate?: InputMaybe<Scalars['DateTime']>
  taxData?: InputMaybe<Scalars['Object']>
  tenantId: Scalars['Int']
  total: Scalars['Float']
  userId?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
}

export type RateRequestAttributeInput = {
  attributeDefinitionId?: InputMaybe<Scalars['Int']>
  fullyQualifiedName?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<Scalars['Object']>>
}

export type RateRequestGroupInput = {
  id?: InputMaybe<Scalars['String']>
  rateRequests?: InputMaybe<Array<InputMaybe<RateRequestInput>>>
}

export type RateRequestInput = {
  attributes?: InputMaybe<Array<InputMaybe<RateRequestAttributeInput>>>
  carrierIds?: InputMaybe<Array<Scalars['String']>>
  customAttributes?: InputMaybe<Array<InputMaybe<CustomAttributeInput>>>
  data?: InputMaybe<Scalars['Object']>
  destinationAddress?: InputMaybe<SrAddressInput>
  estimatedShipmentDate?: InputMaybe<Scalars['DateTime']>
  handlingTotal?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  isDestinationAddressCommercial?: InputMaybe<Scalars['Boolean']>
  isoCurrencyCode?: InputMaybe<Scalars['String']>
  items?: InputMaybe<Array<InputMaybe<RateRequestItemInput>>>
  orderDiscountedSubTotal?: InputMaybe<Scalars['Float']>
  orderTotal?: InputMaybe<Scalars['Float']>
  originAddress?: InputMaybe<SrAddressInput>
  relatedOrderId?: InputMaybe<Scalars['String']>
  relatedOrderNumber?: InputMaybe<Scalars['Int']>
  shippingServiceTypes?: InputMaybe<Array<Scalars['String']>>
}

export type RateRequestItemInput = {
  data?: InputMaybe<Scalars['Object']>
  itemId?: InputMaybe<Scalars['String']>
  productSummaries?: InputMaybe<Array<InputMaybe<ProductSummaryInput>>>
  quantity?: InputMaybe<Scalars['Int']>
  shipsByItself?: InputMaybe<Scalars['Boolean']>
  unitMeasurements?: InputMaybe<ItemMeasurementsInput>
}

export type RatesResponse = {
  __typename?: 'RatesResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<RatesResponse>
  id?: Maybe<Scalars['String']>
  rates?: Maybe<Array<Maybe<CarrierRatesResponse>>>
  resolvedShippingZoneCode?: Maybe<Scalars['String']>
  shippingZoneCodes?: Maybe<Array<Scalars['String']>>
}

export type RatesResponse_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type RatesResponseGroup = {
  __typename?: 'RatesResponseGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<RatesResponseGroup>
  componentRates?: Maybe<Array<Maybe<RatesResponse>>>
  id?: Maybe<Scalars['String']>
  ratesResponse?: Maybe<RatesResponse>
}

export type RatesResponseGroup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReasonCollection = {
  __typename?: 'ReasonCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReasonCollection>
  items?: Maybe<Array<Scalars['String']>>
  totalCount: Scalars['Int']
}

export type ReasonCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReassignedItem = {
  __typename?: 'ReassignedItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReassignedItem>
  actualPrice: Scalars['Float']
  allocatedQuantity: Scalars['Int']
  allowsBackOrder?: Maybe<Scalars['Boolean']>
  allowsFutureAllocate?: Maybe<Scalars['Boolean']>
  appeasementReason?: Maybe<FuAppeasementReason>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  backorderReleaseDate: Scalars['DateTime']
  blockAssignment?: Maybe<Scalars['Boolean']>
  cartItemId: Scalars['String']
  childItemIds: Array<Scalars['String']>
  creditCurrencyCode: Scalars['String']
  creditValue: Scalars['Float']
  data: Scalars['Object']
  duty: Scalars['Float']
  expectedDeliveryDate: Scalars['DateTime']
  fulfillmentFields: Array<Maybe<FulfillmentField>>
  fulfillmentLocationCode: Scalars['String']
  giftCards: Array<Maybe<FuGiftCard>>
  goodsType?: Maybe<GoodsTypeEnum>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl: Scalars['String']
  inventoryTags: Array<Maybe<FuInventoryTag>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment: Scalars['Float']
  lineItemCost: Scalars['Float']
  locatorName: Scalars['String']
  manageStock?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  optionAttributeFQN: Scalars['String']
  options: Array<Maybe<FuProductOption>>
  originalOrderItemId: Scalars['String']
  originalQuantity: Scalars['Int']
  overridePrice: Scalars['Float']
  parentItemId: Scalars['String']
  partNumber: Scalars['String']
  productCode: Scalars['String']
  quantity: Scalars['Int']
  readyForPickupQuantity: Scalars['Int']
  reassignedReason?: Maybe<ReassignedReason>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku: Scalars['String']
  taxData: Scalars['Object']
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  transferQuantity: Scalars['Int']
  trueTransferQuantity: Scalars['Int']
  unitPrice: Scalars['Float']
  upc: Scalars['String']
  variationProductCode: Scalars['String']
  weight: Scalars['Float']
  weightUnit: Scalars['String']
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type ReassignedItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReassignedReason = {
  __typename?: 'ReassignedReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReassignedReason>
  moreInfo: Scalars['String']
  reasonCode: Scalars['String']
}

export type ReassignedReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type RegularHours = {
  __typename?: 'RegularHours'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<RegularHours>
  friday?: Maybe<Hours>
  monday?: Maybe<Hours>
  saturday?: Maybe<Hours>
  sunday?: Maybe<Hours>
  thursday?: Maybe<Hours>
  timeZone?: Maybe<Scalars['String']>
  tuesday?: Maybe<Hours>
  wednesday?: Maybe<Hours>
}

export type RegularHours_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type RegularHoursInput = {
  friday?: InputMaybe<HoursInput>
  monday?: InputMaybe<HoursInput>
  saturday?: InputMaybe<HoursInput>
  sunday?: InputMaybe<HoursInput>
  thursday?: InputMaybe<HoursInput>
  timeZone?: InputMaybe<Scalars['String']>
  tuesday?: InputMaybe<HoursInput>
  wednesday?: InputMaybe<HoursInput>
}

export type RejectedItem = {
  __typename?: 'RejectedItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<RejectedItem>
  actualPrice: Scalars['Float']
  allocatedQuantity: Scalars['Int']
  allowsBackOrder?: Maybe<Scalars['Boolean']>
  allowsFutureAllocate?: Maybe<Scalars['Boolean']>
  appeasementReason?: Maybe<FuAppeasementReason>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  backorderReleaseDate: Scalars['DateTime']
  blockAssignment?: Maybe<Scalars['Boolean']>
  cartItemId: Scalars['String']
  childItemIds: Array<Scalars['String']>
  creditCurrencyCode: Scalars['String']
  creditValue: Scalars['Float']
  data: Scalars['Object']
  duty: Scalars['Float']
  expectedDeliveryDate: Scalars['DateTime']
  fulfillmentFields: Array<Maybe<FulfillmentField>>
  giftCards: Array<Maybe<FuGiftCard>>
  goodsType?: Maybe<GoodsTypeEnum>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl: Scalars['String']
  inventoryTags: Array<Maybe<FuInventoryTag>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment: Scalars['Float']
  lineItemCost: Scalars['Float']
  locatorName: Scalars['String']
  manageStock?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  optionAttributeFQN: Scalars['String']
  options: Array<Maybe<FuProductOption>>
  originalOrderItemId: Scalars['String']
  originalQuantity: Scalars['Int']
  overridePrice: Scalars['Float']
  parentItemId: Scalars['String']
  partNumber: Scalars['String']
  productCode: Scalars['String']
  quantity: Scalars['Int']
  readyForPickupQuantity: Scalars['Int']
  rejectedReason?: Maybe<RejectedReason>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku: Scalars['String']
  taxData: Scalars['Object']
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  transferQuantity: Scalars['Int']
  trueTransferQuantity: Scalars['Int']
  unitPrice: Scalars['Float']
  upc: Scalars['String']
  variationProductCode: Scalars['String']
  weight: Scalars['Float']
  weightUnit: Scalars['String']
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type RejectedItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type RejectedReason = {
  __typename?: 'RejectedReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<RejectedReason>
  moreInfo: Scalars['String']
  reasonCode: Scalars['String']
}

export type RejectedReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type RepriceShipmentObjectInput = {
  newShipment?: InputMaybe<CrShipmentInput>
  originalShipment?: InputMaybe<CrShipmentInput>
}

export type ResetPasswordInfoInput = {
  customerSetCode?: InputMaybe<Scalars['String']>
  emailAddress?: InputMaybe<Scalars['String']>
  userName?: InputMaybe<Scalars['String']>
}

export type ResolvedPriceList = {
  __typename?: 'ResolvedPriceList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ResolvedPriceList>
  description?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  priceListCode?: Maybe<Scalars['String']>
  priceListId: Scalars['Int']
}

export type ResolvedPriceList_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type RestockableReturnItemInput = {
  locationCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  returnItemId?: InputMaybe<Scalars['String']>
}

export type ReturnActionInput = {
  actionName?: InputMaybe<Scalars['String']>
  returnIds?: InputMaybe<Array<Scalars['String']>>
}

export type ReturnBundle = {
  __typename?: 'ReturnBundle'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnBundle>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type ReturnBundle_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReturnBundleInput = {
  productCode?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type ReturnCollection = {
  __typename?: 'ReturnCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnCollection>
  items?: Maybe<Array<Maybe<ReturnObj>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type ReturnCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReturnItem = {
  __typename?: 'ReturnItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnItem>
  bundledProducts?: Maybe<Array<Maybe<ReturnBundle>>>
  data?: Maybe<Scalars['Object']>
  excludeProductExtras?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<CrInventoryTags>>>
  notes?: Maybe<Array<Maybe<CrOrderNote>>>
  orderItemId?: Maybe<Scalars['String']>
  orderItemOptionAttributeFQN?: Maybe<Scalars['String']>
  orderLineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProduct>
  productLossAmount?: Maybe<Scalars['Float']>
  productLossTaxAmount?: Maybe<Scalars['Float']>
  quantityReceived: Scalars['Int']
  quantityRefunded: Scalars['Int']
  quantityReplaced?: Maybe<Scalars['Int']>
  quantityRestockable: Scalars['Int']
  quantityRestocked: Scalars['Int']
  quantityShipped: Scalars['Int']
  reasons?: Maybe<Array<Maybe<ReturnReason>>>
  receiveStatus?: Maybe<Scalars['String']>
  refundAmount?: Maybe<Scalars['Float']>
  refundStatus?: Maybe<Scalars['String']>
  replaceStatus?: Maybe<Scalars['String']>
  returnNotRequired?: Maybe<Scalars['Boolean']>
  returnProcessingFeeApplied?: Maybe<Scalars['Float']>
  returnType?: Maybe<Scalars['String']>
  shipmentItemId?: Maybe<Scalars['Int']>
  shipmentNumber?: Maybe<Scalars['Int']>
  shippingAndHandlingRefunded?: Maybe<Scalars['Boolean']>
  shippingLossAmount?: Maybe<Scalars['Float']>
  shippingLossTaxAmount?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
}

export type ReturnItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReturnItemCollection = {
  __typename?: 'ReturnItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnItemCollection>
  items?: Maybe<Array<Maybe<ReturnItem>>>
  totalCount: Scalars['Int']
}

export type ReturnItemCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReturnItemInput = {
  bundledProducts?: InputMaybe<Array<InputMaybe<ReturnBundleInput>>>
  data?: InputMaybe<Scalars['Object']>
  excludeProductExtras?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<CrInventoryTagsInput>>>
  notes?: InputMaybe<Array<InputMaybe<CrOrderNoteInput>>>
  orderItemId?: InputMaybe<Scalars['String']>
  orderItemOptionAttributeFQN?: InputMaybe<Scalars['String']>
  orderLineId?: InputMaybe<Scalars['Int']>
  product?: InputMaybe<CrProductInput>
  productLossAmount?: InputMaybe<Scalars['Float']>
  productLossTaxAmount?: InputMaybe<Scalars['Float']>
  quantityReceived: Scalars['Int']
  quantityRefunded: Scalars['Int']
  quantityReplaced?: InputMaybe<Scalars['Int']>
  quantityRestockable: Scalars['Int']
  quantityRestocked: Scalars['Int']
  quantityShipped: Scalars['Int']
  reasons?: InputMaybe<Array<InputMaybe<ReturnReasonInput>>>
  receiveStatus?: InputMaybe<Scalars['String']>
  refundAmount?: InputMaybe<Scalars['Float']>
  refundStatus?: InputMaybe<Scalars['String']>
  replaceStatus?: InputMaybe<Scalars['String']>
  returnNotRequired?: InputMaybe<Scalars['Boolean']>
  returnProcessingFeeApplied?: InputMaybe<Scalars['Float']>
  returnType?: InputMaybe<Scalars['String']>
  shipmentItemId?: InputMaybe<Scalars['Int']>
  shipmentNumber?: InputMaybe<Scalars['Int']>
  shippingAndHandlingRefunded?: InputMaybe<Scalars['Boolean']>
  shippingLossAmount?: InputMaybe<Scalars['Float']>
  shippingLossTaxAmount?: InputMaybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
}

export type ReturnItemSpecifierInput = {
  quantity: Scalars['Int']
  returnItemId?: InputMaybe<Scalars['String']>
}

export type ReturnObj = {
  __typename?: 'ReturnObj'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnObj>
  actionRequired?: Maybe<Scalars['Boolean']>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  canInitiateRefund?: Maybe<Scalars['Boolean']>
  changeMessages?: Maybe<Array<Maybe<CrChangeMessage>>>
  channelCode?: Maybe<Scalars['String']>
  contact?: Maybe<CrContact>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  isUnified?: Maybe<Scalars['Boolean']>
  items?: Maybe<Array<Maybe<ReturnItem>>>
  locationCode?: Maybe<Scalars['String']>
  lossTotal?: Maybe<Scalars['Float']>
  notes?: Maybe<Array<Maybe<CrOrderNote>>>
  originalOrderId?: Maybe<Scalars['String']>
  originalOrderNumber?: Maybe<Scalars['Int']>
  packages?: Maybe<Array<Maybe<CrPackageObj>>>
  payments?: Maybe<Array<Maybe<CrPayment>>>
  productLossTaxTotal?: Maybe<Scalars['Float']>
  productLossTotal?: Maybe<Scalars['Float']>
  receiveStatus?: Maybe<Scalars['String']>
  refundAmount?: Maybe<Scalars['Float']>
  refundStatus?: Maybe<Scalars['String']>
  refundToGC?: Maybe<Scalars['Boolean']>
  replaceStatus?: Maybe<Scalars['String']>
  returnNumber?: Maybe<Scalars['Int']>
  returnOrderId?: Maybe<Scalars['String']>
  returnType?: Maybe<Scalars['String']>
  rmaDeadline?: Maybe<Scalars['DateTime']>
  shipOrBillCountryCode?: Maybe<Scalars['String']>
  shippingLossTaxTotal?: Maybe<Scalars['Float']>
  shippingLossTotal?: Maybe<Scalars['Float']>
  siteId?: Maybe<Scalars['Int']>
  status?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  userId?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type ReturnObj_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReturnObjInput = {
  actionRequired?: InputMaybe<Scalars['Boolean']>
  auditInfo?: InputMaybe<CrAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  canInitiateRefund?: InputMaybe<Scalars['Boolean']>
  changeMessages?: InputMaybe<Array<InputMaybe<CrChangeMessageInput>>>
  channelCode?: InputMaybe<Scalars['String']>
  contact?: InputMaybe<CrContactInput>
  currencyCode?: InputMaybe<Scalars['String']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  isUnified?: InputMaybe<Scalars['Boolean']>
  items?: InputMaybe<Array<InputMaybe<ReturnItemInput>>>
  locationCode?: InputMaybe<Scalars['String']>
  lossTotal?: InputMaybe<Scalars['Float']>
  notes?: InputMaybe<Array<InputMaybe<CrOrderNoteInput>>>
  originalOrderId?: InputMaybe<Scalars['String']>
  originalOrderNumber?: InputMaybe<Scalars['Int']>
  packages?: InputMaybe<Array<InputMaybe<CrPackageObjInput>>>
  payments?: InputMaybe<Array<InputMaybe<CrPaymentInput>>>
  productLossTaxTotal?: InputMaybe<Scalars['Float']>
  productLossTotal?: InputMaybe<Scalars['Float']>
  receiveStatus?: InputMaybe<Scalars['String']>
  refundAmount?: InputMaybe<Scalars['Float']>
  refundStatus?: InputMaybe<Scalars['String']>
  refundToGC?: InputMaybe<Scalars['Boolean']>
  replaceStatus?: InputMaybe<Scalars['String']>
  returnNumber?: InputMaybe<Scalars['Int']>
  returnOrderId?: InputMaybe<Scalars['String']>
  returnType?: InputMaybe<Scalars['String']>
  rmaDeadline?: InputMaybe<Scalars['DateTime']>
  shipOrBillCountryCode?: InputMaybe<Scalars['String']>
  shippingLossTaxTotal?: InputMaybe<Scalars['Float']>
  shippingLossTotal?: InputMaybe<Scalars['Float']>
  siteId?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Scalars['String']>
  tenantId?: InputMaybe<Scalars['Int']>
  userId?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
}

export type ReturnReason = {
  __typename?: 'ReturnReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnReason>
  quantity: Scalars['Int']
  reason?: Maybe<Scalars['String']>
}

export type ReturnReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ReturnReasonInput = {
  quantity: Scalars['Int']
  reason?: InputMaybe<Scalars['String']>
}

export type SbAddress = {
  __typename?: 'SBAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
  postalOrZipCode?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
}

export type SbAddress_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAddressInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  address3?: InputMaybe<Scalars['String']>
  address4?: InputMaybe<Scalars['String']>
  addressType?: InputMaybe<Scalars['String']>
  cityOrTown?: InputMaybe<Scalars['String']>
  countryCode?: InputMaybe<Scalars['String']>
  isValidated?: InputMaybe<Scalars['Boolean']>
  postalOrZipCode?: InputMaybe<Scalars['String']>
  stateOrProvince?: InputMaybe<Scalars['String']>
}

export type SbAdjustment = {
  __typename?: 'SBAdjustment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAdjustment>
  amount?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  internalComment?: Maybe<Scalars['String']>
}

export type SbAdjustment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAdjustmentInput = {
  amount?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  internalComment?: InputMaybe<Scalars['String']>
}

export type SbAlternateContact = {
  __typename?: 'SBAlternateContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAlternateContact>
  emailAddress?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type SbAlternateContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAppliedDiscount = {
  __typename?: 'SBAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAppliedDiscount>
  couponCode?: Maybe<Scalars['String']>
  discount?: Maybe<SbDiscount>
  excluded?: Maybe<Scalars['Boolean']>
  impact?: Maybe<Scalars['Float']>
}

export type SbAppliedDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAppliedDiscountInput = {
  couponCode?: InputMaybe<Scalars['String']>
  discount?: InputMaybe<SbDiscountInput>
  excluded?: InputMaybe<Scalars['Boolean']>
  impact?: InputMaybe<Scalars['Float']>
}

export type SbAppliedLineItemProductDiscount = {
  __typename?: 'SBAppliedLineItemProductDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars['Boolean']>
  couponCode?: Maybe<Scalars['String']>
  discount?: Maybe<SbDiscount>
  discountQuantity: Scalars['Int']
  excluded?: Maybe<Scalars['Boolean']>
  impact?: Maybe<Scalars['Float']>
  impactPerUnit?: Maybe<Scalars['Float']>
  productQuantity?: Maybe<Scalars['Int']>
}

export type SbAppliedLineItemProductDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAppliedLineItemProductDiscountInput = {
  appliesToSalePrice?: InputMaybe<Scalars['Boolean']>
  couponCode?: InputMaybe<Scalars['String']>
  discount?: InputMaybe<SbDiscountInput>
  discountQuantity: Scalars['Int']
  excluded?: InputMaybe<Scalars['Boolean']>
  impact?: InputMaybe<Scalars['Float']>
  impactPerUnit?: InputMaybe<Scalars['Float']>
  productQuantity?: InputMaybe<Scalars['Int']>
}

export type SbAppliedLineItemShippingDiscount = {
  __typename?: 'SBAppliedLineItemShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAppliedLineItemShippingDiscount>
  discount?: Maybe<SbAppliedDiscount>
  discountQuantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
  methodCode?: Maybe<Scalars['String']>
}

export type SbAppliedLineItemShippingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAppliedLineItemShippingDiscountInput = {
  discount?: InputMaybe<SbAppliedDiscountInput>
  discountQuantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
  methodCode?: InputMaybe<Scalars['String']>
}

export type SbAuditInfo = {
  __typename?: 'SBAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbAuditInfo>
  createBy?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  updateDate?: Maybe<Scalars['DateTime']>
}

export type SbAuditInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbAuditInfoInput = {
  createBy?: InputMaybe<Scalars['String']>
  createDate?: InputMaybe<Scalars['DateTime']>
  updateBy?: InputMaybe<Scalars['String']>
  updateDate?: InputMaybe<Scalars['DateTime']>
}

export type SbBillingInfo = {
  __typename?: 'SBBillingInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbBillingInfo>
  auditInfo?: Maybe<SbAuditInfo>
  billingContact?: Maybe<SbContact>
  card?: Maybe<SbPaymentCard>
  check?: Maybe<SbCheckPayment>
  customCreditType?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  externalTransactionId?: Maybe<Scalars['String']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isSameBillingShippingAddress?: Maybe<Scalars['Boolean']>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  purchaseOrder?: Maybe<SbPurchaseOrderPayment>
  recurringTransactionId?: Maybe<Scalars['String']>
  storeCreditCode?: Maybe<Scalars['String']>
  storeCreditType?: Maybe<Scalars['String']>
  token?: Maybe<SbPaymentToken>
}

export type SbBillingInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbBillingInfoInput = {
  auditInfo?: InputMaybe<SbAuditInfoInput>
  billingContact?: InputMaybe<SbContactInput>
  card?: InputMaybe<SbPaymentCardInput>
  check?: InputMaybe<SbCheckPaymentInput>
  customCreditType?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  externalTransactionId?: InputMaybe<Scalars['String']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isSameBillingShippingAddress?: InputMaybe<Scalars['Boolean']>
  paymentType?: InputMaybe<Scalars['String']>
  paymentWorkflow?: InputMaybe<Scalars['String']>
  purchaseOrder?: InputMaybe<SbPurchaseOrderPaymentInput>
  recurringTransactionId?: InputMaybe<Scalars['String']>
  storeCreditCode?: InputMaybe<Scalars['String']>
  storeCreditType?: InputMaybe<Scalars['String']>
  token?: InputMaybe<SbPaymentTokenInput>
}

export type SbBundledProduct = {
  __typename?: 'SBBundledProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbBundledProduct>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  allocationId?: Maybe<Scalars['Int']>
  creditValue?: Maybe<Scalars['Float']>
  deltaPrice?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<SbPackageMeasurements>
  name?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  productCode?: Maybe<Scalars['String']>
  productReservationId?: Maybe<Scalars['Int']>
  quantity: Scalars['Int']
  stock?: Maybe<SbProductStock>
}

export type SbBundledProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbBundledProductInput = {
  allocationExpiration?: InputMaybe<Scalars['DateTime']>
  allocationId?: InputMaybe<Scalars['Int']>
  creditValue?: InputMaybe<Scalars['Float']>
  deltaPrice?: InputMaybe<Scalars['Float']>
  description?: InputMaybe<Scalars['String']>
  fulfillmentStatus?: InputMaybe<Scalars['String']>
  goodsType?: InputMaybe<Scalars['String']>
  imageUrl?: InputMaybe<Scalars['String']>
  isPackagedStandAlone?: InputMaybe<Scalars['Boolean']>
  measurements?: InputMaybe<SbPackageMeasurementsInput>
  name?: InputMaybe<Scalars['String']>
  optionAttributeFQN?: InputMaybe<Scalars['String']>
  optionValue?: InputMaybe<Scalars['Object']>
  productCode?: InputMaybe<Scalars['String']>
  productReservationId?: InputMaybe<Scalars['Int']>
  quantity: Scalars['Int']
  stock?: InputMaybe<SbProductStockInput>
}

export type SbCanceledItem = {
  __typename?: 'SBCanceledItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCanceledItem>
  actualPrice: Scalars['Float']
  auditInfo?: Maybe<SbAuditInfo>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  canceledReason?: Maybe<SbCanceledReason>
  cartItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  duty: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<SbFulfillmentField>>>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  giftCards?: Maybe<Array<Maybe<SbGiftCard>>>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<SbInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment?: Maybe<Scalars['Float']>
  lineItemCost: Scalars['Float']
  locatorName?: Maybe<Scalars['String']>
  measurements?: Maybe<SbPackageMeasurements>
  name?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<SbProductOption>>>
  originalOrderItemId?: Maybe<Scalars['String']>
  originalQuantity?: Maybe<Scalars['Int']>
  overridePrice?: Maybe<Scalars['Float']>
  parentId?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  partNumber?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku?: Maybe<Scalars['String']>
  taxData?: Maybe<Scalars['Object']>
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  unitPrice: Scalars['Float']
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type SbCanceledItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCanceledReason = {
  __typename?: 'SBCanceledReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCanceledReason>
  description?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
}

export type SbCanceledReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCapturableShipmentSummary = {
  __typename?: 'SBCapturableShipmentSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCapturableShipmentSummary>
  amountApplied: Scalars['Float']
  shipmentNumber: Scalars['Int']
  shipmentTotal: Scalars['Float']
}

export type SbCapturableShipmentSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCapturableShipmentSummaryInput = {
  amountApplied: Scalars['Float']
  shipmentNumber: Scalars['Int']
  shipmentTotal: Scalars['Float']
}

export type SbCategory = {
  __typename?: 'SBCategory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCategory>
  id?: Maybe<Scalars['Int']>
  parent?: Maybe<SbCategory>
}

export type SbCategory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCategoryInput = {
  id?: InputMaybe<Scalars['Int']>
  parent?: InputMaybe<SbCategoryInput>
}

export type SbChangeMessage = {
  __typename?: 'SBChangeMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbChangeMessage>
  amount?: Maybe<Scalars['Float']>
  appId?: Maybe<Scalars['String']>
  appKey?: Maybe<Scalars['String']>
  appName?: Maybe<Scalars['String']>
  attributes?: Maybe<Scalars['Object']>
  correlationId?: Maybe<Scalars['String']>
  createDate?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  identifier?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  newValue?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
  subjectType?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  userFirstName?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  userLastName?: Maybe<Scalars['String']>
  userScopeType?: Maybe<Scalars['String']>
  verb?: Maybe<Scalars['String']>
}

export type SbChangeMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbChangeMessageInput = {
  amount?: InputMaybe<Scalars['Float']>
  appId?: InputMaybe<Scalars['String']>
  appKey?: InputMaybe<Scalars['String']>
  appName?: InputMaybe<Scalars['String']>
  attributes?: InputMaybe<Scalars['Object']>
  correlationId?: InputMaybe<Scalars['String']>
  createDate?: InputMaybe<Scalars['DateTime']>
  id?: InputMaybe<Scalars['String']>
  identifier?: InputMaybe<Scalars['String']>
  message?: InputMaybe<Scalars['String']>
  metadata?: InputMaybe<Scalars['Object']>
  newValue?: InputMaybe<Scalars['String']>
  oldValue?: InputMaybe<Scalars['String']>
  subject?: InputMaybe<Scalars['String']>
  subjectType?: InputMaybe<Scalars['String']>
  success?: InputMaybe<Scalars['Boolean']>
  userFirstName?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
  userLastName?: InputMaybe<Scalars['String']>
  userScopeType?: InputMaybe<Scalars['String']>
  verb?: InputMaybe<Scalars['String']>
}

export type SbCheckPayment = {
  __typename?: 'SBCheckPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCheckPayment>
  checkNumber?: Maybe<Scalars['String']>
}

export type SbCheckPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCheckPaymentInput = {
  checkNumber?: InputMaybe<Scalars['String']>
}

export type SbCommerceUnitPrice = {
  __typename?: 'SBCommerceUnitPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCommerceUnitPrice>
  extendedAmount?: Maybe<Scalars['Float']>
  listAmount?: Maybe<Scalars['Float']>
  overrideAmount?: Maybe<Scalars['Float']>
  saleAmount?: Maybe<Scalars['Float']>
}

export type SbCommerceUnitPrice_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCommerceUnitPriceInput = {
  extendedAmount?: InputMaybe<Scalars['Float']>
  listAmount?: InputMaybe<Scalars['Float']>
  overrideAmount?: InputMaybe<Scalars['Float']>
  saleAmount?: InputMaybe<Scalars['Float']>
}

export type SbContact = {
  __typename?: 'SBContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbContact>
  address?: Maybe<SbAddress>
  companyOrOrganization?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<SbPhone>
}

export type SbContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbContactInput = {
  address?: InputMaybe<SbAddressInput>
  companyOrOrganization?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  lastNameOrSurname?: InputMaybe<Scalars['String']>
  middleNameOrInitial?: InputMaybe<Scalars['String']>
  phoneNumbers?: InputMaybe<SbPhoneInput>
}

export type SbCredit = {
  __typename?: 'SBCredit'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCredit>
  amount: Scalars['Float']
  auditInfo?: Maybe<SbAuditInfo>
  giftCard?: Maybe<SbGatewayGiftCard>
  id?: Maybe<Scalars['String']>
  parentPaymentId?: Maybe<Scalars['String']>
  parentPaymentInteractionId?: Maybe<Scalars['String']>
}

export type SbCredit_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbCustomer = {
  __typename?: 'SBCustomer'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbCustomer>
  customerContact?: Maybe<SbContact>
  data?: Maybe<Scalars['Object']>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type SbCustomer_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbDestination = {
  __typename?: 'SBDestination'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbDestination>
  data?: Maybe<Scalars['Object']>
  destinationContact?: Maybe<SbContact>
  id?: Maybe<Scalars['String']>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type SbDestination_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbDigitalPackage = {
  __typename?: 'SBDigitalPackage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbDigitalPackage>
  auditInfo?: Maybe<SbAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  code?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<SbDigitalPackageItem>>>
  status?: Maybe<Scalars['String']>
}

export type SbDigitalPackage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbDigitalPackageItem = {
  __typename?: 'SBDigitalPackageItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbDigitalPackageItem>
  fulfillmentItemType?: Maybe<Scalars['String']>
  giftCardCode?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type SbDigitalPackageItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbDiscount = {
  __typename?: 'SBDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbDiscount>
  expirationDate?: Maybe<Scalars['DateTime']>
  hasMultipleTargetProducts?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  itemIds?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
}

export type SbDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbDiscountInput = {
  expirationDate?: InputMaybe<Scalars['DateTime']>
  hasMultipleTargetProducts?: InputMaybe<Scalars['Boolean']>
  id: Scalars['Int']
  itemIds?: InputMaybe<Array<Scalars['String']>>
  name?: InputMaybe<Scalars['String']>
}

export type SbExtendedProperty = {
  __typename?: 'SBExtendedProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbExtendedProperty>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type SbExtendedProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFrequency = {
  __typename?: 'SBFrequency'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFrequency>
  unit?: Maybe<Scalars['String']>
  value: Scalars['Int']
}

export type SbFrequency_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFrequencyInput = {
  unit?: InputMaybe<Scalars['String']>
  value: Scalars['Int']
}

export type SbFulfillmentAlternateContact = {
  __typename?: 'SBFulfillmentAlternateContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFulfillmentAlternateContact>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type SbFulfillmentAlternateContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFulfillmentField = {
  __typename?: 'SBFulfillmentField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFulfillmentField>
  name?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  userEnteredValue?: Maybe<Scalars['Object']>
}

export type SbFulfillmentField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFulfillmentFieldInput = {
  name?: InputMaybe<Scalars['String']>
  required?: InputMaybe<Scalars['Boolean']>
  userEnteredValue?: InputMaybe<Scalars['Object']>
}

export type SbFulfillmentInfo = {
  __typename?: 'SBFulfillmentInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFulfillmentInfo>
  auditInfo?: Maybe<SbAuditInfo>
  data?: Maybe<Scalars['Object']>
  fulfillmentContact?: Maybe<SbContact>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
}

export type SbFulfillmentInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFulfillmentInfoInput = {
  auditInfo?: InputMaybe<SbAuditInfoInput>
  data?: InputMaybe<Scalars['Object']>
  fulfillmentContact?: InputMaybe<SbContactInput>
  isDestinationCommercial?: InputMaybe<Scalars['Boolean']>
  shippingMethodCode?: InputMaybe<Scalars['String']>
  shippingMethodName?: InputMaybe<Scalars['String']>
}

export type SbFulfillmentShopperNotes = {
  __typename?: 'SBFulfillmentShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFulfillmentShopperNotes>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
  giftMessage?: Maybe<Scalars['String']>
}

export type SbFulfillmentShopperNotes_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFulfillmentTask = {
  __typename?: 'SBFulfillmentTask'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFulfillmentTask>
  active?: Maybe<Scalars['Boolean']>
  attributes?: Maybe<Scalars['Object']>
  completed?: Maybe<Scalars['Boolean']>
  completedDate?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  inputs?: Maybe<Array<Maybe<SbTaskInput>>>
  links?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  skippable?: Maybe<Scalars['Boolean']>
  subject?: Maybe<Scalars['String']>
  taskId?: Maybe<Scalars['String']>
}

export type SbFulfillmentTask_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFutureInventory = {
  __typename?: 'SBFutureInventory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbFutureInventory>
  allocated?: Maybe<Scalars['Int']>
  available?: Maybe<Scalars['Int']>
  createDate?: Maybe<Scalars['DateTime']>
  deliveryDate?: Maybe<Scalars['DateTime']>
  futureInventoryID?: Maybe<Scalars['Int']>
  onhand?: Maybe<Scalars['Int']>
  pending?: Maybe<Scalars['Int']>
}

export type SbFutureInventory_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbFutureInventoryInput = {
  allocated?: InputMaybe<Scalars['Int']>
  available?: InputMaybe<Scalars['Int']>
  createDate?: InputMaybe<Scalars['DateTime']>
  deliveryDate?: InputMaybe<Scalars['DateTime']>
  futureInventoryID?: InputMaybe<Scalars['Int']>
  onhand?: InputMaybe<Scalars['Int']>
  pending?: InputMaybe<Scalars['Int']>
}

export type SbGatewayGiftCard = {
  __typename?: 'SBGatewayGiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbGatewayGiftCard>
  amount: Scalars['Float']
  cardNumber?: Maybe<Scalars['String']>
  cardPin?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type SbGatewayGiftCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbGatewayGiftCardInput = {
  amount: Scalars['Float']
  cardNumber?: InputMaybe<Scalars['String']>
  cardPin?: InputMaybe<Scalars['String']>
  currencyCode?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
}

export type SbGiftCard = {
  __typename?: 'SBGiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbGiftCard>
  activationDate?: Maybe<Scalars['DateTime']>
  cardNumber?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  creditType?: Maybe<Scalars['String']>
  creditValue?: Maybe<Scalars['Float']>
  currencyCode?: Maybe<Scalars['String']>
  currentBalance?: Maybe<Scalars['Float']>
  customerId?: Maybe<Scalars['Int']>
  expirationDate?: Maybe<Scalars['DateTime']>
  initialBalance?: Maybe<Scalars['Float']>
}

export type SbGiftCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbInvalidCoupon = {
  __typename?: 'SBInvalidCoupon'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbInvalidCoupon>
  couponCode?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  discountId: Scalars['Int']
  reason?: Maybe<Scalars['String']>
  reasonCode: Scalars['Int']
}

export type SbInvalidCoupon_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbInvalidCouponInput = {
  couponCode?: InputMaybe<Scalars['String']>
  createDate: Scalars['DateTime']
  discountId: Scalars['Int']
  reason?: InputMaybe<Scalars['String']>
  reasonCode: Scalars['Int']
}

export type SbInventoryTags = {
  __typename?: 'SBInventoryTags'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbInventoryTags>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type SbInventoryTags_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbInventoryTagsInput = {
  name?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type SbMeasurement = {
  __typename?: 'SBMeasurement'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbMeasurement>
  unit?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Float']>
}

export type SbMeasurement_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbMeasurementInput = {
  unit?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Float']>
}

export type SbOrder = {
  __typename?: 'SBOrder'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbOrder>
  acceptedDate?: Maybe<Scalars['DateTime']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  adjustment?: Maybe<SbAdjustment>
  alternateContact?: Maybe<SbAlternateContact>
  amountAvailableForRefund: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRemainingForPayment: Scalars['Float']
  attributes?: Maybe<Array<Maybe<SbOrderAttribute>>>
  auditInfo?: Maybe<SbAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  billingInfo?: Maybe<SbBillingInfo>
  cancelledDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  channelCode?: Maybe<Scalars['String']>
  closedDate?: Maybe<Scalars['DateTime']>
  continuityOrderOrdinal: Scalars['Int']
  couponCodes?: Maybe<Array<Scalars['String']>>
  credits?: Maybe<Array<Maybe<SbCredit>>>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  digitalPackages?: Maybe<Array<Maybe<SbDigitalPackage>>>
  discountThresholdMessages?: Maybe<Array<Maybe<SbThresholdMessage>>>
  discountTotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal?: Maybe<Scalars['Float']>
  email?: Maybe<Scalars['String']>
  expirationDate?: Maybe<Scalars['DateTime']>
  extendedProperties?: Maybe<Array<Maybe<SbExtendedProperty>>>
  externalId?: Maybe<Scalars['String']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentInfo?: Maybe<SbFulfillmentInfo>
  fulfillmentStatus?: Maybe<Scalars['String']>
  handlingAdjustment?: Maybe<SbAdjustment>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingDiscounts?: Maybe<Array<Maybe<SbAppliedDiscount>>>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  hasDraft?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  importDate?: Maybe<Scalars['DateTime']>
  invalidCoupons?: Maybe<Array<Maybe<SbInvalidCoupon>>>
  ipAddress?: Maybe<Scalars['String']>
  isDraft?: Maybe<Scalars['Boolean']>
  isEligibleForReturns?: Maybe<Scalars['Boolean']>
  isFulfillable?: Maybe<Scalars['Boolean']>
  isHistoricalImport?: Maybe<Scalars['Boolean']>
  isImport?: Maybe<Scalars['Boolean']>
  isOptInForSms?: Maybe<Scalars['Boolean']>
  isPartialOrder?: Maybe<Scalars['Boolean']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  isUnified?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  items?: Maybe<Array<Maybe<SbOrderItem>>>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  locationCode?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<SbOrderNote>>>
  orderDiscounts?: Maybe<Array<Maybe<SbAppliedDiscount>>>
  orderNumber?: Maybe<Scalars['Int']>
  originalCartId?: Maybe<Scalars['String']>
  originalQuoteId?: Maybe<Scalars['String']>
  originalQuoteNumber?: Maybe<Scalars['Int']>
  packages?: Maybe<Array<Maybe<SbPackageObj>>>
  parentCheckoutId?: Maybe<Scalars['String']>
  parentCheckoutNumber?: Maybe<Scalars['Int']>
  parentOrderId?: Maybe<Scalars['String']>
  parentOrderNumber?: Maybe<Scalars['Int']>
  parentReturnId?: Maybe<Scalars['String']>
  parentReturnNumber?: Maybe<Scalars['Int']>
  partialOrderCount?: Maybe<Scalars['Int']>
  partialOrderNumber?: Maybe<Scalars['Int']>
  paymentStatus?: Maybe<Scalars['String']>
  payments?: Maybe<Array<Maybe<SbPayment>>>
  pickups?: Maybe<Array<Maybe<SbPickup>>>
  priceListCode?: Maybe<Scalars['String']>
  readyToCapture?: Maybe<Scalars['Boolean']>
  refunds?: Maybe<Array<Maybe<SbRefund>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SbSuggestedDiscount>>>
  reservationId?: Maybe<Scalars['String']>
  returnStatus?: Maybe<Scalars['String']>
  shipments?: Maybe<Array<Maybe<SbShipment>>>
  shippingAdjustment?: Maybe<SbAdjustment>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<SbShippingDiscount>>>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shopperNotes?: Maybe<SbShopperNotes>
  siteId?: Maybe<Scalars['Int']>
  sourceDevice?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  submittedDate?: Maybe<Scalars['DateTime']>
  subscriptionIds?: Maybe<Array<Scalars['String']>>
  subtotal?: Maybe<Scalars['Float']>
  suggestedDiscounts?: Maybe<Array<Maybe<SbSuggestedDiscount>>>
  taxData?: Maybe<Scalars['Object']>
  taxTotal?: Maybe<Scalars['Float']>
  tenantId?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Float']>
  totalCollected: Scalars['Float']
  type?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  validationResults?: Maybe<Array<Maybe<SbOrderValidationResult>>>
  version?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type SbOrder_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbOrderAttribute = {
  __typename?: 'SBOrderAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbOrderAttribute>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  auditInfo?: Maybe<SbAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type SbOrderAttribute_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbOrderItem = {
  __typename?: 'SBOrderItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbOrderItem>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<SbAuditInfo>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  destinationId?: Maybe<Scalars['String']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  dutyAmount?: Maybe<Scalars['Float']>
  expectedDeliveryDate?: Maybe<Scalars['DateTime']>
  extendedTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  handlingAmount?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<SbInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isReservationEnabled?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  lineId?: Maybe<Scalars['Int']>
  lineItemAdjustment?: Maybe<Scalars['Float']>
  localeCode?: Maybe<Scalars['String']>
  originalCartItemId?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  product?: Maybe<SbProduct>
  productDiscount?: Maybe<SbAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<SbAppliedLineItemProductDiscount>>>
  purchaseLocation?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<SbAppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  subscription?: Maybe<SbSubscriptionInfo>
  subtotal?: Maybe<Scalars['Float']>
  taxData?: Maybe<Scalars['Object']>
  taxableTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<SbCommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
}

export type SbOrderItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbOrderNote = {
  __typename?: 'SBOrderNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbOrderNote>
  auditInfo?: Maybe<SbAuditInfo>
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type SbOrderNote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbOrderNoteInput = {
  auditInfo?: InputMaybe<SbAuditInfoInput>
  id?: InputMaybe<Scalars['String']>
  text?: InputMaybe<Scalars['String']>
}

export type SbOrderValidationMessage = {
  __typename?: 'SBOrderValidationMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbOrderValidationMessage>
  message?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  orderItemId?: Maybe<Scalars['String']>
}

export type SbOrderValidationMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbOrderValidationResult = {
  __typename?: 'SBOrderValidationResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbOrderValidationResult>
  createdDate?: Maybe<Scalars['DateTime']>
  messages?: Maybe<Array<Maybe<SbOrderValidationMessage>>>
  status?: Maybe<Scalars['String']>
  validationId?: Maybe<Scalars['String']>
  validatorName?: Maybe<Scalars['String']>
  validatorType?: Maybe<Scalars['String']>
}

export type SbOrderValidationResult_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPackageItem = {
  __typename?: 'SBPackageItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPackageItem>
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type SbPackageItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPackageMeasurements = {
  __typename?: 'SBPackageMeasurements'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPackageMeasurements>
  height?: Maybe<SbMeasurement>
  length?: Maybe<SbMeasurement>
  weight?: Maybe<SbMeasurement>
  width?: Maybe<SbMeasurement>
}

export type SbPackageMeasurements_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPackageMeasurementsInput = {
  height?: InputMaybe<SbMeasurementInput>
  length?: InputMaybe<SbMeasurementInput>
  weight?: InputMaybe<SbMeasurementInput>
  width?: InputMaybe<SbMeasurementInput>
}

export type SbPackageObj = {
  __typename?: 'SBPackageObj'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPackageObj>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<SbAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  carrier?: Maybe<Scalars['String']>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  code?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fxcbDocumentsUrl?: Maybe<Scalars['String']>
  fxcbPackNotificationId?: Maybe<Scalars['String']>
  hasLabel?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  integratorId?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<SbPackageItem>>>
  labelFormat?: Maybe<Scalars['String']>
  manifestId?: Maybe<Scalars['String']>
  measurements?: Maybe<SbPackageMeasurements>
  packageId?: Maybe<Scalars['String']>
  packagingType?: Maybe<Scalars['String']>
  packingSlipItemDetails?: Maybe<Array<Maybe<SbPackingSlipItemDetail>>>
  packingSlipNumber?: Maybe<Scalars['Int']>
  returnCarrier?: Maybe<Scalars['String']>
  returnTrackingNumbers?: Maybe<Array<Scalars['String']>>
  returnTrackings?: Maybe<Array<Maybe<SbTracking>>>
  shipmentId?: Maybe<Scalars['String']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  signatureRequired?: Maybe<Scalars['Boolean']>
  status?: Maybe<Scalars['String']>
  trackingNumber?: Maybe<Scalars['String']>
  trackingNumbers?: Maybe<Array<Scalars['String']>>
  trackings?: Maybe<Array<Maybe<SbTracking>>>
}

export type SbPackageObj_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPackingSlipItemDetail = {
  __typename?: 'SBPackingSlipItemDetail'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPackingSlipItemDetail>
  attributes?: Maybe<Scalars['Object']>
  lineId?: Maybe<Scalars['Int']>
  originalOrderItemId?: Maybe<Scalars['String']>
  quantity?: Maybe<Scalars['Int']>
}

export type SbPackingSlipItemDetail_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPayment = {
  __typename?: 'SBPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPayment>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  auditInfo?: Maybe<SbAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  billingInfo?: Maybe<SbBillingInfo>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  data?: Maybe<Scalars['Object']>
  externalTransactionId?: Maybe<Scalars['String']>
  gatewayGiftCard?: Maybe<SbGatewayGiftCard>
  groupId?: Maybe<SbPaymentActionTarget>
  id?: Maybe<Scalars['String']>
  interactions?: Maybe<Array<Maybe<SbPaymentInteraction>>>
  isRecurring?: Maybe<Scalars['Boolean']>
  orderId?: Maybe<Scalars['String']>
  paymentServiceTransactionId?: Maybe<Scalars['String']>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  subPayments?: Maybe<Array<Maybe<SbSubPayment>>>
}

export type SbPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPaymentActionTarget = {
  __typename?: 'SBPaymentActionTarget'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPaymentActionTarget>
  targetId?: Maybe<Scalars['String']>
  targetNumber?: Maybe<Scalars['Int']>
  targetType?: Maybe<Scalars['String']>
}

export type SbPaymentActionTarget_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPaymentActionTargetInput = {
  targetId?: InputMaybe<Scalars['String']>
  targetNumber?: InputMaybe<Scalars['Int']>
  targetType?: InputMaybe<Scalars['String']>
}

export type SbPaymentCard = {
  __typename?: 'SBPaymentCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPaymentCard>
  bin?: Maybe<Scalars['String']>
  cardNumberPartOrMask?: Maybe<Scalars['String']>
  ccLastFour?: Maybe<Scalars['String']>
  expireMonth: Scalars['Int']
  expireYear: Scalars['Int']
  isCardInfoSaved?: Maybe<Scalars['Boolean']>
  isTokenized?: Maybe<Scalars['Boolean']>
  isUsedRecurring?: Maybe<Scalars['Boolean']>
  nameOnCard?: Maybe<Scalars['String']>
  paymentOrCardType?: Maybe<Scalars['String']>
  paymentServiceCardId?: Maybe<Scalars['String']>
}

export type SbPaymentCard_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPaymentCardInput = {
  bin?: InputMaybe<Scalars['String']>
  cardNumberPartOrMask?: InputMaybe<Scalars['String']>
  ccLastFour?: InputMaybe<Scalars['String']>
  expireMonth: Scalars['Int']
  expireYear: Scalars['Int']
  isCardInfoSaved?: InputMaybe<Scalars['Boolean']>
  isTokenized?: InputMaybe<Scalars['Boolean']>
  isUsedRecurring?: InputMaybe<Scalars['Boolean']>
  nameOnCard?: InputMaybe<Scalars['String']>
  paymentOrCardType?: InputMaybe<Scalars['String']>
  paymentServiceCardId?: InputMaybe<Scalars['String']>
}

export type SbPaymentGatewayResponseData = {
  __typename?: 'SBPaymentGatewayResponseData'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPaymentGatewayResponseData>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type SbPaymentGatewayResponseData_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPaymentGatewayResponseDataInput = {
  key?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type SbPaymentInput = {
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  auditInfo?: InputMaybe<SbAuditInfoInput>
  availableActions?: InputMaybe<Array<Scalars['String']>>
  billingInfo?: InputMaybe<SbBillingInfoInput>
  changeMessages?: InputMaybe<Array<InputMaybe<SbChangeMessageInput>>>
  data?: InputMaybe<Scalars['Object']>
  externalTransactionId?: InputMaybe<Scalars['String']>
  gatewayGiftCard?: InputMaybe<SbGatewayGiftCardInput>
  groupId?: InputMaybe<SbPaymentActionTargetInput>
  id?: InputMaybe<Scalars['String']>
  interactions?: InputMaybe<Array<InputMaybe<SbPaymentInteractionInput>>>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  orderId?: InputMaybe<Scalars['String']>
  paymentServiceTransactionId?: InputMaybe<Scalars['String']>
  paymentType?: InputMaybe<Scalars['String']>
  paymentWorkflow?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  subPayments?: InputMaybe<Array<InputMaybe<SbSubPaymentInput>>>
}

export type SbPaymentInteraction = {
  __typename?: 'SBPaymentInteraction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPaymentInteraction>
  amount?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<SbAuditInfo>
  capturableShipmentsSummary?: Maybe<Array<Maybe<SbCapturableShipmentSummary>>>
  checkNumber?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  gatewayAVSCodes?: Maybe<Scalars['String']>
  gatewayAuthCode?: Maybe<Scalars['String']>
  gatewayCVV2Codes?: Maybe<Scalars['String']>
  gatewayInteractionId?: Maybe<Scalars['Int']>
  gatewayResponseCode?: Maybe<Scalars['String']>
  gatewayResponseData?: Maybe<Array<Maybe<SbPaymentGatewayResponseData>>>
  gatewayResponseText?: Maybe<Scalars['String']>
  gatewayTransactionId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  interactionDate?: Maybe<Scalars['DateTime']>
  interactionType?: Maybe<Scalars['String']>
  isManual?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  note?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  paymentEntryStatus?: Maybe<Scalars['String']>
  paymentId?: Maybe<Scalars['String']>
  paymentTransactionInteractionIdReference?: Maybe<Scalars['Int']>
  refundId?: Maybe<Scalars['String']>
  returnId?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  target?: Maybe<SbPaymentActionTarget>
}

export type SbPaymentInteraction_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPaymentInteractionInput = {
  amount?: InputMaybe<Scalars['Float']>
  auditInfo?: InputMaybe<SbAuditInfoInput>
  capturableShipmentsSummary?: InputMaybe<Array<InputMaybe<SbCapturableShipmentSummaryInput>>>
  checkNumber?: InputMaybe<Scalars['String']>
  currencyCode?: InputMaybe<Scalars['String']>
  gatewayAVSCodes?: InputMaybe<Scalars['String']>
  gatewayAuthCode?: InputMaybe<Scalars['String']>
  gatewayCVV2Codes?: InputMaybe<Scalars['String']>
  gatewayInteractionId?: InputMaybe<Scalars['Int']>
  gatewayResponseCode?: InputMaybe<Scalars['String']>
  gatewayResponseData?: InputMaybe<Array<InputMaybe<SbPaymentGatewayResponseDataInput>>>
  gatewayResponseText?: InputMaybe<Scalars['String']>
  gatewayTransactionId?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  interactionDate?: InputMaybe<Scalars['DateTime']>
  interactionType?: InputMaybe<Scalars['String']>
  isManual?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  note?: InputMaybe<Scalars['String']>
  orderId?: InputMaybe<Scalars['String']>
  paymentEntryStatus?: InputMaybe<Scalars['String']>
  paymentId?: InputMaybe<Scalars['String']>
  paymentTransactionInteractionIdReference?: InputMaybe<Scalars['Int']>
  refundId?: InputMaybe<Scalars['String']>
  returnId?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  target?: InputMaybe<SbPaymentActionTargetInput>
}

export type SbPaymentToken = {
  __typename?: 'SBPaymentToken'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPaymentToken>
  paymentServiceTokenId?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type SbPaymentToken_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPaymentTokenInput = {
  paymentServiceTokenId?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type SbPhone = {
  __typename?: 'SBPhone'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPhone>
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type SbPhone_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPhoneInput = {
  home?: InputMaybe<Scalars['String']>
  mobile?: InputMaybe<Scalars['String']>
  work?: InputMaybe<Scalars['String']>
}

export type SbPickup = {
  __typename?: 'SBPickup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPickup>
  auditInfo?: Maybe<SbAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  code?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<SbPickupItem>>>
  status?: Maybe<Scalars['String']>
}

export type SbPickup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPickupItem = {
  __typename?: 'SBPickupItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPickupItem>
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type SbPickupItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProduct = {
  __typename?: 'SBProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbProduct>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  allocationId?: Maybe<Scalars['Int']>
  bundledProducts?: Maybe<Array<Maybe<SbBundledProduct>>>
  categories?: Maybe<Array<Maybe<SbCategory>>>
  description?: Maybe<Scalars['String']>
  discountsRestricted?: Maybe<Scalars['Boolean']>
  discountsRestrictedEndDate?: Maybe<Scalars['DateTime']>
  discountsRestrictedStartDate?: Maybe<Scalars['DateTime']>
  fulfillmentFields?: Maybe<Array<Maybe<SbFulfillmentField>>>
  fulfillmentStatus?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  imageAlternateText?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<SbPackageMeasurements>
  mfgPartNumber?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<SbProductOption>>>
  price?: Maybe<SbProductPrice>
  productCode?: Maybe<Scalars['String']>
  productReservationId?: Maybe<Scalars['Int']>
  productType?: Maybe<Scalars['String']>
  productUsage?: Maybe<Scalars['String']>
  properties?: Maybe<Array<Maybe<SbProductProperty>>>
  sku?: Maybe<Scalars['String']>
  stock?: Maybe<SbProductStock>
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
}

export type SbProduct_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProductInput = {
  allocationExpiration?: InputMaybe<Scalars['DateTime']>
  allocationId?: InputMaybe<Scalars['Int']>
  bundledProducts?: InputMaybe<Array<InputMaybe<SbBundledProductInput>>>
  categories?: InputMaybe<Array<InputMaybe<SbCategoryInput>>>
  description?: InputMaybe<Scalars['String']>
  discountsRestricted?: InputMaybe<Scalars['Boolean']>
  discountsRestrictedEndDate?: InputMaybe<Scalars['DateTime']>
  discountsRestrictedStartDate?: InputMaybe<Scalars['DateTime']>
  fulfillmentFields?: InputMaybe<Array<InputMaybe<SbFulfillmentFieldInput>>>
  fulfillmentStatus?: InputMaybe<Scalars['String']>
  fulfillmentTypesSupported?: InputMaybe<Array<Scalars['String']>>
  goodsType?: InputMaybe<Scalars['String']>
  imageAlternateText?: InputMaybe<Scalars['String']>
  imageUrl?: InputMaybe<Scalars['String']>
  isPackagedStandAlone?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  measurements?: InputMaybe<SbPackageMeasurementsInput>
  mfgPartNumber?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<InputMaybe<SbProductOptionInput>>>
  price?: InputMaybe<SbProductPriceInput>
  productCode?: InputMaybe<Scalars['String']>
  productReservationId?: InputMaybe<Scalars['Int']>
  productType?: InputMaybe<Scalars['String']>
  productUsage?: InputMaybe<Scalars['String']>
  properties?: InputMaybe<Array<InputMaybe<SbProductPropertyInput>>>
  sku?: InputMaybe<Scalars['String']>
  stock?: InputMaybe<SbProductStockInput>
  upc?: InputMaybe<Scalars['String']>
  variationProductCode?: InputMaybe<Scalars['String']>
}

export type SbProductOption = {
  __typename?: 'SBProductOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbProductOption>
  attributeFQN?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type SbProductOption_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProductOptionInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  shopperEnteredValue?: InputMaybe<Scalars['Object']>
  stringValue?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Object']>
}

export type SbProductPrice = {
  __typename?: 'SBProductPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbProductPrice>
  creditValue?: Maybe<Scalars['Float']>
  msrp?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  priceListCode?: Maybe<Scalars['String']>
  priceListEntryMode?: Maybe<Scalars['String']>
  salePrice?: Maybe<Scalars['Float']>
  tenantOverridePrice?: Maybe<Scalars['Float']>
}

export type SbProductPrice_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProductPriceInput = {
  creditValue?: InputMaybe<Scalars['Float']>
  msrp?: InputMaybe<Scalars['Float']>
  price?: InputMaybe<Scalars['Float']>
  priceListCode?: InputMaybe<Scalars['String']>
  priceListEntryMode?: InputMaybe<Scalars['String']>
  salePrice?: InputMaybe<Scalars['Float']>
  tenantOverridePrice?: InputMaybe<Scalars['Float']>
}

export type SbProductProperty = {
  __typename?: 'SBProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbProductProperty>
  attributeFQN?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<SbProductPropertyValue>>>
}

export type SbProductProperty_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProductPropertyInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  isMultiValue?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<InputMaybe<SbProductPropertyValueInput>>>
}

export type SbProductPropertyValue = {
  __typename?: 'SBProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbProductPropertyValue>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type SbProductPropertyValue_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProductPropertyValueInput = {
  stringValue?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Object']>
}

export type SbProductStock = {
  __typename?: 'SBProductStock'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbProductStock>
  aggregateInventory?: Maybe<Scalars['Int']>
  availableDate?: Maybe<Scalars['DateTime']>
  futureInventories?: Maybe<Array<Maybe<SbFutureInventory>>>
  isOnBackOrder?: Maybe<Scalars['Boolean']>
  manageStock?: Maybe<Scalars['Boolean']>
  stockAvailable?: Maybe<Scalars['Int']>
}

export type SbProductStock_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbProductStockInput = {
  aggregateInventory?: InputMaybe<Scalars['Int']>
  availableDate?: InputMaybe<Scalars['DateTime']>
  futureInventories?: InputMaybe<Array<InputMaybe<SbFutureInventoryInput>>>
  isOnBackOrder?: InputMaybe<Scalars['Boolean']>
  manageStock?: InputMaybe<Scalars['Boolean']>
  stockAvailable?: InputMaybe<Scalars['Int']>
}

export type SbPurchaseOrderCustomField = {
  __typename?: 'SBPurchaseOrderCustomField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPurchaseOrderCustomField>
  code?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type SbPurchaseOrderCustomField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPurchaseOrderCustomFieldInput = {
  code?: InputMaybe<Scalars['String']>
  label?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['String']>
}

export type SbPurchaseOrderPayment = {
  __typename?: 'SBPurchaseOrderPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPurchaseOrderPayment>
  customFields?: Maybe<Array<Maybe<SbPurchaseOrderCustomField>>>
  paymentTerm?: Maybe<SbPurchaseOrderPaymentTerm>
  purchaseOrderNumber?: Maybe<Scalars['String']>
}

export type SbPurchaseOrderPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPurchaseOrderPaymentInput = {
  customFields?: InputMaybe<Array<InputMaybe<SbPurchaseOrderCustomFieldInput>>>
  paymentTerm?: InputMaybe<SbPurchaseOrderPaymentTermInput>
  purchaseOrderNumber?: InputMaybe<Scalars['String']>
}

export type SbPurchaseOrderPaymentTerm = {
  __typename?: 'SBPurchaseOrderPaymentTerm'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbPurchaseOrderPaymentTerm>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type SbPurchaseOrderPaymentTerm_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbPurchaseOrderPaymentTermInput = {
  code?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export type SbRefund = {
  __typename?: 'SBRefund'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbRefund>
  amount: Scalars['Float']
  auditInfo?: Maybe<SbAuditInfo>
  id?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  payment?: Maybe<SbPayment>
  reason?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
  refundMethod?: Maybe<Scalars['String']>
}

export type SbRefund_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShipment = {
  __typename?: 'SBShipment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShipment>
  alternateContact?: Maybe<SbFulfillmentAlternateContact>
  auditInfo?: Maybe<SbAuditInfo>
  backorderCreatedDate?: Maybe<Scalars['Int']>
  canceledItems?: Maybe<Array<Maybe<SbCanceledItem>>>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  cost?: Maybe<Scalars['Float']>
  currencyCode?: Maybe<Scalars['String']>
  customer?: Maybe<SbCustomer>
  customerAccountId?: Maybe<Scalars['Int']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  destination?: Maybe<SbDestination>
  dutyAdjustment: Scalars['Float']
  dutyTotal: Scalars['Float']
  email?: Maybe<Scalars['String']>
  externalOrderId?: Maybe<Scalars['String']>
  externalShipmentId?: Maybe<Scalars['String']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  futureDate?: Maybe<Scalars['DateTime']>
  handlingAdjustment: Scalars['Float']
  handlingSubtotal: Scalars['Float']
  handlingTaxAdjustment: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  id?: Maybe<Scalars['String']>
  isExpress?: Maybe<Scalars['Boolean']>
  isTransfer?: Maybe<Scalars['Boolean']>
  items?: Maybe<Array<Maybe<SbShipmentItem>>>
  lineItemSubtotal: Scalars['Float']
  lineItemTaxAdjustment: Scalars['Float']
  lineItemTaxTotal: Scalars['Float']
  lineItemTotal: Scalars['Float']
  number?: Maybe<Scalars['Int']>
  orderId?: Maybe<Scalars['String']>
  orderNumber: Scalars['Int']
  orderSubmitDate?: Maybe<Scalars['DateTime']>
  origin?: Maybe<SbContact>
  originalShipmentNumber?: Maybe<Scalars['Int']>
  packages?: Maybe<Array<Maybe<SbPackageObj>>>
  parentCheckoutNumber?: Maybe<Scalars['Int']>
  parentShipmentNumber?: Maybe<Scalars['Int']>
  pickStatus?: Maybe<Scalars['String']>
  pickType?: Maybe<Scalars['String']>
  pickupInfo?: Maybe<Scalars['Object']>
  readyToCapture?: Maybe<Scalars['Boolean']>
  shipmentAdjustment: Scalars['Float']
  shipmentNotes?: Maybe<Array<Maybe<SbShipmentNote>>>
  shipmentStatus?: Maybe<Scalars['String']>
  shipmentStatusReason?: Maybe<SbShipmentStatusReason>
  shipmentType?: Maybe<Scalars['String']>
  shippingAdjustment: Scalars['Float']
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingSubtotal: Scalars['Float']
  shippingTaxAdjustment: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  shopperNotes?: Maybe<SbFulfillmentShopperNotes>
  taxData?: Maybe<Scalars['Object']>
  total: Scalars['Float']
  transferShipmentNumbers?: Maybe<Array<Scalars['Int']>>
  workflowProcessContainerId?: Maybe<Scalars['String']>
  workflowProcessId?: Maybe<Scalars['String']>
  workflowState?: Maybe<SbWorkflowState>
}

export type SbShipment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShipmentItem = {
  __typename?: 'SBShipmentItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShipmentItem>
  actualPrice: Scalars['Float']
  auditInfo?: Maybe<SbAuditInfo>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  cartItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  duty: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<SbFulfillmentField>>>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  giftCards?: Maybe<Array<Maybe<SbGiftCard>>>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<SbInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment?: Maybe<Scalars['Float']>
  lineItemCost: Scalars['Float']
  locatorName?: Maybe<Scalars['String']>
  measurements?: Maybe<SbPackageMeasurements>
  name?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<SbProductOption>>>
  originalOrderItemId?: Maybe<Scalars['String']>
  overridePrice?: Maybe<Scalars['Float']>
  parentId?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  partNumber?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku?: Maybe<Scalars['String']>
  taxData?: Maybe<Scalars['Object']>
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  unitPrice: Scalars['Float']
  upc?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type SbShipmentItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShipmentNote = {
  __typename?: 'SBShipmentNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShipmentNote>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<SbAuditInfo>
  noteId?: Maybe<Scalars['String']>
  noteText?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type SbShipmentNote_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShipmentStatusReason = {
  __typename?: 'SBShipmentStatusReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShipmentStatusReason>
  moreInfo?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
}

export type SbShipmentStatusReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShippingDiscount = {
  __typename?: 'SBShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShippingDiscount>
  discount?: Maybe<SbAppliedDiscount>
  methodCode?: Maybe<Scalars['String']>
}

export type SbShippingDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShippingDiscountInput = {
  discount?: InputMaybe<SbAppliedDiscountInput>
  methodCode?: InputMaybe<Scalars['String']>
}

export type SbShippingRate = {
  __typename?: 'SBShippingRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShippingRate>
  currencyCode?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  isValid?: Maybe<Scalars['Boolean']>
  messages?: Maybe<Array<Scalars['String']>>
  price?: Maybe<Scalars['Float']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingZoneCode?: Maybe<Scalars['String']>
}

export type SbShippingRate_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbShopperNotes = {
  __typename?: 'SBShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbShopperNotes>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
  giftMessage?: Maybe<Scalars['String']>
}

export type SbShopperNotes_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbSubPayment = {
  __typename?: 'SBSubPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbSubPayment>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRequested: Scalars['Float']
  status?: Maybe<Scalars['String']>
  target?: Maybe<SbPaymentActionTarget>
}

export type SbSubPayment_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbSubPaymentInput = {
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRefunded: Scalars['Float']
  amountRequested: Scalars['Float']
  status?: InputMaybe<Scalars['String']>
  target?: InputMaybe<SbPaymentActionTargetInput>
}

export type SbSubscriptionInfo = {
  __typename?: 'SBSubscriptionInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbSubscriptionInfo>
  frequency?: Maybe<SbFrequency>
  required?: Maybe<Scalars['Boolean']>
  trial?: Maybe<SbTrial>
}

export type SbSubscriptionInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbSubscriptionItem = {
  __typename?: 'SBSubscriptionItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbSubscriptionItem>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<SbAuditInfo>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  handlingAmount?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['String']>
  inventoryTags?: Maybe<Array<Maybe<SbInventoryTags>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isOnetimeItem?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  lineId?: Maybe<Scalars['Int']>
  lineItemAdjustment?: Maybe<Scalars['Float']>
  localeCode?: Maybe<Scalars['String']>
  parentItemCode?: Maybe<Scalars['String']>
  parentItemId?: Maybe<Scalars['String']>
  product?: Maybe<SbProduct>
  productDiscount?: Maybe<SbAppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<SbAppliedLineItemProductDiscount>>>
  purchaseLocation?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  shippingDiscounts?: Maybe<Array<Maybe<SbAppliedLineItemShippingDiscount>>>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  subtotal?: Maybe<Scalars['Float']>
  taxData?: Maybe<Scalars['Object']>
  taxableTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<SbCommerceUnitPrice>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
}

export type SbSubscriptionItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbSubscriptionItemInput = {
  adjustedLineItemSubtotal?: InputMaybe<Scalars['Float']>
  auditInfo?: InputMaybe<SbAuditInfoInput>
  autoAddDiscountId?: InputMaybe<Scalars['Int']>
  childItemIds?: InputMaybe<Array<Scalars['String']>>
  data?: InputMaybe<Scalars['Object']>
  discountTotal?: InputMaybe<Scalars['Float']>
  discountedTotal?: InputMaybe<Scalars['Float']>
  extendedTotal?: InputMaybe<Scalars['Float']>
  feeTotal?: InputMaybe<Scalars['Float']>
  fulfillmentLocationCode?: InputMaybe<Scalars['String']>
  fulfillmentMethod?: InputMaybe<Scalars['String']>
  handlingAmount?: InputMaybe<Scalars['Float']>
  id?: InputMaybe<Scalars['String']>
  inventoryTags?: InputMaybe<Array<InputMaybe<SbInventoryTagsInput>>>
  isAssemblyRequired?: InputMaybe<Scalars['Boolean']>
  isOnetimeItem?: InputMaybe<Scalars['Boolean']>
  isRecurring?: InputMaybe<Scalars['Boolean']>
  isTaxable?: InputMaybe<Scalars['Boolean']>
  itemTaxTotal?: InputMaybe<Scalars['Float']>
  lineId?: InputMaybe<Scalars['Int']>
  lineItemAdjustment?: InputMaybe<Scalars['Float']>
  localeCode?: InputMaybe<Scalars['String']>
  parentItemCode?: InputMaybe<Scalars['String']>
  parentItemId?: InputMaybe<Scalars['String']>
  product?: InputMaybe<SbProductInput>
  productDiscount?: InputMaybe<SbAppliedLineItemProductDiscountInput>
  productDiscounts?: InputMaybe<Array<InputMaybe<SbAppliedLineItemProductDiscountInput>>>
  purchaseLocation?: InputMaybe<Scalars['String']>
  quantity: Scalars['Int']
  shippingAmountBeforeDiscountsAndAdjustments?: InputMaybe<Scalars['Float']>
  shippingDiscounts?: InputMaybe<Array<InputMaybe<SbAppliedLineItemShippingDiscountInput>>>
  shippingTaxTotal?: InputMaybe<Scalars['Float']>
  shippingTotal?: InputMaybe<Scalars['Float']>
  subtotal?: InputMaybe<Scalars['Float']>
  taxData?: InputMaybe<Scalars['Object']>
  taxableTotal?: InputMaybe<Scalars['Float']>
  total?: InputMaybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: InputMaybe<Scalars['Float']>
  unitPrice?: InputMaybe<SbCommerceUnitPriceInput>
  weightedOrderAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderDuty?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFee?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: InputMaybe<Scalars['Float']>
  weightedOrderShipping?: InputMaybe<Scalars['Float']>
  weightedOrderShippingDiscount?: InputMaybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: InputMaybe<Scalars['Float']>
  weightedOrderShippingTax?: InputMaybe<Scalars['Float']>
  weightedOrderTax?: InputMaybe<Scalars['Float']>
}

export type SbSuggestedDiscount = {
  __typename?: 'SBSuggestedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbSuggestedDiscount>
  autoAdd?: Maybe<Scalars['Boolean']>
  discountId: Scalars['Int']
  hasMultipleProducts?: Maybe<Scalars['Boolean']>
  hasOptions?: Maybe<Scalars['Boolean']>
  productCode?: Maybe<Scalars['String']>
}

export type SbSuggestedDiscount_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbTaskInput = {
  __typename?: 'SBTaskInput'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbTaskInput>
  helpMessage?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  maxLength?: Maybe<Scalars['Int']>
  maximum: Scalars['Float']
  minLength?: Maybe<Scalars['Int']>
  minimum: Scalars['Float']
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Scalars['Object']>>
  pattern?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  type?: Maybe<Scalars['String']>
}

export type SbTaskInput_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbThresholdMessage = {
  __typename?: 'SBThresholdMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbThresholdMessage>
  discountId: Scalars['Int']
  message?: Maybe<Scalars['String']>
  requiresCouponCode?: Maybe<Scalars['Boolean']>
  showInCart?: Maybe<Scalars['Boolean']>
  showOnCheckout?: Maybe<Scalars['Boolean']>
  thresholdValue: Scalars['Float']
}

export type SbThresholdMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbTracking = {
  __typename?: 'SBTracking'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbTracking>
  attributes?: Maybe<Scalars['Object']>
  number?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type SbTracking_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbTrial = {
  __typename?: 'SBTrial'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbTrial>
  duration: Scalars['Int']
  enabled?: Maybe<Scalars['Boolean']>
  substituteProductCode?: Maybe<Scalars['String']>
  substituteProductOptions?: Maybe<Array<Maybe<SbProductOption>>>
  substituteProductQuantity: Scalars['Int']
  substituteVariationProductCode?: Maybe<Scalars['String']>
}

export type SbTrial_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SbTrialInput = {
  duration: Scalars['Int']
  enabled?: InputMaybe<Scalars['Boolean']>
  substituteProductCode?: InputMaybe<Scalars['String']>
  substituteProductOptions?: InputMaybe<Array<InputMaybe<SbProductOptionInput>>>
  substituteProductQuantity: Scalars['Int']
  substituteVariationProductCode?: InputMaybe<Scalars['String']>
}

export type SbWorkflowState = {
  __typename?: 'SBWorkflowState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SbWorkflowState>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<SbAuditInfo>
  completedDate?: Maybe<Scalars['DateTime']>
  processInstanceId?: Maybe<Scalars['String']>
  shipmentState?: Maybe<Scalars['String']>
  taskList?: Maybe<Array<Maybe<SbFulfillmentTask>>>
}

export type SbWorkflowState_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SearchSuggestion = {
  __typename?: 'SearchSuggestion'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SearchSuggestion>
  suggestion?: Maybe<Scalars['Object']>
  suggestionType?: Maybe<Scalars['String']>
}

export type SearchSuggestion_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SearchSuggestionGroup = {
  __typename?: 'SearchSuggestionGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SearchSuggestionGroup>
  name?: Maybe<Scalars['String']>
  suggestions?: Maybe<Array<Maybe<SearchSuggestion>>>
}

export type SearchSuggestionGroup_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SearchSuggestionResult = {
  __typename?: 'SearchSuggestionResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SearchSuggestionResult>
  query?: Maybe<Scalars['String']>
  suggestionGroups?: Maybe<Array<Maybe<SearchSuggestionGroup>>>
}

export type SearchSuggestionResult_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ServiceType = {
  __typename?: 'ServiceType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ServiceType>
  code?: Maybe<Scalars['String']>
  content?: Maybe<ServiceTypeLocalizedContent>
  deliveryDuration?: Maybe<Scalars['String']>
}

export type ServiceType_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ServiceTypeLocalizedContent = {
  __typename?: 'ServiceTypeLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ServiceTypeLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ServiceTypeLocalizedContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ShipmentAdjustmentInput = {
  appeasementReason?: InputMaybe<CrAppeasementReasonInput>
  handlingAdjustment?: InputMaybe<Scalars['Float']>
  handlingTaxAdjustment?: InputMaybe<Scalars['Float']>
  itemAdjustment?: InputMaybe<Scalars['Float']>
  itemTaxAdjustment?: InputMaybe<Scalars['Float']>
  shippingAdjustment?: InputMaybe<Scalars['Float']>
  shippingTaxAdjustment?: InputMaybe<Scalars['Float']>
}

export type ShipmentItemAdjustmentInput = {
  appeasementReason?: InputMaybe<CrAppeasementReasonInput>
  overridePrice?: InputMaybe<Scalars['Float']>
}

export enum ShipmentStatusEnum {
  Backorder = 'BACKORDER',
  Canceled = 'CANCELED',
  CustomerCare = 'CUSTOMER_CARE',
  Deleted = 'DELETED',
  Fulfilled = 'FULFILLED',
  Future = 'FUTURE',
  Ready = 'READY',
  Reassigned = 'REASSIGNED',
}

export type ShippingItemRate = {
  __typename?: 'ShippingItemRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingItemRate>
  amount?: Maybe<Scalars['Float']>
  itemId?: Maybe<Scalars['String']>
  quantity?: Maybe<Scalars['Int']>
}

export type ShippingItemRate_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ShippingMethodMappings = {
  __typename?: 'ShippingMethodMappings'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingMethodMappings>
  enableSmartPost?: Maybe<Scalars['Boolean']>
  express1DayDefault?: Maybe<Scalars['String']>
  express2DayDefault?: Maybe<Scalars['String']>
  express3DayDefault?: Maybe<Scalars['String']>
  internationalUsReturnLabelShippingMethod?: Maybe<Scalars['String']>
  returnLabelShippingMethod?: Maybe<Scalars['String']>
  shippingMethods?: Maybe<Array<Scalars['String']>>
  standardDefault?: Maybe<Scalars['String']>
  useDeclaredValue?: Maybe<Scalars['Boolean']>
}

export type ShippingMethodMappings_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ShippingOriginContact = {
  __typename?: 'ShippingOriginContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingOriginContact>
  companyOrOrganization?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
}

export type ShippingOriginContact_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ShippingOriginContactInput = {
  companyOrOrganization?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastNameOrSurname?: InputMaybe<Scalars['String']>
  middleNameOrInitial?: InputMaybe<Scalars['String']>
  phoneNumber?: InputMaybe<Scalars['String']>
}

export type ShippingRateLocalizedContent = {
  __typename?: 'ShippingRateLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingRateLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ShippingRateLocalizedContent_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ShippingRateValidationMessage = {
  __typename?: 'ShippingRateValidationMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingRateValidationMessage>
  helpLink?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  severity?: Maybe<Scalars['String']>
}

export type ShippingRateValidationMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SolrDebugInfo = {
  __typename?: 'SolrDebugInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SolrDebugInfo>
  blockedProductCodes?: Maybe<Array<Scalars['String']>>
  boostFunctions?: Maybe<Array<Scalars['String']>>
  boostQueries?: Maybe<Array<Scalars['String']>>
  boostedProductCodes?: Maybe<Array<Scalars['String']>>
  searchTuningRuleCode?: Maybe<Scalars['String']>
}

export type SolrDebugInfo_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Spellcheck = {
  __typename?: 'Spellcheck'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Spellcheck>
  autoCorrected?: Maybe<Scalars['Boolean']>
  candidateCorrections?: Maybe<Array<Maybe<CandidateCorrection>>>
  correctedQuery?: Maybe<Scalars['String']>
  originalQuery?: Maybe<Scalars['String']>
}

export type Spellcheck_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SplitShipmentsObjectInput = {
  newShipments?: InputMaybe<Array<InputMaybe<CrShipmentInput>>>
  originalShipment?: InputMaybe<CrShipmentInput>
}

export type SrAddressInput = {
  address1?: InputMaybe<Scalars['String']>
  address2?: InputMaybe<Scalars['String']>
  address3?: InputMaybe<Scalars['String']>
  address4?: InputMaybe<Scalars['String']>
  addressType?: InputMaybe<Scalars['String']>
  cityOrTown?: InputMaybe<Scalars['String']>
  countryCode?: InputMaybe<Scalars['String']>
  isValidated?: InputMaybe<Scalars['Boolean']>
  postalOrZipCode?: InputMaybe<Scalars['String']>
  stateOrProvince?: InputMaybe<Scalars['String']>
}

export type SrCategoryInput = {
  id: Scalars['Int']
  parent?: InputMaybe<SrCategoryInput>
}

export type SrMeasurementInput = {
  unit?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Float']>
}

export type SrProductOptionInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Object']>
}

export type SrProductPropertyInput = {
  attributeFQN?: InputMaybe<Scalars['String']>
  dataType?: InputMaybe<Scalars['String']>
  values?: InputMaybe<Array<Scalars['Object']>>
}

export type SrShippingRate = {
  __typename?: 'SrShippingRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SrShippingRate>
  amount?: Maybe<Scalars['Float']>
  code?: Maybe<Scalars['String']>
  content?: Maybe<ShippingRateLocalizedContent>
  customAttributes?: Maybe<Array<Maybe<CustomAttribute>>>
  data?: Maybe<Scalars['Object']>
  daysInTransit?: Maybe<Scalars['Int']>
  messages?: Maybe<Array<Maybe<ShippingRateValidationMessage>>>
  shippingItemRates?: Maybe<Array<Maybe<ShippingItemRate>>>
}

export type SrShippingRate_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Subscription>
  adjustment?: Maybe<SbAdjustment>
  auditInfo?: Maybe<SbAuditInfo>
  changeMessages?: Maybe<Array<Maybe<SbChangeMessage>>>
  channelCode?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerInteractionType?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  discountedSubtotal: Scalars['Float']
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  email?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  feeTotal: Scalars['Float']
  frequency?: Maybe<SbFrequency>
  fulfillmentInfo?: Maybe<SbFulfillmentInfo>
  handlingAdjustment?: Maybe<SbAdjustment>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingDiscounts?: Maybe<Array<Maybe<SbAppliedDiscount>>>
  handlingSubTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  hasDraft?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  invalidCoupons?: Maybe<Array<Maybe<SbInvalidCoupon>>>
  ipAddress?: Maybe<Scalars['String']>
  isDraft?: Maybe<Scalars['Boolean']>
  isImport?: Maybe<Scalars['Boolean']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  itemLevelAdjustmentsTotal: Scalars['Float']
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  items?: Maybe<Array<Maybe<SbSubscriptionItem>>>
  lastContinuityOrderDateOnSubPaused?: Maybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  locationCode?: Maybe<Scalars['String']>
  nextOrderDate?: Maybe<Scalars['DateTime']>
  nextOrderDateOffsetCounter?: Maybe<Scalars['Int']>
  notes?: Maybe<Array<Maybe<SbOrderNote>>>
  number: Scalars['Int']
  oneTimeCouponCodes?: Maybe<Array<Scalars['String']>>
  onetimeProducts?: Maybe<Array<Maybe<OnetimeProduct>>>
  onetimeShippingMethod?: Maybe<OnetimeShippingMethod>
  orderDiscounts?: Maybe<Array<Maybe<SbAppliedDiscount>>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  ordinal: Scalars['Int']
  parentOrderId?: Maybe<Scalars['String']>
  payment?: Maybe<SbPayment>
  priceListCode?: Maybe<Scalars['String']>
  reasons?: Maybe<Array<Maybe<SubscriptionReason>>>
  shippingAdjustment?: Maybe<SbAdjustment>
  shippingAmount: Scalars['Float']
  shippingDiscounts?: Maybe<Array<Maybe<SbShippingDiscount>>>
  shippingSubTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  siteId: Scalars['Int']
  sourceDevice?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  subTotal: Scalars['Float']
  subscriptionSkipCounter?: Maybe<Scalars['Int']>
  taxData?: Maybe<Scalars['Object']>
  tenantId: Scalars['Int']
  total: Scalars['Float']
  trial?: Maybe<SbTrial>
  userId?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
}

export type Subscription_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SubscriptionActionInput = {
  actionName?: InputMaybe<Scalars['String']>
  reason?: InputMaybe<SubscriptionReasonInput>
}

export type SubscriptionAdjustmentInput = {
  handlingAdjustment?: InputMaybe<Scalars['Float']>
  itemAdjustment?: InputMaybe<Scalars['Float']>
  reason?: InputMaybe<SubscriptionReasonInput>
  shippingAdjustment?: InputMaybe<Scalars['Float']>
}

export type SubscriptionCollection = {
  __typename?: 'SubscriptionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SubscriptionCollection>
  items?: Maybe<Array<Maybe<Subscription>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type SubscriptionCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SubscriptionInput = {
  adjustment?: InputMaybe<SbAdjustmentInput>
  auditInfo?: InputMaybe<SbAuditInfoInput>
  changeMessages?: InputMaybe<Array<InputMaybe<SbChangeMessageInput>>>
  channelCode?: InputMaybe<Scalars['String']>
  couponCodes?: InputMaybe<Array<Scalars['String']>>
  currencyCode?: InputMaybe<Scalars['String']>
  customerAccountId?: InputMaybe<Scalars['Int']>
  customerInteractionType?: InputMaybe<Scalars['String']>
  customerTaxId?: InputMaybe<Scalars['String']>
  data?: InputMaybe<Scalars['Object']>
  discountedSubtotal: Scalars['Float']
  dutyAmount?: InputMaybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  email?: InputMaybe<Scalars['String']>
  externalId?: InputMaybe<Scalars['String']>
  feeTotal: Scalars['Float']
  frequency?: InputMaybe<SbFrequencyInput>
  fulfillmentInfo?: InputMaybe<SbFulfillmentInfoInput>
  handlingAdjustment?: InputMaybe<SbAdjustmentInput>
  handlingAmount?: InputMaybe<Scalars['Float']>
  handlingDiscounts?: InputMaybe<Array<InputMaybe<SbAppliedDiscountInput>>>
  handlingSubTotal: Scalars['Float']
  handlingTax?: InputMaybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  hasDraft?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['String']>
  invalidCoupons?: InputMaybe<Array<InputMaybe<SbInvalidCouponInput>>>
  ipAddress?: InputMaybe<Scalars['String']>
  isDraft?: InputMaybe<Scalars['Boolean']>
  isImport?: InputMaybe<Scalars['Boolean']>
  isTaxExempt?: InputMaybe<Scalars['Boolean']>
  itemLevelAdjustmentsTotal: Scalars['Float']
  itemLevelHandlingDiscountTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  items?: InputMaybe<Array<InputMaybe<SbSubscriptionItemInput>>>
  lastContinuityOrderDateOnSubPaused?: InputMaybe<Scalars['DateTime']>
  lineItemSubtotalWithOrderAdjustments?: InputMaybe<Scalars['Float']>
  locationCode?: InputMaybe<Scalars['String']>
  nextOrderDate?: InputMaybe<Scalars['DateTime']>
  nextOrderDateOffsetCounter?: InputMaybe<Scalars['Int']>
  notes?: InputMaybe<Array<InputMaybe<SbOrderNoteInput>>>
  number: Scalars['Int']
  oneTimeCouponCodes?: InputMaybe<Array<Scalars['String']>>
  onetimeProducts?: InputMaybe<Array<InputMaybe<OnetimeProductInput>>>
  onetimeShippingMethod?: InputMaybe<OnetimeShippingMethodInput>
  orderDiscounts?: InputMaybe<Array<InputMaybe<SbAppliedDiscountInput>>>
  orderLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  ordinal: Scalars['Int']
  parentOrderId?: InputMaybe<Scalars['String']>
  payment?: InputMaybe<SbPaymentInput>
  priceListCode?: InputMaybe<Scalars['String']>
  reasons?: InputMaybe<Array<InputMaybe<SubscriptionReasonInput>>>
  shippingAdjustment?: InputMaybe<SbAdjustmentInput>
  shippingAmount: Scalars['Float']
  shippingDiscounts?: InputMaybe<Array<InputMaybe<SbShippingDiscountInput>>>
  shippingSubTotal: Scalars['Float']
  shippingTax?: InputMaybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  siteId: Scalars['Int']
  sourceDevice?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Scalars['String']>
  subTotal: Scalars['Float']
  subscriptionSkipCounter?: InputMaybe<Scalars['Int']>
  taxData?: InputMaybe<Scalars['Object']>
  tenantId: Scalars['Int']
  total: Scalars['Float']
  trial?: InputMaybe<SbTrialInput>
  userId?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
  webSessionId?: InputMaybe<Scalars['String']>
}

export type SubscriptionNextOrderDateInput = {
  nextOrderDate: Scalars['DateTime']
}

export type SubscriptionReason = {
  __typename?: 'SubscriptionReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SubscriptionReason>
  actionName?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
}

export type SubscriptionReason_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SubscriptionReasonCollection = {
  __typename?: 'SubscriptionReasonCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SubscriptionReasonCollection>
  items?: Maybe<Array<Maybe<SubscriptionReasonOption>>>
  totalCount: Scalars['Int']
}

export type SubscriptionReasonCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type SubscriptionReasonInput = {
  actionName?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  moreInfo?: InputMaybe<Scalars['String']>
  reasonCode?: InputMaybe<Scalars['String']>
}

export type SubscriptionReasonOption = {
  __typename?: 'SubscriptionReasonOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SubscriptionReasonOption>
  name?: Maybe<Scalars['String']>
  needsMoreInfo?: Maybe<Scalars['Boolean']>
  reasonCode?: Maybe<Scalars['String']>
}

export type SubscriptionReasonOption_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TargetRule = {
  __typename?: 'TargetRule'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TargetRule>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  domain?: Maybe<Scalars['String']>
  expression?: Maybe<Scalars['String']>
}

export type TargetRule_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TargetRuleCollection = {
  __typename?: 'TargetRuleCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TargetRuleCollection>
  items?: Maybe<Array<Maybe<TargetRule>>>
  totalCount: Scalars['Int']
}

export type TargetRuleCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TargetRuleInput = {
  code?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  domain?: InputMaybe<Scalars['String']>
  expression?: InputMaybe<Scalars['String']>
}

export type Task = {
  __typename?: 'Task'
  _get?: Maybe<Scalars['AnyScalar']>
  _links: Scalars['Object']
  _root?: Maybe<Task>
  active?: Maybe<Scalars['Boolean']>
  completed?: Maybe<Scalars['Boolean']>
  completedDate: Scalars['DateTime']
  description: Scalars['String']
  inputs: Array<Maybe<TaskIn>>
  name: Scalars['String']
  skippable?: Maybe<Scalars['Boolean']>
  subject: Scalars['String']
  taskId: Scalars['String']
}

export type Task_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TaskIn = {
  __typename?: 'TaskIn'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TaskIn>
  helpMessage: Scalars['String']
  label: Scalars['String']
  maxLength: Scalars['Int']
  maximum: Scalars['Float']
  minLength: Scalars['Int']
  minimum: Scalars['Float']
  name: Scalars['String']
  options: Array<Scalars['Object']>
  pattern: Scalars['String']
  required?: Maybe<Scalars['Boolean']>
  type: Scalars['String']
}

export type TaskIn_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TaskInput = {
  __typename?: 'TaskInput'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TaskInput>
  helpMessage?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  maxLength?: Maybe<Scalars['Int']>
  maximum: Scalars['Float']
  minLength?: Maybe<Scalars['Int']>
  minimum: Scalars['Float']
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Scalars['Object']>>
  pattern?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  type?: Maybe<Scalars['String']>
}

export type TaskInput_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TaskInputInput = {
  helpMessage?: InputMaybe<Scalars['String']>
  label?: InputMaybe<Scalars['String']>
  maxLength?: InputMaybe<Scalars['Int']>
  maximum: Scalars['Float']
  minLength?: InputMaybe<Scalars['Int']>
  minimum: Scalars['Float']
  name?: InputMaybe<Scalars['String']>
  options?: InputMaybe<Array<Scalars['Object']>>
  pattern?: InputMaybe<Scalars['String']>
  required?: InputMaybe<Scalars['Boolean']>
  type?: InputMaybe<Scalars['String']>
}

export type Transaction = {
  __typename?: 'Transaction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Transaction>
  amount: Scalars['Float']
  currencyCode?: Maybe<Scalars['String']>
  date: Scalars['DateTime']
  interactionType?: Maybe<Scalars['String']>
  transactionId?: Maybe<Scalars['String']>
  transactionType?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
}

export type Transaction_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type TransactionInput = {
  amount: Scalars['Float']
  currencyCode?: InputMaybe<Scalars['String']>
  date: Scalars['DateTime']
  interactionType?: InputMaybe<Scalars['String']>
  transactionId?: InputMaybe<Scalars['String']>
  transactionType?: InputMaybe<Scalars['String']>
  visitId?: InputMaybe<Scalars['String']>
}

export type TransferredItem = {
  __typename?: 'TransferredItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TransferredItem>
  actualPrice: Scalars['Float']
  allocatedQuantity: Scalars['Int']
  allowsBackOrder?: Maybe<Scalars['Boolean']>
  allowsFutureAllocate?: Maybe<Scalars['Boolean']>
  appeasementReason?: Maybe<FuAppeasementReason>
  attributes: Scalars['Object']
  auditInfo?: Maybe<FuAuditInfo>
  backorderReleaseDate: Scalars['DateTime']
  blockAssignment?: Maybe<Scalars['Boolean']>
  cartItemId: Scalars['String']
  childItemIds: Array<Scalars['String']>
  creditCurrencyCode: Scalars['String']
  creditValue: Scalars['Float']
  data: Scalars['Object']
  duty: Scalars['Float']
  expectedDeliveryDate: Scalars['DateTime']
  fulfillmentFields: Array<Maybe<FulfillmentField>>
  fulfillmentLocationCode: Scalars['String']
  giftCards: Array<Maybe<FuGiftCard>>
  goodsType?: Maybe<GoodsTypeEnum>
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  imageUrl: Scalars['String']
  inventoryTags: Array<Maybe<FuInventoryTag>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  isReservedInventory?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  itemDiscount: Scalars['Float']
  itemTax: Scalars['Float']
  lineId: Scalars['Int']
  lineItemAdjustment: Scalars['Float']
  lineItemCost: Scalars['Float']
  locatorName: Scalars['String']
  manageStock?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  optionAttributeFQN: Scalars['String']
  options: Array<Maybe<FuProductOption>>
  originalOrderItemId: Scalars['String']
  originalQuantity: Scalars['Int']
  overridePrice: Scalars['Float']
  parentItemId: Scalars['String']
  partNumber: Scalars['String']
  productCode: Scalars['String']
  quantity: Scalars['Int']
  readyForPickupQuantity: Scalars['Int']
  rejectedReason?: Maybe<RejectedReason>
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  sku: Scalars['String']
  taxData: Scalars['Object']
  taxableHandling: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableShipping: Scalars['Float']
  transferQuantity: Scalars['Int']
  trueTransferQuantity: Scalars['Int']
  unitPrice: Scalars['Float']
  upc: Scalars['String']
  variationProductCode: Scalars['String']
  weight: Scalars['Float']
  weightUnit: Scalars['String']
  weightedDutyAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShipmentAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
}

export type TransferredItem_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type UserRole = {
  __typename?: 'UserRole'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<UserRole>
  assignedInScope?: Maybe<UserScope>
  auditInfo?: Maybe<CuAuditInfo>
  roleId: Scalars['Int']
  roleName?: Maybe<Scalars['String']>
  roleTags?: Maybe<Array<Scalars['String']>>
  userId?: Maybe<Scalars['String']>
}

export type UserRole_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type UserRoleCollection = {
  __typename?: 'UserRoleCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<UserRoleCollection>
  items?: Maybe<Array<Maybe<UserRole>>>
  totalCount: Scalars['Int']
}

export type UserRoleCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type UserRoleInput = {
  assignedInScope?: InputMaybe<UserScopeInput>
  auditInfo?: InputMaybe<CuAuditInfoInput>
  roleId: Scalars['Int']
  roleName?: InputMaybe<Scalars['String']>
  roleTags?: InputMaybe<Array<Scalars['String']>>
  userId?: InputMaybe<Scalars['String']>
}

export type UserScope = {
  __typename?: 'UserScope'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<UserScope>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type UserScope_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type UserScopeInput = {
  id?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
}

export type ValidationMessage = {
  __typename?: 'ValidationMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ValidationMessage>
  message?: Maybe<Scalars['String']>
  severity?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  sourceId?: Maybe<Scalars['String']>
  validationType?: Maybe<Scalars['String']>
}

export type ValidationMessage_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type VariationOption = {
  __typename?: 'VariationOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<VariationOption>
  attributeFQN?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
  valueSequence: Scalars['Int']
}

export type VariationOption_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type VariationSummary = {
  __typename?: 'VariationSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<VariationSummary>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  options?: Maybe<Array<Maybe<VariationOption>>>
  productCode?: Maybe<Scalars['String']>
}

export type VariationSummary_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type View = {
  __typename?: 'View'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<View>
  fields?: Maybe<Array<Maybe<ViewField>>>
  filter?: Maybe<Scalars['String']>
  includeInactiveMode?: Maybe<Scalars['String']>
  isAdminDefault?: Maybe<Scalars['Boolean']>
  isVisibleInStorefront?: Maybe<Scalars['Boolean']>
  metadata?: Maybe<Scalars['Object']>
  name?: Maybe<Scalars['String']>
  usages?: Maybe<Array<Scalars['String']>>
}

export type View_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ViewField = {
  __typename?: 'ViewField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ViewField>
  name?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type ViewField_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type ViewFieldInput = {
  name?: InputMaybe<Scalars['String']>
  target?: InputMaybe<Scalars['String']>
}

export type ViewInput = {
  fields?: InputMaybe<Array<InputMaybe<ViewFieldInput>>>
  filter?: InputMaybe<Scalars['String']>
  includeInactiveMode?: InputMaybe<Scalars['String']>
  isAdminDefault?: InputMaybe<Scalars['Boolean']>
  isVisibleInStorefront?: InputMaybe<Scalars['Boolean']>
  metadata?: InputMaybe<Scalars['Object']>
  name?: InputMaybe<Scalars['String']>
  usages?: InputMaybe<Array<Scalars['String']>>
}

export type WishlistCollection = {
  __typename?: 'WishlistCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<WishlistCollection>
  items?: Maybe<Array<Maybe<CrWishlist>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type WishlistCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}

export type WishlistItemCollection = {
  __typename?: 'WishlistItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<WishlistItemCollection>
  items?: Maybe<Array<Maybe<CrWishlistItem>>>
  pageCount: Scalars['Int']
  pageSize: Scalars['Int']
  startIndex: Scalars['Int']
  totalCount: Scalars['Int']
}

export type WishlistItemCollection_GetArgs = {
  allowUndefined?: InputMaybe<Scalars['Boolean']>
  defaultValue?: InputMaybe<Scalars['AnyScalar']>
  path: Scalars['String']
}
