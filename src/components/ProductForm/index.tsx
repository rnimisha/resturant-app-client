import { Formik, type FormikHelpers } from 'formik';
import {
    type optionVal,
    type CategoryItem,
    type ErrorResponse,
    type ProductType,
} from '../../utils/interface/interface';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Heading from '../Heading';
import InputBox from '../InputBox';
import AppButton from '../AppButton';
import { ModalForm } from '../../containers/Admin/Products/product.styled';
import { Box } from '@mui/material';
import { Row } from '../../containers/Logout/logout.styled';
import { extractError } from '../../utils/common';
import { addNewProduct, updateProduct } from '../../services/product.services';
import { useEffect, useRef, useState } from 'react';
import SelectBox from '../InputBox/SelectBox';
import { getCategory } from '../../services/category.services';

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
    const [fileName, setFileName] = useState<File | null>(null);
    const [categories, setCategories] = useState<optionVal[]>();
    const ref = useRef<HTMLInputElement>(null);

    const initialValues: ProductType = {
        product_id: product?.product_id || 0,
        name: product?.name || '',
        category_id: product?.category_id || 5,
        price: product?.price || undefined,
        unit: product?.unit || '',
        description: product?.description || '',
        quantity: 1,
        image: product?.image || '',
    };

    const submitEditProduct = async (
        values: ProductType,
        actions: FormikHelpers<ProductType>
    ): Promise<void> => {
        setLoading(true);
        closeModal();

        try {
            const { image, ...vals } = values;
            const response = await updateProduct(vals);
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

    const submitAddProduct = async (
        values: ProductType,
        actions: FormikHelpers<ProductType>
    ): Promise<void> => {
        setLoading(true);

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.set(key, (values as any)[key]);
        });

        try {
            const response = await addNewProduct(formData);
            console.log(response.data);
            if (setProducts && allProducts)
                setProducts([response.data, ...allProducts]);
            closeModal();
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

    useEffect(() => {
        getCategory()
            .then((resp) => {
                const options: optionVal[] = resp.data.reduce(
                    (acc: optionVal[], current: CategoryItem) => {
                        const newVal = {
                            option: current.category_name,
                            value: current.category_id,
                        };
                        return [...acc, newVal];
                    },
                    []
                );
                setCategories(options);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={
                    action === 'edit' ? submitEditProduct : submitAddProduct
                }
                encType="multipart/form-data"
            >
                {({ errors, touched, setFieldValue }) => (
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
                        <SelectBox
                            name="category_id"
                            options={categories as optionVal[]}
                            defaultVal={Number(initialValues.category_id)}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => {
                                void setFieldValue(
                                    'category_id',
                                    e.currentTarget.value
                                );
                            }}
                        />

                        <InputBox
                            name="description"
                            placeholder="Description......."
                            err={errors.description}
                            touched={touched.description}
                        />

                        {action === 'add' && (
                            <>
                                <input
                                    style={{ display: 'none' }}
                                    ref={ref}
                                    type="file"
                                    name="image"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => {
                                        const selectedFile =
                                            e?.currentTarget?.files &&
                                            e?.currentTarget?.files[0];
                                        void setFieldValue(
                                            'image',
                                            selectedFile
                                        );
                                        setFileName(selectedFile);
                                    }}
                                ></input>

                                <div
                                    style={{
                                        margin: '10px 0',
                                    }}
                                >
                                    <span>
                                        {fileName?.name && (
                                            <img
                                                style={{
                                                    width: '120px',
                                                    maxHeight: '120px',
                                                }}
                                                src={URL.createObjectURL(
                                                    fileName
                                                )}
                                            />
                                        )}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (ref.current) ref.current.click();
                                    }}
                                >
                                    <AddPhotoAlternateIcon />
                                    {fileName?.name
                                        ? 'Change Image'
                                        : 'Upload Image'}
                                </button>
                            </>
                        )}
                        <Box mt={2} />

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
