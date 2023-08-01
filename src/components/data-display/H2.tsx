import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Overwrite } from '@mui/types'

type H2Props = Overwrite<TypographyProps, { ref?: any; component?: any }>

const H2 = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & H2Props) => {
    return (
        <Typography
            data-test="h2"
            variant="h4"
            component="h2"
            mt={3}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )
}

export default H2
