import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { KiboDialogProps } from '../../../common/KiboDialog/KiboDialog'
import * as stories from './RegisterAccountModal.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

const kiboTitleMock = () => <div data-testid="title-component" />
const kiboContentMock = () => <div data-testid="content-component" />
const kiboActionsMock = () => <div data-testid="actions-component" />
const KiboDialogMock = (props: KiboDialogProps) => {
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
}

jest.mock('../Title/Title', () => kiboTitleMock)
jest.mock('../Content/Content', () => kiboContentMock)
jest.mock('../Actions/Actions', () => kiboActionsMock)
jest.mock('../../../common/KiboDialog/KiboDialog', () => KiboDialogMock)

describe('[components] Register Account Modal', () => {
  const setup = (params = {}) => render(<Common {...params} onClose={onCloseMock} />)

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
