/**
 * src/core/security/SecurityProvider.tsx
 * Provide the security context to the app
 */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { authProvider } from './authProvider'
import { SecurityContext } from './SecurityContext'
import { IUserAuth, IUserCredential } from '@/common/models/user'
import { resetAuth, setAuth } from '@/common/store/auth-slice/authSlice'

export const SecurityProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<IUserAuth | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        authProvider.isUserAuthenticated
    )
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    /* BEGIN Implement authentication and user state management */
    const login = (
        userCredential: IUserCredential,
        callback: (response: IUserAuth | string) => void
    ) => {
        authProvider.login(userCredential, (response: IUserAuth | string) => {
            if (typeof response === 'string') {
                setError(response)
                setUser(null)
                dispatch(resetAuth())
                setIsAuthenticated(false)
            } else {
                setUser(response)
                dispatch(setAuth(response)) // Dispatch setUser action to update authSlice
                setIsAuthenticated(true)
                setError(null)
            }
            callback(response)
        })
    }

    const logout = (callback: VoidFunction) => {
        authProvider.logout(() => {
            setUser(null)
            setIsAuthenticated(false)
            callback()
        })
    }

    const hasRole = (role: string) => {
        return user?.roles.includes(role) || false
    }
    /* END Implement authentication and user state management */

    const value = {
        user,
        isAuthenticated,
        hasRole,
        login,
        logout,
        error,
    }

    return (
        <SecurityContext.Provider value={value}>
            {children}
        </SecurityContext.Provider>
    )
}
