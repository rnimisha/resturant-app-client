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
    padding: 20px 30px;
`;

export const Element = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    display: flex;
    flex-direction: column;
`;

export const Total = styled.div`
    width: 100%;
    font-size: 22px;
    color: ${COLOR.primary};
    font-weight: 600;
`;

export const Name = styled.div`
    width: 100%;
    font-weight: 500;
`;

export const StyledIcon = styled(Icon)`
    height: 100% !important;
    width: 100% !important;
    font-size: 2.8rem !important;
    color: ${COLOR.secondary};
    text-align: right;
`;

export const MiniIcon = styled(Icon)`
    height: 100% !important;
    width: 100% !important;
    font-size: 1.2rem !important;
    color: ${COLOR.primary};
    font-weight: bold;
    text-align: right;
`;
