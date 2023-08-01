import React, { ReactNode, useContext } from 'react'

import { H1, H2, H3, H4, H5, H6, LevelContext } from '@/components/data-display'

interface HeadingProps {
    children: ReactNode
}

const Heading = ({ children }: HeadingProps) => {
    const level = useContext(LevelContext)

    switch (level) {
        case 1:
            return <H1>{children}</H1>
        case 2:
            return <H2>{children}</H2>
        case 3:
            return <H3>{children}</H3>
        case 4:
            return <H4>{children}</H4>
        case 5:
            return <H5>{children}</H5>
        default:
            return <H6>{children}</H6>
    }
}

export default Heading
