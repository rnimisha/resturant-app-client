import { useEffect, useState } from 'react';

import { MainContainer } from './product.styled';

import AppTable from '../../../components/AppTable';
import Heading from '../../../components/Heading';
import { type ProductType } from '../../../utils/interface/interface';
import { getProducts } from '../../../services/product.services';
import { PRODUCT_COLUMNS } from '../../../constant/columns';

const Product = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>();
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const fetchProducts = async (): Promise<void> => {
        try {
            const p = page + 1;
            const response = await getProducts({ page: p });
            setTotal(response.data.total);
            setProducts(response.data.product);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts().catch((err) => {
            console.log(err);
        });
    }, [page]);

    return (
        <MainContainer>
            <Heading text="Manage Products" />
            <div style={{ width: '100%', backgroundColor: 'red' }}>
                <AppTable
                    data={products as ProductType[]}
                    total={total}
                    page={page}
                    setPage={setPage}
                    columns={PRODUCT_COLUMNS}
                />
            </div>
        </MainContainer>
    );
};

export default Product;
