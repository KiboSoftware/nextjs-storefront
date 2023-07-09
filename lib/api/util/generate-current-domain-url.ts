import getConfig from 'next/config'

// path should include the trailing slash after the domain
const generateCurrentDomainUrl = (path: string) => {
  const { serverRuntimeConfig } = getConfig()

  console.log('servert', serverRuntimeConfig.currentUrl)

  return `http://${serverRuntimeConfig.currentUrl}${path}`
}

export default generateCurrentDomainUrl
