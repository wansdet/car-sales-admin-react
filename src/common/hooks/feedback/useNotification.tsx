// src/common/hooks/feedback/useNotification.tsx
import React, { useState } from 'react'
import MuiAlert, { AlertColor } from '@mui/material/Alert'
import { Snackbar } from '@mui/material'

const useNotification = () => {
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarState, setSnackbarState] = useState('info')

    const showNotification = (
        message: any,
        status: AlertColor | undefined = 'info'
    ) => {
        setShowSnackbar(true)
        setSnackbarMessage(message)
        setSnackbarState(status)
    }

    const hideNotification = () => {
        setShowSnackbar(false)
        setSnackbarMessage('')
        setSnackbarState('info')
    }

    const NotificationComponent = () => (
        <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={hideNotification}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={hideNotification}
                severity={snackbarState as AlertColor}
            >
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
    )

    return { showNotification, hideNotification, NotificationComponent }
}

export default useNotification
