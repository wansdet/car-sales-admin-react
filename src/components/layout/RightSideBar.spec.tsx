import React from 'react'
import { render } from '@testing-library/react'
import RightSideBar from './RightSideBar'

describe('RightSideBar Component', () => {
    it('renders children correctly', () => {
        const testText = 'Right Side Bar Test'
        const { getByText } = render(<RightSideBar>{testText}</RightSideBar>)
        const renderedText = getByText(testText)
        expect(renderedText).toBeInTheDocument()
    })
})
