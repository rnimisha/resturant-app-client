import { Form } from 'formik';
import styled from 'styled-components';
import COLOR, { STATUSCOLOR } from '../../../constant/color';

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

export const StatusColored = styled.div<{ name: string }>`
    background-color: ${(props) =>
        props.name ? STATUSCOLOR[props.name][0] : COLOR.light};
    padding: 5px;
    border-radius: 15px;
    border: 1px solid ${COLOR.primary};
    border-color: ${(props) =>
        props.name ? STATUSCOLOR[props.name][1] : COLOR.primary};
    width: 180px;
    text-align: center;
    color: ${(props) =>
        props.name ? STATUSCOLOR[props.name][1] : COLOR.primary};
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;
`;
