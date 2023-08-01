import { createContext } from 'react'

interface IApplicationContext {
    showLoading: () => void
    hideLoading: () => void
}

export const ApplicationContext = createContext<IApplicationContext>(
    {} as IApplicationContext
)
