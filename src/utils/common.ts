import { type FieldError, type userError } from './interface/interface';

export const extractError = (error: FieldError[]): userError => {
    const err = error.reduce((acc, current) => ({ ...acc, [current.field]: current.description }), {});

    return err;
};
