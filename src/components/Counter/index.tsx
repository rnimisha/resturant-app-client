import { Box, ButtonGroup } from '@mui/material';
import { StyledBtn } from '../../containers/Products/product.styled';
import { type QuantityAction } from '../../utils/counter';

interface PropsType {
    dispatch: (value: QuantityAction) => void;
    quantity: number;
}

const Counter = ({ dispatch, quantity }: PropsType): JSX.Element => {
    return (
        <Box my={2}>
            <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
            >
                <StyledBtn
                    onClick={() => {
                        dispatch({ type: 'DECREMENT' });
                    }}
                >
                    -
                </StyledBtn>
                <StyledBtn sx={{ cursor: 'default' }}>{quantity}</StyledBtn>
                <StyledBtn
                    onClick={() => {
                        dispatch({ type: 'INCREMENT' });
                    }}
                >
                    +
                </StyledBtn>
            </ButtonGroup>
        </Box>
    );
};

export default Counter;
