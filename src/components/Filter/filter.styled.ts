import styled from "styled-components";
import COLOR from "../../constant/color";
import ReactSlider from "react-slider";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Title = styled.h3`
    font-size: 1.1rem;
    font-weight: 600px;
    color: ${COLOR.primary};

`

export const StyledSlider = styled(ReactSlider)`
  margin: 30px 0 30px -10px;
  min-height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
`;

export const StyledThumb = styled.div`
    height: 40px;
    width: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    background-color: ${COLOR.light};
    color: ${COLOR.black};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    cursor: grab;
    border: 2px solid ${COLOR.primary};
`;

export const StyledTrack = styled.div<{index: number}>`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? COLOR.lightPrimary : props.index === 1 ? COLOR.primary : '#ddd')};
    border-radius: 999px;
`;