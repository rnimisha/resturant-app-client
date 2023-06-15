import styled from 'styled-components';
import COLOR from '../../constant/color';

export const Card = styled.div`
    width: 28%;
    min-height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 15px;
    border: 2px solid transparent;

    &:hover {
        border: 2px solid ${COLOR.primary};
        background-color: ${COLOR.light};
        cursor: pointer;
    }

    @media (max-width: 1280px) {
        width: 46%;
    }

    @media (max-width: 800px) {
        width: 90%;
    }

    @media (max-width: 500px) {
        padding: 10px;
    }
`;

export const ImageContainer = styled.div`
    width: 80%;
    margin-top: 20px;
    height: 200px;

    @media (max-width: 500px) {
        width: 99%;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;

    border-radius: 15px;
    object-fit: cover;
`;

export const Information = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 500px) {
        width: 99%;
    }
`;

export const LeftInfo = styled.div`
    width: 75%;
`;
export const RightInfo = styled.div`
    width: 25%;
    display: flex;
    justify-content: flex-end;
`;
export const CartBtn = styled.button`
    padding: 5px 10px;
    background-color: ${COLOR.primary};
    border-radius: 10px;
    border: none;

    &:hover {
        background-color: ${COLOR.lightPrimary};
        color: ${COLOR.primary};
        cursor: pointer;
    }
`;
