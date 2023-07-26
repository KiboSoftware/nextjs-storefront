import { PrCategory, Product } from '../gql/types'

type BuildPathOptions = {
  absolute: boolean
  originUrl: string
}
function joinPathParts(parts: string[]) {
  return parts.join('/').replace(/\/+/g, '/')
}
function getPathStart(options?: BuildPathOptions) {
  const { absolute } = options || {}
  let { originUrl } = options || {}
  if (absolute) {
    originUrl = originUrl || process.env.NEXT_PUBLIC_URL
  }
  return originUrl || ''
}
const pdpRoutePath = 'product'
export function buildProductPath(product: Product, options?: BuildPathOptions) {
  const { content, productCode } = product
  const pathInput: string[] = []
  pathInput.push(getPathStart(options))
  pathInput.push(pdpRoutePath)
  /* add product content slugs here  */
  pathInput.push(productCode as string)
  return joinPathParts(pathInput)
}
export function buildProductPathByCode(productCode: string, options?: BuildPathOptions) {
  const pathInput: string[] = []
  pathInput.push(getPathStart(options))
  pathInput.push(pdpRoutePath)
  /* add category content slugs here  */
  pathInput.push(productCode as string)
  return joinPathParts(pathInput)
}

const categoryRoutePath = 'category'
export function buildCategoryPath(category: PrCategory, options?: BuildPathOptions) {
  const { categoryCode, content } = category
  const pathInput: string[] = []
  pathInput.push(getPathStart(options))
  pathInput.push(categoryRoutePath)
  /* add category content slugs here  */
  pathInput.push(categoryCode as string)
  return joinPathParts(pathInput)
}
export function buildCategoryPathByCode(categoryCode: string, options?: BuildPathOptions) {
  const pathInput: string[] = []
  pathInput.push(getPathStart(options))
  pathInput.push(categoryRoutePath)
  /* add category content slugs here  */
  pathInput.push(categoryCode as string)
  return joinPathParts(pathInput)
}

export const CATEGORY_TREE_ENDPOINT = `${
  process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
}/api/category-tree`

export const LOGIN_ENDPOINT = `${
  process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
}/api/user/login`

export const LOGOUT_ENDPOINT = `${
  process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
}/api/user/logout`

export const REGISTER_USER_ENDPOINT = `${
  process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
}/api/user/register`
