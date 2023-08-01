import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

interface IFormSelectProps
    extends Omit<TextFieldProps, 'name' | 'control' | 'defaultValue'> {
    name: string
    control: any
    label: string
    variant?: 'standard' | 'filled' | 'outlined'
    color?: 'primary' | 'secondary'
    errors: any
    defaultValue?: string
}

const FormSelect = ({
    name,
    control,
    label,
    variant = 'outlined',
    color = 'secondary',
    errors,
    defaultValue = '',
    children,
    ...props
}: { children: React.ReactNode } & IFormSelectProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <TextField
                    {...field}
                    value={field.value}
                    select
                    label={label}
                    variant={variant}
                    color={color}
                    sx={{ mt: 2, mb: 1 }}
                    fullWidth
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    {...props}
                >
                    {children}
                </TextField>
            )}
        />
    )
}

export default FormSelect
