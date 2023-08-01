import React from 'react'
import { render } from '@testing-library/react'
import MainContent from './MainContent'

describe('MainContent Component', () => {
    it('renders children correctly', () => {
        const testText = 'Main Content Test'
        const { getByText } = render(<MainContent>{testText}</MainContent>)
        const renderedText = getByText(testText)
        expect(renderedText).toBeInTheDocument()
    })
})
