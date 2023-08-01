import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Overwrite } from '@mui/types'

type H4Props = Overwrite<TypographyProps, { ref?: any; component?: any }>

const H4 = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & H4Props) => {
    return (
        <Typography
            data-test="h4"
            variant="h6"
            component="h4"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )
}

export default H4
