import { type MouseEvent } from 'react';
import { type ProductType } from '../../utils/interface/interface';
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

const ProductCard = (props: ProductType): JSX.Element => {
    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        alert('add to cart');
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
                            handleAddToCart(event);
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
