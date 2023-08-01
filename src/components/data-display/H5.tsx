import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Overwrite } from '@mui/types'

type H5Props = Overwrite<TypographyProps, { ref?: any; component?: any }>

const H5 = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & H5Props) => {
    return (
        <Typography
            data-test="h5"
            variant="h6"
            component="h5"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )
}

export default H5
