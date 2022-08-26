import { GraphQLClient } from 'graphql-request'

export function makeGraphQLClient(endpoint?: string) {
  endpoint =
    endpoint || `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/graphql`
  return new GraphQLClient(endpoint)
}

export function makeCategoryTreeGraphEndPoint() {
  return `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/category-tree`
}
