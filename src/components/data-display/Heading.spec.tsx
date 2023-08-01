import React from 'react'
import { render } from '@testing-library/react'
import { Section, Heading } from '@/components/data-display'

describe('Heading Component', () => {
    it('renders H1 when level is default level 0', () => {
        const { container } = render(
            <Section id="section-level-0">
                <Heading>Heading 1 Level 0</Heading>
            </Section>
        )

        const h1Element = container.querySelector('h1')
        expect(h1Element).toBeInTheDocument()
        expect(h1Element?.textContent).toBe('Heading 1 Level 0')
    })

    it('renders H2 when level is 1', () => {
        const { container } = render(
            <Section level={1} id="section-level-1">
                <Heading>Heading 2 Level 1</Heading>
            </Section>
        )

        const h2Element = container.querySelector('h2')
        expect(h2Element).toBeInTheDocument()
        expect(h2Element?.textContent).toBe('Heading 2 Level 1')
    })

    it('renders H3 when level is 2', () => {
        const { container } = render(
            <Section level={2} id="section-level-2">
                <Heading>Heading 3 Level 2</Heading>
            </Section>
        )

        const h3Element = container.querySelector('h3')
        expect(h3Element).toBeInTheDocument()
        expect(h3Element?.textContent).toBe('Heading 3 Level 2')
    })

    it('renders H4 when level is 3', () => {
        const { container } = render(
            <Section level={3} id="section-level-3">
                <Heading>Heading 4 Level 3</Heading>
            </Section>
        )

        const h4Element = container.querySelector('h4')
        expect(h4Element).toBeInTheDocument()
        expect(h4Element?.textContent).toBe('Heading 4 Level 3')
    })

    it('renders H5 when level is 4', () => {
        const { container } = render(
            <Section level={4} id="section-level-4">
                <Heading>Heading 5 Level 4</Heading>
            </Section>
        )

        const h5Element = container.querySelector('h5')
        expect(h5Element).toBeInTheDocument()
        expect(h5Element?.textContent).toBe('Heading 5 Level 4')
    })

    it('renders H6 when level is 5', () => {
        const { container } = render(
            <Section level={5} id="section-level-6">
                <Heading>Heading 6 Level 5</Heading>
            </Section>
        )

        const h6Element = container.querySelector('h6')
        expect(h6Element).toBeInTheDocument()
        expect(h6Element?.textContent).toBe('Heading 6 Level 5')
    })

    it('renders H6 when level is 6', () => {
        const { container } = render(
            <Section level={6} id="section-level-7">
                <Heading>Heading 6 Level 6</Heading>
            </Section>
        )

        const h6Element = container.querySelector('h6')
        expect(h6Element).toBeInTheDocument()
        expect(h6Element?.textContent).toBe('Heading 6 Level 6')
    })
})
