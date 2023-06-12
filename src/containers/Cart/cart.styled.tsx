import styled from 'styled-components';
import COLOR from '../../constant/color';

export const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 10%;
    margin-top: 20px;
`;

export const Individual = styled.div`
    border-bottom: 1px solid ${COLOR.lightPrimary};
    padding: 15px 0;
    display: flex;
    align-items: center;
`;

export const Item = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    &:last-child {
        text-align: right;
        margin-left: 10px;
    }
`;

export const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;
