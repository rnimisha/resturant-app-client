import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    type ErrorResponse,
    type CartItem,
    type ProductType,
} from '../../utils/interface/interface';
import { getProductById } from '../../services/product.services';
import { toast } from 'react-toastify';
import {
    SingleContainer,
    ImageSide,
    InfoSide,
    Image,
    PriceDetail,
} from './product.styled';

import Heading from '../../components/Heading';
import AppButton from '../../components/AppButton';
import useCart from '../../hooks/useCart';
import { quantityReducer } from '../../utils/counter';
import Counter from '../../components/Counter';

const SingleProduct = (): JSX.Element => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState<ProductType>();

    const [quantity, dispatch] = useReducer(quantityReducer, 1);

    const fetchProduct = async (): Promise<void> => {
        const pid = Number(id);
        const data = await getProductById(pid);
        setProduct(data.data);
    };

    const handleAddToCart = (): void => {
        const product_id = Number(product?.product_id);
        const cartItem: CartItem = {
            product_id,
            cart_prod_quantity: quantity,
        };

        addToCart(cartItem)
            .then((data) => {
                data && toast.success('Added to cart');
            })
            .catch((error) => {
                const err = JSON.parse(
                    (error as Error).message
                ) as ErrorResponse;
                toast.info(err.msg);
            });
    };

    useEffect(() => {
        fetchProduct().catch((error) => {
            console.log(error);
            toast.error('Unexpected Error');
        });
    }, [id]);

    return (
        <SingleContainer>
            <ImageSide>
                {product?.images && (
                    <Image src={`../../uploads/${product?.images[0]}`} />
                )}
            </ImageSide>
            <InfoSide>
                <Heading fontSize="2.5rem" text={product?.name || ''} />

                <PriceDetail>
                    &#36;{product?.price} per {product?.unit}
                </PriceDetail>

                <div>{product?.description}</div>

                <Counter dispatch={dispatch} quantity={quantity} />
                <AppButton text="Add to Cart" action={handleAddToCart} />
            </InfoSide>
        </SingleContainer>
    );
};

export default SingleProduct;
