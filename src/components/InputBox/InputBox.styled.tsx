import styled from 'styled-components';
import { Field } from 'formik';
import COLOR from '../../constant/color';

export const TextBox = styled(Field)`
    font-family: inherit;
    width: 90%;
    margin-left: 5%;
    justify-content: center;
    align-items: center;
    border: 0;
    border-bottom: ${(props) =>
        props.err && props.touched
            ? `2px solid ${COLOR.error}`
            : `2px solid ${COLOR.primary}`};
    outline: 0;
    padding-top: 7px;
    background: transparent;
`;

export const Error = styled.div`
    font-size: 0.8rem;
    color: ${COLOR.error};
    padding: 0;
    margin-top: 4px;
    text-align: center;
`;
