import styled from 'styled-components';
import { Container } from '@mui/material';

export const MainContainer = styled(Container)`
    justify-content: center;
    align-items: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    min-height: 100vh;
`;

export const Item = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;

    @media (max-width: 980px) {
        flex-direction: column;
        width: 100%;
    }
`;
