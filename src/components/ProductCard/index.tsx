import { type MouseEvent } from 'react';
import {
    type ErrorResponse,
    type CartItem,
    type ProductType,
} from '../../utils/interface/interface';
import {
    Card,
    ImageContainer,
    Image,
    Information,
    LeftInfo,
    RightInfo,
    CartBtn,
} from './productCard.styled';

import IMG from '../../assets/image/test.jpeg';
import Heading from '../Heading';

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import useCart from '../../hooks/useCart';
import { toast } from 'react-toastify';

const ProductCard = (props: ProductType): JSX.Element => {
    const { addToCart } = useCart();

    const handleAddToCart = (
        event: MouseEvent<HTMLButtonElement>,
        productId: number
    ): void => {
        event.stopPropagation();

        const cartItem: CartItem = {
            product_id: productId,
            cart_prod_quantity: 1,
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

    return (
        <Card
            onClick={() => {
                alert('navigate to product page');
            }}
        >
            <ImageContainer>
                <Image src={IMG} />
            </ImageContainer>
            <Information>
                <LeftInfo>
                    <div>
                        <Heading text={props.name || ''} fontSize="20px" />
                    </div>
                    <div>
                        Rs. {props.price} <i>per {props.unit}</i>
                    </div>
                </LeftInfo>
                <RightInfo>
                    <CartBtn
                        onClick={(event) => {
                            if (props.product_id) {
                                handleAddToCart(event, props.product_id);
                            }
                        }}
                    >
                        <AddShoppingCartOutlinedIcon />
                    </CartBtn>
                </RightInfo>
            </Information>
        </Card>
    );
};

export default ProductCard;
