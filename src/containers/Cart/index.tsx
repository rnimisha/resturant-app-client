import { useEffect } from 'react';
import withAuth from '../../hoc/withAuth';
import useUserRole from '../../hooks/useUserRole';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchCartProducts } from '../../features/cartSlice';

const Cart = (): JSX.Element => {
    useUserRole({ rolesPermitted: ['C'] });
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart);

    const fetchProducts = async (): Promise<void> => {
        await dispatch(fetchCartProducts(4));
    };

    useEffect(() => {
        fetchProducts().catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            {products.map((item, index) => {
                return <div key={index}>{item.name}</div>;
            })}
        </div>
    );
};

export default withAuth(Cart);
