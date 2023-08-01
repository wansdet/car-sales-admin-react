import React from 'react'
import { render } from '@testing-library/react'
import SideBar from './SideBar'

describe('SideBar Component', () => {
    it('renders children correctly', () => {
        const testText = 'SideBar Test'
        const { getByText } = render(<SideBar>{testText}</SideBar>)
        const renderedText = getByText(testText)
        expect(renderedText).toBeInTheDocument()
    })
})
