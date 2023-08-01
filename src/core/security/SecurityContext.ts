/**
 * src/core/security/SecurityContext.ts
 * React Context object that will be used to share
 * the user state and login/logout functions across the app.
 */
import React from 'react'

import { IUserAuth, IUserCredential } from '@/common/models/user'

interface SecurityContextProps {
    user: IUserAuth | null
    error: string | null
    isAuthenticated: boolean
    hasRole: (role: string) => boolean // Define hasRole as a function
    login: (
        userCredential: IUserCredential,
        callback: (response: IUserAuth | string) => void
    ) => void // Define login as a function
    logout: (callback: VoidFunction) => void // Define logout as a function
}

export const SecurityContext = React.createContext<SecurityContextProps>(null!)
