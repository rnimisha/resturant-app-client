import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect, useState } from 'react';
import { getProducts } from '../../services/product.services';
import { type ProductType } from '../../utils/interface/interface';

const Product = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    const fetchProducts = async (): Promise<void> => {
        try {
            const response = await getProducts({ page });

            if (response.data.length > 0) {
                setProducts((prev) => [...prev, ...response.data]);
                setPage((prev) => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        } else {
            fetchProducts().catch((error) => {
                console.log(error);
            });
        }
    }, [page, initialLoad]);

    return (
        <div>
            <div>
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchProducts}
                    hasMore={hasMore}
                    loader={<h2>loading......</h2>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {products.map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{ width: '200px', height: '600px' }}
                            >
                                {item.name} {item.product_id}
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Product;
