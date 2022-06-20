import { composeStories } from '@storybook/testing-react'
import { render, screen, within, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { productOptionSelectValuesMock } from '../../../__mocks__/stories/productOptionSelectMock'
import * as stories from './ProductOptionSelect.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] ProductOptionSelect component', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)
    const ProductOptionSelect = screen.getByRole('button')

    expect(ProductOptionSelect).toBeVisible()
  })

  it('should call onChange method if value is changed', () => {
    const onDropdownChangeMock = jest.fn()
    const mockOption = productOptionSelectValuesMock[0]
    render(<Common {...Common.args} onDropdownChange={onDropdownChangeMock} />)
    const ProductOptionSelect = screen.getByRole('button')

    fireEvent.mouseDown(ProductOptionSelect)

    const listbox = within(screen.getByRole('listbox'))

    fireEvent.click(listbox.getByText(mockOption.stringValue))

    expect(ProductOptionSelect).toHaveTextContent(mockOption.stringValue)
    expect(onDropdownChangeMock).toBeCalledWith('test-attributeFQN', mockOption.value)
  })
})
