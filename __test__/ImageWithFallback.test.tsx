import { fireEvent, render, screen } from '@testing-library/react'
import { ImageWithFallback } from '@/components/ImageWithFallback'

describe('ImageWithFallback', () => {
  it('should not render image placeholder initially', async () => {
    // arrange
    await render(
      <div className="w-40 h-40 relative">
        <ImageWithFallback
          alt="TEST"
          src="https://www.example.com/this-page-does-not-exist"
          fill
          className="absolute w-full h-full left-0 top-0 object-cover"
          priority
        />
      </div>,
    )

    // assert
    const image = screen.getByAltText('TEST')
    expect(image).toHaveAttribute(
      'srcset',
      expect.stringContaining('this-page-does-not-exist'),
    )
  })

  it('should render image placeholder on load error', async () => {
    // arrange
    await render(
      <div className="w-40 h-40 relative">
        <ImageWithFallback
          alt="TEST"
          src="https://www.example.com/this-page-does-not-exist"
          fill
          className="absolute w-full h-full left-0 top-0 object-cover"
          priority
        />
      </div>,
    )

    // act
    const image = screen.getByAltText('TEST')
    fireEvent.error(image)

    // assert
    expect(image).toHaveAttribute(
      'srcset',
      expect.not.stringContaining('this-page-does-not-exist'),
    )
  })
})
