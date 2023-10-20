import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import QuoteDetailsTemplate from './QuoteDetailsTemplate'
import { quoteMock } from '@/__mocks__/stories'

import { Quote } from '@/lib/gql/types'

// Common
export default {
  title: 'Page Templates/B2B/QuoteDetailsTemplate',
  component: QuoteDetailsTemplate,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof QuoteDetailsTemplate>

const Template: ComponentStory<typeof QuoteDetailsTemplate> = (args) => (
  <QuoteDetailsTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  quote: { ...(quoteMock?.items?.[0] as Quote), hasDraft: true, name: 'quote name' },
  mode: 'edit',
}

export const QuoteDetailsTemplateDesktop = Template.bind({})
QuoteDetailsTemplateDesktop.args = {
  quote: quoteMock?.items?.[0] as Quote,
  mode: 'create',
}

export const QuoteDetailsTemplateMobile = Template.bind({})
QuoteDetailsTemplateMobile.args = {
  quote: quoteMock?.items?.[0] as Quote,
  mode: 'edit',
}
QuoteDetailsTemplateMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}

export const QuoteDetailsTemplateViewModeMobile = Template.bind({})
QuoteDetailsTemplateViewModeMobile.args = {
  quote: { ...(quoteMock?.items?.[0] as Quote), name: 'quote name' },
  mode: '',
}
QuoteDetailsTemplateViewModeMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}

export const QuoteDetailsTemplateViewModeDesktop = Template.bind({})
QuoteDetailsTemplateViewModeDesktop.args = {
  quote: quoteMock?.items?.[0] as Quote,
  mode: '',
}

export const QuoteDetailsTemplateReadyForCheckoutDesktop = Template.bind({})
QuoteDetailsTemplateReadyForCheckoutDesktop.args = {
  quote: { ...(quoteMock?.items?.[0] as Quote), status: 'ReadyForCheckout', hasDraft: false },
  mode: 'edit',
}

export const QuoteDetailsTemplateShipToHomeDesktop = Template.bind({})
QuoteDetailsTemplateShipToHomeDesktop.args = {
  quote: { ...(quoteMock?.items?.[2] as Quote) },
  mode: 'edit',
}

// export const
