import styled from "styled-components";
import COLOR from "../../constant/color";
import { Slider } from "@mui/material";

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
export const PrettoSlider = styled(Slider)({
  color: COLOR.primary,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: COLOR.primary,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: COLOR.light,
    border: `2px solid ${COLOR.primary}`,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: COLOR.primary,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
