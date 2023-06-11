import styled from "styled-components";
import COLOR from "../../constant/color";

export const Card = styled.div`
    width: 28%;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 15px;
    border: 2px solid transparent;

    &:hover{
        border: 2px solid ${COLOR.primary};
        background-color: ${COLOR.light};
        cursor: pointer;
    }

`

export const ImageContainer = styled.div`
    width: 80%;
    height: 300px;
    margin-top: 20px;
`

export const Image = styled.img`
    width: 100%;
    border-radius: 15px;
`

export const Information = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LeftInfo = styled.div`
    width: 75%;
`
export const RightInfo = styled.div`
    width: 25%;
    display: flex;
    justify-content: flex-end;
`
export const CartBtn = styled.button`
    padding: 5px 10px;
    background-color: ${COLOR.primary};
    border-radius: 10px;
    border: none;

    &:hover{
        background-color: ${COLOR.lightPrimary};
        color:  ${COLOR.primary};
        cursor: pointer;
    }
`