import styled from 'styled-components';
import COLOR from '../../constant/color';
import Icon from '@mui/material/Icon';

export const Container = styled.div`
    border-radius: 15px;
    box-shadow: 0 4px 30px rgba(70, 70, 70, 0.09);
    border: 1px solid rgba(236, 241, 233, 0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
`;

export const Element = styled.div<{ width: string }>`
    width: ${(props) => props.width};
`;

export const Total = styled.div`
    width: 100%;
    font-size: 28px;
    color: ${COLOR.primary};
    font-weight: 600;
    text-align: center;
`;

export const Name = styled.div`
    width: 100%;
    font-weight: 500;
    text-align: center;
`;

export const StyledIcon = styled(Icon)`
    height: 100%;
    width: 100%;
    font-size: 2.2rem;
    color: ${COLOR.secondary};
`;
