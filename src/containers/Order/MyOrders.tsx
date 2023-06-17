import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hook';
import {
    type ErrorResponse,
    type OrderType,
} from '../../utils/interface/interface';
import AppTable from '../../components/AppTable';
import { ORDER_COLUMNS, STATUS_OPTION } from '../../constant/columns';
import { getAllOrders } from '../../services/order.services';
import Modal from 'react-modal';
import { ModalProductStyles } from '../../constant/styles';
import OrderDetail from './OrderDetail';
import { Row } from '../Logout/logout.styled';
import Heading from '../../components/Heading';
import SelectBox from '../../components/InputBox/SelectBox';

const MyOrders = (): JSX.Element => {
    const { user_id } = useAppSelector((state) => state.user);

    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [status, setStatus] = useState<string>('all');

    const [openView, setOpenView] = useState<boolean>(false);
    const [currentOrderId, setCurrentOrderId] = useState<number>();
    const [allOrders, setAllOrders] = useState<OrderType[]>();

    const fetchOrders = async (): Promise<void> => {
        const p = page + 1;
        const resp = await getAllOrders(status, p, Number(user_id));
        setAllOrders(resp.data.orders);
        setTotal(resp.data.total);
    };

    const viewAction = (id: number): void => {
        setOpenView(true);
        setCurrentOrderId(id);
    };

    const updateStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setStatus(e.currentTarget.value);
    };

    useEffect(() => {
        user_id &&
            fetchOrders().catch((err) => {
                const error = JSON.parse(
                    (err as Error).message
                ) as ErrorResponse;
                if (error.msg === 'Order Not Found') {
                    setAllOrders([]);
                }
            });
    }, [status, page]);
    return (
        <div>
            <Row style={{ width: '100%', margin: '20px 0' }}>
                <div>
                    <Heading text="My Orders" />
                </div>
                <div>
                    <SelectBox
                        name="order_status"
                        options={STATUS_OPTION}
                        defaultVal={'all'}
                        onChange={updateStatus}
                    />
                </div>
            </Row>
            <AppTable
                data={allOrders as OrderType[]}
                total={total}
                page={page}
                setPage={setPage}
                columns={ORDER_COLUMNS}
                viewAction={viewAction}
                id="order_id"
            />

            <Modal
                isOpen={openView}
                style={ModalProductStyles}
                onRequestClose={() => {
                    setOpenView(false);
                }}
            >
                {currentOrderId && <OrderDetail orderId={currentOrderId} />}
            </Modal>
        </div>
    );
};

export default MyOrders;
