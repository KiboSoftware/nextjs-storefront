import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context'

declare global {
  interface Window {
    chatwootSDK: any
    $chatwoot: any
  }
}

interface ChatSessionResponse {
  kiboChatSessionId: string
}

const ChatwootWidget = () => {
  const { isAuthenticated, user } = useAuthContext()
  const [isChatwootLoaded, setIsChatwootLoaded] = useState(false)

  const createKiboChatSession = async (): Promise<ChatSessionResponse | null> => {
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

    const chatStartConversationHandler = async () => {
      const session = await createKiboChatSession()
      if (session && window.$chatwoot) {
        window.$chatwoot.setConversationCustomAttributes({
          'kibo-session-id': session.kiboChatSessionId,
        })
      }
    }

    if (!isAuthenticated) {
      if (script && window.chatwootSDK) {
        document.head.removeChild(script)
        setIsChatwootLoaded(false)
      }
      return
    }

    if (user && isAuthenticated && !script) {
      const scriptElement = document.createElement('script')
      scriptElement.src = 'https://app.chatwoot.com/packs/js/sdk.js'
      scriptElement.defer = true
      scriptElement.async = true

      scriptElement.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: 'DKV4TtQx1SCZphbVMhLG8jXg',
            baseUrl: 'https://app.chatwoot.com',
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
        window.removeEventListener('chatwoot:on-start-conversation', chatStartConversationHandler)
        window.removeEventListener('chatwoot:ready', () => null)
      }
    }
  }, [isAuthenticated, user, isChatwootLoaded])

  return null
}

export default ChatwootWidget
