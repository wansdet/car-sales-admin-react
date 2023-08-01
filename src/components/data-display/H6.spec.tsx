import React from 'react'
import { render } from '@testing-library/react'
import H6 from './H6'

describe('H6 Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<H6>Test children</H6>)
        const h6Element = getByText('Test children')
        expect(h6Element).toBeInTheDocument()
    })

    it('renders h6 tag', () => {
        const { container } = render(<H6>Test is h6 tag</H6>)
        const h6Element = container.querySelector('h6')
        expect(h6Element).toBeInTheDocument()
    })

    it('applies component prop', () => {
        const { container } = render(
            <H6 component="h5">Testing component prop</H6>
        )
        const h5Element = container.querySelector('h5')
        expect(h5Element).toBeInTheDocument()
    })
})
