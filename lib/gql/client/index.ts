import { GraphQLClient } from 'graphql-request'

export function makeGraphQLClient(endpoint?: string) {
  endpoint =
    endpoint || `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/graphql`
  return new GraphQLClient(endpoint)
}

export function makeCategoryTreeGraphQLClient(endpoint?: string) {
  endpoint =
    endpoint ||
    `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/category-tree`
  return new GraphQLClient(endpoint)
}
