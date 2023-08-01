import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import useNotification from './useNotification'

const TestComponent: React.FC = () => {
    const { NotificationComponent, showNotification, hideNotification } =
        useNotification()

    return (
        <>
            <NotificationComponent />
            <button onClick={() => showNotification('Test Message', 'success')}>
                Show Notification
            </button>
            <button onClick={() => hideNotification()}>
                Hide Notification
            </button>
        </>
    )
}

describe('useNotification hook', () => {
    it('should show the notification with the correct message and severity', () => {
        const { getByText, queryByText } = render(<TestComponent />)
        const showButton = getByText('Show Notification')

        fireEvent.click(showButton)

        const notificationElement = queryByText('Test Message')
    })

    it('should hide the notification when hideNotification is called', () => {
        const { getByText, queryByText } = render(<TestComponent />)
        const showButton = getByText('Show Notification')
        const hideButton = getByText('Hide Notification')

        fireEvent.click(showButton)

        const notificationElement = queryByText('Test Message')
        expect(notificationElement).toBeInTheDocument()

        fireEvent.click(hideButton)

        const hiddenNotificationElement = queryByText('Test Message')
        expect(hiddenNotificationElement).not.toBeInTheDocument()
    })
})
