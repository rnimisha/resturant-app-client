import * as Yup from 'yup'

export const REGISTER_VALIDATION_SCHEMA = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Name be atleast 4 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Provide a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(7, 'Password should be atleast 7 characters')
        .required('Password is required'),
    confirmpass: Yup.string()
        .required('Confirm your password')
        .oneOf([Yup.ref('password')], 'Password do not match'),
    phone: Yup.number()
        .positive('Provide a valid contact number')
        .required('Contact number is required'),
    address: Yup.string()
        .min(4, 'Provide a valid address')
        .required('Address is required'),
    role: Yup.string()

})

export default REGISTER_VALIDATION_SCHEMA