import styled from 'styled-components';

interface RowProps {
    justifyContent?: string;
}
interface ItemProps {
    width?: string;
    mediumWidth?: string;
    bgColor?: string;
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
    justify-content: ${(props) => props.justifyContent || 'space-between'};
`;

export const Item = styled.div<ItemProps>`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width || '100%'};
    justify-content: space-between;
    border-radius: 15px;
    box-shadow: ${(props) =>
        props.bgColor
            ? '0 4px 30px rgba(70, 70, 70, 0.09)'
            : '0 4px 30px rgba(70, 70, 70, 0.03)'};
    border: 1px solid rgba(236, 241, 233, 0.5);
    padding: 40px 30px;
    background-color: ${(props) => props.bgColor || 'transparent'};

    @media (max-width: 980px) {
        width: ${(props) => props.mediumWidth || '48%'};
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const ChartTitle = styled.h4`
    font-size: 19px;
    color: grey;
`;
