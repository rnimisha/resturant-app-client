import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { MainContainer } from './product.styled';

import AppTable from '../../../components/AppTable';
import Heading from '../../../components/Heading';
import { type ProductType } from '../../../utils/interface/interface';
import {
    getProductById,
    getProducts,
} from '../../../services/product.services';
import { PRODUCT_COLUMNS } from '../../../constant/columns';
import { Box } from '@mui/material';
import ProductForm from '../../../components/ProductForm';
import { ModalProductStyles } from '../../../constant/styles';
import Loader from '../../../components/Loader';

const Product = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>();

    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const [open, setOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductType>();

    const [action, setAction] = useState<'edit' | 'add'>('add');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProducts = async (): Promise<void> => {
        try {
            const p = page + 1;
            const response = await getProducts({ page: p });
            setTotal(response.data.total);
            setProducts(response.data.product);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchProductById = async (id: number): Promise<void> => {
        const data = await getProductById(id);
        setProduct(data.data);
    };

    const deleteAction = (id: number): void => {
        alert('del');
    };

    const editAction = async (id: number): Promise<void> => {
        setAction('edit');
        await fetchProductById(id);
        setOpen(true);
    };

    useEffect(() => {
        fetchProducts().catch((err) => {
            console.log(err);
        });
    }, [page]);

    const closeProductModal = (): void => {
        setOpen(false);
    };

    const updateProductAfter = (data: ProductType[]): void => {
        setProducts(data);
    };

    return (
        <MainContainer>
            <Heading text="Manage Products" />
            <Box mt={4} />
            <AppTable
                data={products as ProductType[]}
                total={total}
                page={page}
                setPage={setPage}
                columns={PRODUCT_COLUMNS}
                deleteAction={deleteAction}
                editAction={editAction}
                id="product_id"
            />

            <Modal
                isOpen={open}
                style={ModalProductStyles}
                onRequestClose={closeProductModal}
            >
                <ProductForm
                    action={action}
                    product={product}
                    setLoading={setLoading}
                    closeModal={closeProductModal}
                    allProducts={products as ProductType[]}
                    setProducts={updateProductAfter}
                />
            </Modal>
            {loading && <Loader overlay={true} />}
        </MainContainer>
    );
};

export default Product;
