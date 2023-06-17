import { useParams } from 'react-router-dom';
import OrderDetail from './OrderDetail';
import Heading from '../../components/Heading';
import { Box } from '@mui/material';

const Order = (): JSX.Element => {
    const { id } = useParams();

    return (
        <div>
            <Box my={2} sx={{ textAlign: 'center' }}>
                <Heading text="Order has been placed!" fontSize="2rem" />
            </Box>

            <div>{id && <OrderDetail orderId={Number(id)} />}</div>
        </div>
    );
};

export default Order;
