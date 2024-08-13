import { fromBitVectorSetArray } from '@/lib/helpers'

export const getBehaviors = (jwtAccessToken: string) => {
  const decoded = JSON.parse(Buffer.from(jwtAccessToken?.split('.')[1], 'base64').toString('ascii'))
  const bv = decoded['https://www.kibocommerce.com/user_claims'].bv
  const behaviors = fromBitVectorSetArray(bv)
  return behaviors
}
