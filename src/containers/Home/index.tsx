import { useNavigate } from 'react-router-dom';
import AppButton from '../../components/AppButton';
import { BannerContainer, MainText, Overlay, TextOverlay } from './Home.styled';

const Home = (): JSX.Element => {
    const navigate = useNavigate();

    const handleMenu = (): void => {
        navigate('/products');
    };
    return (
        <>
            <BannerContainer>
                <Overlay />
                <TextOverlay>
                    <MainText>ORDER YOUR FAVOURITE DISH</MainText>
                    <div style={{ color: '#fff' }}>
                        Varieties to make your day healthy and special
                    </div>
                    <AppButton text="Menu" action={handleMenu} />
                </TextOverlay>
            </BannerContainer>
        </>
    );
};

export default Home;
