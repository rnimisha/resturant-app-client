import { useEffect } from 'react';
import withAuth from '../../hoc/withAuth';
import useUserRole from '../../hooks/useUserRole';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchCartProducts } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { BtnContainer, Container } from './cart.styled';
import Heading from '../../components/Heading';
import IndividualCart from './IndividualCart';
import AppButton from '../../components/AppButton';

const Cart = (): JSX.Element => {
    useUserRole({ rolesPermitted: ['C'] });

    const dispatch = useAppDispatch();
    const { user_id } = useAppSelector((state) => state.user);
    const { products } = useAppSelector((state) => state.cart);

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

    return (
        <Container>
            <Heading text="My Cart" fontSize="26px" />
            <span>Total Products : {products.length}</span>
            <div>
                {products.map((item, index) => {
                    return <IndividualCart key={index} item={item} />;
                })}
            </div>
            <BtnContainer>
                <AppButton text="Checkout" />
            </BtnContainer>
        </Container>
    );
};

export default withAuth(Cart);
