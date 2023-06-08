import { FieldError, userError } from "./interface/interface";

export const extractError = (error : FieldError[]): userError=>{

    const err = error.reduce((acc, current)=>{

        return {...acc, [current.field]:current.description}
    }, {})

    return err
}