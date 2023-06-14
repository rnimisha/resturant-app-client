import { useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
    type CheckedCategories,
    type ProductType,
} from '../../utils/interface/interface';

import {
    AllProducts,
    FilterContainer,
    MainContainer,
    ProductContainer,
} from './product.styled';

import { getMinMaxPrice, getProducts } from '../../services/product.services';
import ProductCard from '../../components/ProductCard';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';

const Product = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [priceValue, setPriceValue] = useState<number[]>([0, 500]);
    const [minMaxValue, setMinMaxValue] = useState<number[]>([0, 500]);
    const [maximum, setMaximum] = useState<number>(200);
    const [selectedCategories, setSelectedCategories] =
        useState<CheckedCategories>({});
    const [loading, setLoading] = useState<boolean>(false);

    // --------- categories filter
    const handleCheckBox = (id: number, name: string): void => {
        if (selectedCategories[id]) {
            const { [id]: removedCategory, ...remaining } = selectedCategories;
            setSelectedCategories(remaining);
        } else {
            setSelectedCategories({ ...selectedCategories, [id]: name });
        }
    };

    // --------- get products
    const fetchProducts = async (): Promise<void> => {
        try {
            // await new Promise<void>((resolve) => setTimeout(resolve, 2000));
            const categories = Object.keys(selectedCategories).map(Number);
            const response = await getProducts({
                page,
                minPrice: priceValue[0],
                maxPrice: priceValue[1],
                category_id: categories,
            });

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

    //  --------- filter price
    const handlePriceChange = (min: number, max: number): void => {
        setPriceValue([min, max]);
    };

    const handleMinMax = (): void => {
        setMinMaxValue([priceValue[0], priceValue[1]]);
    };

    const throttleHandleMinMax = useMemo(
        () => throttle(handleMinMax, 1000),
        []
    );

    // ------- load minimum and maximum price at initial load
    useEffect(() => {
        getMinMaxPrice()
            .then((data) => {
                const { minPrice, maxPrice } = data.data;
                setPriceValue([minPrice, maxPrice]);
                setMaximum(data.data.maxPrice);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // ------ apply filter
    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        } else {
            fetchProducts()
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [page, initialLoad, minMaxValue, selectedCategories]);

    // ---------- change min max price
    useEffect(() => {
        setLoading(true);
        throttleHandleMinMax();
    }, [priceValue]);

    // ------- when filter is changed
    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [minMaxValue, selectedCategories]);

    return (
        <MainContainer>
            <FilterContainer>
                <Filter
                    handleCheckBox={handleCheckBox}
                    selectedCategories={selectedCategories}
                    handlePriceChange={handlePriceChange}
                    value={priceValue}
                    maximum={maximum}
                />
            </FilterContainer>

            <AllProducts>
                {loading && <Loader />}
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchProducts}
                    hasMore={hasMore}
                    loader={<Loader overlay={false} />}
                >
                    <ProductContainer>
                        {products.map((item, index) => (
                            <ProductCard
                                key={index}
                                name={item.name}
                                product_id={item.product_id}
                                quantity={item.quantity}
                                price={item.price}
                                unit={item.unit}
                                category_id={item.category_id}
                            />
                        ))}
                    </ProductContainer>
                </InfiniteScroll>
                )
            </AllProducts>
        </MainContainer>
    );
};

export default Product;
