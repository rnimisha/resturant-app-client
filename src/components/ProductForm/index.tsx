import { Formik, type FormikHelpers } from 'formik';
import {
    type ErrorResponse,
    type ProductType,
} from '../../utils/interface/interface';
import Heading from '../Heading';
import InputBox from '../InputBox';
import AppButton from '../AppButton';
import { ModalForm } from '../../containers/Admin/Products/product.styled';
import { Box } from '@mui/material';
import { Row } from '../../containers/Logout/logout.styled';
import { extractError } from '../../utils/common';
import { updateProduct } from '../../services/product.services';

interface PropsType {
    action: 'add' | 'edit';
    allProducts?: ProductType[];
    product?: ProductType;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: () => void;
    setProducts?: (data: ProductType[]) => void;
}
const ProductForm = ({
    action,
    product,
    setLoading,
    closeModal,
    setProducts,
    allProducts,
}: PropsType): JSX.Element => {
    const initialValues: ProductType = {
        product_id: product?.product_id || 0,
        name: product?.name || '',
        category_id: product?.category_id || 0,
        price: product?.price || undefined,
        unit: product?.unit || '',
        description: product?.description || '',
        quantity: 1,
    };

    const submitEditProduct = async (
        values: ProductType,
        actions: FormikHelpers<ProductType>
    ): Promise<void> => {
        setLoading(true);
        closeModal();

        try {
            const response = await updateProduct(values);
            console.log(response.data);

            const prod = [...(allProducts as ProductType[])];
            const findAndReplace = prod?.find(
                (item) => item.product_id === response.data.product_id
            );
            if (findAndReplace) {
                findAndReplace.name = response.data.name;
                findAndReplace.category_id = response.data.category_id;
                findAndReplace.price = response.data.price;
                findAndReplace.description = response.data.description;
                findAndReplace.unit = response.data.unit;
            }
            if (setProducts) setProducts(prod);

            console.log(allProducts);
        } catch (error) {
            const err = JSON.parse((error as Error).message) as ErrorResponse;
            if (err.fieldError != null) {
                const errs = extractError(err.fieldError);
                actions.setErrors(errs);
            } else {
                alert(err.msg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={submitEditProduct}>
                {({ errors, touched }) => (
                    <ModalForm>
                        <Heading
                            text={
                                action === 'edit'
                                    ? 'Update Product'
                                    : 'Add New Product'
                            }
                        />
                        <Box mt={4} />

                        <InputBox
                            name="name"
                            placeholder="Product name"
                            err={errors.name}
                            touched={touched.name}
                        />

                        <Row>
                            <InputBox
                                name="price"
                                placeholder="Price"
                                err={errors.price}
                                touched={touched.price}
                            />
                            <InputBox
                                name="unit"
                                placeholder="Unit"
                                err={errors.unit}
                                touched={touched.unit}
                            />
                        </Row>

                        <InputBox
                            name="description"
                            placeholder="Description......."
                            err={errors.description}
                            touched={touched.description}
                        />

                        <AppButton
                            text={
                                action === 'edit'
                                    ? 'Update Product'
                                    : 'Add Product'
                            }
                            type="submit"
                        />
                    </ModalForm>
                )}
            </Formik>
        </>
    );
};

export default ProductForm;
