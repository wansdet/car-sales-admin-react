/**
 * src/core/security/ProtectedRoutes.tsx
 * Guard the routes that require authentication
 */
import * as React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { SecurityContext } from "./SecurityContext"

export const ProtectedRoutes = () => {
    const auth = React.useContext(SecurityContext)
    const location = useLocation()

    return auth.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}