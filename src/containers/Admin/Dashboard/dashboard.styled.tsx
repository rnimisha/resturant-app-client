import styled from 'styled-components';

interface RowProps {
    justifyContent?: string;
}
interface ItemProps {
    width?: string;
    mediumWidth?: string;
}
export const FlexBox = styled.div`
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;

export const Row = styled.div<RowProps>`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: ${(props) => props.justifyContent || 'space-between'};
`;

export const Item = styled.div<ItemProps>`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width || '100%'};

    @media (max-width: 980px) {
        width: ${(props) => props.mediumWidth || '48%'};
    }

    @media (max-width: 500px) {
        width: 100%;
    }
`;
