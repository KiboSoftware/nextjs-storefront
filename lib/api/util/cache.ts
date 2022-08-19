import NodeCache from 'node-cache'
const nodeCache = new NodeCache()

const cache = {
  get: (key: string) => {
    if (nodeCache.has(key)) return nodeCache.get(key)
    return null
  },

  set: (key: string, value: string, timeOut = 10000) => {
    nodeCache.set(key, value, timeOut)
  },
}

export default cache
