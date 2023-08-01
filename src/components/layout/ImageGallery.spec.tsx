import React from 'react'
import { render, screen } from '@testing-library/react'
import ImageGallery from './ImageGallery'

describe('ImageGallery Component', () => {
    const mockImages = [
        { url: 'image1.jpg', title: 'Image 1' },
        { url: 'image2.jpg', title: 'Image 2' },
        { url: 'image3.jpg', title: 'Image 3' },
    ]

    it('renders the correct number of images', () => {
        render(<ImageGallery images={mockImages} />)

        // Find all images by their alt text
        const imageElements = screen.getAllByAltText(/Image \d/)

        // Check if the number of rendered images matches the number of mock images
        expect(imageElements.length).toBe(mockImages.length)
    })

    it('renders images with correct source and alt attributes', () => {
        render(<ImageGallery images={mockImages} />)

        // Find all images by their alt text
        const imageElements = screen.getAllByAltText(/Image \d/)

        // Check if each image has the correct src and alt attributes
        imageElements.forEach((imageElement, index) => {
            const { url, title } = mockImages[index]
            expect(imageElement).toHaveAttribute('src', url)
            expect(imageElement).toHaveAttribute('alt', title)
        })
    })
})
