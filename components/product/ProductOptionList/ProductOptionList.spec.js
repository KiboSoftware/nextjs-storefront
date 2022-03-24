import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { productOptionListValuesMock } from '../../../__mocks__/productOptionListMock'
import * as stories from './ProductOptionList.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] ProductOptionList component', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)
    const productOptionList = screen.getByRole('button')

    expect(productOptionList).toBeVisible()
  })

  it('should call onChange method if value is changed', () => {
    const onChangeMock = jest.fn()
    const mockOption = productOptionListValuesMock[0]
    render(<Common {...Common.args} onChange={onChangeMock} />)
    const productOptionList = screen.getByRole('button')

    fireEvent.mouseDown(productOptionList)

    const listbox = within(screen.getByRole('listbox'))

    fireEvent.click(listbox.getByText(mockOption.stringValue))

    expect(productOptionList).toHaveTextContent(mockOption.stringValue)
    expect(onChangeMock).toBeCalledWith('kibo-select', mockOption.value)
  })
})
