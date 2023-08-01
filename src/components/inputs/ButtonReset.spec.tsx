import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ButtonReset from './ButtonReset'

describe('ButtonReset Component', () => {
    it('renders the button with the correct label', () => {
        const label = 'Reset'
        const { getByText } = render(<ButtonReset>{label}</ButtonReset>)
        const buttonElement = getByText(label)
        expect(buttonElement).toBeInTheDocument()
    })

    it('calls the onClick handler when the button is clicked', () => {
        const onClick = vi.fn()
        const label = 'Reset'
        const { getByText } = render(
            <ButtonReset onClick={onClick}>{label}</ButtonReset>
        )
        const buttonElement = getByText(label)

        fireEvent.click(buttonElement)
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('passes additional props to the Button component', () => {
        const label = 'Reset'
        const customClass = 'custom-button-class'
        const { getByText } = render(
            <ButtonReset className={customClass}>{label}</ButtonReset>
        )
        const buttonElement = getByText(label)

        expect(buttonElement).toHaveClass(customClass)
    })
})
