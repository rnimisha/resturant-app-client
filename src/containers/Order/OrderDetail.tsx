import { useEffect, useState } from 'react';
import { getOrderDetailById } from '../../services/order.services';
import { type Products, type OrderType } from '../../utils/interface/interface';
import { Row } from '../Logout/logout.styled';
import { Individual, Item, ItemCentered } from '../Cart/cart.styled';
import moment from 'moment';
import { PriceDetail } from '../Products/product.styled';
import { round } from 'lodash';
import COLOR from '../../constant/color';

interface PropsType {
    orderId: number;
}
const OrderDetail = ({ orderId }: PropsType): JSX.Element => {
    const [orderInfo, setOrderInfo] = useState<OrderType>();

    const fetchOrderInfo = async (): Promise<void> => {
        const resp = await getOrderDetailById(orderId);

        setOrderInfo(resp.data);
    };

    useEffect(() => {
        fetchOrderInfo().catch((err) => {
            console.log(err);
        });
    }, []);

    const calcTotal = (): number => {
        if (orderInfo?.products) {
            const finaltotal = orderInfo?.products.reduce(
                (acc: number, current: Products) => {
                    const price = Number(current.price);
                    const quantity = Number(current.quantity);
                    acc = acc + price * quantity;
                    return acc;
                },
                0
            );

            return finaltotal;
        }

        return 0;
    };

    return (
        <div>
            <Row style={{ width: '100%' }}>
                <Item>
                    <PriceDetail style={{ color: COLOR.primary }}>
                        Order : #{orderId}
                    </PriceDetail>
                    <div>Payment: {orderInfo?.payment_method}</div>
                </Item>
                <Item>
                    <div>
                        Order Date:{' '}
                        {moment(orderInfo?.order_date).format('D MMMM YYYY')}
                    </div>
                    <div>Status: {orderInfo?.order_status}</div>
                </Item>
            </Row>

            <Individual style={{ marginTop: '30px', fontWeight: '600' }}>
                <Item>Product </Item>
                <ItemCentered>Quantity</ItemCentered>
                <ItemCentered>Price(&#36;)</ItemCentered>
                <Item>Total Price(&#36;)</Item>
            </Individual>

            {orderInfo?.products &&
                orderInfo?.products.map((item, index) => {
                    return (
                        <Individual key={index}>
                            <Item>{item.name}</Item>
                            <ItemCentered>{item.quantity}</ItemCentered>
                            <ItemCentered>{item.price}</ItemCentered>
                            <Item>
                                {item.price &&
                                    round(item.price * item.quantity, 2)}
                            </Item>
                        </Individual>
                    );
                })}

            <Row style={{ width: '100%', marginTop: '40px' }}>
                <Item></Item>
                <Item>
                    <PriceDetail>
                        Total: &#36;
                        {round(calcTotal(), 2)}
                    </PriceDetail>
                </Item>
            </Row>
        </div>
    );
};

export default OrderDetail;
