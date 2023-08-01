import React, { useState } from 'react'
import { CircularProgress } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/en-gb'

import { ApplicationContext } from './ApplicationContext'

dayjs.extend(utc)

const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false)

    const showLoading = () => {
        setLoading(true)
    }

    const hideLoading = () => {
        setLoading(false)
    }

    return (
        <ApplicationContext.Provider
            value={{
                showLoading,
                hideLoading,
            }}
        >
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
            >
                {children}
                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            right: '20px',
                            bottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CircularProgress color="primary" />
                    </div>
                )}
            </LocalizationProvider>
        </ApplicationContext.Provider>
    )
}

export default ApplicationProvider
