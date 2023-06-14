import { Form } from 'formik';
import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
`;

export const ModalForm = styled(Form)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    border-radius: 16px;
    padding: 100px 15px;

    @media (max-width: 980px) {
        width: 90%;
        margin-left: 5%;
    }
`;
