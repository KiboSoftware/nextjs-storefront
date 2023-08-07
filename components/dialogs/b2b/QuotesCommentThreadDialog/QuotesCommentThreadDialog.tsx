import React from 'react'

import { useTranslation } from 'next-i18next'

import { QuotesCommentThread } from '@/components/b2b'
import { KiboDialog } from '@/components/common'

import { QuoteComment } from '@/lib/gql/types'

interface QuoteCommentThreadDialogProps {
  userId: string
  comments: QuoteComment[]
  closeModal: () => void
}

const QuoteCommentThreadDialog = (props: QuoteCommentThreadDialogProps) => {
  const { userId, comments, closeModal } = props
  const { t } = useTranslation('common')

  const handleComment = () => {
    closeModal()
  }

  const DialogArgs = {
    Title: t('comment-thread'),
    Content: (
      <QuotesCommentThread comments={comments} userId={userId} onAddComment={handleComment} />
    ),
    showContentTopDivider: true,
    showContentBottomDivider: false,
    isDialogCentered: true,
    customMaxWidth: '32.375rem',
    onClose: () => closeModal(),
  }

  return <KiboDialog {...DialogArgs} />
}
export default QuoteCommentThreadDialog
