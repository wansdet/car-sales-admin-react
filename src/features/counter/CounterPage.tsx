import React from 'react'
import { Typography } from '@mui/material'
import logo from 'logo.svg'

import { Counter } from './Counter'

const CounterPage = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Counter />
            <Typography variant="body1" gutterBottom>
                Edit <code>src/App.tsx</code> and save to reload.
            </Typography>
            <span>
                <span>Learn </span>
                <a
                    className="App-link"
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React
                </a>
                <span>, </span>
                <a
                    className="App-link"
                    href="https://redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Redux
                </a>
                <span>, </span>
                <a
                    className="App-link"
                    href="https://redux-toolkit.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Redux Toolkit
                </a>
                ,<span> and </span>
                <a
                    className="App-link"
                    href="https://react-redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React Redux
                </a>
            </span>
        </header>
    )
}

export default CounterPage
