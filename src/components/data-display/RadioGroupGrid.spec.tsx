import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RadioGroupGrid from './RadioGroupGrid'

const mockProps = {
    labelGroup: 'Test Group',
    labelAll: 'All',
    checkAll: 'all',
    radios: [
        { value: 'radio1', label: 'Radio 1' },
        { value: 'radio2', label: 'Radio 2' },
        { value: 'radio3', label: 'Radio 3' },
    ],
    onChange: vi.fn(),
}

describe('RadioGroupGrid Component', () => {
    it('renders correctly with the provided props', () => {
        const { getByLabelText, getByText } = render(
            <RadioGroupGrid {...mockProps} />
        )

        const labelElement = getByText(mockProps.labelGroup)
        expect(labelElement).toBeInTheDocument()

        const radioGroupElement = getByLabelText(
            `radio-group-label-${mockProps.labelGroup
                .toLowerCase()
                .replace(/\s+/g, '_')}`
        )
        expect(radioGroupElement).toBeInTheDocument()

        // Check if the "All" radio button is rendered
        const allRadioElement = getByLabelText(mockProps.labelAll)
        expect(allRadioElement).toBeInTheDocument()

        // Check if all radio buttons from the radios array are rendered
        mockProps.radios.forEach((radio) => {
            const radioElement = getByLabelText(radio.label)
            expect(radioElement).toBeInTheDocument()
        })
    })

    it('calls the onChange handler when a radio button is clicked', () => {
        const { getByLabelText } = render(<RadioGroupGrid {...mockProps} />)

        // Find and click on the "Radio 1" radio button
        const radio1Element = getByLabelText('Radio 1')
        fireEvent.click(radio1Element)

        // Check if the onChange handler is called with the correct value
        expect(mockProps.onChange).toHaveBeenCalledTimes(1)
        expect(mockProps.onChange).toHaveBeenCalledWith(expect.any(Object))
    })

    it('selects the correct radio button when a radio button is clicked', () => {
        const { getByLabelText } = render(<RadioGroupGrid {...mockProps} />)

        // Find and click on the "Radio 2" radio button
        const radio2Element = getByLabelText('Radio 2')
        fireEvent.click(radio2Element)

        // Check if the "Radio 2" radio button is selected
        expect(radio2Element).toBeChecked()
    })
})
