import styled from 'styled-components';
import COLOR from '../../constant/color';
import { Button } from '@mui/material';

export const ProductContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
`;

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`;

export const FilterContainer = styled.div`
    width: 20%;
    min-height: 90vh;
    position: fixed;
    top: 100px;
    border-radius: 15px;
    /* justify-content: center;
    display: flex; */
    border: 2px solid ${COLOR.light};
    padding: 30px 10px 20px 30px;
    @media (max-width: 800px) {
        width: 30%;
    }

    @media (max-width: 500px) {
        display: none;
    }
`;

export const AllProducts = styled.div`
    width: 80%;
    position: absolute;
    right: 0;

    @media (max-width: 800px) {
        width: 70%;
    }

    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const SingleContainer = styled.div`
    display: flex;
    width: 80%;
    margin-left: 10%;
    margin-top: 40px;
    justify-content: space-between;
    @media (max-width: 980px) {
        width: 90%;
        margin-left: 5%;
    }
    @media (max-width: 680px) {
        flex-direction: column;
    }
`;

export const ImageSide = styled.div`
    width: 49%;
    min-height: 300px;

    @media (max-width: 680px) {
        width: 100%;
        min-height: 100px;
    }
`;

export const InfoSide = styled.div`
    width: 49%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-top: 10px;
    justify-content: space-evenly;
    @media (max-width: 680px) {
        width: 100%;
    }
`;
export const PriceDetail = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
`;
export const Image = styled.img`
    max-width: 90%;
`;

export const StyledBtn = styled(Button)`
    && {
        color: ${COLOR.primary};
        font-weight: 600;
        border: 1.5px solid ${COLOR.primary};
    }
`;

export const BarContainer = styled.div`
    width: 95%;
    display: flex;
    justify-content: end;
`;
