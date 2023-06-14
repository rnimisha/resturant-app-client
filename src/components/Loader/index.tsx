import { RotatingLines } from 'react-loader-spinner';
import COLOR from '../../constant/color';

const Loader = ({ overlay }: { overlay?: boolean }): JSX.Element => {
    const styling = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    };
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
    };
    return (
        <div style={overlay ? { ...styling, ...overlayStyle } : styling}>
            <RotatingLines
                strokeColor={COLOR.primary}
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loader;
