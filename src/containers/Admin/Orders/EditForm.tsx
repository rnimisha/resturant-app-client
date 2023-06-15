import { Formik, type FormikHelpers } from 'formik';

import SelectBox from '../../../components/InputBox/SelectBox';
import { STATUS_OPTION } from '../../../constant/columns';
import { ModalForm } from '../Products/product.styled';
import Heading from '../../../components/Heading';
import AppButton from '../../../components/AppButton';
import { Box } from '@mui/material';
import { type UpdateOrder } from '../../../utils/interface/interface';
import { useEffect, useState } from 'react';
import { getOrderDetailById } from '../../../services/order.services';

interface PropsType {
    order_id: number;
    action: (
        values: UpdateOrder,
        actions: FormikHelpers<UpdateOrder>
    ) => Promise<void>;
}
const EditForm = ({ order_id, action }: PropsType): JSX.Element => {
    const [status, setStatus] = useState<string>('Order Received');
    const initialValue = {
        order_id,
        order_status: status,
    };

    useEffect(() => {
        getOrderDetailById(order_id)
            .then((resp) => {
                setStatus(resp.data.order_status);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Formik initialValues={initialValue} onSubmit={action}>
            {({ setFieldValue }) => (
                <ModalForm>
                    <Heading text="Update order status" />
                    <Box my={2} />
                    <SelectBox
                        name="order_status"
                        options={STATUS_OPTION.slice(1)}
                        defaultVal={initialValue.order_status}
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                        ): void => {
                            void setFieldValue(
                                'order_status',
                                e.currentTarget.value
                            );
                        }}
                    />
                    <AppButton text="Update" type="submit" />
                </ModalForm>
            )}
        </Formik>
    );
};

export default EditForm;
