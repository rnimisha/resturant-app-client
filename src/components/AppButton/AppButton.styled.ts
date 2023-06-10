import styled from 'styled-components';

import COLOR from '../../constant/color';

export const ButtonStyled = styled.button`
    padding: 20px 10px;
    border-radius: 15px;
    background-color: ${COLOR.primary};
    color: ${COLOR.black};
    border-width: 2px;
    min-width: 150px;
    font-size: 18px;
    border-color: ${COLOR.primary};
    color: ${COLOR.black};
    font-weight: 500;

    &:hover {
        background-color: ${COLOR.lightPrimary};
        border-width: 2px;
        border-color: ${COLOR.primary};
        color: ${COLOR.primary};
    }

    @media (max-width: 510px) {
        min-width: 90%;
        font-size: 16px;
        padding: 5px;
    }
`;
