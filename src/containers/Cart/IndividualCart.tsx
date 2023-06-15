import { useEffect, useReducer } from 'react';
import { DeleteIcon, Individual, Item, ItemCentered } from './cart.styled';
import Heading from '../../components/Heading';
import { type CartItem } from '../../utils/interface/interface';
import { quantityReducer } from '../../utils/counter';
import Counter from '../../components/Counter';

import { updateCart } from '../../services/cart.services';
import { toast } from 'react-toastify';
import { debounce, round } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { deleteCartOneProduct } from '../../features/cartSlice';

interface PropsType {
    item: CartItem;
    fetchProducts: () => Promise<void>;
}

const IndividualCart = ({ item, fetchProducts }: PropsType): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { user_id } = useAppSelector((state) => state.user);
    const [quantity, dispatch] = useReducer(
        quantityReducer,
        item.cart_prod_quantity
    );

    const debouncedDispatch = debounce(dispatch, 500);

    const updateProdQuantity = async (): Promise<void> => {
        const id = Number(item.cart_id);
        if (quantity !== item.cart_prod_quantity) {
            await updateCart(id, quantity);
            await fetchProducts();
        }
    };

    const handleDelete = (): void => {
        const data = {
            user_id: Number(user_id),
            cart_id: Number(item.cart_id),
        };
        appDispatch(deleteCartOneProduct(data))
            .then(() => {
                toast.success('Product removed form cart');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Unexpected Error');
            });
    };

    useEffect(() => {
        updateProdQuantity().catch((err) => {
            console.log(err);
            toast.error('Unexpected Error');
        });
    }, [quantity]);

    return (
        <Individual>
            <Item>
                <Heading text={item.name as string} fontSize="18px" />
                <span>
                    <b>&#36;{item.price} </b>/<i>item</i>
                </span>
            </Item>
            <ItemCentered>
                <Counter quantity={quantity} dispatch={debouncedDispatch} />
            </ItemCentered>
            <ItemCentered>
                <DeleteIcon
                    onClick={() => {
                        handleDelete();
                    }}
                />
            </ItemCentered>
            <Item>
                <span>
                    <span style={{ fontWeight: 600 }}>Total :&nbsp;</span>
                    &#36;
                    {round(
                        Number(item.price ? item.price * quantity : item.price),
                        2
                    )}
                </span>
            </Item>
        </Individual>
    );
};

export default IndividualCart;
