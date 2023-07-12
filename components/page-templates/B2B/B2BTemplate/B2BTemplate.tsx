// Figma: https://www.figma.com/file/bKJuIwUx6VXmubHZo4rCBq/B2B?type=design&node-id=13-139&mode=design&t=jgLpcUITQZiMxaTj-0

import { useCardContactActions } from '@/hooks'

import { CustomerAccount } from '@/lib/gql/types'

interface B2BTemplateProps {
  user?: CustomerAccount
  children?: React.ReactNode
}

const B2BTemplate = (props: B2BTemplateProps) => {
  const { user } = props
  const { cards, contacts, handleSave } = useCardContactActions(user?.id as number)

  return (
    <>
      {/*

        Add your code here

      */}
    </>
  )
}

export default B2BTemplate
