import styled from 'styled-components';
import COLOR from '../../constant/color';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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
        margin-right: 20px;
        align-items: end;
    }
`;
export const ItemCentered = styled(Item)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 1rem;
    margin-top: 30px;
`;

export const DeleteIcon = styled(DeleteOutlineOutlinedIcon)`
    font-size: 20px;
    color: ${COLOR.error};

    &:hover {
        scale: calc(1.1);
        cursor: pointer;
    }
`;
