import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Overwrite } from '@mui/types'

type H3Props = Overwrite<TypographyProps, { ref?: any; component?: any }>

const H3 = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & H3Props) => {
    return (
        <Typography
            data-test="h3"
            variant="h5"
            component="h3"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )
}

export default H3
