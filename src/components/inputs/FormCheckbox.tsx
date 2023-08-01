import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { TextFieldProps } from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

interface IFormCheckboxProps
    extends Omit<TextFieldProps, 'name' | 'control' | 'defaultValue'> {
    name: string
    control: any
    errors: any
    defaultValue?: boolean
}

const FormCheckbox = ({
    name,
    control,
    errors,
    defaultValue = false,
    ...props
}: IFormCheckboxProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                />
            )}
            {...props}
        />
    )
}

export default FormCheckbox
