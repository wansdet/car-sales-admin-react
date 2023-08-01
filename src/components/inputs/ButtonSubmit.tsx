import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { Overwrite } from '@mui/types'

type ButtonSubmitProps = Overwrite<
    ButtonProps,
    {
        ref?: React.Ref<HTMLButtonElement>
        component?: React.ElementType
    }
>

const ButtonSubmit = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & ButtonSubmitProps) => {
    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2 }}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ButtonSubmit
