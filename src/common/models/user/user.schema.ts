// src/common/models/user/user.schema.ts
import * as yup from 'yup'

export const userCredentialsSchema = yup.object().shape({
    email: yup.string().email().required('Valid email is required'),
    password: yup.string().required('Password is required'),
})

export const userSignUpSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .max(180)
        .required(
            'Valid email is required and must be less than 180 characters'
        ),
    password: yup
        .string()
        .min(8, 'Password is required and must be between 8 and 20 characters')
        .max(20, 'Password is required and must be between 8 and 20 characters')
        .required(
            'Password is required and must be between 8 and 20 characters'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords does not match')
        .required('Confirm password is required'),
    firstName: yup
        .string()
        .min(
            2,
            'First name is required and must be between 2 and 50 characters'
        )
        .max(
            50,
            'First name is required and must be between 2 and 50 characters'
        )
        .required(
            'First name is required and must be between 2 and 50 characters'
        ),
    lastName: yup
        .string()
        .min(2, 'Last name is required and must be between 2 and 50 characters')
        .max(
            50,
            'Last name is required and must be between 2 and 50 characters'
        )
        .required(
            'Last name is required and must be between 2 and 50 characters'
        ),
    gender: yup.string().required('Sex is required'),
})

export const userUKAddressSchema = yup.object().shape({
    name: yup
        .string()
        .max(100, 'Name is required and must be less than 100 characters')
        .required('Name is required and must be less than 100 characters'),
    phoneNumber: yup
        .string()
        .max(20, 'Phone number is required and must be less than 20 characters')
        .required(
            'Phone number is required and must be less than 20 characters'
        ),
    organisation: yup
        .string()
        .max(100, 'Organisation must be less than 100 characters')
        .notRequired(),
    propertyNumber: yup
        .string()
        .max(100, 'Property number must be less than 100 characters')
        .notRequired(),
    street: yup
        .string()
        .max(100, 'Street is required and must be less than 100 characters')
        .required('Street is required and must be less than 255 characters'),
    locality: yup
        .string()
        .max(50, 'Locality must be less than 50 characters')
        .notRequired(),
    city: yup
        .string()
        .max(50, 'City is required and must be less than 50 characters')
        .required('City is required and must be less than 50 characters'),
    state: yup
        .string()
        .max(50, 'County must be less than 50 characters')
        .required('County is required and must be less than 50 characters'),
    postalCode: yup
        .string()
        .max(
            6,
            'Postal code is required and must be between 6 and 8 characters'
        )
        .max(
            8,
            'Postal code is required and must be between 6 and 8 characters'
        )
        .required('Postal code is required'),
    primaryAddress: yup.boolean().required('Primary address is required'),
})

export const userUpdateSchema = yup.object().shape({
    id: yup.number().required('User id is required'),
    username: yup.string().required('Username is required'),
    firstName: yup
        .string()
        .min(
            2,
            'First name is required and must be between 2 and 50 characters'
        )
        .max(
            50,
            'First name is required and must be between 2 and 50 characters'
        )
        .required(
            'First name is required and must be between 2 and 50 characters'
        ),
    lastName: yup
        .string()
        .min(2, 'Last name is required and must be between 2 and 50 characters')
        .max(
            50,
            'Last name is required and must be between 2 and 50 characters'
        )
        .required(
            'Last name is required and must be between 2 and 50 characters'
        ),
    gender: yup.string().required('Gender is required'),
    email: yup
        .string()
        .email()
        .max(180)
        .required(
            'Valid email is required and must be less than 180 characters'
        ),
    jobTitle: yup
        .string()
        .max(30, 'Job title must be less than 30 characters')
        .required('Job title must be less than 30 characters'),
    phoneNumber: yup
        .string()
        .max(20, 'Phone number must be less than 20 characters')
        .required('Phone number must be less than 20 characters'),
    mobileNumber: yup
        .string()
        .max(20, 'Mobile number must be less than 20 characters')
        .required('Mobile number must be less than 20 characters'),
    roles: yup.array().of(yup.string()).required('Roles is required'),
    status: yup.string().required('Status is required'),
    description: yup
        .string()
        .max(255, 'Description must be less than 255 characters')
        .required('Description must be less than 255 characters'),
})
