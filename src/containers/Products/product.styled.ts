import styled from "styled-components";
import COLOR from "../../constant/color";

export const ProductContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
`

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`

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
`

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
`