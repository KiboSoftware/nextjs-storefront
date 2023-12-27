import { GraphQLClient } from 'graphql-request'

export function makeGraphQLClient(endpoint?: string) {
  endpoint =
    endpoint || `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/graphql`
  return new GraphQLClient(endpoint)
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

export const LOGGER_ENDPOINT = `${
  process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
}/api/logger`
