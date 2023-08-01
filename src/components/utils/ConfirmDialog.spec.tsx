import React, { ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ConfirmDialog from './ConfirmDialog'

interface IConfirmDialogProps<T> {
    title: string
    children: ReactNode
    open: boolean
    onConfirm: () => void
    onClose: () => void
}

const mockProps: IConfirmDialogProps<{}> = {
    title: 'Confirm Action',
    children: <p>Are you sure you want to proceed?</p>,
    open: true,
    onConfirm: vi.fn(),
    onClose: vi.fn(),
}

describe('ConfirmDialog Component', () => {
    it('renders the dialog with the correct title and content', () => {
        const { getByText } = render(<ConfirmDialog {...mockProps} />)

        const titleElement = getByText(mockProps.title)
        expect(titleElement).toBeInTheDocument()

        const contentElement = getByText('Are you sure you want to proceed?')
        expect(contentElement).toBeInTheDocument()
    })

    it('calls the onClose handler when the close button is clicked', () => {
        const { getByLabelText } = render(<ConfirmDialog {...mockProps} />)

        // Find and click on the close button
        const closeButton = getByLabelText('close')
        fireEvent.click(closeButton)

        // Check if the onClose handler is called
        expect(mockProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('calls the onClose handler when the "Cancel" button is clicked', () => {
        const { getByText } = render(<ConfirmDialog {...mockProps} />)

        // Find and click on the "Cancel" button
        const cancelButton = getByText('Cancel')
        fireEvent.click(cancelButton)

        // Check if the onClose handler is called
        expect(mockProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('calls the onConfirm handler when the "Confirm" button is clicked', () => {
        const { getByText } = render(<ConfirmDialog {...mockProps} />)

        // Find and click on the "Confirm" button
        const confirmButton = getByText('Confirm')
        fireEvent.click(confirmButton)

        // Check if the onConfirm handler is called
        expect(mockProps.onConfirm).toHaveBeenCalledTimes(1)
    })
})
