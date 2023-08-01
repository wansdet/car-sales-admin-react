import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

interface IFormInputTextProps
    extends Omit<TextFieldProps, 'name' | 'control' | 'defaultValue'> {
    name: string
    control: any
    label: string
    type: string
    variant?: 'standard' | 'filled' | 'outlined'
    color?: 'primary' | 'secondary'
    errors: any
    defaultValue?: string | number
}

const FormInputText = ({
    name,
    control,
    label,
    type = 'text',
    variant = 'outlined',
    color = 'secondary',
    errors,
    defaultValue = '',
    ...props
}: IFormInputTextProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    value={field.value}
                    type={type}
                    variant={variant}
                    color={color}
                    sx={{ mt: 2, mb: 1 }}
                    fullWidth
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    {...props}
                />
            )}
        />
    )
}

export default FormInputText
