import { useEffect, useState } from 'react';
import withAuth from '../../hoc/withAuth';
import useUserRole from '../../hooks/useUserRole';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchCartProducts } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { BtnContainer, Container } from './cart.styled';
import Heading from '../../components/Heading';
import IndividualCart from './IndividualCart';
import AppButton from '../../components/AppButton';
import { type CartItem } from '../../utils/interface/interface';
import { PriceDetail } from '../Products/product.styled';

const Cart = (): JSX.Element => {
    useUserRole({ rolesPermitted: ['C'] });
    const [total, setTotal] = useState(0);

    const dispatch = useAppDispatch();
    const { user_id } = useAppSelector((state) => state.user);
    const { products } = useAppSelector((state) => state.cart);

    const calcTotal = (): void => {
        const prod = products as CartItem[];
        const finaltotal = prod.reduce((acc: number, current: CartItem) => {
            const price = Number(current.price);
            const quantity = Number(current.cart_prod_quantity);
            acc = acc + price * quantity;
            return acc;
        }, 0);

        setTotal(finaltotal);
    };

    const fetchProducts = async (): Promise<void> => {
        if (user_id) {
            await dispatch(fetchCartProducts(user_id));
        }
    };

    useEffect(() => {
        fetchProducts().catch((error) => {
            console.log(error);
            toast.error('Unexpected Error');
        });
    }, []);

    useEffect(() => {
        calcTotal();
    }, [products]);

    return (
        <Container>
            <Heading text="My Cart" fontSize="26px" />
            <span>Total Products : {products.length}</span>
            {products.length === 0 && (
                <div>
                    <PriceDetail>Cart is Empty</PriceDetail>
                </div>
            )}
            {products.length !== 0 && (
                <>
                    <div>
                        {products.map((item, index) => {
                            return (
                                <IndividualCart
                                    key={index}
                                    item={item}
                                    fetchProducts={fetchProducts}
                                />
                            );
                        })}
                    </div>
                    <BtnContainer>
                        <PriceDetail>TOTAL: RS.{total}</PriceDetail>

                        <AppButton text="Checkout" />
                    </BtnContainer>
                </>
            )}
        </Container>
    );
};

export default withAuth(Cart);
