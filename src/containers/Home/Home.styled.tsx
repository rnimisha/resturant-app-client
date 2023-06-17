import styled from 'styled-components';
import BANNERIMG from '../../assets/image/banner3.jpeg';

export const BannerContainer = styled.div`
    width: 100vw;
    min-height: 93vh;
    margin: -24px 0px -24px -24px;
    position: relative;
    background-image: url(${BANNERIMG});
`;

export const Overlay = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    background-color: black;
    opacity: 0.3;
`;

export const TextOverlay = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    flex-direction: column;
`;

export const MainText = styled.div`
    font-size: 3.8rem;
    font-weight: 700;
    color: #fff;
`;
