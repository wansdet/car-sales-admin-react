import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { Overwrite } from '@mui/types'

type ButtonResetProps = Overwrite<
    ButtonProps,
    {
        ref?: React.Ref<HTMLButtonElement>
        component?: React.ElementType
    }
>

const ButtonReset = ({
    children,
    onClick,
    ...props
}: { children: React.ReactNode } & ButtonResetProps) => {
    return (
        <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2 }}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ButtonReset
