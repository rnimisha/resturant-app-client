// imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// redux
import { useAppDispatch, useAppSelector } from '../../app/hook';
import {
    deleteAllCartProducts,
    fetchCartProducts,
} from '../../features/cartSlice';

// hoc and hook
import withAuth from '../../hoc/withAuth';
import useUserRole from '../../hooks/useUserRole';

// services
import { placeOrder } from '../../services/order.services';

// interface
import {
    type Products,
    type CartItem,
    type OrderType,
} from '../../utils/interface/interface';

// styles
import { BtnContainer, Container } from './cart.styled';
import { PriceDetail } from '../Products/product.styled';
import { ModalCustomStyles } from '../../constant/styles';

// components
import Heading from '../../components/Heading';
import IndividualCart from './IndividualCart';
import Loader from '../../components/Loader';
import Payment from '../../components/Payment';
import AppButton from '../../components/AppButton';

const Cart = (): JSX.Element => {
    useUserRole({ rolesPermitted: ['C'] });
    const navigate = useNavigate();

    // states
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState<boolean>(false);
    const [checkout, setcheckout] = useState<boolean>(false);

    // redux
    const dispatch = useAppDispatch();
    const { user_id } = useAppSelector((state) => state.user);
    const { products } = useAppSelector((state) => state.cart);

    // calculate total of checkout
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

    // fetch user's cart products
    const fetchProducts = async (): Promise<void> => {
        if (user_id) {
            await dispatch(fetchCartProducts(user_id));
        }
    };

    // after payal payment is success remove cart items
    const paymentSuccess = (): void => {
        const prod = products as CartItem[];

        const orderProducts: Products[] = prod.map((item) => {
            return {
                product_id: item.product_id,
                quantity: item.cart_prod_quantity,
            };
        });

        const data: OrderType = {
            user_id: Number(user_id),
            order_status: 'Order Received',
            payment_method: 'COD',
            paid: 'F',
            products: orderProducts,
        };

        setLoading(true);

        placeOrder(data)
            .then((resp) => {
                const id = Number(user_id);
                dispatch(deleteAllCartProducts({ user_id: id })).catch(
                    (err) => {
                        alert(err);
                    }
                );
                setLoading(true);
                navigate(`/orders/${resp.data.order_id}`);
            })
            .catch((err) => {
                alert(err);
            });
    };

    // side effects
    useEffect(() => {
        fetchProducts().catch((error) => {
            console.log(error);
            toast.error('Unexpected Error');
        });
    }, []);

    useEffect(() => {
        calcTotal();
    }, [products]);

    useEffect(() => {
        paid && paymentSuccess();
    }, [paid]);

    return (
        <Container>
            {loading && <Loader overlay={true} />}
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
                        {!checkout && (
                            <AppButton
                                text="Checkout"
                                action={() => {
                                    setcheckout(true);
                                }}
                            />
                        )}
                    </BtnContainer>

                    <Modal
                        isOpen={checkout}
                        onRequestClose={() => {
                            setcheckout(false);
                        }}
                        style={ModalCustomStyles}
                    >
                        <Heading text="Pay with paypal" fontSize="16px" />
                        <br />
                        <Payment setPaid={setPaid} total={total} />
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default withAuth(Cart);
