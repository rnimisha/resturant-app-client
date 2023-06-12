import { useAppDispatch, useAppSelector } from '../app/hook';
import { useNavigate } from 'react-router-dom';
import { type CartItem } from '../utils/interface/interface';
import { postToCart } from '../features/cartSlice';
import { toast } from 'react-toastify';

interface ReturnType {
    addToCart: (data: CartItem) => Promise<boolean>;
}

const useCart = (): ReturnType => {
    const { token, user_id } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const addToCart = async (data: CartItem): Promise<boolean> => {
        if (token.trim().length > 0 && user_id) {
            try {
                data.user_id = user_id;
                await dispatch(postToCart(data));
                return true;
            } catch (error) {
                throw new Error((error as Error).message);
            }
        } else {
            toast.warn('You need to login first');
            navigate('/login');
            return false;
        }
    };
    return {
        addToCart,
    };
};

export default useCart;
