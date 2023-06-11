import { type AxiosResponse, type AxiosError } from 'axios';
import api from '.';
import APIROUTES from '../constant/apiRoutes';
import { type User , type RegisterUser } from '../utils/interface/interface';
import { getErrorResponse } from '../utils/common';

export const loginUsers = async (user: User): Promise<AxiosResponse<User>> => {
    try {
        const response = await api.post(APIROUTES.LOGIN, user);
        return response.data;
    } catch (error) {
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }
};

export const registerUsers = async (user: RegisterUser): Promise<AxiosResponse<RegisterUser>> => {
    try {
        const response = await api.post(APIROUTES.REGISTER, user);
        return response.data;
    } catch (error) {
        const err = getErrorResponse(error as AxiosError)
        throw new Error(JSON.stringify(err));
    }
};
