import { useEffect, useReducer } from 'react';
import { Individual, Item } from './cart.styled';
import Heading from '../../components/Heading';
import { type CartItem } from '../../utils/interface/interface';
import { quantityReducer } from '../../utils/counter';
import Counter from '../../components/Counter';

import { updateCart } from '../../services/cart.services';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
interface PropsType {
    item: CartItem;
    fetchProducts: () => Promise<void>;
}

const IndividualCart = ({ item, fetchProducts }: PropsType): JSX.Element => {
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
                    <b>Rs. {item.price} </b>/<i>item</i>
                </span>
            </Item>
            <Item
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Counter quantity={quantity} dispatch={debouncedDispatch} />
            </Item>
            <Item>
                <span>
                    <span style={{ fontWeight: 600 }}>Total :&nbsp;</span>
                    Rs.{item.price ? item.price * quantity : item.price}
                </span>
            </Item>
        </Individual>
    );
};

export default IndividualCart;
