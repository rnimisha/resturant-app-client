import {
    type OnApproveData,
    type CreateOrderActions,
    type CreateOrderData,
} from '@paypal/paypal-js';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { round } from 'lodash';

interface PropsType {
    setPaid: React.Dispatch<React.SetStateAction<boolean>>;
    total: number;
}

const Payment = ({ setPaid, total }: PropsType): JSX.Element => {
    const createOrder = async (
        data: CreateOrderData,
        actions: CreateOrderActions
    ): Promise<any> => {
        const t = round(total, 2);
        // Order is created on the server and the order id is returned
        return await fetch(
            'http://localhost:3000/payment/my-server/create-paypal-order',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total: t,
                }),
            }
        )
            .then(async (response) => await response.json())
            .then((order) => order.id);
    };

    const onApprove = async (
        data: OnApproveData,
        actions: any
    ): Promise<any> => {
        return await fetch(
            'http://localhost:3000/payment/my-server/capture-paypal-order',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                }),
            }
        ).then(async (response) => {
            setPaid(true);
            return await response.json();
        });
    };

    return (
        <PayPalButtons
            createOrder={async (data, actions) =>
                await createOrder(data, actions)
            }
            onApprove={async (data, actions) => await onApprove(data, actions)}
        />
    );
};

export default Payment;
