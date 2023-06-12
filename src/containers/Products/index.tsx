import InfiniteScroll from 'react-infinite-scroll-component';

import { useEffect, useState } from 'react';
import { getMinMaxPrice, getProducts } from '../../services/product.services';
import {
    type CheckedCategories,
    type ProductType,
} from '../../utils/interface/interface';
import ProductCard from '../../components/ProductCard';
import {
    AllProducts,
    FilterContainer,
    MainContainer,
    ProductContainer,
} from './product.styled';
import Filter from '../../components/Filter';

const Product = (): JSX.Element => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [priceValue, setPriceValue] = useState<number[]>([0, 500]);
    const [maximum, setMaximum] = useState<number>(200);
    const [selectedCategories, setSelectedCategories] =
        useState<CheckedCategories>({});

    const handleCheckBox = (id: number, name: string): void => {
        if (selectedCategories[id]) {
            const { [id]: removedCategory, ...remaining } = selectedCategories;
            setSelectedCategories(remaining);
        } else {
            setSelectedCategories({ ...selectedCategories, [id]: name });
        }
    };

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

    const handlePriceChange = (min: number, max: number): void => {
        setPriceValue([min, max]);
    };

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

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        } else {
            fetchProducts().catch((error) => {
                console.log(error);
            });
        }
    }, [page, initialLoad, priceValue, selectedCategories]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [priceValue, selectedCategories]);

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
            </AllProducts>
        </MainContainer>
    );
};

export default Product;
