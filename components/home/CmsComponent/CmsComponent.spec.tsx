import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CmsComponent.stories'
import { cmsHomePageResultMock } from '@/__mocks__/stories/CmsHomePageResultMock'

const { Common } = composeStories(stories)

const mockCmsHomePageResult = cmsHomePageResultMock
const SmallBannerMock = () => <div data-testid="small-banner-component" />
const HeroCarouselMock = () => <div data-testid="hero-carousel-component" />
const ContentTileMock = () => <div data-testid="content-tile-component" />
jest.mock('@/components/home/SmallBanner/SmallBanner', () => SmallBannerMock)
jest.mock('@/components/home/Carousel/KiboHeroCarousel', () => HeroCarouselMock)
jest.mock('@/components/home/ContentTile/ContentTile', () => ContentTileMock)

describe('[component] - OrderHistory', () => {
  const setup = (args = Common.args) => {
    render(<Common {...args} />)
  }
  it('should render component', () => {
    setup()
    const SmallBanner = screen.getByTestId('small-banner-component')

    expect(SmallBanner).toBeInTheDocument()
  })

  it('should render hero carousel component', () => {
    const heroCarousel = {
      content: mockCmsHomePageResult.find((data) => Object.keys(data)[0] === 'hero_carousel'),
    }
    setup(heroCarousel)
    const HeroCarousel = screen.getByTestId('hero-carousel-component')

    expect(HeroCarousel).toBeInTheDocument()
  })

  it('should render large content tile component', () => {
    const contentTile = {
      content: mockCmsHomePageResult.find((data) => Object.keys(data)[0] === 'large_promo_blocks'),
    }
    setup(contentTile)
    const ContentTile = screen.getByTestId('content-tile-component')

    expect(ContentTile).toBeInTheDocument()
  })

  it('should render small content tile component', () => {
    const contentTile = {
      content: mockCmsHomePageResult.find((data) => Object.keys(data)[0] === 'small_promo_blocks'),
    }
    setup(contentTile)
    const ContentTile = screen.getByTestId('content-tile-component')

    expect(ContentTile).toBeInTheDocument()
  })
})
