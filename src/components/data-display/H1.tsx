import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Overwrite } from '@mui/types'

type H1Props = Overwrite<TypographyProps, { ref?: any; component?: any }>

const H1 = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & H1Props) => {
    return (
        <Typography
            data-test="h1"
            component="h1"
            variant="h2"
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )
}

export default H1
