import React from 'react'
import { render } from '@testing-library/react'
import H1 from './H1'

describe('H1 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H1>Test children</H1>)
        const h1Element = getByText('Test children')
        expect(h1Element).toBeInTheDocument()
    })

    it('renders h1 tag', () => {
        const { container } = render(<H1>Test is h1 tag</H1>)
        const h1Element = container.querySelector('h1')
        expect(h1Element).toBeInTheDocument()
    })

    it('applies component prop', () => {
        const { container } = render(
            <H1 component="h2">Testing component prop</H1>
        )
        const h2Element = container.querySelector('h2')
        expect(h2Element).toBeInTheDocument()
    })

    it('applies align prop', () => {
        const { container } = render(<H1 align="center">Testing align prop</H1>)
        const h1Element = container.querySelector('h1')
        expect(h1Element).toHaveStyle('text-align: center;')
    })
})
