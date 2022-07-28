import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ContentTile.stories'

const { Common } = composeStories(stories)

describe('checkout Component', () => {
    const setup = () => render(<Common {...Common?.args}/>)
  
    describe('checkout', () => {
      it('should render component', () => {
        setup()
  
        const title = screen.getAllByText(Common?.args?.largeTileProps[0].title)
        const subtitle = screen.getAllByText(Common?.args?.largeTileProps[0].subtitle)
        const link1 = screen.getAllByText(Common?.args?.largeTileProps[0].link1)
  
        expect(title[0]).toBeInTheDocument()
        expect(subtitle[0]).toBeInTheDocument()
        expect(link1[0]).toBeInTheDocument()
      })
  
    })
  })