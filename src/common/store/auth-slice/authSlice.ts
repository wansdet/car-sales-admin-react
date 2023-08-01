// src/common/store/auth-slice/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserAuth } from '@/common/models/user'

interface UserState {
    user: IUserAuth | null
    // Add any other user-related state properties here
}

const initialState: UserState = {
    user: null,
    // Initialize other user-related state properties
}

/**
 * Redux Toolkit has a function called createSlice, which takes care of the work of
 * generating action type strings, action creator functions, and action objects.
 *
 * All you have to do is define a name for this slice, write an object that has some
 * reducer functions in it, and it generates the corresponding action code automatically.
 *
 * The string from the name option is used as the first part of each action type, and
 * the key name of each reducer function is used as the second part.
 * So, the "user" name + the "setUser" reducer function generated an action type of
 * {type: "user/setUser"}.
 *
 * In addition to the name field, createSlice needs us to pass in the initial state value
 * for the reducers, so that there is a state the first time it gets called.
 * https://redux.js.org/tutorials/essentials/part-2-app-structure
 */
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Actions
        // Define the setUser reducer
        setAuth: (state, action: PayloadAction<IUserAuth>) => {
            state.user = action.payload
        },
        resetAuth: (state) => {
            state.user = null
        },
        // Add other user-related reducers
    },
})

export const { setAuth } = authSlice.actions
export const { resetAuth } = authSlice.actions
export default authSlice.reducer
