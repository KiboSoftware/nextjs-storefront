import { useEffect, useState } from 'react'

import getConfig from 'next/config'

import { useAuthContext } from '@/context' // Replace with your actual context path

declare global {
  interface Window {
    chatwootSDK: any
    $chatwoot: any
  }
}

const ChatwootWidget = () => {
  const { isAuthenticated, user } = useAuthContext()
  const [isChatwootLoaded, setIsChatwootLoaded] = useState(false)
  const { publicRuntimeConfig } = getConfig()
  const createKiboChatSession = async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/create-chat-session')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating kibo chat session:', error)
      return null
    }
  }

  useEffect(() => {
    const script = document.querySelector('script[src="https://app.chatwoot.com/packs/js/sdk.js"]')
    if (!publicRuntimeConfig.chatwootSiteToken) {
      return
    }
    const chatStartConversationHandler = async () => {
      const sessionId = await createKiboChatSession()
      if (sessionId && window.$chatwoot) {
        await window.$chatwoot.setCustomAttributes({
          'kibo-session-id': sessionId,
        })
      }
    }

    if (!isAuthenticated) {
      if (window.chatwootSDK) {
        window.$chatwoot.toggleBubbleVisibility('hide')
        setIsChatwootLoaded(false)
      }
      return
    }

    if (user && isAuthenticated && !script) {
      const scriptElement = document.createElement('script')
      scriptElement.src = `${publicRuntimeConfig.chatwootBaseUrl}/packs/js/sdk.js`
      scriptElement.defer = true
      scriptElement.async = true

      scriptElement.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: publicRuntimeConfig.chatwootSiteToken,
            baseUrl: `${publicRuntimeConfig.chatwootBaseUrl}`,
          })

          window.addEventListener('chatwoot:ready', () => {
            setIsChatwootLoaded(true)
            if (window.$chatwoot && user) {
              try {
                window.$chatwoot.setUser(user.userId, { email: user.emailAddress })
              } catch (error) {
                console.error('Error setting Chatwoot user:', error)
              }
            } else {
              console.error('Chatwoot SDK not loaded or $chatwoot or user is undefined')
            }
          })

          window.addEventListener('chatwoot:on-start-conversation', chatStartConversationHandler)
        }
      }

      document.head.appendChild(scriptElement)

      return () => {
        if (scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement)
        }
        window.removeEventListener('chatwoot:on-start-conversation', () => null)
        window.removeEventListener('chatwoot:ready', () => null)
      }
    }
  }, [isAuthenticated, user, isChatwootLoaded])

  return null
}

export default ChatwootWidget
