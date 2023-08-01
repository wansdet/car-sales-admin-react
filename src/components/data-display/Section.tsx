import React, { ReactNode, useContext } from 'react'
import { LevelContext } from './LevelContext'

interface ISectionProps {
    level?: number
    id: string
    children: ReactNode
}

const Section = ({ level, id, children }: ISectionProps) => {
    const defaultLevel = useContext(LevelContext)

    const resolvedLevel = level !== undefined ? level : defaultLevel

    return (
        <section data-testid={id} id={id}>
            <LevelContext.Provider value={resolvedLevel + 1}>
                {children}
            </LevelContext.Provider>
        </section>
    )
}

export default Section
