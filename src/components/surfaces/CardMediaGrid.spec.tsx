import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import CardMediaGrid from './CardMediaGrid'

const mockMedia = [
    {
        id: 1,
        title: 'Media 1',
        description: 'Description 1',
        image: 'image-1.jpg',
        link: '/media/1',
    },
    {
        id: 2,
        title: 'Media 2',
        description: 'Description 2',
        image: 'image-2.jpg',
        link: '/media/2',
    },
]

describe('CardMediaGrid Component', () => {
    it('renders media items correctly', () => {
        const buttonText = 'View Details'
        const infoPrefix = 'Info:'
        render(
            <Router>
                <CardMediaGrid
                    media={mockMedia}
                    buttonText={buttonText}
                    infoPrefix={infoPrefix}
                />
            </Router>
        )

        // Check if all media titles are rendered
        mockMedia.forEach((mediaItem) => {
            const mediaTitle = screen.getByText(mediaItem.title)
            expect(mediaTitle).toBeInTheDocument()
        })

        // Check if all media descriptions are rendered
        mockMedia.forEach((mediaItem) => {
            const mediaDescription = screen.getByText(mediaItem.description)
            expect(mediaDescription).toBeInTheDocument()
        })

        // Check if all buttons are rendered with the correct text and accessibility attributes
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(mockMedia.length)
        buttons.forEach((button, index) => {
            expect(button).toHaveTextContent(buttonText)
            expect(button).toHaveAttribute(
                'title',
                `${infoPrefix} ${mockMedia[index].title}`
            )
            expect(button).toHaveAttribute(
                'aria-label',
                `${infoPrefix} ${mockMedia[index].title}`
            )
        })
    })
})
