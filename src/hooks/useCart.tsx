import { useAppDispatch, useAppSelector } from '../app/hook';
import { useNavigate } from 'react-router-dom';
import { type CartItem } from '../utils/interface/interface';
import { postToCart } from '../features/cartSlice';

interface ReturnType {
    addToCart: (data: CartItem) => Promise<void>;
}

const useCart = (): ReturnType => {
    const { token, user_id } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const addToCart = async (data: CartItem): Promise<void> => {
        if (token.trim().length > 0 && user_id) {
            try {
                data.user_id = user_id;
                await dispatch(postToCart(data));
            } catch (error) {
                // --- todo
                alert(error);
            }
        } else {
            // --- todo
            alert('login first');
            navigate('/login');
        }
    };
    return {
        addToCart,
    };
};

export default useCart;
