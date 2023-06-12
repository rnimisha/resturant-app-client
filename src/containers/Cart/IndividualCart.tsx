import { useEffect, useReducer } from 'react';
import { Individual, Item } from './cart.styled';
import Heading from '../../components/Heading';
import { type CartItem } from '../../utils/interface/interface';
import { quantityReducer } from '../../utils/counter';
import Counter from '../../components/Counter';

interface PropsType {
    item: CartItem;
}

const IndividualCart = ({ item }: PropsType): JSX.Element => {
    const [quantity, dispatch] = useReducer(
        quantityReducer,
        item.cart_prod_quantity
    );

    useEffect(() => {}, [quantity]);

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
                <Counter quantity={quantity} dispatch={dispatch} />
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
