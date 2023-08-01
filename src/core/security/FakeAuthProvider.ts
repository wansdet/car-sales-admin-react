/**
 * src/core/security/FakeAuthProvider.ts
 * FakeAuthProvider is used to simulate authentication in the app.
 * Replace this with your own authentication provider.
 */
import { IUserAuth, IUserCredential } from '@/common/models/user'

export const fakeAuthProvider = {
    isAuthenticated: false,
    get isUserAuthenticated() {
        return this.isAuthenticated
    },
    login(
        userCredential: IUserCredential,
        callback: (response: IUserAuth | string) => void
    ) {
        if (
            userCredential.username === 'user' &&
            userCredential.password === 'user'
        ) {
            const user: IUserAuth = {
                username: 'user',
                roles: ['ROLE_USER'],
            }
            this.isAuthenticated = true
            setTimeout(() => callback(user), 100) // fake async
            return
        }
        if (
            userCredential.username === 'admin' &&
            userCredential.password === 'admin'
        ) {
            const user: IUserAuth = {
                username: 'admin',
                roles: ['ROLE_ADMIN'],
            }
            this.isAuthenticated = true
            setTimeout(() => callback(user), 100) // fake async
            return
        }

        const error = 'Invalid username or password'
        setTimeout(() => callback(error), 100) // fake async
    },
    logout(callback: VoidFunction) {
        this.isAuthenticated = false
        setTimeout(callback, 100)
    },
}
