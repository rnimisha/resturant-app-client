import styled from 'styled-components'
import { Form } from 'formik'

export const FormStyled = styled(Form)`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(70, 70, 70, 0.09);
    backdrop-filter: blur(2px);
    border: 1px solid rgba(236, 241, 233, 0.5);
    padding: 100px 15px;

    @media (max-width: 980px) {
        width: 90%;
        margin-left: 5%;
    }

`