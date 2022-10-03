import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddToCartDialog.stories' // import all stories from the stories file
import { KiboDialogProps } from '@/components/common/KiboDialog/KiboDialog'
const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

const kiboTitleMock = () => <div data-testid="title-component" />
const kiboContentMock = () => <div data-testid="content-component" />
const kiboActionsMock = () => <div data-testid="actions-component" />

jest.mock('../Title/Title', () => () => kiboTitleMock())
jest.mock('../Content/Content', () => () => kiboContentMock())
jest.mock('../Actions/Actions', () => () => kiboActionsMock())
jest.mock('@/components/common/KiboDialog/KiboDialog', () => ({
  __esModule: true,
  default: (props: KiboDialogProps) => {
    const { Title, Content, Actions } = props
    return (
      <div data-testid="kibo-dialog">
        {Title}
        <br />
        {Content}
        <br />
        {Actions}
        <br />
      </div>
    )
  },
}))

describe('[components] Add To Cart Dialog', () => {
  const setup = (params = {}) => render(<Common {...params} closeModal={onCloseMock} />)

  it('should render component', () => {
    setup({
      isOpen: true,
    })

    const kiboDialog = screen.getByTestId('kibo-dialog')
    const titleComponent = screen.getByTestId('title-component')
    const contentComponent = screen.getByTestId('content-component')
    const actionsComponent = screen.getByTestId('actions-component')

    expect(kiboDialog).toBeInTheDocument()
    expect(titleComponent).toBeInTheDocument()
    expect(contentComponent).toBeInTheDocument()
    expect(actionsComponent).toBeInTheDocument()
  })
})
