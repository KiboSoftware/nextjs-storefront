import NodeCache from 'node-cache'
const nodeCache = new NodeCache()

const cache = {
  get: (cacheKey: string) => {
    if (nodeCache.has(cacheKey)) return nodeCache.get(cacheKey)
    return null
  },

  set: (cacheKey: string, value: string, cacheTimeOut: number) => {
    nodeCache.set(cacheKey, value, cacheTimeOut)
  },
}

export default cache
