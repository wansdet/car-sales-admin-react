import React from 'react'
import Input, { InputProps } from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller } from 'react-hook-form'

interface IFormInputProps
    extends Omit<InputProps, 'name' | 'control' | 'defaultValue'> {
    name: string
    control: any
    type: string
    color?: 'primary' | 'secondary'
    errors: any
    defaultValue?: string | number | null
}

const FormInput = ({
    name,
    control,
    type = 'text',
    color = 'secondary',
    errors,
    defaultValue = '',
    ...props
}: IFormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <React.Fragment>
                    <Input
                        {...field}
                        value={field.value}
                        type={type}
                        color={color}
                        sx={{ m: 0, p: 0 }}
                        fullWidth
                        error={!!errors[name]}
                        {...props}
                    />
                    <FormHelperText id={`${name}-helper-text`}>
                        {errors[name]?.message}
                    </FormHelperText>
                </React.Fragment>
            )}
        />
    )
}

export default FormInput
