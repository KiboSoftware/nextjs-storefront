import React from 'react'

import { useTranslation } from 'next-i18next'

import { QuotesCommentThread } from '@/components/b2b'
import { KiboDialog } from '@/components/common'

import { QuoteComment } from '@/lib/gql/types'

interface QuoteCommentThreadDialogProps {
  userId: string
  comments: QuoteComment[]
  mode?: string
  status?: string
  userIdAndEmails?: string
  onAddCommentToQuote: (comment: string) => void
  closeModal: () => void
}

const QuoteCommentThreadDialog = (props: QuoteCommentThreadDialogProps) => {
  const { userId, comments, mode, status, userIdAndEmails, onAddCommentToQuote, closeModal } = props
  const { t } = useTranslation('common')

  const handleComment = (comment: string) => {
    onAddCommentToQuote(comment)
    closeModal()
  }

  const DialogArgs = {
    Title: t('comment-thread'),
    Content: (
      <QuotesCommentThread
        comments={comments}
        userId={userId}
        mode={mode}
        status={status}
        userIdAndEmails={userIdAndEmails}
        onAddComment={handleComment}
      />
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
