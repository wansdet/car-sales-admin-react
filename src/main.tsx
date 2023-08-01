import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './core/store'
import App from './App'
import './index.css'
import { worker } from './mocks/browser'

if (import.meta.env.VITE_MOCK_SERVICE_WORKER_ENABLED === 'true') {
    worker.start()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
)
