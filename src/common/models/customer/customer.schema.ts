import * as yup from 'yup'

export const customerSchema = yup.object().shape({
    id: yup.number().required('User id is required'),
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
    middleName: yup
        .string()
        .max(50, 'Middle name must be less than 50 characters')
        .notRequired(),
    gender: yup.string().required('Gender is required'),
    jobTitle: yup
        .string()
        .max(40, 'Job title must be less than 30 characters')
        .required('Job title must be less than 30 characters'),
    email: yup
        .string()
        .email()
        .max(180)
        .required(
            'Valid email is required and must be less than 180 characters'
        ),
    phoneNumber: yup
        .string()
        .max(20, 'Phone number must be less than 20 characters')
        .required('Phone number must be less than 20 characters'),
    mobileNumber: yup
        .string()
        .max(20, 'Mobile number must be less than 20 characters')
        .required('Mobile number must be less than 20 characters'),
    status: yup.string().required('Status is required'),
    notes: yup
        .string()
        .max(4000, 'Description must be less than 4000 characters')
        .required('Description must be less than 4000 characters'),
})
