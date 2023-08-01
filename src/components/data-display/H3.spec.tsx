import React from 'react'
import { render } from '@testing-library/react'
import H3 from './H3'

describe('H3 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H3>Test children</H3>)
        const h3Element = getByText('Test children')
        expect(h3Element).toBeInTheDocument()
    })

    it('renders h3 tag', () => {
        const { container } = render(<H3>Test is h3 tag</H3>)
        const h3Element = container.querySelector('h3')
        expect(h3Element).toBeInTheDocument()
    })

    it('applies component prop', () => {
        const { container } = render(
            <H3 component="h4">Testing component prop</H3>
        )
        const h4Element = container.querySelector('h4')
        expect(h4Element).toBeInTheDocument()
    })

    it('applies align prop', () => {
        const { container } = render(<H3 align="left">Testing align prop</H3>)
        const h3Element = container.querySelector('h3')
        expect(h3Element).toHaveStyle('text-align: left;')
    })
})
