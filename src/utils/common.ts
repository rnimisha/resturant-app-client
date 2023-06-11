import { type AxiosError } from 'axios';
import { type ErrorResponse, type FieldError, type userError } from './interface/interface';

export const extractError = (error: FieldError[]): userError => {
    const err = error.reduce((acc, current) => ({ ...acc, [current.field]: current.description }), {});

    return err;
};


export const getErrorResponse = (error : AxiosError): ErrorResponse =>{

    let err: ErrorResponse = { success: false, msg: 'Unexpected Error' };

    if(error?.response?.data){
        const success: boolean = (error.response.data as ErrorResponse).success || false

        const msg: string = (error.response.data as ErrorResponse).msg || 'Unexpected Server Error'

        const fieldError = (error.response.data as ErrorResponse).fieldError || []

        err = {
            success,
            msg,
            fieldError
        }
    }
    return err
}