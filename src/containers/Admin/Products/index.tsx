import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { MainContainer } from './product.styled';

import AppTable from '../../../components/AppTable';
import Heading from '../../../components/Heading';
import { type ProductType } from '../../../utils/interface/interface';
import {
    deleteProduct,
    getProductById,
    getProducts,
} from '../../../services/product.services';
import { PRODUCT_COLUMNS } from '../../../constant/columns';

import ProductForm from '../../../components/ProductForm';
import {
    ModalCustomStyles,
    ModalProductStyles,
} from '../../../constant/styles';
import Loader from '../../../components/Loader';
import Confirmation from '../../../components/Confirmation';
import AppButton from '../../../components/AppButton';
import { Row } from '../../Logout/logout.styled';

const Product = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>();

    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const [open, setOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductType>();

    const [openDelModal, setOpenDelModal] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState(false);
    const [productId, setProductId] = useState<number>(0);

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
        setIsDelete(false);
        setProductId(id);
        setOpenDelModal(true);
    };

    const editAction = async (id: number): Promise<void> => {
        setAction('edit');
        await fetchProductById(id);
        setOpen(true);
    };

    const updateProductAfter = (data: ProductType[]): void => {
        setProducts(data);
    };

    const deleteProductAction = async (): Promise<void> => {
        setLoading(true);
        await deleteProduct(productId);
        closeDelModal();
        await fetchProducts();
        setLoading(false);
    };

    const addAction = (): void => {
        setAction('add');
        setProduct(undefined);
        setOpen(true);
    };

    useEffect(() => {
        fetchProducts().catch((err) => {
            console.log(err);
        });
    }, [page]);

    useEffect(() => {
        if (isDelete) {
            deleteProductAction().catch((err) => {
                console.log(err);
            });
        }
    }, [isDelete]);

    const closeProductModal = (): void => {
        setOpen(false);
    };

    const closeDelModal = (): void => {
        setOpenDelModal(false);
        setIsDelete(false);
    };

    return (
        <MainContainer>
            <Row style={{ width: '100%', margin: '20px 0' }}>
                <div>
                    <Heading text="Manage Products" />
                </div>
                <div>
                    <AppButton text="Add Product" action={addAction} />
                </div>
            </Row>

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

            <Modal
                isOpen={openDelModal}
                style={ModalCustomStyles}
                onRequestClose={closeDelModal}
            >
                <Confirmation
                    title="Do you want to remove the product?"
                    yesAction={() => {
                        setIsDelete(true);
                    }}
                    cancelAction={closeDelModal}
                />
            </Modal>
        </MainContainer>
    );
};

export default Product;
