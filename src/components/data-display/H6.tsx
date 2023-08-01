import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Overwrite } from '@mui/types'

type H6Props = Overwrite<TypographyProps, { ref?: any; component?: any }>

const H6 = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & H6Props) => {
    return (
        <Typography
            data-test="h6"
            variant="h6"
            component="h6"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )
}

export default H6
