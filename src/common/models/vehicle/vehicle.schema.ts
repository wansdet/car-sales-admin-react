import * as yup from 'yup'

export const vehicleSchema = yup.object().shape({
    id: yup.number().required('Vehicle id is required'),
    make: yup.string().required('Make is required'),
    model: yup
        .string()
        .min(2, 'Model is required and must be between 2 and 50 characters')
        .max(50, 'Model is required and must be between 2 and 50 characters')
        .required('Model is required and must be between 2 and 50 characters'),
    type: yup.string().required('Type is required'),
    bodyType: yup.string().required('Body type is required'),
    fuelType: yup.string().required('Fuel type is required'),
    colour: yup.string().required('Colour is required'),
    year: yup.number().required('Year is required'),
    mileage: yup.number().required('Mileage is required'),
    doors: yup.number().required('Doors is required'),
    seats: yup.number().required('Seats is required'),
    owners: yup.number().required('Owners is required'),
    history: yup.string().required('History is required'),
    gearbox: yup.string().required('Gearbox is required'),
    price: yup.number().required('Price is required'),
    title: yup
        .string()
        .min(2, 'Title is required and must be between 2 and 50 characters')
        .max(50, 'Title is required and must be between 2 and 50 characters')
        .required('Title is required and must be between 2 and 50 characters'),
    description: yup
        .string()
        .max(
            4000,
            'Description is required and must be less than 4000 characters'
        )
        .required(
            'Description is required and must be less than 4000 characters'
        ),
    features: yup
        .string()
        .max(4000, 'Features is required and must be less than 4000 characters')
        .required('Features is required and must be less than 4000 characters'),
    status: yup.string().required('Status is required'),
    display: yup.boolean().required('Display is required'),
    createdAt: yup.string().notRequired(),
    updatedAt: yup.string().notRequired(),
    publishedDate: yup.string().notRequired(),
    soldDate: yup.string().notRequired(),
})
