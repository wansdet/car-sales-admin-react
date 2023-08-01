import React from 'react'
import { render } from '@testing-library/react'
import Carousel, { IImageCarousel } from './Carousel'

const mockImages: IImageCarousel[] = [
    {
        original: 'image-1.jpg',
        thumbnail: 'thumbnail-1.jpg',
    },
    {
        original: 'image-2.jpg',
        thumbnail: 'thumbnail-2.jpg',
    },
]

describe('Carousel Component', () => {
    it('renders the image carousel correctly', () => {
        const { container } = render(<Carousel images={mockImages} />)
        const imageGallery = container.querySelector('.image-gallery')
        expect(imageGallery).toBeInTheDocument()
    })

    it('renders the image carousel with thumbnails correctly', () => {
        const { container } = render(
            <Carousel images={mockImages} showThumbnails />
        )
        const imageGallery = container.querySelector(
            '.image-gallery-thumbnails'
        )
        expect(imageGallery).toBeInTheDocument()
    })
})
