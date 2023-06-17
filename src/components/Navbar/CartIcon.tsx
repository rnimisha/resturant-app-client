import Badge, { type BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../app/hook';
import { useEffect, useState } from 'react';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const CartIcon = (): JSX.Element => {
    const { products } = useAppSelector((state) => state.cart);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const count = products.length;
        setTotal(count);
    }, [products]);
    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={total} color="success">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    );
};

export default CartIcon;
