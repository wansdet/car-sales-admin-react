import { usePostAPI } from '@/core/api'
import { decodeToken } from 'react-jwt'

import { IUserAuth, IUserCredential } from '@/common/models/user'
import { API_BASE_URL } from '@/core/application'

export const authProvider = {
    isAuthenticated: false,
    get isUserAuthenticated() {
        return this.isAuthenticated
    },
    async login(
        userCredential: IUserCredential,
        callback: (response: IUserAuth | string) => void
    ) {
        const url = `${API_BASE_URL}/login_check`
        const {
            postData: authUser,
            loading: authLoading,
            error: authError,
            data: responseData, // Add data to the destructured object
        } = usePostAPI<any>(url)

        try {
            await authUser(userCredential)
            if (authError) {
                this.isAuthenticated = false
                callback('Invalid credentials')
            } else {
                const response = responseData! // Assert non-null assertion as responseData is nullable
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(response))
                const decodedToken: any = decodeToken(response.token)
                localStorage.setItem('role', decodedToken.roles[0])

                this.isAuthenticated = true

                const useAuth = {
                    username: userCredential.password,
                    roles: decodedToken.roles,
                }

                callback(useAuth)
            }
        } catch (error) {
            this.isAuthenticated = false
            callback('Invalid credentials')
        }
    },
    logout(callback: VoidFunction) {
        this.isAuthenticated = false
        callback()
    },
}
