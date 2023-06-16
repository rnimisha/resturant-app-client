import { MainContainer } from '../Products/product.styled';
import Heading from '../../../components/Heading';
import { useEffect, useState } from 'react';
import {
    getAllOrders,
    updateOrderStatus,
} from '../../../services/order.services';
import {
    type UpdateOrder,
    type ErrorResponse,
    type OrderType,
} from '../../../utils/interface/interface';
import AppTable from '../../../components/AppTable';
import { ORDER_COLUMNS, STATUS_OPTION } from '../../../constant/columns';
import { Row } from '../../Logout/logout.styled';
import SelectBox from '../../../components/InputBox/SelectBox';
import Modal from 'react-modal';
import {
    ModalCustomStyles,
    ModalProductStyles,
} from '../../../constant/styles';
import EditForm from './EditForm';
import { type FormikHelpers } from 'formik';
import Loader from '../../../components/Loader';
import OrderDetail from '../../Order/OrderDetail';
import { Box } from '@mui/material';

const Orders = (): JSX.Element => {
    const [allOrders, setAllOrders] = useState<OrderType[]>();
    const [status, setStatus] = useState<string>('all');

    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openView, setOpenView] = useState<boolean>(false);
    const [currentOrderId, setCurrentOrderId] = useState<number>();

    const fetchOrders = async (): Promise<void> => {
        const p = page + 1;
        const resp = await getAllOrders(status, p);
        setAllOrders(resp.data.orders);
        setTotal(resp.data.total);
    };

    useEffect(() => {
        fetchOrders().catch((err) => {
            const error = JSON.parse((err as Error).message) as ErrorResponse;
            if (error.msg === 'Order Not Found') {
                setAllOrders([]);
            }
        });
    }, [status]);

    const editAction = async (id: number): Promise<void> => {
        setOpenEdit(true);
        setCurrentOrderId(id);
    };

    const viewAction = (id: number): void => {
        setOpenView(true);
        setCurrentOrderId(id);
    };

    const updateStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setStatus(e.currentTarget.value);
    };

    const handleUpdateStatus = async (
        values: UpdateOrder,
        _: FormikHelpers<UpdateOrder>
    ): Promise<void> => {
        setLoading(true);
        setOpenEdit(false);
        try {
            const resp = await updateOrderStatus(values);
            const orders = [...(allOrders as OrderType[])];

            const findAndReplace = orders?.find(
                (item) => item.order_id === values.order_id
            );

            if (findAndReplace) {
                findAndReplace.order_status = resp.data.order_status;
            }

            setAllOrders(orders);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer>
            <Row style={{ width: '100%', margin: '20px 0' }}>
                <div>
                    <Heading text="Manage Orders" />
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
                editAction={editAction}
                viewAction={viewAction}
                id="order_id"
            />
            <Box mb={4} />

            <Modal
                isOpen={openEdit}
                style={ModalCustomStyles}
                onRequestClose={() => {
                    setOpenEdit(false);
                }}
            >
                <EditForm
                    order_id={Number(currentOrderId)}
                    action={handleUpdateStatus}
                />
            </Modal>

            <Modal
                isOpen={openView}
                style={ModalProductStyles}
                onRequestClose={() => {
                    setOpenView(false);
                }}
            >
                {currentOrderId && <OrderDetail orderId={currentOrderId} />}
            </Modal>

            {loading && <Loader overlay={true} />}
        </MainContainer>
    );
};

export default Orders;
