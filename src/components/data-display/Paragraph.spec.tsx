import React from 'react'
import { render } from '@testing-library/react'
import Paragraph from './Paragraph'

describe('Paragraph Component', () => {
    it('renders paragraph', () => {
        const { container } = render(<Paragraph>Paragraph</Paragraph>)

        const paragraphElement = container.querySelector('p')
        expect(paragraphElement).toBeInTheDocument()
        expect(paragraphElement?.textContent).toBe('Paragraph')
    })
})
