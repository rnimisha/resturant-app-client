import { useEffect } from 'react';
import withAuth from '../../hoc/withAuth';
import useUserRole from '../../hooks/useUserRole';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchCartProducts } from '../../features/cartSlice';

const Cart = (): JSX.Element => {
    useUserRole({ rolesPermitted: ['C'] });
    const { user_id } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart);

    const fetchProducts = async (): Promise<void> => {
        if (user_id) {
            await dispatch(fetchCartProducts(user_id));
        }
    };

    useEffect(() => {
        fetchProducts().catch((error) => {
            // --- todo
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
