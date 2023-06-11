import { type AxiosResponse, type AxiosError } from 'axios';
import api from '.';
import APIROUTES from '../constant/apiRoutes';
import { type User , type ErrorResponse } from '../utils/interface/interface';

export const loginUsers = async (user: User): Promise<AxiosResponse<User>> => {
    try {
        const response = await api.post(APIROUTES.LOGIN, user);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        let err: ErrorResponse = { success: false, msg: 'Unexpected Error' };

        if (axiosError?.response?.data) {
            const success: boolean =
                (axiosError.response.data as ErrorResponse).success || false;
            const msg: string =
                (axiosError.response.data as ErrorResponse).msg ||
                'Unexpected Error';
            const fieldError =
                (axiosError.response.data as ErrorResponse).fieldError || [];

            err = {
                success,
                msg,
                fieldError,
            };
        }
        throw new Error(JSON.stringify(err));
    }
};
